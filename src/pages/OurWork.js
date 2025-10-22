// Author: Smangalene Charles Sema & Ntsikayethu Nyamezele
// Date: 5 September 2025
// Description: Our Work page that displays projects from Firestore

import React, { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/config';
import HeroWork from '../components/OurWork_page/HeroWork';
import ObjectivesSection from '../components/OurWork_page/ObjectivesSection';
import ProjectCard from '../components/OurWork_page/ProjectCard';
import Testimonial from '../components/OurWork_page/Testimonial';

// Placeholder image URL
const placeholderImage = 'https://via.placeholder.com/800x400/6a1b9a/ffffff?text=Sethuse+Community+Haven';

const OurWork = () => {
  const [workData, setWorkData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log('🔄 Fetching projects from Firestore...');
        const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const projects = querySnapshot.docs.map(doc => {
          const data = doc.data();
          console.log('📥 Raw project data:', data);
          
          // Handle image URL - prioritize imageUrl, then image, then use placeholder
          let imageUrl = data.imageUrl || data.image;
          if (!imageUrl || imageUrl === '') {
            console.warn('⚠️ No image URL found for project:', data.title);
            imageUrl = placeholderImage;
          }
          
          return {
            id: doc.id,
            ...data,
            image: imageUrl // Always provide a valid image URL
          };
        });
        
        console.log('✅ All projects loaded:', projects);
        setWorkData(projects);
      } catch (error) {
        console.error('❌ Error fetching projects:', error);
        setError('Failed to load projects from database. Please check your connection.');
        setWorkData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '200px',
        fontSize: '1.2rem',
        color: '#666'
      }}>
        <div>Loading projects...</div>
      </div>
    );
  }

  return (
    <>
      <HeroWork />
      <ObjectivesSection />
      
      <section className="projects">
        <h5>Highlights of Our Work</h5>
        <hr className="divider" />
        
        {error && (
          <div style={{ 
            background: '#ffebee', 
            color: '#c62828', 
            padding: '1rem', 
            margin: '1rem',
            borderRadius: '4px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}
        
        {workData.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem',
            color: '#666'
          }}>
            <p>No projects found. Add some projects in the admin panel!</p>
          </div>
        ) : (
          workData.map((work, idx) => (
            <ProjectCard 
              key={work.id || idx} 
              title={work.title}
              date={work.date}
              objectives={work.objectives || []}
              image={work.image}
              description={work.description}
            />
          ))
        )}
      </section>

      <Testimonial />
    </>
  );
};

export default OurWork;