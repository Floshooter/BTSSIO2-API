const connexion = require('../db/connexionDB');

exports.getCartById = async (req, res) => {
    try {
        const userId = req.params.id;
        conn = await connexion.pool.getConnection();
        const query = `
            SELECT id_item, item_name, SUM(quantity) as total_quantity, ROUND(SUM(item_price), 2) AS price, id_user
            FROM cart 
            WHERE id_user = ?
            GROUP BY id_item, item_name
        `;
        const rows = await conn.query(query, [userId]); 
        
        res.status(200).json({ cart: rows }); 
    } catch (error) {
        console.error('Erreur lors de la récupération du panier : ', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération du panier.' });
    }
}
exports.addCart = async (req, res) => {
    try {
        const { itemId, item_name, quantity, basePrice, userId } = req.body;
        conn = await connexion.pool.getConnection();
        const query = `
            INSERT INTO cart(item_name, quantity, item_price, id_item, id_user)
            VALUES (?, ?, ?, ?, ?)
        `;
        await conn.query(query, [item_name, quantity, basePrice, itemId, userId]);
        
        res.status(200).json({ message: 'L\'article a été ajouté au panier avec succès.' });
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'article au panier : ', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de l\'ajout de l\'article au panier.' });
    }
};
exports.removeUserCart = async (req, res) => {
    try {
        const userId = req.params.id;
        conn = await connexion.pool.getConnection();
        const query = `
            DELETE FROM cart WHERE id_user = ?
        `;
        await conn.query(query, [userId]);
        
        res.status(200).json({ message: 'Le panier de l\'utilisateur a été supprimé avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la suppression du panier de l\'utilisateur : ', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la suppression du panier de l\'utilisateur.' });
    }
}
exports.removeUserItem = async (req, res) => {
    try {
        const itemId = req.params.id;
        const userId = req.body.userId;
        if (!userId) {
            return res.status(400).json({ error: 'L\'userId n\'est pas fourni dans la requête.' });
        }
        conn = await connexion.pool.getConnection();
        const query = `
            DELETE FROM cart WHERE id_item = ? AND id_user = ?
        `;
        await conn.query(query, [itemId, userId]);
        
        res.status(200).json({ message: 'L\'article a été supprimé avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'article : ', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la suppression de l\'article.' });
    }
}



// cat_name: "tennis"
// description: "Pack de 50 balles utilisées pour faire du tennis"
// id: 3
// id_category: 3
// id_items: 5
// item_name: "Balle de tennis"
// price: 25
// stocks: 50
// thumbnail: "C:\\fakepath\\balle_tennis.jpg"

// quantity: 1, 
// basePrice: item.price,
// userId: userData.userId,
// itemId: item.id,