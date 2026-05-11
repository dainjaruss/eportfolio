import { useState, useEffect } from 'react';
import api from '../../services/api';
import '../../styles/form.css';

const ProjectForm = ({ project, onSuccess, onCancel }) => {
  // Using a single state object for the form worked out to be easier to manage
  const [projectData, setProjectData] = useState({
    title: '',
    description: '',
    category: '',
    link: '',
    tools: '',
    image:'default-project.jpg'
  });

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  // Hydrate form if we're in "Edit" mode
  useEffect(() => {
    if (project) {
      setProjectData({
        ...project,
        // Join tools into a string for the input field
        tools: project.tools?.join(', ') || ''
      });
    }
  }, [project]);

  const updateField = (e) => {
    const { name, value } = e.target;
    setProjectData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('file', file);

    setUploading(true);
    setError(''); // Clear any old errors

    try {
      const res = await api.post('/api/upload', data, {
         headers: { 'Content-Type': 'multipart/form-data' }
      });

      setProjectData(prev => ({ ...prev, image: res.data.url }));
    } catch (err) {
      console.error('Upload failed:', err);
      setError('Could not upload image. Check file size?');
    } finally {
      setUploading(false);
    }
  };

  const saveProject = async (e) => {
    e.preventDefault();
    setError('');

    // Clean up the tools string into an array before sending
    const payload = {
      ...projectData,
      tools: projectData.tools.split(',').map(t => t.trim()).filter(Boolean)
    };

    try {
      if (project?._id) {
        await api.put(`/api/projects/${project._id}`, payload);
      } else {
        await api.post('/api/projects', payload);
      }

      onSuccess();
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to save project. Try again?';
      setError(msg);
    }
  };

  // Helper to resolve the image path
  const getPreviewUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;

    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
    return `${baseUrl}${path}`;
  };

  return (
    <form className="project-form glass-form" onSubmit={saveProject}>
      <h3>{project ? 'Edit Project' : 'Add New Project'}</h3>

      {error && <p className="error-message">{error}</p>}

      <div className="form-field">
        <label>Project Title</label>
        <input name="title" value={projectData.title} onChange={updateField} placeholder="e.g. My Awesome App" required />
      </div>

      <div className="form-field">
        <label>Description</label>
        <textarea name="description" value={projectData.description} onChange={updateField} rows="4" required />
      </div>

      <div className="form-field">
        <label>Category</label>
        <input name="category" value={projectData.category} onChange={updateField} placeholder="Web App, CLI Tool, etc." required />
      </div>

      <div className="form-field">
        <label>Tools & Tech (comma separated)</label>
        <input
          name="tools"
          value={projectData.tools}
          onChange={updateField}
          placeholder="React, Node, MongoDB"
          required
        />
      </div>

      <div className="form-field">
        <label>Live URL</label>
        <input
          name="link"
          value={projectData.link}
          onChange={updateField}
          placeholder="https://..."
        />
      </div>

      <div className="form-field">
        <label>Cover Image</label>
        <input type="file" onChange={handleFileUpload} accept="image/*" />

        {uploading && <p className="status-text">Uploading image...</p>}

        {projectData.image && !uploading && (
          <div className="image-preview">
            <img src={getPreviewUrl(projectData.image)} alt="Preview" style={{ width: '120px', marginTop: '10px', borderRadius: '8px', objectFit: 'cover' }} />
          </div>
        )}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary" disabled={uploading}>
          {project?'Save Changes':'Create Project'}
        </button>
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;


