const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');
        
router.get('/', UsuarioController.findAll);             
router.get('/:cpf', UsuarioController.findByPk);   
router.post('/', UsuarioController.create)

module.exports = router;