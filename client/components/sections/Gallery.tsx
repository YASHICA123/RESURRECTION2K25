import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";
import Reveal from "@/components/common/Reveal";

const images = [
  
 "/images/Screenshot 2025-10-05 120454.png",
 "/images/Screenshot 2025-10-05 120444.png",
 "/images/Screenshot 2025-10-05 120231.png",
"/images/Screenshot 2025-10-05 120820.png",
  "/images/Screenshot 2025-10-05 120632.png",
  "/images/Screenshot 2025-10-05 120612.png",
  "/images/Screenshot 2025-10-05 120517.png",
  "/images/Screenshot 2025-10-05 122249.png",
  "/images/Screenshot 2025-10-05 122229.png",

];

export default function Gallery() {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: "start" });

  useEffect(() => {
    let t: any;
    if (embla) {
      const autoplay = () => {
        if (!embla) return;
        embla.scrollNext();
        t = setTimeout(autoplay, 3000);
      };
      t = setTimeout(autoplay, 3000);
    }
    return () => clearTimeout(t);
  }, [embla]);

  return (
    <section id="gallery" className="container py-16 md:py-24">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-foreground/70">Gallery</p>
        <h2 className="mt-3 text-3xl md:text-4xl font-bold">A glimpse of the previous Fest</h2>
      </div>

      <Reveal>
        <div className="overflow-hidden rounded-2xl neon-ring" ref={emblaRef}>
          <div className="flex">
            {images.map((src, i) => (
              <div className="relative min-w-0 flex-[0_0_85%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%]" key={i}>
                <img src={src} alt={`Gallery ${i + 1}`} className="h-72 md:h-96 w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
