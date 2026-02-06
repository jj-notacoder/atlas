
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Vision from './components/Vision';
import Partners from './components/Partners';
import ProblemSolution from './components/ProblemSolution';
import HowItWorks from './components/HowItWorks';
import UAECoverage from './components/UAECoverage';
import LiveDemo from './components/LiveDemo';
import TrustControl from './components/TrustControl';
import ClosingCTA from './components/ClosingCTA';
import Footer from './components/Footer';
import Essentials from './components/Essentials';

function App() {
  return (
    <main className="relative min-h-screen w-full bg-background text-white selection:bg-manara-cyan selection:text-black">
      <Navbar />
      <Hero />
      <ProblemSolution />
      <Vision />
      <HowItWorks />
      <UAECoverage />
      <Essentials />
      <TrustControl />
      <LiveDemo />
      <ClosingCTA />
      <Footer />
    </main>
  );
}

export default App;
