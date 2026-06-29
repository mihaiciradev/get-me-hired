import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import UnderTheHood from "@/components/UnderTheHood";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1e1c2e] text-white font-sans flex flex-col items-center">
      <Navbar />
      <Hero />
      <HowItWorks />
      <UnderTheHood />
      <About />
      <Footer />
    </main>
  );
}
