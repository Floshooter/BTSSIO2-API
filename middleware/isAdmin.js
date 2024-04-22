const connexion = require('../db/connexionDB');
const jwt = require('jsonwebtoken');

exports.isAdmin = async (req, res, next) => {
    const token = req.query.token || req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized. Token not provided'});
    }
    try {
        const tokenValue = token.replace('Bearer ', '');
        
        const decodedToken = jwt.verify(tokenValue, process.env.API_KEY);
        
        const email = decodedToken.email;

        conn = await connexion.pool.getConnection();
        const result = await conn.query('SELECT perm_level FROM users WHERE email = ?', [email]);
        conn.release();
        console.log(result[0].perm_level)
        if (result.length === 1 && (result[0].perm_level === 1 || result[0].perm_level === 2)) {
            next();
        } else {
            return res.status(403).json({ error: 'Unauthorized. You are not an admin'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal server error.'})
    }
};
