// Author: Smangalene Charles Sema & Ntsikayethu Nyamezele
// Date: 5 September 2025
// Description: Project management with Cloudinary image uploads and styled success messages

import React, { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot,
  orderBy,
  query 
} from 'firebase/firestore';
import { db } from '../../firebase/config';
import './ProjectManagement.css';

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '', visible: false });
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: '',
    objectives: '',
    imageFile: null,
    imageUrl: ''
  });
  const [imagePreview, setImagePreview] = useState('');

  // Cloudinary configuration
  const cloudinaryConfig = {
    cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
    uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
  };

  // Show message function
  const showMessage = (text, type = 'info') => {
    setMessage({ text, type, visible: true });
    setTimeout(() => {
      setMessage({ text: '', type: '', visible: false });
    }, 5000);
  };

  // Fetch projects from Firestore
  useEffect(() => {
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projectsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(projectsData);
    });

    return () => unsubscribe();
  }, []);

  // Upload image to Cloudinary
  const uploadToCloudinary = async (file) => {
    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('upload_preset', cloudinaryConfig.uploadPreset);
    uploadData.append('cloud_name', cloudinaryConfig.cloudName);
    uploadData.append('folder', 'sethuse-projects');

    try {
      console.log('📤 Uploading to Cloudinary...');
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
        {
          method: 'POST',
          body: uploadData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Image upload failed');
      }

      const data = await response.json();
      console.log('✅ Image uploaded successfully:', data.secure_url);
      return data.secure_url;
    } catch (error) {
      console.error('❌ Cloudinary upload error:', error);
      throw new Error(`Failed to upload image: ${error.message}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        showMessage('Please select a valid image file (JPEG, PNG, WebP, or GIF)', 'error');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showMessage('Image size should be less than 5MB', 'error');
        return;
      }

      setFormData(prev => ({ ...prev, imageFile: file, imageUrl: '' }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.date || !formData.description || !formData.objectives) {
      showMessage('Please fill in all required fields', 'error');
      return;
    }

    // Validate image
    if (!formData.imageUrl && !formData.imageFile) {
      showMessage('Please select an image for the project', 'error');
      return;
    }

    setLoading(true);

    try {
      let imageUrl = formData.imageUrl;

      // Upload new image if provided
      if (formData.imageFile) {
        setImageUploading(true);
        imageUrl = await uploadToCloudinary(formData.imageFile);
        setImageUploading(false);
      }

      const projectData = {
        title: formData.title.trim(),
        date: formData.date.trim(),
        description: formData.description.trim(),
        objectives: formData.objectives.split(',').map(obj => obj.trim()).filter(obj => obj),
        imageUrl: imageUrl,
        createdAt: editingProject ? editingProject.createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      console.log('💾 Saving project to Firestore:', projectData);

      if (editingProject) {
        await updateDoc(doc(db, 'projects', editingProject.id), projectData);
        showMessage('Project updated successfully! 🎉', 'success');
      } else {
        const docRef = await addDoc(collection(db, 'projects'), projectData);
        console.log('✅ Project added with ID:', docRef.id);
        showMessage('Project added successfully! 🎉', 'success');
      }

      resetForm();
      
    } catch (error) {
      console.error('❌ Error saving project:', error);
      showMessage(`Error: ${error.message}`, 'error');
    } finally {
      setLoading(false);
      setImageUploading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      date: '',
      description: '',
      objectives: '',
      imageFile: null,
      imageUrl: ''
    });
    // Clean up object URL to prevent memory leaks
    if (imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview('');
    setEditingProject(null);
  };

  const editProject = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      date: project.date,
      description: project.description,
      objectives: project.objectives.join(', '),
      imageFile: null,
      imageUrl: project.imageUrl
    });
    setImagePreview(project.imageUrl);
  };

  const deleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      try {
        await deleteDoc(doc(db, 'projects', projectId));
        showMessage('Project deleted successfully!', 'success');
      } catch (error) {
        console.error('Error deleting project:', error);
        showMessage('Error deleting project. Please try again.', 'error');
      }
    }
  };

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <div className="project-management">
      {/* Success/Error Message */}
      {message.visible && (
        <div className={`custom-message custom-message-${message.type}`}>
          <div className="message-content">
            <span className="message-icon">
              {message.type === 'success' ? '✅' : 
               message.type === 'error' ? '❌' : 'ℹ️'}
            </span>
            <span className="message-text">{message.text}</span>
            <button 
              className="message-close" 
              onClick={() => setMessage({ text: '', type: '', visible: false })}
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="admin-header">
        <h2>Manage Our Work Projects</h2>
        <p>Add, edit, or delete projects displayed on the Our Work page</p>
        <p className="info-note">
          📝 You can now upload images from any device! Images are stored securely in Cloudinary.
        </p>
      </div>

      <div className="management-layout">
        {/* Project Form */}
        <div className="form-section">
          <form onSubmit={handleSubmit} className="project-form">
            <h3>{editingProject ? 'Edit Project' : 'Add New Project'}</h3>
            
            <div className="form-group">
              <label>Project Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="Enter project title"
                disabled={loading || imageUploading}
              />
            </div>

            <div className="form-group">
              <label>Date *</label>
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                placeholder="e.g., 2024, August 2023"
                disabled={loading || imageUploading}
              />
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows="5"
                placeholder="Enter project description"
                disabled={loading || imageUploading}
              />
            </div>

            <div className="form-group">
              <label>Objectives (comma-separated) *</label>
              <input
                type="text"
                name="objectives"
                value={formData.objectives}
                onChange={handleInputChange}
                required
                placeholder="e.g., Education, Youth Development, Community Building"
                disabled={loading || imageUploading}
              />
            </div>

            <div className="form-group">
              <label>Project Image *</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={loading || imageUploading}
              />
              <small>Supported: JPEG, PNG, WebP, GIF. Max size: 5MB</small>
              
              {imageUploading && (
                <div className="upload-status">
                  <p>📤 Uploading image... Please wait</p>
                </div>
              )}
            </div>

            {imagePreview && (
              <div className="image-preview">
                <p>Image Preview:</p>
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="preview-image"
                />
                <small>This image will be visible on the website</small>
              </div>
            )}

            <div className="form-actions">
              <button 
                type="submit" 
                disabled={loading || imageUploading}
                className="submit-btn"
              >
                {loading ? 'Saving...' : 
                 imageUploading ? 'Uploading Image...' : 
                 editingProject ? 'Update Project' : 'Add Project'}
              </button>
              
              {(editingProject || imagePreview) && (
                <button 
                  type="button" 
                  onClick={resetForm}
                  className="cancel-btn"
                  disabled={loading || imageUploading}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Projects List */}
        <div className="list-section">
          <h3>Existing Projects ({projects.length})</h3>
          <div className="projects-list">
            {projects.map(project => (
              <div key={project.id} className="project-item">
                <div className="project-image">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/80x60?text=Image+Error';
                    }}
                  />
                </div>
                <div className="project-details">
                  <h4>{project.title}</h4>
                  <p className="project-date">{project.date}</p>
                  <p className="project-objectives">
                    {project.objectives.join(', ')}
                  </p>
                </div>
                <div className="project-actions">
                  <button 
                    onClick={() => editProject(project)}
                    className="edit-btn"
                    disabled={loading}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => deleteProject(project.id)}
                    className="delete-btn"
                    disabled={loading}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectManagement;