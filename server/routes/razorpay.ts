import type { RequestHandler } from "express";
import Razorpay from "razorpay";

export const createOrder: RequestHandler = async (req, res) => {
  try {
    const key_id = process.env.RAZORPAY_KEY_ID as string | undefined;
    const key_secret = process.env.RAZORPAY_KEY_SECRET as string | undefined;
    if (!key_id || !key_secret) {
      return res.status(500).json({ error: "Missing env: RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET" });
    }

    const { amount, currency = "INR", receipt } = req.body || {};
    const configuredAmount = process.env.RAZORPAY_AMOUNT ? Number(process.env.RAZORPAY_AMOUNT) : undefined;
    const amt = configuredAmount && configuredAmount > 0 ? configuredAmount : Number(amount);
    if (!amt || !Number.isFinite(amt) || amt <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const razorpay = new Razorpay({ key_id, key_secret });
    const order = await razorpay.orders.create({
      amount: Math.round(amt * 100),
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
    });

    return res.status(200).json(order);
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || "Failed to create order" });
  }
};

export const verifyPayment: RequestHandler = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body || {};
    const key_secret = process.env.RAZORPAY_KEY_SECRET as string | undefined;
    if (!key_secret) return res.status(500).json({ error: "Missing env: RAZORPAY_KEY_SECRET" });

    const sign = `${razorpay_order_id}|${razorpay_payment_id}`;
    const crypto = await import("crypto");
    const expectedSign = crypto.createHmac("sha256", key_secret).update(sign).digest("hex");

    const ok = expectedSign === razorpay_signature;
    return res.status(ok ? 200 : 400).json({ success: ok });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || "Verification failed" });
  }
};
