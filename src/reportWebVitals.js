// Author: Smangalene Charles Sema
// Date: 5 September 2025
// Description:
//   Utility file for measuring and reporting web performance metrics in a React app.
//   Uses the 'web-vitals' library to collect key performance indicators (KPIs).


// reportWebVitals is a function that accepts a callback (onPerfEntry)
// to handle performance metrics when they are recorded.
const reportWebVitals = onPerfEntry => {
  // Ensure the callback exists and is a function
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Dynamically import the 'web-vitals' library to reduce initial bundle size
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Call the provided callback with each metric as it is measured
      getCLS(onPerfEntry); // Cumulative Layout Shift - visual stability
      getFID(onPerfEntry); // First Input Delay - interactivity
      getFCP(onPerfEntry); // First Contentful Paint - loading speed
      getLCP(onPerfEntry); // Largest Contentful Paint - loading performance
      getTTFB(onPerfEntry); // Time to First Byte - server response time
    });
  }
};

// Export the function for use in index.js or elsewhere
export default reportWebVitals;
