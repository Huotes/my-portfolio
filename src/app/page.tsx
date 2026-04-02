import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Profile from '@/components/sections/Profile';
import Experience from '@/components/sections/Experience';
import Skills from '@/components/sections/Skills';
import Certificates from '@/components/sections/Certificates';
import Contact from '@/components/sections/Contact';
import ParticleBackground from '@/components/effects/ParticleBackground';

export default function Home() {
  return (
    <>
      <ParticleBackground />
      <Header />
      <main className="relative z-10">
        <Hero />
        <About />
        <Profile />
        <Experience />
        <Skills />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
