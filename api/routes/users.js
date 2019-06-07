const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
	const newUser = { name: req.body.name };
	res.status(201).json(newUser);
});

module.exports = router;
