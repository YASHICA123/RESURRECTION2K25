import Reveal from "@/components/common/Reveal";

export default function Contact() {
  return (
    <section id="contact" className="container py-16 md:py-24">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-foreground/70">Contact</p>
        
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-start bg-[#6C1818] p-4 rounded-lg">
        <Reveal>
          <form
            className="rounded-2xl p-6 glass neon-ring grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks for reaching out! We'll get back to you soon.");
            }}
          >
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Name" name="name" required />
              <Field label="Email" name="email" type="email" required />
            </div>
            <Field label="Subject" name="subject" required />
            <div>
              <label className="text-sm text-foreground/80">Message</label>
              <textarea name="message" rows={5} className="mt-1 w-full rounded-lg bg-background/60 border border-border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <button type="submit" className="inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold text-background bg-gradient-to-r from-primary via-secondary to-accent hover:from-accent hover:via-secondary hover:to-primary transition-all">
              Send Message
            </button>
            <div className="text-sm text-foreground/80">
              <p>Email: mrfest@mrei.ac.in</p>
              <p>Phone: +91 +91 8447780247</p>
              <div className="flex gap-4 mt-2">
                <a href="https://www.instagram.com/resurrection_mr?igsh=d3k0cnl1bWRueHVl" target="_blank" rel="noreferrer" className="hover:text-foreground">Instagram</a>
              </div>
            </div>
          </form>
        </Reveal>

        <Reveal>
          <div className="rounded-2xl overflow-hidden neon-ring">
            <iframe
              title="Manav Rachna University Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.119545117567!2d77.30365157543861!3d28.62703357565564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfb2ff3fc3671%3A0x84f9a9323f3a9f49!2sManav%20Rachna%20University!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%" height="420" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="text-sm text-foreground/80">{label}</label>
      <input name={name} type={type} required={required} className="mt-1 w-full rounded-lg bg-background/60 border border-border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50" />
    </div>
  );
}
