const jsonwebtoken = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        //Récupérer le token de l'autorisation
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jsonwebtoken.verify(token, 'RANDOM_SECRET_KEY');
        //Récupérer le userId du token
        const userId = decodedToken.userId;
        //Vérifier que l'userId du token correspond à celui de la requête
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable';
        } else {
            //Dans le cas où l'utilisateur est authentifié, passer l'éxécution
            next();
        }
    } catch (error){
        res.status(401).json({ error: error | 'Requête non authentifiée'})
    }

};