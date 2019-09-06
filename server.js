const express = require('express');
const server = express();
const projectsRoutes = require('./projects/projectsRouter');

server.use('/projects', projectsRoutes)

module.exports = server;