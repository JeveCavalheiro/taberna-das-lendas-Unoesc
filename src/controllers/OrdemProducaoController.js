const db = require('../models');
const { OrdemProducao } = db;

const OrdemProducaoController = {

    // ATUALIZAR Item (POST /api/ordem/:id/entregar)
    async atualizarItemCozinha(req, res) {
        try {
            const ordemId = req.params.id;
            const { novoStatus } = req.body; 
            const statusValidos = ['preparando', 'pronto'];
            if (!statusValidos.includes(novoStatus)) {
                return res.status(400).json({ error: 'Status inválido. Use "preparando" ou "pronto".' });
            }

            const ordemProducao = await OrdemProducao.findByPk(ordemId);

            if (!ordemProducao) {
                return res.status(404).json({ error: 'Ordem de Produção não encontrada.' });
            }

            await ordemProducao.update({ status: novoStatus });

            if (novoStatus === 'pronto') {
                
            }
            return res.status(200).json(ordemProducao);

        } catch (error) {
            console.error('Erro ao atualizar pedido:', error);
            return res.status(500).json({ error: 'Erro interno.' });
        }
    }
}

module.exports = OrdemProducaoController