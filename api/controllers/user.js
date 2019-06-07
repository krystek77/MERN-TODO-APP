const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

//User model
const User = require('../models/user');

exports.signUp = (req, res, next) => {
	const { email, password, firstName, lastName, phone, job, country } = req.body;
	//simple validation
	if (!email || !password) {
		res.status(400).json({
			message: `Please provide required fields`,
		});
	}
	User.findOne({ email: req.body.email })
		.then(user => {
			if (user) return res.status(400).json({ message: 'User already exists. Sign in ...' });
			//return null if does not exist
			return user;
		})
		.then(user => {
			const newUser = new User({
				email,
				password,
				firstName,
				lastName,
				phone,
				job,
				country,
			});
			//Create salt and hash
			bcrypt.genSalt(10, (error, salt) => {
				if (error) return;
				bcrypt.hash(newUser.password, salt, (error, hash) => {
					if (error) return res.status(500).json({ message: 'Can not hash password' });
					//
					newUser.password = hash;
					//
					newUser
						.save()
						.then(user => {
							//create token for registered user
							jwt.sign(
								{ id: user._id, email: user.email },
								config.get('jwtSecret'),
								{ expiresIn: 3600 },
								(error, token) => {
									if (error) return res.status(400).json({ message: 'Creating token failed' });
									res.status(201).json({
										token: token,
										user: {
											id: user._id,
											firstName: user.firstName,
											lastName: user.lastName,
											email: user.email,
											phone: user.phone,
											job: user.job,
										},
									});
								}
							);
						})
						.catch(error => {
							console.log(error);
							res.status(400).json({ message: 'User registration failed' });
						});
				});
			});
		})
		.catch(error => {
			console.log(error);
			res.status(500).json({ message: 'Something went wrong...' });
		});
};
exports.signIn = (req, res, next) => {
	
};
