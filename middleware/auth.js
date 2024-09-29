const jwt = require('jsonwebtoken');

// Middleware pour vérifier le token JWT
const authMiddleware = (req, res, next) => {
    
    // Lire le token à partir des cookies
    const token = req.cookies.token; // 'token' est le nom du cookie défini

    if (!token) {
        return res.redirect('/login');
    }

    try {
        // Vérifier et décoder le token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.redirect('/login');
    } 
};

module.exports = authMiddleware;