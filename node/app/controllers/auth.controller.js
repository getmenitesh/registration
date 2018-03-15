var User = require('../models/user.model.js');
exports.create = function(req, res) {
    
    User.find({  
        'email': req.body.email,
        'password':req.body.password

      }, function(err, user) {
        if (err) {
            return res.status(404).send({status:"error",message: "user not found with email " + req.body.email}); 
        } else {
            res.status(200).send({status:"success",data:user});
        }
      });
};