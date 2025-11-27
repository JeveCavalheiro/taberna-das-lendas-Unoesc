const db = require('../models');
const Usuario = db.Usuario;

const LoginController = {
    async Login(req, res) {
        try {
            const { cpf, senha } = req.body;

            const user = await Usuario.findOne({
                where: { cpf, senha } 
            });

            if (!user) {
                return res.status(401).json({ message: "Credenciais inválidas" });
            }

            return res.json({ message: "Login OK", user });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro interno no servidor" });
        }
    }
}

module.exports = LoginController