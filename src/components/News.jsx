import { useState, useEffect } from "react";

const News = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Update UI to notify the user they can add to home screen
      setShowInstallButton(true);
      console.log('beforeinstallprompt event fired');
    });

    window.addEventListener('appinstalled', () => {
      // Log install to analytics
      console.log('INSTALL: App installed');
      setShowInstallButton(false);
      setDeferredPrompt(null);
    });
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      // Show the prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        // We've used the prompt, and can't use it again, discard it
        setDeferredPrompt(null);
        setShowInstallButton(false);
      });
    }
  };
  return (
    <div>
      <div className="w-full bg-[#1E3932] ">
        <div className="max-w-[1296px]  h-[80px] mx-auto flex justify-between items-center px-2 md:px-32 shadow-md">
          <h6 className="text-white md:text-xl">
            Joyous Bells: Celebrating Christmas Cheer.
          </h6>
          {
            showInstallButton && (
              <button
                onClick={handleInstallClick}
                className="px-2 md:px-3 md:py-1 outline-none border border-gray-400 rounded-full text-white">
                Get App
              </button>
            )
          }
        </div>
      </div>
    </div>
  );
};
export default News;
