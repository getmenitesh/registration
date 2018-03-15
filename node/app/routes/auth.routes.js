module.exports = function(app) {  
    var auth = require('../controllers/auth.controller.js'); 
    // login route
 	app.post('/auth', auth.create);
}