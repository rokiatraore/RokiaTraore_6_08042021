const express  = require('express');
const router = express.Router();

//Importer la fonction du controllers
const saucesControllers = require('../controllers/sauces');
const auth = require('../middleware/auth'); 
const multer = require('../middleware/multer-config')

router.post('/', auth, multer, saucesControllers.createSauce);   
router.post('/:id/like', auth, saucesControllers.likeSauce);
router.get('/', auth, saucesControllers.getAllSauce);
router.get('/:id', auth, saucesControllers.getOneSauce);
router.put('/:id', auth, multer, saucesControllers.modifySauce);
router.delete('/:id', auth,saucesControllers.deleteSauce);

module.exports = router;