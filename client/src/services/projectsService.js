import api from './api';

// Fetch the full list of projects. 
// No pagination for now since the portfolio is small and manageable.
export const fetchProjects = async () => {
  const res = await api.get('/api/projects');
  return res.data;
};

// Push a new project to the database
export const createProject = async (details) => {
  const res = await api.post('/api/projects',details);
  return res.data;
};
// Update details for an existing project by ID
export const updateProject = async (id, payload) => {
   const res = await api.put(`/api/projects/${id}`, payload);
  return res.data;
};

// Permanently remove a project from the DB
export const deleteProject = async (id) => {
  const res = await api.delete(`/api/projects/${id}`);
  return res.data;
};


