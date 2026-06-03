import { Router } from 'express'

const router = Router()

router.get('/borrows', (req, res) => {
  
  res.json({ 
    message: 'Lista de empréstimos' 
  })
})

router.post('/borrows', (req, res) => {
  
  res.json({
    message: 'Empréstimo criado' 
  })
})

export default router