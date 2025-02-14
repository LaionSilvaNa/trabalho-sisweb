const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware para permitir o uso de JSON no corpo das requisições
app.use(express.json());

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota para receber dados de um formulário
app.post('/submit', (req, res) => {
    const { numero } = req.body;
    
    // Validação: o campo deve ser um número válido
    if (!numero || typeof numero !== 'number' || isNaN(numero)) {
        return res.status(400).json({ error: 'Número inválido. Apenas números são permitidos.' });
    }

    res.json({ message: `Número ${numero} recebido com sucesso!` });
});

// Rota para retornar informações processadas
app.get('/info', (req, res) => {
    const data = {
        service: 'Camada do Servidor em Node.js',
        version: '1.0.0',
        status: 'Ativo'
    };
    res.json(data);
});

// Inicializando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
