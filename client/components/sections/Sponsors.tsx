import Reveal from "@/components/common/Reveal";

const sponsors = [
  "BookMyShow",
  "Red Bull",
  "Sony Music",
  "Spotify",
  "MakeMyTrip",
  "LIC",
  "Coca-Cola",
  "Royal Stag",
  "VH1",
  "JBL",
  "MTV India",
  "Radio Mirchi",
];


export default function Sponsors() {
  return (
    <section id="sponsors" className="container py-16 md:py-24">

      <div className="text-center max-w-2xl mx-auto mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-foreground/70">Sponsors</p>
        <h2 className="mt-3 text-3xl md:text-4xl font-bold">Carnival Partners & Amplifiers</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {sponsors.map((s) => (
          <Reveal key={s}>
            <div className="flex items-center justify-center rounded-xl p-4 glass hover:neon-ring transition-all">
              <span className="font-semibold text-foreground/80">{s}</span>
            </div>
           
        
          </Reveal>
         
        ))}
        
      </div>
      
    </section>
  );
}
