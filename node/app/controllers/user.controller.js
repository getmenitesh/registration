var User = require('../models/user.model.js');

exports.create = function(req, res) {
    
	if(!req.body) {
        return res.status(400).send({message: "user can not be empty"});
    }

    var user = new User({firstName: req.body.firstName ,lastName: req.body.lastName ,email: req.body.email, password: req.body.password , dob: req.body.dob});

    user.save(function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send({status:"error",message: "Some error occurred while creating the user."});
        } else {
            res.status(200).send({status:"success",message: "Registration cmpleted successfully",data:data});
        }
    });
};

exports.findAll = function(req, res) {
    // Retrieve and return all user from the database.
    User.find(function(err, user){
        if(err) {
            console.log(err);
            res.status(500).send({status:"error",message: "Some error occurred while retrieving notes."});
        } else {
            res.status(200).send({status:"success",data:user});
        }
    });

};

exports.findOne = function(req, res) {
    // Find a single user with a user
    User.findById(req.params.userId, function(err, user) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({status:"error",message: "user not found with id " + req.params.userId});                
            }
            return res.status(500).send({status:"error",message: "Error retrieving user with id " + req.params.userId});
        } 

        if(!user) {
            return res.status(204).send({status:"error", message: "user not found with id " + req.params.userId});            
        }

        res.status(200).send({status:"success",data:user});
    });

};

exports.update = function(req, res) {
    // Update a note identified by the user in the request
    User.findById(req.params.userId, function(err, user) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({status:"error",message: "user not found with id " + req.params.userId});                
            }
            return res.status(500).send({status:"error",message: "Error finding user with id " + req.params.userId});
        }

        if(!user) {
            return res.status(404).send({status:"error",message: "user not found with id " + req.params.userId});            
        }

        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email  =   req.body.email;
        user.dob = req.body.dob;

        user.save(function(err, data){
            if(err) {
                res.status(500).send({status:"error",message: "Could not update user with id " + req.params.userId});
            } else {
                res.status(200).send({status:"success",message: "detail updated successfully",data:data});
            }
        });
    });

};

exports.delete = function(req, res) {
    // Delete a note with the specified user in the request

};
