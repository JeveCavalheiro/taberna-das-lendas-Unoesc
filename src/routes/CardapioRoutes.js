const router = require('express').Router();
const CardapioController = require('../controllers/CardapioController')

router.get("/", CardapioController.findAll)

module.exports = router