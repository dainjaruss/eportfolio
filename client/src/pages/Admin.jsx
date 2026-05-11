import { useState, useEffect } from 'react';
import { fetchProjects, deleteProject } from '../services/projectsService';
import ProjectForm from '../components/forms/ProjectForm';
import '../css/App.css';

const Admin = () => {
  const [projectList, setProjectList] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [loading, setLoading] = useState(true);

  // Grab the latest projects from the DB
  const refreshProjects = async () => {
    try {
       const data = await fetchProjects();
      setProjectList(data);
    } catch (err) {
      console.error('Failed to load projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshProjects();
  }, []);

  const removeProject = async (id) => {
    // Quick confirm before we do anything destructive
    const confirmed = window.confirm('Are you absolutely sure? This cannot be undone.');
    
    if (confirmed) {
      try {
        await deleteProject(id);
        refreshProjects();
      } catch (err) {
        alert('Oops, delete failed. Try again?');
      }
    }
  };

  const closeForm = () => {
    setEditingProject(null);
    setIsAddingNew(false);
    refreshProjects();
  };

  if (loading) {
    return (
      <section className="page-section">
        <p>Loading projects...</p>
      </section>
    );
  }

  // If we're editing or adding, show the form. Otherwise, show the list.
  const showForm = isAddingNew || editingProject;

  return (
    <section className="page-section">
      <h2 className="section-title">Project Management</h2>
      
      {!showForm && (
        <button className="btn-primary" onClick={() => setIsAddingNew(true)} style={{marginBottom: '2rem'}}>
          + Add New Project
        </button>
      )}

      {showForm ? (
        <ProjectForm 
          project={editingProject} 
          onSuccess={closeForm} 
          onCancel={() => { setEditingProject(null); setIsAddingNew(false); }} 
        />
      ) : (
        <div className="admin-list">
          {projectList.length === 0 && <p>No projects found. Time to add some!</p>}
          
          {projectList.map(item => (
            <div 
              key={item._id} 
              className="admin-item card" 
              style={{ 
                padding: '1.5rem', 
                marginBottom: '1rem', 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                display: 'flex' 
              }}
            >
              <div>
                <h4 style={{ margin: 0 }}>{item.title}</h4>
                <p style={{ margin: '0.25rem 0', opacity: 0.7 }}>{item.category}</p>
              </div>

              <div className="admin-actions" style={{ display: 'flex', gap: '1rem' }}>
                <button className="btn-secondary" onClick={() => setEditingProject(item)}>Edit</button>
                <button className="btn-danger" onClick={() => removeProject(item._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Admin;


