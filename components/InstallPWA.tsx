import React, { useEffect, useState } from 'react';
import { BeforeInstallPromptEvent } from '../types';

const InstallPWA: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handler = (e: BeforeInstallPromptEvent) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Update UI notify the user they can install the PWA
      setShowButton(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);

    // We've used the prompt, and can't use it again, discard it
    setDeferredPrompt(null);
    setShowButton(false);
  };

  if (!showButton) return null;

  return (
    <button
      onClick={handleInstallClick}
      className="fixed bottom-24 right-4 z-50 flex flex-col items-center justify-center group animate-fade-in"
      aria-label="Install App"
    >
      <div className="relative">
        {/* Glowing Background */}
        <div className="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500 animate-pulse"></div>
        
        {/* Snowflake Icon */}
        <div className="relative bg-white/10 backdrop-blur-md border border-white/40 p-3 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-8 h-8 text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]"
            >
                <path d="M2 12h20" />
                <path d="M12 2v20" />
                <path d="m20 2-6 6" />
                <path d="m4 22 6-6" />
                <path d="m20 22-6-6" />
                <path d="m4 2 6 6" />
            </svg>
        </div>
      </div>
      
      {/* Tooltip Text */}
      <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white/90 text-[#234787] text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        點此下載 App
      </div>
    </button>
  );
};

export default InstallPWA;