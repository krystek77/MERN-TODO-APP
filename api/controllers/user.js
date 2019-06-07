//User model
const User = require('../models/user');

exports.signUp = (req, res, next) => {
	User.findOne({ email: req.body.email })
		.then(user => {
			if (user) return res.status(201).json({ message: 'User exists' });
			//return null if does not exist
			return user;
		})
		.then(user => {
			//
			const newUser = new User({
				email: req.body.email,
				password: req.body.password,
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				phone: req.body.phone,
				job: req.body.job,
				country: req.body.country,
			});
			//
			newUser.save().then(user => {
				console.log(user);
				res.status(201).json(user);
			});
		})
		.catch(error => console.log(error));
};
