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
        const { item_name, description, stocks, price, id_category, thumbnail } = req.body;
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
    try {
        const { id_item } = req.params;
        const { updatedStock } = req.body;
        const query = `
            UPDATE items
            SET stocks = ?
            WHERE id_item = ?
        `;
        await conn.query(query, [updatedStock, id_item]);

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
        res.status(200).json(item, { message: 'Item deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la suppression de l'item.");
    }
}
// exports.updateItem = async (req, res) => {
//     const id = req.params.id;
//     const { item_name, description, stocks, price, id_category } = req.body;
//     try {
//         conn = await connexion.pool.getConnection();
//         const item = await conn.query('UPDATE items SET item_name = ?, description = ?, stocks = ?, price = ?, id_category = ? WHERE id_items = ?', [item_name, description, stocks, price, id_category, id]);
//         conn.release();
//         res.status(200).json(item, { message: 'Item updated successfully' });
//     } catch (err) {
//         console.log(err);
//         res.status(500).send("Erreur lors de la mise à jour de l'item.");
//     }
// }





// const MIME_TYPES = {
//     'image/jpg': 'jpg',
//     'image/jpeg': 'jpg',
//     'image/png': 'png'
// };

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './images/items/');
//     },
//     filename: (req, file, cb) => {
//         const name = file.originalname.split(' ').join('_');
//         const extension = MIME_TYPES[file.mimetype];
//         cb(null, name + Date.now() + '.' + extension);
//     }
// });

// const upload = multer({ storage: storage });

//upload.single('thumbnail') 
