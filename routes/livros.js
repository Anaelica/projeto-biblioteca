const express = require('express');
const router = express.Router();

const { livros } = require('../data/db');

/**
 * @swagger
 * /livros:
 *   get:
 *     summary: Lista todos os livros
 *     parameters:
 *       - in: query
 *         name: genero
 *         schema:
 *           type: string
 *         description: Filtrar livros por gênero
 *     responses:
 *       200:
 *         description: Lista de livros retornada com sucesso
 */
router.get('/', (req, res) => {
  const { genero } = req.query;

  if (genero) {
    const filtrados = livros.filter(
      livro => livro.genero.toLowerCase() === genero.toLowerCase()
    );

    return res.status(200).json(filtrados);
  }

  res.status(200).json(livros);
});

/**
 * @swagger
 * /livros/{id}:
 *   get:
 *     summary: Busca um livro pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Livro encontrado
 *       404:
 *         description: Livro não encontrado
 */
router.get('/:id', (req, res) => {
  const livro = livros.find(l => l.id == req.params.id);

  if (!livro) {
    return res.status(404).json({
      mensagem: 'Livro não encontrado'
    });
  }

  res.status(200).json(livro);
});

/**
 * @swagger
 * /livros:
 *   post:
 *     summary: Cadastra um novo livro
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: Livro criado
 *       400:
 *         description: Dados inválidos
 */
router.post('/', (req, res) => {
  const { titulo, autor, genero } = req.body;

  if (!titulo || !autor || !genero) {
    return res.status(400).json({
      mensagem: 'Titulo, autor e genero são obrigatórios'
    });
  }

  const novoLivro = {
    id: Date.now(),
    titulo,
    autor,
    genero,
    disponivel: true
  };

  livros.push(novoLivro);

  res.status(201).json(novoLivro);
});

/**
 * @swagger
 * /livros/{id}:
 *   put:
 *     summary: Atualiza um livro
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Livro atualizado
 *       404:
 *         description: Livro não encontrado
 */
router.put('/:id', (req, res) => {
  const livro = livros.find(l => l.id == req.params.id);

  if (!livro) {
    return res.status(404).json({
      mensagem: 'Livro não encontrado'
    });
  }

  const { titulo, autor, genero } = req.body;

  livro.titulo = titulo ?? livro.titulo;
  livro.autor = autor ?? livro.autor;
  livro.genero = genero ?? livro.genero;

  res.status(200).json(livro);
});

/**
 * @swagger
 * /livros/{id}:
 *   delete:
 *     summary: Remove um livro
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Livro removido
 *       404:
 *         description: Livro não encontrado
 */
router.delete('/:id', (req, res) => {
  const index = livros.findIndex(l => l.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({
      mensagem: 'Livro não encontrado'
    });
  }

  livros.splice(index, 1);

  res.status(200).json({
    mensagem: 'Livro removido com sucesso'
  });
});

module.exports = router;