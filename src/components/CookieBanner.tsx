"use client";

import { useState, useEffect } from "react";
import { updateGoogleConsent } from "../function/updateConsent";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show if the user hasn't made a choice yet
    const savedConsent = localStorage.getItem("google_consent_status");
    if (!savedConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    updateGoogleConsent(true);
    setIsVisible(false);
  };

  const handleDecline = () => {
    updateGoogleConsent(false);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[9999] flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl bg-white/80 p-6 shadow-2xl backdrop-blur-md border border-white/20 animate-in fade-in slide-in-from-bottom-8 duration-500 max-w-5xl mx-auto">
      <div className="flex-1">
        <h3 className="text-lg font-bold text-gray-900 mb-1">Cookie Settings</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          We use cookies to enhance your experience and analyze our traffic. By clicking "Accept All", you consent to our use of cookies for analytics and personalized ads.
        </p>
      </div>
      <div className="flex items-center gap-3 w-full md:w-auto">
        <button
          onClick={handleDecline}
          className="flex-1 md:flex-none px-6 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all active:scale-95"
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          className="flex-1 md:flex-none px-8 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-95"
        >
          Accept All
        </button>
      </div>
    </div>
  );
}
