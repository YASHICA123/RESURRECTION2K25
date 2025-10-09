import Navbar from "./Navbar";
import Footer from "./Footer";
import { PropsWithChildren } from "react";




export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col gradient-neon grid-overlay">
      <Navbar />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </div>
  );
}
