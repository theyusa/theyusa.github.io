import React, { useRef, useState, useEffect } from 'react';

const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play failed (interaction required)", e));
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Attempt auto-play on mount (often blocked by browsers until interaction)
  useEffect(() => {
    if(audioRef.current) {
       // We set autoPlay attribute on the tag, but we can try programmatically too
       // If it fails, the user must click the button
    }
  }, []);

  return (
    <div className="fixed bottom-5 left-5 z-50 flex items-center gap-3 p-3 rounded-lg bg-black/40 backdrop-blur-sm border border-cyber-red/30 hover:border-cyber-red transition-colors duration-300">
      <audio ref={audioRef} loop>
        <source src="aerials.mp3" type="audio/mpeg" />
        <source src="aerials.ogg" type="audio/ogg" />
      </audio>
      
      <button 
        onClick={togglePlay}
        className="text-white hover:text-cyber-brightRed transition-colors focus:outline-none"
        aria-label={isPlaying ? "Pause Music" : "Play Music"}
      >
        {isPlaying ? (
          <i className="fas fa-pause text-xl w-6"></i>
        ) : (
          <i className="fas fa-play text-xl w-6"></i>
        )}
      </button>

      <div className="hidden md:flex items-center gap-2">
         <i className="fas fa-volume-down text-xs text-gray-400"></i>
         <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={volume} 
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-20 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyber-red"
         />
      </div>
    </div>
  );
};

export default AudioPlayer;