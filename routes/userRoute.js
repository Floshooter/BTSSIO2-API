const express = require('express');
const router = express.Router();
const userDAO = require('../controllers/userDAO')
const middlewareAuth = require('../middleware/authorization')
const middlewareAdmin = require('../middleware/isAdmin');

router.use(express.json());

router.get('/', middlewareAuth.authenticator, middlewareAdmin.isAdmin, userDAO.getAllUsers);
router.get('/id/:id', middlewareAuth.authenticator, middlewareAdmin.isAdmin, userDAO.getUserById);
router.get('/email/:email', middlewareAuth.authenticator, middlewareAdmin.isAdmin, userDAO.getUserByEmail);
router.post('/inscription', userDAO.inscription);
router.post('/login', userDAO.login);
router.post('/addemployee', middlewareAuth.authenticator, middlewareAdmin.isAdmin, userDAO.addEmployee);
router.put('/updateUser/:id', middlewareAuth.authenticator, userDAO.updateUser);
router.delete('/deleteUser/:id', middlewareAuth.authenticator, middlewareAdmin.isAdmin, userDAO.deleteUser);

module.exports = router;