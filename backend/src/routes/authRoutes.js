const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Define que quando bater um POST em /register, chama a função registrar
router.post('/register', authController.registrar);

// Define que quando bater um POST em /login, chama a função login
router.post('/login', authController.login);

module.exports = router;