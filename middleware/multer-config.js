const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

//Objet de configuration pour multer
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        //Rajouter des underscores à la place des espace dans le nom des fichiers
        const name = file.originalname.split(' ').join('_');
        //Générer l'extension du fichier
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension)

    }
});

module.exports = multer ({ storage }).single('image');