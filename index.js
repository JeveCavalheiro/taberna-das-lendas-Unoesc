const express = require('express');
const cors = require('cors')
const usuarioRoutes = require('./src/routes/UsuarioRoutes'); 
const comandaRoutes = require('./src/routes/ComandaRoutes')
const cardapioRoutes = require('./src/routes/CardapioRoutes')
const loginRoutes = require('./src/routes/LoginRoutes')
const ordemRoutes = require('./src/routes/OrdemProducaoRoutes')

const db = require('./src/models');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
    res.send('API Node.js rodando!');
});

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/comandas', comandaRoutes);
app.use('/api/cardapios', cardapioRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/ordem', ordemRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});