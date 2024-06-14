const express = require('express');
const next = require('next');
const path = require('path');
const connectDB = require('./db');
const users = require('./routes/users');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
require('dotenv').config(); 
const PORT = process.env.PORT || 3000;
connectDB();
app.prepare().then(() => {
  const server = express();
  server.use(express.json());

  // Use API routes
  server.use('/api/users', users); 
  // Serve static files from the .next directory
  const buildPath = path.join(__dirname, '../client/.next');
  server.use('/_next', express.static(buildPath));

  // Handle all other routes with Next.js
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
