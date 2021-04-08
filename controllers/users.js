const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const modelUser = require('../models/users');

exports.signup = (req, res, next) => {
    //Crypter le mot de passe
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new modelUser ({
                email: req.body.email,
                password: hash
            });
            //Enregistrer dans la base de données
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
                .catch(error => res.status(400).json({ error }))

        })
        .catch(error => res.status(500).json({ error }));

};

exports.login = (req, res, next) => {
    //Trouver l'utilisateur ayant le même email dans la bdd
    modelUser.findOne({ email: req.body.email})
        .then(user => {
            //Si on n'a pas trouvé d'utilisateur
            if (!user){
                return res.status(401).json({ error: 'Utilisateur non trouvé !'});
            }
            //Comparer le mdp de l'utilisateur avec la hash
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    //Si la comparaison est false
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrecte !'});
                    }
                    res.status(200).json({
                        userId: user._id,
                        //Authentification : encoder un nouveau token
                        token: jsonwebtoken.sign(
                            { userId: user._id},
                            //Clé secrète
                            'RANDOM_SECRET_KEY',
                            //Expiration de la clé secrète
                            { expiresIn: '24h'}
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }));
};