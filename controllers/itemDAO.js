const connexion = require('../db/connexionDB');

exports.getAllItems = async (req, res) => {
    try {
        conn = await connexion.pool.getConnection();
        const items = await conn.query('SELECT * FROM items INNER JOIN category_item ON items.id_category = category_item.id');
        res.status(200).json(items)
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Erreur lors de l'affichage des items.");
    }
}
exports.getItemById = async (req, res) => {
    try {
        const id = req.params.id
        conn = await connexion.pool.getConnection();
        const item = await conn.query('SELECT * FROM items INNER JOIN category_item ON items.id_category = category_item.id WHERE items.id_items = ?', [id]);
        res.status(200).json(item)
    } catch (err) {
        console.log(err);
        res.status(500).send("Erreur lors de l'affichage de l'item.");
    }
}
exports.addItem = async (req, res) => {
    try {
        const { item_name, description, stocks, price, id_category} = req.body;
        const thumbnail = req.file.filename;
        conn = await connexion.pool.getConnection();
        const addItem = await conn.query(`INSERT INTO items(item_name, description, stocks, thumbnail, price, id_category) VALUES (?, ?, ?, ?, ?, ?)`, [item_name, description, stocks, thumbnail, price, id_category])
        const addItemWithStrings = {
            ...addItem,
            insertId: addItem.insertId.toString(),
        }
        console.log('Item ajouté : ', addItemWithStrings)
        res.status(200).json(addItemWithStrings)
    }
    catch (error) {
        console.log('Erreur lors de l\'ajout: ', error)
        res.status(500).send('Erreur lors de l\'ajout d\'un item.')
    }
}
exports.getCategory = async (req, res) => {
    try {
        conn = await connexion.pool.getConnection();
        const category = await conn.query('SELECT * FROM category_item');
        console.log(category)
        res.status(200).json(category)
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Erreur lors de l'affichage des categories.");
    }
}
exports.updateStocks = async (req, res) => {
    const id_item = req.params.id;
    const updatedStock = req.body.stocks;
    try {
        conn = await connexion.pool.getConnection();
        const query = await conn.query(`UPDATE items SET stocks = ? WHERE id_items = ?`, [updatedStock, id_item]);
        conn.release();
        res.status(200).json({ message: 'Stock mis à jour avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du stock : ', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour du stock.' });
    }
};
exports.getItemByName = async (req, res) => {
        try {
            conn = await connexion.pool.getConnection();
            const item = await conn.query('SELECT * FROM items INNER JOIN category_item ON items.id_category = category_item.id WHERE item_name LIKE ?', [`%${req.query.name}%`]);
            res.status(200).json(item)
        }
        catch (err) {
            console.log(err);
            res.status(500).send("Erreur lors de l'affichage de l'item.");
        }
}
exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    try {
        conn = await connexion.pool.getConnection();
        const item = await conn.query('DELETE FROM items WHERE id_items = ?', [id]);
        conn.release();
        if (item.affectedRows === 0) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la suppression de l'item.");
    }
}
exports.updateItem = async (req, res) => {
    const id = req.params.id;
    const { field, value } = req.body;
    try {
        conn = await connexion.pool.getConnection();
        const item = await conn.query(`UPDATE items SET ${field} = ? WHERE id_items = ?`, [value, id]);
        conn.release();
        res.status(200).json({ message: 'Item updated successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la mise à jour de l'item.");
    }
}