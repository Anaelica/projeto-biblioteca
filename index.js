const express = require('express');
const swaggerUi = require('swagger-ui-express');

const livrosRoutes = require('./routes/livros');
const emprestimosRoutes = require('./routes/emprestimos');
const swaggerSpec = require('./swagger');

const app = express();

app.use(express.json());

app.use('/livros', livrosRoutes);
app.use('/emprestimos', emprestimosRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(3000, () => {
  console.log('Servidor tá rodando na porta 3000');
});