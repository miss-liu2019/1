var express = require('express');
var usersController = require('../controllers/users.js');
var router = express.Router();

var multer  = require('multer');
var upload = multer({ dest: 'public/uploads/' });


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login' , usersController.login );
router.post('/register' , usersController.register );
router.get('/logout' , usersController.logout );
router.get('/getUser' , usersController.getUser );
router.post('/getUserMsg' , usersController.getUserMsg);
router.post('/updateUserInfo' , usersController.updateUserInfo);

module.exports = router;
