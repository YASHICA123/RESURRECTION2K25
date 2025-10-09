import { useState } from "react";
import Reveal from "@/components/common/Reveal";

const days = [
  {
    key: "day1",
    label: "Day 1 • Rythm Saturday",
    items: [
      { time: "10:00", title: "Carnival Street Opening & Flag Parade" },
      { time: "13:00", title: "Global Culture pavilions & creative workshops" },
      { time: "19:30", title: "Euphoria & Aryan Katoch live under the lights" },
    ],
  },
  {
    key: "day2",
    label: "Day 2 • Legacy Sunday",
    items: [
     { time: "12:00 PM", title: "World food lanes & folk fusion jam" },
      { time: "05:00 PM", title: "Salim-Sulaiman symphony finale & fireworks" },
    ],
  },

];

export default function Schedule() {
  const [active, setActive] = useState(days[0].key);
  const activeDay = days.find((d) => d.key === active)!;

  return (
    <section id="schedule" className="container py-16 md:py-24">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-foreground/70">Schedule</p>
        <h2 className="mt-3 text-3xl md:text-4xl font-bold">Two carnival nights. Infinite memories.</h2>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {days.map((d) => (
          <button
            key={d.key}
            onClick={() => setActive(d.key)}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              active === d.key
                ? "text-background bg-gradient-to-r from-primary via-secondary to-accent"
                : "glass hover:neon-ring"
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid md:grid-cols-3 gap-4">
        {activeDay.items.map((it) => (
          <Reveal key={it.title}>
            <div className="rounded-xl p-5 glass hover:neon-ring transition-all">
              <p className="text-sm text-foreground/70">{it.time}</p>
              <p className="mt-1 font-semibold">{it.title}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
