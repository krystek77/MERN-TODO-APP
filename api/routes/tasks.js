const express = require('express');
const router = express.Router();
const multer = require('multer');
const Task = require('../models/task');

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, './uploads/');
	},
	filename: function(req, file, cb) {
		cb(null, new Date().toISOString() + file.originalname);
	},
});

const upload = multer({
	storage: storage,
});

//@route	GET tasks/
//@desc		Get all tasks
//@access	Public
router.get('/', (req, res, next) => {
	Task.find()
		.select('-__v')
		.then(tasks => {
			res.status(200).json(tasks);
		})
		.catch(error => {
			res.status(400).json({ message: 'Download tasks failed' });
		});
});
//@route	GET tasks/:idTask
//@desc		Get task by id
//@access	Public
router.get('/:idTask', (req, res, next) => {
	const id = req.params.idTask;
	Task.findById(id)
		.select('-__v')
		.then(task => {
			if (!task) return res.status(400).json({ message: `Task with id ${id} does not exist` });
			res.status(200).json(task);
		})
		.catch(error => res.status(400).json({ message: `Searching task with id ${id} failed` }));
});
//@route PUT tasks/:idTask
//@desc Update task
//@access Public

router.put('/:idTask', (req, res, next) => {
	const id = req.params.idTask;
	const { title, description, priority, createdAt, deadline } = req.body;

	Task.findById(id)
		.then(task => {
			if (!task) res.status(400).json({ message: `Task width id ${id} does not exist` });
			task.title = title;
			task.description = description;
			task.priority = priority;
			task.deadline = deadline;
			task.updatedAt = new Date().toISOString().slice(0, 10);
			task.createdAt = createdAt;
			task.save()
				.then(result => res.status(201).json(task))
				.catch(error => res.status(400).json({ message: 'Something went wrong' }));
		})
		.catch(error => res.status(500).json({ message: `Updating failed` }));
});

// @route 	POST tasks/
// @desc 	Add new task
// @access 	Public
router.post('/', upload.single('image'), (req, res, next) => {
	const { title, priority, description, deadline } = req.body;
	console.log(req.file);
	const task = new Task({
		title: title,
		priority: priority,
		description: description,
		deadline: deadline,
		createdAt: new Date().toISOString().slice(0, 10),
		image: req.file.path,
	});
	task.save()
		.then(task => {
			res.status(201).json(task);
		})
		.catch(error => res.status(400).json({ message: 'Adding new task failed' }));
});

module.exports = router;
