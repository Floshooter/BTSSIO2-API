const express = require('express');
const path = require('path');
const multer = require('multer');
const router = express.Router();
const itemDAO = require('../controllers/itemDAO');
const middlewareAuth = require('../middleware/authorization')
const middlewareAdmin = require('../middleware/isAdmin');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload');
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, 'img-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.use(express.json());

router.get('/', itemDAO.getAllItems);
router.get('/id/:id',itemDAO.getItemById);
router.post('/additem', middlewareAuth.authenticator, middlewareAdmin.isAdmin, upload.single('thumbnail'), itemDAO.addItem);
router.get('/category', middlewareAuth.authenticator, itemDAO.getCategory);
router.put('/updatestocks/:id', middlewareAuth.authenticator, middlewareAdmin.isAdmin, itemDAO.updateStocks);
router.get('/s', middlewareAuth.authenticator,itemDAO.getItemByName);
router.delete('/deleteitem/:id', middlewareAuth.authenticator, middlewareAdmin.isAdmin, itemDAO.deleteItem);
router.put('/updateitem/:id', middlewareAuth.authenticator, middlewareAdmin.isAdmin, itemDAO.updateItem);

module.exports = router;
