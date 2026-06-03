import { Router } from 'express'

const router = Router()

router.get('/books', (req, res) => {
  
  res.json({ 
    message: 'Lista de livros' 
  })
})

router.post('/books', (req, res) => {
  
  res.json({
    message: 'Livro criado' 
  })
})

export default router