// 
// Author: Smangalene Charles Sema & Ntsikayethu Nyamezele
// Date: 5 September 2025
// Description:
//   The "Our Work" page for Sethuse Community Haven.
//   This page showcases the organization's objectives, key projects, 
//   and testimonials from participants and beneficiaries.
//   It highlights how the organization empowers, educates, and supports
//   communities through various initiatives.


import React from 'react';
import HeroWork from '../components/OurWork_page/HeroWork';
import ObjectivesSection from '../components/OurWork_page/ObjectivesSection';
import ProjectCard from '../components/OurWork_page/ProjectCard';
import Testimonial from '../components/OurWork_page/Testimonial';

// Importing project images
import mensDialog from "../assets/mens_dialog.jpg";
import illovonek from "../assets/illovenek.jpg";
import girlLivingInColor from "../assets/girls-living-in-color.jpg";
import wellnessHike from "../assets/wellness-hike.jpg";
import womensMonth from "../assets/womens_month.jpg";
import spreadingLove from "../assets/spreading_love.jpg";
import communityPlanting from "../assets/community_planting.jpg";

// Array containing all work/project details
const workData = [
  {
    title: "Beginnings and Endings Wellness Hike",
    date: "2024",
    objectives: ["Wellness", "Community Building", "Personal Growth"],
    image: wellnessHike,
    description: "We're thrilled to have hosted our inaugural Beginnings and Endings Wellness Hike at the serene African Enterprise Conference Centre. Like-minded individuals joined us for a rejuvenating morning of connection with nature, while prioritizing their physical, mental, and emotional wellbeing. As we embarked on this scenic hike, we reflected on the past year and set intentions for the new one. The tranquil surroundings and gentle exercise allowed us to clear our minds, breathe fresh air, and tap into our inner selves. This hike provided the perfect opportunity to reflect on the past year's accomplishments and challenges, set realistic goals and intentions for the new year, reconnect with nature and inner peace, and foster meaningful connections with like-minded individuals. We're grateful for the wonderful participants who joined us on this inaugural hike and made it such a special experience.",
  },
  {
    title: "Community Planting & Restoration Project – Sweetwaters",
    date: "2024",
    objectives: ["Environmental Improvement", "Empowerment Programs", "Food Security"],
    image: communityPlanting, 
    description: "In collaboration with WeFeedSa × Wildtrust and Zethembiso NPC, we carried out a 10-month project that employed 9 participants to plant and restore in the community of Sweetwaters. This initiative not only supported environmental sustainability but also created employment opportunities and strengthened community resilience, and enhanced access to fresh produce for families in Sweetwater.",
  },
  {
    title: "Spreading Love & Dignity – Support for Gogo Thoshi",
    date: "2024",
    objectives: ["Elderly Care", "Food Security"],
    image: spreadingLove ,
    description: "Through our PMB Men's Dialogue event, we were made aware of Gogo Thoshi Mncube's challenging situation. This 93-year-old granny from Edendale had to crawl to use the outside bathroom. As Sethuse Community Haven, we knew we had to act to bring dignity and love to Gogo Thoshi's life. Thanks to the kindness of Shamil Ally and Majozi from the IFP political party, who donated money, a blanket, groceries, and a wheelchair, and Adrie Boshof, who generously donated a commode chair, we were able to present Gogo Thoshi with these life-changing gifts. This selfless act has restored Gogo Thoshi's dignity and independence, and we are honored to have played a part in this incredible journey.",
  },
  {
    title: "Women's Month Empowerment Event – How We Grow",
    date: "2023",
    objectives: ["Empowerment Programs" ],
    image: womensMonth ,
    description: "We hosted an unforgettable women's empowerment event to commemorate Women's Month! Themed 'How We Grow,' this insightful discussion brought together incredible women: Zinhle Zulu (Life Coach), Lungile Masuku (Representative from FAMSA), Sis Nondumiso Malinga (Founder of Sisters Make Best Friends organization), Nosipho Gcabashe (Activist and Positivity Advocate), and Kholwani Dlamini (Programme Director of The Dlamini Sisters). We also introduced a new segment where Dr. Sihle Ngobese joined us for 'Think Like a Man,' sharing his perspectives on the panel discussion and offering valuable tips on understanding men. This event was a powerful testament to the strength of women coming together to uplift and empower each other.",
  },
  {
    title: "First Pmb Men's Dialog",
    date: "2023",
    objectives: ["Empowerment Programs"],
    image: mensDialog,
    description: "We're thrilled to share that our first men's empowerment event in 2023 was a resounding success, earning recognition from the Honourable Minister Blade Nzimande. As a testament to the event's impact, Minister Nzimande invited me and 10 gentlemen who participated in the dialogue to his residence in Dambuza for lunch. This continuation of our conversation at the PMB Men's Dialogue underscored the Minister's commitment to empowering men and fostering meaningful discussions. We're grateful for Minister Nzimande's support and acknowledgment of our efforts to empower men in our community. His dedication to education, science, and innovation is truly inspiring. This milestone encourages us to continue promoting positive change and empowering men to become better versions of themselves.",
  },
  {
    title: "Girls Living in Color – Art Workshop",
    date: "2023",
    objectives: ["Empowerment Programs", "GBV Awareness", "Youth Development"],
    image: girlLivingInColor, 
    description: "We hosted 20 female students from Nsikayethu High School and Willowfontein Comprehensive School for a 3-day art workshop at Tatham Art Gallery. As part of the 16 Days of Activism, the students aged 13-15 learned to express their views on gender-based violence (GBV) and community issues through art. With guidance from facilitators, they sketched, painted, and shared their experiences. The workshop culminated in a powerful exhibition, 'Girls Living in Color,' showcasing their artwork and voices. We're proud to have empowered these young women to speak out against GBV and share their perspectives on creating a safer, more equitable community. Special thanks to Tatham Art Gallery for hosting us, facilitators Khethiwe and Siyanda from Mindful Art Society for their guidance, Dr. Ashnee Singh for sponsoring goodies for the girls, and Lawrence Makhanya of Y2K Lounge for his support.",
  },
  {
    title: "Illovonek Primary School Give Back Initiative",
    date: "2023",
    objectives: ["Education"],
    image: illovonek,
    description: "Illovonek Primary School give back initiative where founder Sinqobile Zungu was an assistant teacher. This initiative reflects our commitment to helping disadvantaged communities, particularly in hometown areas with high school dropout rates. Many children leave school around grades 6-7 to work on farms, shops, or herd livestock to support their families financially.",
  },
];

const OurWork = () => {
  return (
    <>
      {/* Hero section with overview of what we do */}
      <HeroWork />

      {/* Display the organization's guiding objectives */}
      <ObjectivesSection />
      
      {/* Projects/Highlights Section */}
      <section className="projects">
        <h5>Highlights of Our Work</h5>
        <hr className="divider" />
        {workData.map((work, idx) => (
          <ProjectCard key={idx} {...work} /> // Spread project data into ProjectCard
        ))}
      </section>

      {/* Testimonials from participants and community members */}
      <Testimonial />
    </>
  );
};

export default OurWork;
