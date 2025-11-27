const { where } = require('sequelize');
const db = require('../models');
const { Comanda, ItemComanda, Cardapio, OrdemProducao } = db;

const ComandaController = {

    // LISTAR Comanda (GET /api/comandas/)
    async listarComandas(req, res) {
        try {
            const comandas = await Comanda.findAll({});
            return res.status(200).json(comandas);
        } catch (error) {
            console.error('Erro ao buscar comandas:', error);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    },

    // CRIAR Comanda (POST /api/comandas/)
    async abrirComanda(req, res) {
         try {
            const {mesa, usuarioCpf} = req.body;

            const comandaAberta = await Comanda.findOne({ where: { mesa, aberta: true } });
            if (comandaAberta) {
                return res.status(409).json({ error: 'Já existe uma comanda aberta para esta mesa.' });
            }
            
            const comandaCpf = await Comanda.findOne({ where: { usuarioCpf, aberta: true } })
            if (comandaCpf) {
                return res.status(409).json({ error: 'Já existe uma comanda aberta para este CPF.' });
            }
            const criarComanda = await Comanda.create({
                mesa,
                usuarioCpf,
                aberta: true,
                total: 0 
            });

            return res.status(201).json(criarComanda)
        } catch (error) {
            console.error('Erro ao abrir a comanda', error);
            return res.status(500).json({ error: 'Erro interno.' });
        }
    },

    // ADICIONA ITEM Comanda (POST /api/comandas/:comandaId/itens)
    async adicionarItem(req, res) {
        try {
            const comandaId = req.params.comandaId;
            const {itemCardapioId, quantidade} = req.body;

            const comanda = await Comanda.findByPk(comandaId);
            if (!comanda || !comanda.aberta) {
                return res.status(404).json({ error: 'Comanda não encontrada ou fechada.' });
            } 

            const novoItem = await ItemComanda.create({
                comandaId,
                itemCardapioId,
                quantidade,
                entregue: false
            })

            const ordemCriada = await db.OrdemProducao.findOne({
                where: { itemComandaId: novoItem.id }
            });
            
            const itemCardapio = await Cardapio.findByPk(itemCardapioId, {
                attributes: ['preco']
            });

            if (itemCardapio && itemCardapio.preco) {
                const precoItem = parseFloat(itemCardapio.preco);
                const subtotal = precoItem * quantidade;

                const novoTotal = comanda.total + subtotal; 
                
                await Comanda.update(
                    { total: novoTotal },
                    { where: { id: comandaId } }
                );

                return res.status(201).json({ 
                    item: novoItem,
                    ordem: ordemCriada,
                    novoTotalComanda: novoTotal 
                });

            }
        } catch (error) {
            console.error('Erro ao adicionar item:', error);
            return res.status(500).json({ error: 'Falha ao processar o pedido.' });
        }
    },

    // FECHAR Comanda (PUT /api/comandas/:comandaId/fechar)
    async fecharComanda(req, res) {
        try {
            const comandaId = req.params.comandaId;
            const comanda = await Comanda.findByPk(comandaId, {
                include: [db.ItemComanda]
            });

            if (!comanda || !comanda.aberta) {
                return res.status(404).json({ error: 'Comanda não encontrada ou já está fechada.' });
            }

            const itensNaoEntregues = comanda.ItemComandas.filter(item => item.entregue === false);
        
            if (itensNaoEntregues.length > 0) {
                return res.status(400).json({ 
                    error: 'Não é possível fechar a comanda. Existem itens pendentes de entrega.',
                    pendentes: itensNaoEntregues.length
                });
            }

            await comanda.update({
                aberta: false,
            });

            return res.status(200).json({ message: 'Comanda fechada com sucesso.', total: comanda.total });
        } catch (error) {
            console.error('Erro ao fechar comanda:', error);
            return res.status(500).json({ error: 'Erro interno.' });
        }
    },

    // ENTREGAR Item (POST /api/comandas/:id/entregar)
    async entregarItem(req, res) {
        try {
        const itemComandaId = req.params.id
        const ordemProducao = await OrdemProducao.findOne({ 
            where: { 
                id: itemComandaId, 
                status: 'pronto' 
            } 
        });

        if (!ordemProducao) {
            return res.status(400).json({ error: 'Pedido não encontrado ou ainda não está pronto.' });
        }
        
        await ordemProducao.update({ status: 'entregue' });
        await ItemComanda.update(
            { entregue: true },
            { 
                where: { 
                    id: itemComandaId 
                } 
            }
        );

        return res.status(200).json({ message: 'Item entregue e status atualizado com sucesso.' });
        } catch (error) {
            console.error('Erro ao entregar pedido:', error);
            return res.status(500).json({ error: 'Erro interno.' });
        }
    },

    // DELETAR Item (DELETE /api/comandas/:comandaId)
    async deletarItem(req, res) {
        try {
            const { comandaId } = req.params;
            const { itemCardapioId } = req.body;

            const comanda = await Comanda.findByPk(comandaId);
            if (!comanda || !comanda.aberta) {
                return res.status(404).json({ error: 'Comanda não encontrada ou fechada.' });
            }

            const item = await ItemComanda.findOne({
                where: {
                    comandaId,
                    itemCardapioId
                }
            });

            if (!item) {
                return res.status(404).json({ error: 'Item não encontrado nessa comanda.' });
            }

            await ItemComanda.destroy({
                where: {
                    comandaId,
                    itemCardapioId
                }
            });

            return res.status(200).json({ message: 'Item deletado com sucesso.' });
            
        } catch (error) {
            console.error('Erro ao deletar item:', error);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    },

    async listarItens(req, res) {
    try {
        const comandaId = req.params.comandaId;

        const itens = await db.ItemComanda.findAll({
            where: { comandaId },
            include: [
                {
                    model: db.Cardapio,
                    attributes: ["nome", "preco", "tipo"]
                }
            ]
        });

        return res.status(200).json(itens);

    } catch (error) {
        console.error("Erro ao listar itens:", error);
        return res.status(500).json({ error: "Erro ao buscar itens." });
    }
}

};

module.exports = ComandaController;

    

   