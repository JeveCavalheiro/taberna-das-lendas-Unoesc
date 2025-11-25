const db = require('../models');
const Usuario = db.Usuario;
const bcrypt = require('bcrypt');

const UsuarioController = {

    // PESQUISAR Usuário (GET /api/usuarios/)
    async findAll(req, res) {
        try {
            
            const usuarios = await Usuario.findAll({
                attributes: { exclude: ['senha'] }
            });
            return res.status(200).json(usuarios);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    },

    // PESQUISAR Usuário (GET /api/usuarios/:cpf)
    async findByPk(req, res) {
        try {
            const { cpf } = req.params;
            
            const usuario = await Usuario.findByPk(cpf, {
                attributes: { exclude: ['senha'] }
            });

            if (!usuario) {
                return res.status(404).json({ error: 'Usuário não encontrado.' });
            }

            return res.status(200).json(usuario);
        } catch (error) {
            console.error('Erro ao buscar usuário por CPF:', error);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    },

    // CRIAR Usuário (POST /api/usuarios/)
    async create(req, res) {
        try {
            const { cpf, nome, email, telefone, senha } = req.body;
            
            const existingUser = await Usuario.findByPk(cpf);
            if (existingUser) {
                return res.status(409).json({ error: 'CPF já cadastrado.' });
            }
            
            const novoUsuario = await Usuario.create({
                cpf,
                nome,
                email,
                telefone,
                senha
            });
            const { senha: _, ...usuarioSemSenha } = novoUsuario.toJSON();
            return res.status(201).json(usuarioSemSenha);

        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ error: 'O email fornecido já está em uso.' });
            }
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    },

    // ATUALIZAR Usuário (PUT /api/usuarios/:cpf)
    async update(req, res) {
        try {
            const { cpf } = req.params;
            const newData = req.body; 

            if (newData.senha) {
                const salt = await bcrypt.genSalt(10);
                newData.senha = await bcrypt.hash(newData.senha, salt);
            }

            const [affectedRows] = await Usuario.update(newData, {
                where: { cpf: cpf }
            });

            if (affectedRows === 0) {
                return res.status(404).json({ error: 'Usuário não encontrado ou nenhum dado para atualizar.' });
            }

            const usuarioAtualizado = await Usuario.findByPk(cpf, {
                attributes: { exclude: ['senha'] }
            });
            
            return res.status(200).json(usuarioAtualizado);

        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    },

    // DELETAR Usuário (DELETE /api/usuarios/:cpf)
    async delete(req, res) {
        try {
            const { cpf } = req.params;

            const deletedRows = await Usuario.destroy({
                where: { cpf: cpf }
            });

            if (deletedRows === 0) {
                return res.status(404).json({ error: 'Usuário não encontrado.' });
            }

            // Retorna status 204 (No Content) para indicar sucesso na exclusão
            return res.status(204).send();

        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    },
}

module.exports = UsuarioController;