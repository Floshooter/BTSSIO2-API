const express = require('express');
const router = express.Router();
const articleDAO = require('../controllers/articleDAO');
const middlewareAuth = require('../middleware/authorization')
const middlewareAdmin = require('../middleware/isAdmin');

router.use(express.json());

router.post('/add', middlewareAuth.authenticator, articleDAO.addCart);
router.get('/getCart/:id', articleDAO.getCartById);
router.delete('/deleteUserCart/:id', middlewareAuth.authenticator, articleDAO.removeUserCart);
router.delete('/deleteUserItem/:id', middlewareAuth.authenticator, articleDAO.removeUserItem);

module.exports = router;
