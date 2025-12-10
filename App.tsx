import React from 'react';
import BackgroundCanvas from './components/BackgroundCanvas';
import GlitchText from './components/GlitchText';
import SocialLinks from './components/SocialLinks';
import AudioPlayer from './components/AudioPlayer';
import { useSecurityMode } from './hooks/useSecurityMode';

function App() {
  // Enforce security rules (no right click, no inspect shortcut)
  useSecurityMode();

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* 3D Matrix Background */}
      <BackgroundCanvas />

      {/* TryHackMe Badge (Absolute positioned as per original) */}
      <div className="absolute top-2 right-2 md:top-4 md:right-4 z-20 hover:scale-105 transition-transform duration-300">
        <a href="https://tryhackme.com/p/TheYusa" target="_blank" rel="noreferrer">
          <img 
            src="https://tryhackme.com/badge/image/2095644" 
            alt="TryHackMe Badge" 
            className="w-48 md:w-64"
          />
        </a>
      </div>

      {/* Main Content Card */}
      <div className="z-10 container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          
          {/* Profile Image with Glitch/Hover effect */}
          <div className="relative group cursor-pointer w-48 h-48 md:w-64 md:h-64 flex-shrink-0">
            <div className="absolute inset-0 bg-cyber-red rounded-full blur opacity-20 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"></div>
            <img 
              src="https://picsum.photos/300/300" 
              alt="TheYusa Avatar"
              className="relative w-full h-full object-cover rounded-full border-2 border-cyber-red/50 shadow-[0_0_15px_rgba(139,0,0,0.5)] group-hover:border-cyber-cyan group-hover:shadow-[0_0_25px_rgba(0,255,249,0.5)] transition-all duration-500"
            />
          </div>

          {/* Text Content */}
          <div className="text-center md:text-left">
            <GlitchText text="TheYusa" size="xl" />
            
            <div className="mt-2 font-mono text-lg md:text-2xl text-cyber-red font-bold animate-pulse">
              #~ Cyber Security
            </div>

            <p className="mt-4 font-mono text-gray-400 max-w-md mx-auto md:mx-0 text-sm md:text-base">
              Penetration Tester | CTF Player | Developer
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex justify-center md:justify-start">
               <SocialLinks />
            </div>
          </div>

        </div>
      </div>

      {/* Music Player */}
      <AudioPlayer />
      
      {/* Footer / Copyright */}
      <div className="absolute bottom-2 w-full text-center text-gray-600 font-mono text-xs">
         &copy; {new Date().getFullYear()} TheYusa. All systems operational.
      </div>
    </div>
  );
}

export default App;