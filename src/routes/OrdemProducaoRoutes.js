const router = require('express').Router();
const OrdemProducaoController = require("../controllers/OrdemProducaoController")


router.get("/cozinha", OrdemProducaoController.findAllCozinha)
router.get("/copa", OrdemProducaoController.findAllCopa)
router.put('/:id', OrdemProducaoController.atualizarItem)

module.exports = router