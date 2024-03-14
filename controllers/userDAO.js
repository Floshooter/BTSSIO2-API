const connexion = require('../db/connexionDB');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.inscription = async (req, res) => {
    try{
        const { firstname, lastname, username, email, password, country} = req.body;
        conn = await connexion.pool.getConnection();
        const result = await conn.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email]);
        conn.release();
        if (result.length > 0) {
            return res.status(400).json({error: 'Cet utilisateur existe déjà.'})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const insertUserQuery = `INSERT INTO users(firstname, lastname, username, email, pwd, country, perm_level) VALUES (?, ?, ?, ?, ?, ?, ?)`
        const insertUserValues = [firstname, lastname, username, email, hashedPassword, country, 0];
        await conn.query(insertUserQuery, insertUserValues);

        const token = jwt.sign({email}, process.env.API_KEY, {expiresIn: '1h'});
        res.json({token})
    }
    catch(error){
        console.error(error)
        res.status(500).json({error: 'Erreur lors de l\'inscription.'})
    } 
}
exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;
        conn = await connexion.pool.getConnection()
        const result = await conn.query(`SELECT * FROM users WHERE email = ?`, [email]);
        conn.release()
        if (result.length === 0) {
            return res.status(401).json({error: 'Cet utilisateur n\'existe pas.'})
        }
        const user = result[0];
        const passwordMatch = await bcrypt.compare(password, user.pwd);
        if (!passwordMatch) {
            return res.status(401).json({error: 'Mot de passe incorrect.'})
        }
        const playload = {
            userId: user.id,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            permLevel: user.perm_level,
            isConnected: true,
            password: user.pwd
        }
        console.log(playload)
        const token = jwt.sign(playload, process.env.API_KEY, {expiresIn: '1h'});
        res.json({token, user: playload})
    } catch(error){
        console.error(error)
        res.status(500).json({error: 'Erreur lors de la connexion.'})
    } 
}
exports.getAllUsers = async (req, res) => {
    try{
        conn = await connexion.pool.getConnection();
        const account = await conn.query('SELECT * FROM users');
        console.log("Tous les comptes utilisateur:");
        console.log(account)
        res.status(200).json(account)
    }
    catch(err){
        console.log(err);
        res.status(500).send("Erreur lors de la récupération des utilisateurs.");
    } 
}
exports.getUserById = async (req, res) => {
    const id = req.params.id
    try{
        conn = await connexion.pool.getConnection();
        const account = await conn.query('SELECT * FROM users WHERE id = ?', [id]);
        if (account.length > 0) {
            console.log("Utilisateur trouvé :", account[0]);
            return res.status(200).json(account[0])
        } else {
            console.log('Aucun utilisateur trouvé pour l\'ID:', id);
            res.status(404).json({error: 'Cet utilisateur n\'existe pas.'})
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Erreur lors de la récupération de l'utilisateur.");
    } 
}
exports.getUserByEmail = async (req, res) => {
    const email = req.params.email
    try{
        conn = await connexion.pool.getConnection();
        console.log(email);
        const account = await conn.query('SELECT * FROM users WHERE email = ?', [email]);
        conn.release()
        if (account.length > 0) {
            console.log("Utilisateur trouvé :", account[0]);
            return res.status(200).json(account[0])
        } else {
            console.log('Aucun utilisateur trouvé pour l\'email:', email);
            res.status(404).json({error: 'Cet utilisateur n\'existe pas.'})
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Erreur lors de la sélection de l'utilisateur.");
    }
}
exports.addEmployee = async (req, res) => {
    try{
        const { firstname, lastname, username, email, password} = req.body;
        conn = await connexion.pool.getConnection();
        const result = await conn.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email]);
        conn.release();
        if (result.length > 0) {
            return res.status(400).json({error: 'Cet utilisateur existe déjà.'})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const insertUserQuery = `INSERT INTO users(firstname, lastname, username, email, pwd, country, perm_level) VALUES (?, ?, ?, ?, ?, ?, ?)`
        const insertUserValues = [firstname, lastname, username, email, hashedPassword, 'FR', 1];
        await conn.query(insertUserQuery, insertUserValues);

        const token = jwt.sign({email}, process.env.API_KEY, {expiresIn: '1h'});
        res.json({token})
    }
    catch(error){
        console.error(error)
        res.status(500).json({error: 'Erreur lors de l\'inscription.'})
    } 
}
exports.updateUser = async (req, res) => {
    const id = req.params.id;
    const { field, value } = req.body;
    try {
      conn = await connexion.pool.getConnection();
      const updateUserQuery = `UPDATE users SET ${field} = ? WHERE id = ?`;
      const updateUserValues = [value, id];
      await conn.query(updateUserQuery, updateUserValues);
      conn.release();
      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error updating user' });
    }
};
// exports.deleteUser = async (req, res) => {
//     const id = req.params.id;
//     try {
//       conn = await connexion.pool.getConnection();
//       const deleteUserQuery = `DELETE FROM users WHERE id = ?`;
//       await conn.query(deleteUserQuery, [id]);
//       conn.release();
//       res.status(200).json({ message: 'User deleted successfully' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Error deleting user' });
//     }
// }