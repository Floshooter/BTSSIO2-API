const express = require('express');
const path = require('path');
const multer = require('multer');
const router = express.Router();
const itemDAO = require('../controllers/itemDAO');
const middlewareAuth = require('../middleware/authorization')
const middlewareAdmin = require('../middleware/isAdmin');

router.use(express.json());

router.get('/', itemDAO.getAllItems);
router.get('/id/:id',itemDAO.getItemById);
router.post('/additem', upload.single('thumbnail'), itemDAO.addItem);
router.get('/category', itemDAO.getCategory);
router.put('/updatestocks/:id', itemDAO.updateStocks);
router.get('/s', itemDAO.getItemByName);
router.delete('/deleteitem/:id', itemDAO.deleteItem);
router.put('/updateitem/:id', itemDAO.updateItem);

module.exports = router;
