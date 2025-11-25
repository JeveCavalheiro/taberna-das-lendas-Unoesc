const express = require('express');
const usuarioRoutes = require('./src/routes/UsuarioRoutes'); 
const comandaRoutes = require('./src/routes/ComandaRoutes')
const cardapioRoutes = require('./src/routes/CardapioRoutes')

const db = require('./src/models');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/api', (req, res) => {
    res.send('API Node.js rodando!');
});

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/comandas', comandaRoutes);
app.use('/api/cardapios', cardapioRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});