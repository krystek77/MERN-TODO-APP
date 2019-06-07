const express = require('express');
const morgan = require('express');
//
const app = express();
//
const userRoutes = require('./api/routes/users');
const taskRoutes = require('./api/routes/tasks');
//
app.use(morgan('dev'));

//Routes
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

//Handle errors
app.use((req, res, next) => {
	const error = new Error('NOT FOUNDED');
	error.status = 404;
	next(error);
});
app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({ message: error.message, status: error.status });
});
module.exports = app;
