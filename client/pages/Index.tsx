import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Events from "@/components/sections/Events";
import Schedule from "@/components/sections/Schedule";
import Gallery from "@/components/sections/Gallery";
import Sponsors from "@/components/sections/Sponsors";
import Registration from "@/components/sections/Registration";
import Contact from "@/components/sections/Contact";
import StickyCTA from "@/components/StickyCTA";

export default function Index() {
  return (
    <div>
      <Hero />
      <About />
      <Events />
      <Schedule />
      <Gallery />
      <Sponsors />
      <Registration />
      <Contact />
      <StickyCTA />
    </div>
  );
}
