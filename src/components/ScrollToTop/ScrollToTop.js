// src/components/ScrollToTop.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {     //runs everytime user navigates to new page
    window.scrollTo(0, 0);  //scroll to position (x,and y)
  }, [pathname]);

  return null; // This component doesn’t render anything visible
};

export default ScrollToTop;
