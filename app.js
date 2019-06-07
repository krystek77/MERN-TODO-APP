const express = require('express');
//
const app = express();
//
const userRoutes = require('./api/routes/users');
const taskRoutes = require('./api/routes/tasks');
//
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);
//
module.exports = app;
