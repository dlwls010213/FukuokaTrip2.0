import React, { useEffect, useState } from 'react';
import { BeforeInstallPromptEvent } from '../types';

const InstallPWA: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // 1. Debug Logic: Always show button on localhost to verify style
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (isLocalhost) {
      setShowButton(true);
    }

    // 2. Production Logic: Listen for install prompt
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
    // If in debug mode without actual prompt, just alert
    if (!deferredPrompt) {
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        alert('這是開發預覽模式。在真實手機上，這裡會觸發安裝流程。');
      }
      return;
    }

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
      {/* Icon Container */}
      <div className="relative mb-1">
        {/* Glowing Background */}
        <div className="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-60 animate-pulse"></div>
        
        {/* Snowflake Icon */}
        <div className="relative bg-white/10 backdrop-blur-md border border-white/40 p-3 rounded-full shadow-lg active:scale-95 transition-transform duration-200">
            {/* Optimized Snowflake SVG */}
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-8 h-8 text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]"
            >
                {/* Main vertical and horizontal */}
                <line x1="12" y1="2" x2="12" y2="22"></line>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                {/* Diagonals */}
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                <line x1="19.07" y1="4.93" x2="4.93" y2="19.07"></line>
                
                {/* Branch Tips Details */}
                <path d="M12 6l-2-2"></path>
                <path d="M12 6l2-2"></path>
                
                <path d="M12 18l-2 2"></path>
                <path d="M12 18l2 2"></path>
                
                <path d="M6 12l-2-2"></path>
                <path d="M6 12l-2 2"></path>
                
                <path d="M18 12l2-2"></path>
                <path d="M18 12l2 2"></path>
                
                {/* Center Detail */}
                <circle cx="12" cy="12" r="1.5" fill="currentColor" fillOpacity="0.8"></circle>
            </svg>
        </div>
      </div>
      
      {/* Label Text - Always visible now, styled for legibility on dark bg */}
      <div className="bg-black/40 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm border border-white/10">
        點此下載
      </div>
    </button>
  );
};

export default InstallPWA;