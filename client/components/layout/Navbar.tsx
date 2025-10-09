import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#about", label: "About" },
  { href: "#events", label: "Events" },
  { href: "#schedule", label: "Schedule" },
  { href: "#gallery", label: "Gallery" },
  { href: "#sponsors", label: "Sponsors" },
  { href: "#register", label: "Register" },
  { href: "#Contact.", label: "Contact" },
  { href: "https://drive.google.com/file/d/1wAmxro_6RZgkmgSPSB4SJOKmQNZmv7vb/view?usp=sharing", label: "Event Manual" },
  { href: "https://drive.google.com/file/d/19t8mGYmZmxP23mLy0UJunCl89hLArVW0/view?usp=sharing", label: "Invitation Brochure" },
  
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all",
        scrolled ? "backdrop-blur-md bg-background/60 border-b border-border/50" : "bg-transparent"
      )}
    >
      <nav className="container flex items-center justify-between py-4">
        <a href="#hero" className="group inline-flex items-center gap-3">
          <div className="flex items-center gap-2">
            <img
              src="/images/Screenshot 2025-10-08 121453.png"
              alt="Carnival crest"
             className="h-10 w-10 object-contain shadow-[0_0_0_2px_hsl(var(--background))] "
            />
            <div className="flex flex-col leading-tight">
              <span className="text-[13px] uppercase tracking-[0.45em] text-secondary/100">MREI</span>
              <span className="font-heading text-lg md:text-xl tracking-wide text-foreground">
                Resurrection <span className="text-primary">2K25</span>
              </span>
            </div>
          </div>
        </a>

        <button
          className="md:hidden inline-flex items-center gap-2 px-3 py-2 rounded-lg glass hover:neon-ring"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-foreground">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <ul className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-primary after:to-accent hover:after:w-full after:transition-all"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#register"
          className="hidden md:inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-background bg-gradient-to-r from-primary via-secondary to-accent hover:from-accent hover:via-secondary hover:to-primary transition-all shadow-[0_0_20px_hsl(var(--primary)/0.4)]"
        >
          Register Now
        </a>
      </nav>
      {open && (
        <div className="md:hidden border-t border-border/50 bg-background/80 backdrop-blur-md">
          <ul className="container py-4 grid gap-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2 hover:bg-foreground/5"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#register"
                onClick={() => setOpen(false)}
                className="block text-center rounded-md px-3 py-2 font-semibold text-background bg-gradient-to-r from-primary via-secondary to-accent"
              >
                Register Now
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
