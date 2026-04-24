export const updateGoogleConsent = (granted: boolean) => {
  const status = granted ? 'granted' : 'denied';
  
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('consent', 'update', {
      'ad_storage': status,
      'ad_user_data': status,
      'ad_personalization': status,
      'analytics_storage': status,
    });
    
    // Save preference to localStorage so it can be used on next load
    localStorage.setItem('google_consent_status', status);
    console.log(`Google Consent Mode updated to: ${status}`);
  } else {
    console.warn("gtag not found. Consent could not be updated.");
  }
};
