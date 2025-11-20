// React component for a "Scroll to Top" button. 
//             Features include:
//              - Appears only after the user scrolls down 300px
//              - Smooth scrolling behavior to the top
//              - Accessible via aria-label
//              - Optional tooltip for extra UX feedback

import React, { useState, useEffect } from 'react';
import './ScrollToTopButton.css'; // Optional: for styling the button and tooltip

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false); // State to track visibility of the button

  // Function to toggle button visibility based on scroll position
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);  // Show button when scrolled past 300px
    } else {
      setIsVisible(false); // Hide button when near the top
    }
  };

  // Function to scroll smoothly to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling animation
    });
  };

  // Add scroll event listener on mount and clean up on unmount
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    // Cleanup to prevent memory leaks
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && ( // Render button only when visible
        <button
          className="scroll-to-top"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          ↑ {/* Arrow inside button for visual cue */}
          <span className="tooltip">Scroll to top</span> {/* Optional tooltip for UX */}
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
