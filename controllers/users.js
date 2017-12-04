const User = require('../models/User.js')
const signToken = require('../serverAuth.js').signToken

const jwt = require('jsonwebtoken')

// exports  controls for the user immediately.  
module.exports = {
//list all users
//delete later
  index: (req, res) => {
		User.find({}, (err, users) => { 
			res.json(users)
		})
	},

	// show user- allows us to get one user
	show: (req, res) => {
	
  // find a specific user based off id 
		User.findById(req.params.id, (err, user) => {
			res.json(user)
		})
	},

	// create usre
	create: (req, res) => {
		User.create(req.body, (err, user) => {
  // if statement to send error based of inputs by the user
			if(err) return res.json({success: false, code: err.code})
	// once user is created, generate a token to "log in"
			const token = signToken(user)
			res.json({success: true, message: "User created. Token attached.", token})
		})
	},

	// find a existing user and update an existing user information
	update: (req, res) => {
		User.findById(req.params.id, (err, user) => {
			if(!user.validPassword(req.body.passwordConfirm)) return res.json({success: false, message: "Invalid Credentials"})
  // Object.assign takes the data user and make sure specific fields are changed
      Object.assign(user, req.body)
			user.save((err, updatedUser) => {
				res.json({success: true, message: "User updated.", user})
			})
		})
	},

	// delete an existing user based of the id 
	destroy: (req, res) => {
		User.findByIdAndRemove(req.params.id, (err, user) => {
			if(err) return res.json({message:'fail!', success: false})
			res.json({success: true, message: "User deleted.", user})
		})
	},

	// the login route
	authenticate: (req, res) => {
	// check if the user exists by email key
		User.findOne({email: req.body.email}, (err, user) => {
	// if there's no user or the password is invalid
			if(!user || !user.validPassword(req.body.password)) {
	// deny access and return the message
				return res.json({success: false, message: "Invalid credentials."})
			}
  // makes sure jwt token is assigned to client
			const token = signToken(user)
			res.json({success: true, message: "Token attached.", token})
		})
	}
}