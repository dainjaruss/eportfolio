const basicAuth = require('express-basic-auth');
require('dotenv').config();

const username = process.env.ADMIN_USERNAME || 'admin';
const password = process.env.ADMIN_PASSWORD || 'password123';

/**
 * Middleware to enforce Basic Authentication on sensitive routes.
 * It will trigger a native browser login popup if credentials are missing or incorrect.
 */
const authMiddleware = basicAuth({
  users: { [username]: password },
  challenge: true, // This sends the WWW-Authenticate header
  realm: 'Dain Franklyn Portfolio Admin',
});

module.exports = authMiddleware;
