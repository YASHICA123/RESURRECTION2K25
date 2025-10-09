import React, { useEffect, useRef, useState } from "react";
const HERO_BACKDROP = "/images/Screenshot 2025-10-05 144933.png";
const HERO_CREST = "/images/Screenshot 2025-10-05 110140.png";
const ARTIST_IMAGE = "/images/WhatsApp-Image-2025-10-05-at-15.58.57_d872e579-removebg-preview.png"; // Use a PNG with a transparent background for best results

export function Countdown({ eventDate }) {
  const [timeLeft, setTimeLeft] = useState({});
  useEffect(() => {
    function update() {
      const now = new Date();
      const event = new Date(eventDate);
      const diff = event - now;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
        });
      }
    }
    update();
    const timer = setInterval(update, 60000);
    return () => clearInterval(timer);
  }, [eventDate]);
  if (!timeLeft.days && !timeLeft.hours) return null;
  return (
    
    <div className="my-1 text-white animate-pulse text-base font-semibold text-center text-size = 10px"> <marquee>
     Countdown:  {timeLeft.days} days {timeLeft.hours} hours {timeLeft.minutes} min left! </marquee>
    </div>
    
  );
}


export default function Hero() {
  const parallaxRef = useRef(null);
  // Slide-in animation for artist image
  const [showArtist, setShowArtist] = useState(false);
  useEffect(() => {
    setShowArtist(true);
  }, []);

  return (
    <main id="hero" className="relative min-h-[88vh] md:min-h-[92vh] overflow-hidden">
      {/* Background crowd image */}
      <div className="absolute inset-0 -z-20">
        <img
          src={HERO_BACKDROP}
          alt="Carnival Crowd"
          className="h-full w-full object-cover"
        />
      </div>
      {/* Gradient overlays */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_15%,hsl(var(--primary)/0.28),transparent_65%),radial-gradient(1200px_600px_at_80%_20%,hsl(var(--secondary)/0.28),transparent_20%),radial-gradient(1200px_800px_at_50%_88%,hsl(var(--accent)/0.2),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.7),transparent_25%,transparent_65%,rgba(0,0,0,0.82))]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.75),transparent_50%)]" />
      </div>
      {/* Artist photo: cutout seen over the crowd */}
    <div className="hidden md:flex absolute right-3 md:right-12 top-1/3 z-20 transform -translate-y-1/2 flex-col items-center">
  <div className="relative w-[30rem] md:w-[32rem]">
    <img
      src={ARTIST_IMAGE}
      alt="Main Artist"
      className={
        "w-full object-contain transition-transform duration-500 drop-shadow-2xl hover:scale-105"
        + (showArtist ? " translate-x-0 opacity-100" : " translate-x-full opacity-0")
      }
      style={{ maxHeight: "100vh" }}
    />
    <span
      className="absolute left-0 right-0 bottom-0 translate-y-full bg-primary/90 text-black text-lg md:text-xl font-bold rounded-b-2xl shadow-xl drop-shadow backdrop-blur border-t-2 border-yellow-300 text-center py-4 px-4"
      style={{ width: "100%", minWidth: "200px", maxWidth: "100%" }}
    >
      Star night with Salim-Sulaiman
    </span>
  </div>
</div>


      {/* Parallax glow accent */}
      <div ref={parallaxRef} className="absolute inset-x-0 -top-10 -z-10 pointer-events-none">
        <div className="mx-auto h-64 w-[120%] -ml-[10%] rounded-[50%] bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-3xl" />
      </div>
      {/* Main hero content */}
      <div className="container relative pt-24 md:pt-28 pb-16 md:pb-24">
        <div className="relative max-w-3xl">
 
          <div className="pointer-events-none absolute -inset-x-10 -top-8 h-44 bg-[radial-gradient(600px_120px_at_left,rgba(255,196,0,0.35),transparent_70%)] blur-2xl" />
          <div className="inline-flex items-center gap-4 rounded-full bg-background/10 px-4 py-2 backdrop-blur">

            <img src={HERO_CREST} alt="Resurrection crest" className="h-10 w-10 rounded-full object-cover border border-primary/40" />
 
              <span className="text-[10px] uppercase tracking-[0.4em] text-secondary/90">Manav Rachna Educational Institutions</span>
              <span className="text-sm font-semibold text-foreground/90 tracking-[0.2em]">presents</span>
          </div> 
          </div>
<h1 className="mt-6 text-4xl md:text-8xl font-extrabold leading-tight">
  <span className="text-white">RESURRECTION</span>
  <span className="text-[#bd2126]"> 2K25</span>
</h1>
<h2 className="mt-2 text-[4px] md:text-4xl font-extrabold leading-tight text-[#d49902]">
  Carnival of Cultures
</h2>

           <p className="mt-3 md:mt-4 text-lg md:text-xl text-foreground/90">Where global rhythms meet campus spirit.</p>

 <p className="mt-4 text-sm md:text-base text-foreground/80 flex items-center gap-2 flex-wrap">
  <span className="font-semibold text-black bg-yellow-400 px-3 py-1 rounded-lg shadow-lg text-base md:text-lg tracking-wider">
    October 30-31, 2025
  </span>
</p>

         

          <p className="mt-6 max-w-2xl text-foreground">
            Step into a vibrant carnival celebrating music, dance, art, and innovation. Experience legendary headliners, cultural parades, neon night markets, DJ carnivals, and immersive workshops that bring together communities from across the country.
          </p>
         
          <div className="mt-2 flex flex-wrap gap-4 text-xs text-accent/90 items-center">
            <div className="rounded-full bg-background/80 px-3 py-1 shadow text-primary font-semibold">
              15000+ attendees
            </div>
            <div className="rounded-full bg-background/80 px-3 py-1 shadow text-secondary font-semibold">
              50+ colleges
            </div>
            <div className="rounded-full bg-background/80 px-3 py-1 shadow text-accent font-semibold">
              30+ events
            </div>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <a
              href="#register"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-base font-semibold text-background bg-gradient-to-r from-primary via-secondary to-accent hover:from-accent hover:via-secondary hover:to-primary transition-all shadow-[0_0_30px_hsl(var(--primary)/0.45)] animate-pulse"
            >
              Register Now
            </a>
            
            <a href="#events" className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass hover:neon-ring">
              Explore Events
            </a>
            
          </div>
          <div className="mt-8">
  <div className="w-full py-1 rounded-sm" style={{ background: "#6C1818" }}>
    <Countdown eventDate="2025-10-30T09:00:00+05:30" />
  </div>
</div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-foreground/90">
          
            <Feature text="Electrifying DJ carnival" />
            <Feature text="Cultural parade spotlighting 15+ global folk traditions" />
            <Feature text="Workshops, cosplay, food streets & experiential art zones" />
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-md">
            
            <Stat k="Stages" v="6" />
            <Stat k="Carnival Nights" v="2" />
          </div>
        </div>
      {/* Decorative orbs */}
      <div className="pointer-events-none absolute right-[-10%] top-[20%] h-64 w-64 rounded-full bg-primary/20 blur-3xl animate-float" />
      <div className="pointer-events-none absolute left-[-10%] bottom-[10%] h-72 w-72 rounded-full bg-accent/20 blur-3xl animate-float" />
    </main>
  );
}

function Stat({ v, k }) {
  return (
    <div className="text-center rounded-xl p-4 glass hover:neon-ring transition-all">
      <div className="text-2xl font-bold text-primary">{v}</div>
      <div className="text-xs uppercase tracking-wider text-foreground/70">{k}</div>
    </div>
  );
}

function Feature({ text }) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-background/40 p-4 glass">
      <div className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
      <p>{text}</p>
    </div>
  );
}
