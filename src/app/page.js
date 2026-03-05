'use client';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Timeline from '@/components/Timeline';
import Projects from '@/components/Projects';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ParticleCanvas from '@/components/ParticleCanvas';
import ScrollProgress from '@/components/ScrollProgress';

export default function Home() {
  return (
    <>
      <a href="#about" className="skip-nav">본문 바로가기</a>
      <ScrollProgress />
      <ParticleCanvas />
      <Navbar />
      <Hero />
      <About />
      <Timeline />
      <Projects />
      <Blog />
      <Contact />
      <Footer />
    </>
  );
}
