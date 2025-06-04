import React, { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Gift from "./pages/Gift.jsx";
import Order from "./pages/Order.jsx";
import Pay from "./pages/Pay.jsx";
import Store from "./pages/Store.jsx";
import Footer from "./components/Footer.jsx";
import Cart from './components/Cart';

const App = () => {
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
      {showInstallButton && (
        <button
          onClick={handleInstallClick}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            padding: '10px',
            backgroundColor: '#00704A', // Starbucks green
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Add to Home Screen
        </button>
      )}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gift" element={<Gift />} />
        <Route path="/order" element={<Order />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/store" element={<Store />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </div>
  );
};
export default App;
