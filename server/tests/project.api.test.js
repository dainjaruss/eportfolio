const request = require('supertest');
const app = require('../server');
const Project = require('../models/Project');

// Mock the Project model
jest.mock('../models/Project');

describe('Project API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/projects', () => {
    it('should return all projects', async () => {
      const mockProjects = [
        { title: 'Project 1', description: 'Desc 1' },
        { title: 'Project 2', description: 'Desc 2' }
      ];

      Project.find.mockResolvedValue(mockProjects);

      const res = await request(app).get('/api/projects');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(mockProjects);
      expect(Project.find).toHaveBeenCalledTimes(1);
    });

    it('should handle errors', async () => {
      Project.find.mockRejectedValue(new Error('Database Error'));
      
      // Spy on console.error to suppress the error log in test output
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      const res = await request(app).get('/api/projects');

      expect(res.statusCode).toEqual(500);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toBe('Database Error');
      
      consoleSpy.mockRestore();
    });
  });

  describe('GET /api/projects/:id', () => {
    it('should return 404 if project not found', async () => {
      Project.findByIdAndUpdate.mockResolvedValue(null);

      const res = await request(app)
        .put('/api/projects/507f1f77bcf86cd799439011')
        .auth('admin', 'password123') // Basic Auth
        .send({ title: 'Updated' });

      expect(res.statusCode).toEqual(404);
      expect(res.body.error).toBe('Project not found');
    });

    it('should return 401 if unauthorized on mutation', async () => {
      const res = await request(app)
        .post('/api/projects')
        .send({ title: 'New' });

      expect(res.statusCode).toEqual(401);
      expect(res.headers['www-authenticate']).toContain('Basic realm="Dain Franklyn Portfolio Admin"');
    });
  });
});
