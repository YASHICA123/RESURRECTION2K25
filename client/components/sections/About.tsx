import Reveal from "@/components/common/Reveal";
import Tilt from "@/components/common/Tilt";
import React, { useEffect, useRef, useState } from "react";



export default function About() {
  return (
    <section id="about" className="container py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <Reveal>
          <Tilt>
            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-2xl bg-gradient-to-tr from-primary/20 via-secondary/15 to-accent/20 blur-2xl" />
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fc5e294c83434445b9aa62d7184e53e3c%2Fb038d28c1e7040a6bf09bf40d4cb6d36?format=webp&width=1400"
                alt="Carnival of Cultures collage"
                className="w-full h-72 md:h-96 object-cover rounded-2xl neon-ring"
                loading="lazy"
              />
            </div>
          </Tilt>
        </Reveal>
        <Reveal>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-foreground/70">About the Carnival</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold">A festival of global cultures & campus energy</h2>
            <p className="mt-4 text-foreground">
              Carnival of Cultures is the transformed avatar of Resurrection — a multi-sensory celebration where international rhythms, dazzling parades, gourmet streets, and technology showcases collide. From iconic stars like Salim-Sulaiman to immersive workshops and folk showcases, every zone is curated to spark connection and creativity.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-xl p-4 glass hover:neon-ring transition-all">
                <p className="text-2xl font-bold text-secondary">15+</p>
                <p className="text-sm text-foreground">Cultural collectives & folk troupes</p>
              </div>
              <div className="rounded-xl p-4 glass hover:neon-ring transition-all">
                <p className="text-2xl font-bold text-accent">6</p>
                <p className="text-sm text-foreground">Signature carnival avenues</p>
              </div>

             
            </div>
           
             </div>  
          
        </Reveal>
      </div>
    </section>
  );
}

