const router = require('express').Router();
const CardapioController = require('../controllers/CardapioController')

router.get("/", CardapioController.findAll)
router.delete("/:id", CardapioController.delete)
router.get('/:id', CardapioController.findByPk)
router.put('/:id', CardapioController.update)
router.post("/", CardapioController.create)

module.exports = router