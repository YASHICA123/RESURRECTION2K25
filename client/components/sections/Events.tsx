import Reveal from "@/components/common/Reveal";
import Tilt from "@/components/common/Tilt";

const events = [
  {
    category: "Headliners",
    title: "Salim-Sulaiman Symphony Night",
    img: "/images/Screenshot 2025-10-05 122520.png",
    desc: "An orchestral Bollywood showcase by the iconic duo with choir, Sufi, and electronic soundscapes.",
  },
 
{
  category: "Music Fiesta",
  title: "Rhythms of the World",
  img: "/images/Screenshot 2025-10-05 124130.png",
  desc: "Groove to global beats — from Afro drums to Bollywood tunes, Latin salsa to indie rock. A night of music that unites cultures and hearts.",
},
{
  category: "Dance Extravaganza",
  title: "Global Groove Parade",
  img: "/images/Screenshot 2025-10-05 124729.png",
  desc: "Step into a whirlwind of movement — witness classical grace, street hip-hop, tribal energy, and cultural fusions lighting up the stage.",
},
{
  category: "Cultural Couture",
  title: "Runway of Nations",
  img: "/images/Screenshot 2025-10-05 124748.png",
  desc: "From sarees to kimonos, streetwear to traditional robes — watch cultures walk the ramp in a dazzling showcase of identity and style.",
},
{
  category: "Fine Arts",
  title: "Canvas of Cultures",
  img: "/images/Screenshot 2025-10-05 124759.png",
  desc: "Dive into a world of expression — where brushes paint traditions, murals tell stories, and art celebrates every shade of humanity.",
},
{
  category: "Theatre",
  title: "Stages of the World",
  img: "/images/Screenshot 2025-10-05 124806.png",
  desc: "Experience drama that transcends language — from street plays to global classics, emotions and cultures come alive under the spotlight.",
},
{
  category: "Literary Arts",
  title: "Voices of the Globe",
  img: "/images/Screenshot 2025-10-05 124812.png",
  desc: "Celebrate words without borders — poetry slams, multilingual storytelling, debates, and ideas that weave the cultures of the world together.",
},
{
  category: "E-Sports Arena",
  title: "Battle of Nations",
  img: "/images/Screenshot 2025-10-05 124822.png",
  desc: "Gamers unite! Compete in a high-energy arena where strategy, reflexes, and teamwork collide — representing cultures in a digital battlefield.",
},
{
  category: "Photography",
  title: "Frames of the World",
  img: "/images/Screenshot 2025-10-05 124829.png",
  desc: "Capture the essence of cultures — from vibrant streets to soulful faces, every frame tells a story of celebration, unity, and color.",
},
];

export default function Events() {
  return (
   <section id="events" className="container py-16 md:py-24">
<div className="mb-10 text-center max-w-2xl mx-auto">
<p className="text-sm uppercase tracking-[0.3em] text-foreground/70">Carnival Line-Up</p>
<h2 className="mt-3 text-3xl md:text-4xl font-bold">Music · Dance · Fashion · Art · Theatre · Literature · Gaming · Photography</h2>
<p className="mt-3 text-foreground/80">Immerse yourself in the Carnival of Cultures — where melodies meet movement, art meets expression, and every moment celebrates the spirit of unity and creativity.</p>
 </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((e) => (
          <Reveal key={e.title}>
            <Tilt className="[transform-style:preserve-3d]">
              <article className="group relative overflow-hidden rounded-2xl neon-ring will-change-transform">
              <div className="aspect-[16/9] w-full bg-black flex items-center">
  <img
    src={e.img}
    alt={e.title}
    className="w-full h-full object-contain"
    loading="lazy"
  />
</div>

              <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="inline-block text-[10px] uppercase tracking-[0.25em] px-2 py-1 rounded-full bg-foreground/15 backdrop-blur text-foreground">
                  {e.category}
                </span>
                <h3 className="mt-2 text-xl font-semibold text-foreground">{e.title}</h3>
                <p className="text-sm text-foreground">{e.desc}</p>
              </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10" />
              </article>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
