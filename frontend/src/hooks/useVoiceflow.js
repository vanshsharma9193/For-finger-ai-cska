import { useEffect } from 'react';

/**
 * Custom hook to dynamically mount the Voiceflow AI Forensic Assistant widget
 */
export function useVoiceflow() {
  useEffect(() => {
    // Avoid duplicate initialization
    if (document.getElementById('voiceflow-widget-script')) {
      return;
    }

    const script = document.createElement('script');
    script.id = 'voiceflow-widget-script';
    script.type = 'text/javascript';
    script.src = 'https://cdn.voiceflow.com/widget-next/bundle.mjs';

    script.onload = () => {
      if (window.voiceflow && window.voiceflow.chat) {
        window.voiceflow.chat.load({
          verify: { projectID: '69e86b43b10d288250d6af12' },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production',
          voice: {
            url: 'https://runtime-api.voiceflow.com',
          },
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup script tag if unmounted
      const existing = document.getElementById('voiceflow-widget-script');
      if (existing) {
        existing.remove();
      }
    };
  }, []);
}

