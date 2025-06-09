const express = require('express');
const cors = require('cors');
const app = express();
const dadosRoutes = require('./routes/dadosRoutes');

const PORT = process.env.PORT || 2500;

app.use(express.json());
app.use(cors());
app.use('/', dadosRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});