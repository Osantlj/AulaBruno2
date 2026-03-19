import { Router } from 'express'
import ContatosController from './app/controllers/ContatosController.js'

const router = Router()

router.get('/contatos', ContatosController.index)    // Listar todas
router.get('/contatos/:id', ContatosController.show) // Listar por id
router.post('/contatos', ContatosController.store)   // Criar
router.put('/contatos/:id', ContatosController.update)   // Atualizar
router.delete('/contatos/:id', ContatosController.delete)    // Deletar

export default router