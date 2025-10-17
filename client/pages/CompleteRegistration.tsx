import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";

export default function CompleteRegistration() {
  const [loading, setLoading] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState(null);
  const [qrId, setQrId] = useState(null);
  const [error, setError] = useState(null);

  const reg = useMemo(() => {
    try {
      const raw = localStorage.getItem("resurrection-registration");
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }, []);

  // Destructure all fields, use sensible defaults. Supports both solo and team.
  const {
    name = "",
    email = "",
    phone = "",
    category = "",
    event = "",
    college = "",
    participation = "", // for "team" or "solo"
    participationType = "",
    members = [], // array of { name, email, phone }
  } = reg;

  const usedParticipation = participation || participationType;

  const startPayment = async () => {
    setError(null);
    setLoading(true);
    try {
      const key = (import.meta as any).env?.VITE_RAZORPAY_KEY_ID;
      if (!key || typeof (window as any).Razorpay === "undefined") {
        setError("Payment not configured");
        setLoading(false);
        return;
      }
      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currency: "INR",
          receipt: email || `receipt_${Date.now()}`,
        }),
      });
      const order = await orderRes.json();
      if (!orderRes.ok || !order?.id) throw new Error(order?.error || "Failed to create order");

      const options = {
        key,
        amount: order.amount,
        currency: order.currency,
        name: "Resurrection 2025",
        description: "Complete Registration",
        order_id: order.id,
        prefill: {
          name,
          email,
          contact: phone,
        },
        notes: {
          college,
          category,
          event,
          participation: usedParticipation,
        },
        theme: { color: "#ff4d4f" },
        handler: async (response) => {
          try {
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            const verifyOut = await verifyRes.json();
            if (!verifyRes.ok || !verifyOut?.success) throw new Error("Verification failed");

            const id = `RES-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
            setQrId(id);

            // Include all fields in the QR
            const data = {
              id,
              name,
              email,
              phone,
              category,
              event,
              college,
              participation: usedParticipation,
              members, // always present, empty array for solo
            };
            const url = await QRCode.toDataURL(JSON.stringify(data), { width: 320, margin: 2 });
            setQrDataUrl(url);

            await fetch("/api/registrations/mark-paid", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email,
                event,
                qrId: id,
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                college,
                participation: usedParticipation,
                members,
              }),
            });
          } catch (e) {
            setError(e?.message || "Payment verification failed");
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (e) {
      setError(e?.message || "Payment failed");
      setLoading(false);
    }
  };

  const downloadQR = () => {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = `${qrId || "registration-qr"}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="container py-16 md:py-24">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold">Complete Your Registration</h1>
        <p className="mt-3 text-foreground/80">Click below to pay and generate your unique QR. Save it carefully.</p>
        {!qrDataUrl ? (
          <button
            onClick={startPayment}
            disabled={loading}
            className="mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold text-background bg-gradient-to-r from-primary via-secondary to-accent hover:from-accent hover:via-secondary hover:to-primary transition-all"
          >
            {loading ? "Processing..." : "Click to Complete Registration"}
          </button>
        ) : (
          <div className="mt-8 grid place-items-center gap-4">
            <img src={qrDataUrl} alt="Your registration QR code" className="rounded-xl shadow-lg bg-white p-2" />
            <p className="text-sm text-foreground/80">This QR is required at entry. Save or screenshot it now.</p>
            <button onClick={downloadQR} className="inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold text-background bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary transition-all">Download QR</button>
            {qrId && <p className="text-xs text-foreground/60">QR ID: {qrId}</p>}
          </div>
        )}

        {error && <p className="mt-4 text-red-400 text-sm">{error}</p>}

        {reg && !qrDataUrl && (
          <div className="mt-8 text-left mx-auto max-w-md glass neon-ring rounded-2xl p-4">
            <h3 className="font-semibold mb-2">Your details</h3>
            <ul className="text-sm text-foreground/80 space-y-1">
              <li><strong>University/College:</strong> {college}</li>
              <li><strong>Event Category:</strong> {category}</li>
              <li><strong>Event Name:</strong> {event}</li>
              <li><strong>Participation Type:</strong> {usedParticipation || "N/A"}</li>
              <li><strong>Name:</strong> {name}</li>
              <li><strong>Email:</strong> {email}</li>
              <li><strong>Phone:</strong> {phone}</li>
              {usedParticipation.toLowerCase() === "team" && Array.isArray(members) && members.length > 0 && (
                <li>
                  <strong>Team Members:</strong>
                  <ul className="ml-3 list-disc">
                    {members.map((m, i) => (
                      <li key={i}>
                        {m.name} ({m.email}, {m.phone})
                      </li>
                    ))}
                  </ul>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
