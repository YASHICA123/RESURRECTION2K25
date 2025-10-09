import { useState } from "react";
import Reveal from "@/components/common/Reveal";

// Field input component
function Field({ label, name, type = "text", required, placeholder, value, onChange }) {
  return (
    <div>
      <label className="text-sm text-foreground/80">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="mt-1 w-full rounded-lg bg-background/60 border border-border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
      />
    </div>
  );
}

export default function Registration() {
  const [submitted, setSubmitted] = useState(false);
  const [members, setMembers] = useState([{ name: "", phone: "", email: "" }]);
  const [participation, setParticipation] = useState("solo");

  const handleMemberChange = (idx, field, value) => {
    const copy = [...members];
    copy[idx][field] = value;
    setMembers(copy);
  };

  const handleParticipation = (e) => {
    const val = e.target.value;
    setParticipation(val);
    if (val === "solo") setMembers([members[0]]);
  };

  const addMember = () => setMembers([...members, { name: "", phone: "", email: "" }]);

  return (
    <section id="register" className="container py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <Reveal>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-foreground/70">Registration</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold">Join the Carnival of Cultures</h2>
            <p className="mt-3 text-foreground/80">
              Save your entry for headliner nights, workshops, food streets, and cultural showcases. Group and crew registrations are welcome — every culture has a stage here.
            </p>
            <div className="mt-6 rounded-2xl p-6 glass neon-ring">
              <p className="text-sm text-foreground/80">
                Prefer Google Forms? Use our live form here:
                <br />
                <a className="underline text-primary hover:text-accent"
                  href="https://forms.gle/"
                  target="_blank" rel="noreferrer">
                  Google Form (opens in new tab)
                </a>
              </p>
            </div>
          </div>
        </Reveal>
        <form
          className="rounded-2xl p-6 glass neon-ring grid gap-4"
          onSubmit={async (e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const data = Object.fromEntries(fd.entries());

            // Always include top-level name, email (required by backend)
            if (participation === "solo") {
              data.name = members[0].name;
              data.email = members[0].email;
              data.phone = members[0].phone;
              // optionally remove members if not needed
              delete data.members;
            } 
            else {
// For team: flatten first member at top level AND send all in members array
data.name = members[0].name;
data.email = members[0].email;
data.phone = members[0].phone;
data.members = members; 
data.teamMembers = members;

}
          

            try { localStorage.setItem("resurrection-registration", JSON.stringify(data)); } catch {}
            try {
              const res = await fetch("/api/registrations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
              });
              const out = await res.json();
              if (!res.ok || out?.error) {
                alert(out?.error || "Failed to save registration");
                return;
              }
              setSubmitted(true);
              window.location.href = "/complete-registration";
            } catch (err) {
              alert("Network error saving registration.");
            }
          }}
        >
          <Field label="University/College Name" name="college" required placeholder="College Name" />

          <div>
            <label className="text-sm text-foreground/80">Event Category</label>
            <select name="category" required className="mt-1 w-full rounded-lg bg-background/60 border border-border px-3 py-2">
              <option value="">Select Event Category</option>
              <option value="technical">Technical</option>
              <option value="cultural">Cultural</option>
              <option value="sports">Sports</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-foreground/80">Event Name</label>
            <select name="event" required className="mt-1 w-full rounded-lg bg-background/60 border border-border px-3 py-2">
              <option value="">Select Event Name</option>
              <option value="hackathon">Hackathon</option>
              <option value="dance-battle">Dance Battle</option>
              <option value="football">Football</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-foreground/80">Participation Type</label>
            <select
              name="participation"
              required
              className="mt-1 w-full rounded-lg bg-background/60 border border-border px-3 py-2"
              value={participation}
              onChange={handleParticipation}>
              <option value="solo">Solo</option>
              <option value="team">Team</option>
            </select>
          </div>

          {/* SOLO: Only show first member's fields */}
          {participation === "solo" &&
            <>
              <Field
                label="Full Name"
                name="name"
                required
                placeholder="Your Name"
                value={members[0].name}
                onChange={e => handleMemberChange(0, "name", e.target.value)}
              />
              <Field
                label="Email"
                name="email"
                required
                type="email"
                placeholder="Your Email"
                value={members[0].email}
                onChange={e => handleMemberChange(0, "email", e.target.value)}
              />
              <Field
                label="Phone"
                name="phone"
                required
                placeholder="Your Phone"
                value={members[0].phone}
                onChange={e => handleMemberChange(0, "phone", e.target.value)}
              />
            </>
          }
          {/* TEAM: Show all members' fields */}
          {participation === "team" && members.map((m, idx) => (
            <div key={idx} className="mb-2">
              <Field
                label={`Team Member ${idx + 1}`}
                name={`member${idx + 1}_name`}
                required
                placeholder="Team Member Name"
                value={m.name}
                onChange={e => handleMemberChange(idx, "name", e.target.value)}
              />
              <div className="grid sm:grid-cols-2 gap-3 mt-1">
                <Field
                  label={`Member ${idx + 1} Phone`}
                  name={`member${idx + 1}_phone`}
                  required
                  placeholder="Phone Number"
                  value={m.phone}
                  onChange={e => handleMemberChange(idx, "phone", e.target.value)}
                />
                <Field
                  label={`Member ${idx + 1} Email`}
                  name={`member${idx + 1}_email`}
                  type="email"
                  required
                  placeholder="Email"
                  value={m.email}
                  onChange={e => handleMemberChange(idx, "email", e.target.value)}
                />
              </div>
            </div>
          ))}
          {/* Add Member Button */}
          {participation === "team" &&
            <button
              type="button"
              className="w-full py-2 border border-dashed border-border rounded-lg flex items-center justify-center gap-2"
              onClick={addMember}>
              <span className="text-xl font-bold">+</span> Add Member
            </button>
          }

          <button
            type="submit"
            className="mt-2 inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold text-background bg-gradient-to-r from-primary via-secondary to-accent hover:from-accent hover:via-secondary hover:to-primary transition-all">
            {submitted ? "Registered!" : "Register Now"}
          </button>
          {submitted && <p className="text-sm text-green-400">Thanks! We have received your registration.</p>}
        </form>
      </div>
    </section>
  );
}
