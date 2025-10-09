export default function StickyCTA() {
  return (
    <a
      href="#register"
      className="fixed bottom-6 right-6 z-40 rounded-full px-5 py-3 font-semibold text-background bg-gradient-to-r from-primary via-secondary to-accent shadow-[0_0_22px_hsl(var(--primary)/0.5)] hover:from-accent hover:via-secondary hover:to-primary transition-transform hover:scale-[1.03]"
      aria-label="Register Now"
    >
      Register Now
    </a>
  );
}
