const express = require('express');
const server = express();
const projectsRoutes = require('./projects/projectsRouter');
const actionsRoutes = require('./actions/actionsRouter');
server.use('/actions', actionsRoutes)
server.use('/projects', projectsRoutes)

module.exports = server;