//   A React component that automatically scrolls the window to the top 
//   whenever the route changes. Useful for single-page applications 
//   to ensure the user sees the top of the new page after navigation.


import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation(); // Get current route path

  useEffect(() => {     
    // This effect runs every time the user navigates to a new page
    window.scrollTo(0, 0);  // Scroll to the top-left corner (x:0, y:0)
  }, [pathname]); // Dependency: run effect when pathname changes

  return null; // This component does not render any visible UI
};

export default ScrollToTop;
