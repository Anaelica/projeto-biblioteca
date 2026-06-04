const express = require('express');
const router = express.Router();

const { livros, emprestimos } = require('../data/db');

/**
 * @swagger
 * /emprestimos:
 *   get:
 *     summary: Lista todos os empréstimos
 *     responses:
 *       200:
 *         description: Lista de empréstimos
 */
router.get('/', (req, res) => {
  res.status(200).json(emprestimos);
});

/**
 * @swagger
 * /emprestimos:
 *   post:
 *     summary: Registrar empréstimo
 *     responses:
 *       201:
 *         description: Empréstimo criado
 *       400:
 *         description: Livro indisponível
 *       404:
 *         description: Livro não encontrado
 */
router.post('/', (req, res) => {
  const { livroId, nomeAluno, dataEmprestimo } = req.body;

  const livro = livros.find(l => l.id == livroId);

  if (!livro) {
    return res.status(404).json({
      mensagem: 'Livro não encontrado'
    });
  }

  if (!livro.disponivel) {
    return res.status(400).json({
      mensagem: 'Livro indisponível para empréstimo'
    });
  }

  const novoEmprestimo = {
    id: Date.now(),
    livroId,
    nomeAluno,
    dataEmprestimo,
    devolvido: false
  };

  emprestimos.push(novoEmprestimo);

  livro.disponivel = false;

  res.status(201).json(novoEmprestimo);
});

/**
 * @swagger
 * /emprestimos/{id}/devolver:
 *   patch:
 *     summary: Devolver livro
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Livro devolvido
 *       404:
 *         description: Empréstimo não encontrado
 */
router.patch('/:id/devolver', (req, res) => {
  const emprestimo = emprestimos.find(
    e => e.id == req.params.id
  );

  if (!emprestimo) {
    return res.status(404).json({
      mensagem: 'Empréstimo não encontrado'
    });
  }

  emprestimo.devolvido = true;

  const livro = livros.find(
    l => l.id == emprestimo.livroId
  );

  if (livro) {
    livro.disponivel = true;
  }

  res.status(200).json({
    mensagem: 'Livro devolvido com sucesso',
    emprestimo
  });
});

module.exports = router;