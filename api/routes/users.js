const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.status(200).json({ message: 'all users' });
});

module.exports = router;
