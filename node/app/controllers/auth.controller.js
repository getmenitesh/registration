var User = require('../models/user.model.js');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../config/config');
exports.create = function(req, res) {
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        var token = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ status : "success",auth: true,data:user, token: token });
      });
    
    
    
    
    
    /*var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    User.find({  
        'email': req.body.email,
        'password':hashedPassword

      }, function(err, user) {
        if (err) {
            return res.status(404).send({status:"error",message: "user not found with email " + req.body.email}); 
        } else {
            var token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({status:"success",data:user,token:token});
        }
      });*/
};