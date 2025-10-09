export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border/50 bg-gradient-to-b from-transparent to-foreground/[0.03]">
  
      <div className="container py-10 grid gap-8 md:grid-cols-4">
        <div>
          <p className="font-heading text-xl neon-text">Resurrection 2025</p>
          <p className="mt-3 text-sm text-foreground/70">Manav Rachna University's annual cultural festival. Carnival Of Cultures.</p>
        </div>
        <div>
          <p className="font-semibold mb-3">Quick Links</p>
          <ul className="space-y-2 text-foreground/80">
            <li><a href="#about" className="hover:text-foreground">About</a></li>
            <li><a href="#events" className="hover:text-foreground">Events</a></li>
            <li><a href="#schedule" className="hover:text-foreground">Schedule</a></li>
            <li><a href="#register" className="hover:text-foreground">Register</a></li>
            <li><a href="#gallery" className="hover:text-foreground">Gallery</a></li>
            <li><a href="#sponsors" className="hover:text-foreground">Sponsors</a></li>
            <li><a href="#Contact." className="hover:text-foreground">Contact</a></li>
            <li><a href="https://drive.google.com/file/d/1wAmxro_6RZgkmgSPSB4SJOKmQNZmv7vb/view?usp=sharing" className="hover:text-foreground">Event Manual</a></li>
            <li><a href="https://drive.google.com/file/d/19t8mGYmZmxP23mLy0UJunCl89hLArVW0/view?usp=sharing" className="hover:text-foreground">Invitation Brochure</a></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-3">Follow</p>
          <div className="flex gap-3 text-foreground/80">
            <a href="https://www.instagram.com/resurrection_mr?igsh=d3k0cnl1bWRueHVl" target="_blank" rel="noreferrer" className="hover:text-foreground">Instagram</a>
          </div>
        </div>
        <div>
          <p className="font-semibold mb-3">Contact</p>
          <p className="text-sm text-foreground/80">mrfest@mrei.ac.in</p>
          <p className="text-sm text-foreground/80">The Manav Rachna Campus , Sector -43
Aravali Hills, Surajkund Road, Faridabad</p>
        </div>
      </div>
   <div className="w-full bg-[#6a1817] py-4">
  <div className="container flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8">
    <a
      href="https://drive.google.com/file/d/1DoIwz84CdsdXTSoxoSLenF_dXIQKifJ1/view"
      className="px-5 py-2 rounded-full bg-yellow-400 text-[#6a1817] font-semibold transition-colors hover:bg-yellow-300 hover:scale-[1.05] shadow"
    >
      Terms & Conditions
    </a>
    <a
      href="https://drive.google.com/file/d/1zvZXKm1P70IJIAcYVmtoC02orUYnY-6F/view"
      className="px-5 py-2 rounded-full bg-yellow-400 text-[#6a1817] font-semibold transition-colors hover:bg-yellow-300 hover:scale-[1.05] shadow"
    >
      Privacy Policy
    </a>
    <a
      href="https://drive.google.com/file/d/1dmPDkC_Bg4TGcxt6BMigbPnSs2bZzjuC/view?usp=sharing"
      className="px-5 py-2 rounded-full bg-yellow-400 text-[#6a1817] font-semibold transition-colors hover:bg-yellow-300 hover:scale-[1.05] shadow"
    >
      Pricing Policy
    </a>
    <a
      href="https://drive.google.com/file/d/1hdmLJig09pKphxVS1KmpIkt5trgVLWWf/view"
      className="px-5 py-2 rounded-full bg-yellow-400 text-[#6a1817] font-semibold transition-colors hover:bg-yellow-300 hover:scale-[1.05] shadow"
    >
      Cancellation & Refund Policy
    </a>
  </div>
</div>

      <div className="border-t border-border/50">
  <div className="container py-6 text-xs text-foreground/60 flex justify-center items-center">
    <p>
      © {new Date().getFullYear()} Resurrection • Manav Rachna University. All rights reserved.
    </p>
  </div>
</div>

  
    </footer>
  );
}
