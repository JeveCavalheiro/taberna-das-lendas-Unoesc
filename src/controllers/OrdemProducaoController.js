const db = require('../models');
const OrdemProducao = db.OrdemProducao;

const OrdemProducaoController = {

    async findAllCozinha(req, res) {
        try {
            const ordens = await OrdemProducao.findAll({
                where: { setorId: 1 }
            });

            return res.status(200).json(ordens);

        } catch (error) {
            console.error('Erro ao buscar OrdemProducao:', error);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    },

    async findAllCopa(req, res) {
        try {
            const ordens = await OrdemProducao.findAll({
                where: { setorId: 2 }
            });

            return res.status(200).json(ordens);

        } catch (error) {
            console.error('Erro ao buscar OrdemProducao:', error);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    },

    async atualizarItem(req, res) {
        try {
            const ordemId = req.params.id;

            const ordemProducao = await OrdemProducao.findByPk(ordemId);

            if (!ordemProducao) {
                return res.status(404).json({ error: 'Ordem de Produção não encontrada.' });
            }

            await ordemProducao.update({ status: 'pronto' });

            return res.status(200).json(ordemProducao);

        } catch (error) {
            console.error('Erro ao atualizar pedido:', error);
            return res.status(500).json({ error: 'Erro interno.' });
        }
    }
}

module.exports = OrdemProducaoController;
