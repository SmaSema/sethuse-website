// Author: Smangalene Charles Sema
// Date: 5 September 2025
// Description: Displays the Hero/Introduction section for the "Our Work" page.
//              Provides an overview of the organization's objectives and guiding pillars.

import React from 'react';
import '../OurWork_page/HeroWork.css' // Import CSS for styling

// Functional component for HeroWork section
const HeroWork = () => (
  <div className="header-block">
    
    {/* Section heading */}
    <h4>What We Do</h4>
    
    {/* Section description paragraph */}
    <p>
      At Sethuse Community Haven, we believe that real change begins with intentional action. 
      Our objectives reflect the heart of our organization: to uplift, educate, and empower. 
      Whether we’re mentoring the youth, supporting the elderly, or standing for inclusivity 
      and equality, each goal represents our commitment to building a resilient, united community. 
      Below are the guiding pillars that shape everything we do.
    </p>
  </div>
);

export default HeroWork;
