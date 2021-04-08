const express  = require('express');
//Créer un routeur
const router = express.Router();

//Importer la fonction du controllers
const usersControllers = require('../controllers/users');

router.post('/signup', usersControllers.signup);
router.post('/login', usersControllers.login);

module.exports = router;