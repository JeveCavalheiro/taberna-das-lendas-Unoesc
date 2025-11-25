const db = require('../models');
const Cardapio = db.Cardapio;

const CardapioController =  {

    // PESQUISAR Cardapio (GET /api/cardapios/)
    async findAll(req, res) {
        try {
            
            const cardapio = await Cardapio.findAll();
            return res.status(200).json(cardapio);
        } catch (error) {
            console.error('Erro ao buscar cardapio:', error);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    },
    
    async create(req, res) {
        try {
            const { nome, descricao, preco, tipo, imagem } = req.body;

            const novoItem = await Cardapio.create({
                nome,
                descricao,
                preco,
                tipo,
                imagem 
            });

            return res.status(201).json(novoItem);
        } catch (error) {
            console.error('Erro ao criar item do cardápio:', error);
            if (error.name === 'SequelizeValidationError') {
                 return res.status(400).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Erro interno ao criar item.' });
        }
    },

    // 2. ATUALIZAR (Update) - PUT /api/cardapio/:id
    async update(req, res) {
        try {
            const itemId = req.params.id;
            const newData = req.body; 

            const [affectedRows] = await Cardapio.update(newData, {
                where: { id: itemId }
            });

            if (affectedRows === 0) {
                return res.status(404).json({ error: 'Item do cardápio não encontrado.' });
            }
            
            const itemAtualizado = await Cardapio.findByPk(itemId);

            return res.status(200).json(itemAtualizado);
        } catch (error) {
            console.error('Erro ao atualizar item do cardápio:', error);
            return res.status(500).json({ error: 'Erro interno ao atualizar item.' });
        }
    },

    // 3. DELETAR (Delete) - DELETE /api/cardapio/:id
    async delete(req, res) {
        try {
            const itemId = req.params.id;

            const deletedRows = await Cardapio.destroy({
                where: { id: itemId }
            });

            if (deletedRows === 0) {
                return res.status(404).json({ error: 'Item do cardápio não encontrado.' });
            }
            return res.status(204).send();
        } catch (error) {
            console.error('Erro ao deletar item do cardápio:', error);
            
            if (error.name === 'SequelizeForeignKeyConstraintError') {
                 return res.status(400).json({ 
                    error: 'Não é possível deletar este item. Ele está sendo usado em Comandas ativas.' 
                });
            }
            
            return res.status(500).json({ error: 'Erro interno ao deletar item.' });
        }
    }
}

module.exports = CardapioController