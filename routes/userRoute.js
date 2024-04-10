const express = require('express');
const router = express.Router();
const userDAO = require('../controllers/userDAO')
const middlewareAuth = require('../middleware/authorization')
const middlewareAdmin = require('../middleware/isAdmin');

router.use(express.json());

router.get('/',userDAO.getAllUsers);
router.get('/id/:id',userDAO.getUserById);
router.get('/email/:email', userDAO.getUserByEmail);
router.post('/inscription', userDAO.inscription);
router.post('/login', userDAO.login);
router.post('/addemployee', userDAO.addEmployee);
router.put('/updateUser/:id', userDAO.updateUser);
router.delete('/deleteUser/:id', userDAO.deleteUser);

module.exports = router;