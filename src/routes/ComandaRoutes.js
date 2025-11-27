const router = require('express').Router();
const ComandaController = require('../controllers/ComandaController')

router.get('/', ComandaController.listarComandas)
router.get('/:comandaId/itens', ComandaController.listarItens)
router.post('/', ComandaController.abrirComanda);
router.post('/:comandaId/itens', ComandaController.adicionarItem)
router.post('/:id/entregar', ComandaController.entregarItem)
router.put('/:comandaId/fechar', ComandaController.fecharComanda)
router.delete('/:comandaId/deletar', ComandaController.deletarItem)


module.exports = router