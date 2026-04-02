import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Journey from '@/components/sections/Journey';
import Profile from '@/components/sections/Profile';
import Experience from '@/components/sections/Experience';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Certificates from '@/components/sections/Certificates';
import HackerLab from '@/components/sections/HackerLab';
import Contact from '@/components/sections/Contact';
import ParticleBackground from '@/components/effects/ParticleBackground';
import PixelGuide from '@/components/effects/PixelGuide';

export default function Home() {
  return (
    <>
      <ParticleBackground />
      <Header />
      <main className="relative z-10">
        <Hero />
        <About />
        <Journey />
        <Profile />
        <Experience />
        <Skills />
        <Projects />
        <Certificates />
        <HackerLab />
        <Contact />
      </main>
      <Footer />
      <PixelGuide />
    </>
  );
}
