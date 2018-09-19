const User = require("../models/User");
const AuthHelper = require("../helpers/authHelper");

class UserController {
	constructor() {}

	static register(req, res) {
		const { name, email, password } = req.body;

		User.create({
			name,
			email,
			password
		})
			.then(newUser => {
				res.status(201).json(newUser);
			})
			.catch(err => {
				res.status(400).json({
					error: err.message
				});
			});
	}

	static login(req, res) {
		const { email, password } = req.body;

		User.findOne({ email })
			.then(userFound => {
        console.log("ketemu nih", userFound)
				if (userFound) {
					let passwordIsMatch = AuthHelper.comparehash(
						email+password,
						userFound.password
					);
					if (passwordIsMatch) {
						let token = AuthHelper.createToken({
							id: String(userFound._id),
							name: userFound.name,
							email: userFound.email
						});

						res.status(200).json({
							token
						});
					} else {
            console.log("Pasword not match", passwordIsMatch)
						res.status(404).json({
							error: "User not registered"
						});
					}
				} else {
          
        console.log("error")
					res.status(404).json({
						error: "User not registered"
					});
				}
			})
			.catch(err => {
				res.status(400).json({
					error: err.message
				});
			});
	}

	static updateUser(req, res) {
		let userId = req.params.id;

		User.findByIdAndUpdate(userId, { $set: req.body }, { new: true })
			.then(updatedUser => {
				res.status(200).json(updatedUser);
			})
			.catch(err => {
				res.status(400).json({
					error: err.message
				});
			});
	}

	static remove(req, res) {
		let userId = req.params.id;

		User.findByIdAndRemove(userId)
			.then(removedUser => {
				res.status(200).json(removedUser);
			})
			.catch(err => {
				res.status(400).json({
					error: err.message
				});
			});
	}

	static getUserById(req, res) {
		let userId = req.params.id;

		User.findById(userId)
			.populate("orders")
			.populate("receivers")
			.then(userFound => {
				if (userFound) {
					res.status(200).json(userFound);
				} else {
					res.status(404).json({
						error: "User not found"
					});
				}
			})
			.catch(err => {
				res.status(400).json({
					error: err.message
				});
			});
	}

	static getAllUsers(req, res) {
		let userId = req.params.id;

		User.find()
			.populate("orders")
			.populate("receivers")
			.then(users => {
				res.status(200).json(users);
			})
			.catch(err => {
				res.status(400).json({
					error: err.message
				});
			});
	}
}

module.exports = UserController;
