import React from 'react';
import { SocialLink } from '../types';

const links: SocialLink[] = [
  { name: 'Instagram', url: 'https://www.instagram.com/', iconClass: 'fab fa-instagram' },
  { name: 'Linkedin', url: 'https://www.linkedin.com/', iconClass: 'fab fa-linkedin' },
  { name: 'Github', url: 'https://github.com/TheYusa', iconClass: 'fab fa-github' },
  { name: 'Youtube', url: 'https://www.youtube.com/', iconClass: 'fab fa-youtube' },
  { name: 'Discord', url: 'https://discord.gg/', iconClass: 'fab fa-discord' },
  { name: 'Terminal', url: '#', iconClass: 'fa-solid fa-terminal' }, // You can route this to a real terminal page if you have one
];

const SocialLinks: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center gap-6 mt-8">
      {links.map((link) => (
        <a 
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noreferrer"
          className="group relative"
          aria-label={link.name}
        >
          <div className="absolute -inset-2 bg-cyber-red rounded-full opacity-0 group-hover:opacity-20 blur transition duration-200"></div>
          <i className={`${link.iconClass} text-3xl md:text-4xl text-white transition-all duration-300 group-hover:text-cyber-brightRed group-hover:scale-110`}></i>
          
          {/* Tooltip */}
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono bg-cyber-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity border border-cyber-red">
            {link.name}
          </span>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;