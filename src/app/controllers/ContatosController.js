import ContatosRepository from '../repositories/ContatosRepository.js'

class ContatosController {

    // Listar contatos
    async index(req, res) {
        try {
            const resultado = await ContatosRepository.findAll()
            res.status(200).json(resultado)
        } catch (erro) {
            console.error('Erro no banco de dados:', erro)
            res.status(500).json({ mensagem: 'Erro ao listar contatos' })
        }
    }

    // Listar por id
    async show(req, res) {
        try {
            const id = req.params.id
            const resultado = await ContatosRepository.findById(id)
            if (resultado.length > 0) {
                res.status(200).json(resultado[0])
            } else {
                res.status(404).json({ mensagem: 'Contato não encontrado' })
            }
        } catch (erro) {
            res.status(500).json({ mensagem: 'Erro no banco da dados'})
        }
    }

    // Criar dados
    async store(req, res) {
            const { nome, email, telefone, endereco } = req.body;

            if (!nome) {
                return res.status(400).json({ 
                    erro: "Bad Request", 
                    mensagem: "É obrigatorio ter nome" 
                });
            }

            if (!email && !telefone) {
                return res.status(400).json({ 
                    erro: "Bad Request", 
                    mensagem: "É obrigatorio ter e-mail e telefone" 
                });
            }

            const novoContato = { 
                nome, 
                email: email || null, 
                telefone: telefone || null, 
                endereco: endereco || null 
            };
            
            try {
                const resultado = await ContatosRepository.create(novoContato);
                
                return res.status(201).json({
                    mensagem: "Contato criado",
                    contatoId: resultado.insertId
                });

            } catch (error) {
                if (error.erro && error.erro.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({ 
                        erro: "Conflict", 
                        mensagem: `O e-mail '${email}' já existe` 
                    });
                }

                console.error("Erro interno ao cadastrar contato:", error);
                return res.status(500).json({ 
                    erro: "Internal Server Error", 
                    mensagem: "Erro no banco da dados" 
                });
            }
        }

    // Atualizar dados
    async update(req, res) {
        try {
            const id = req.params.id
            const contato = req.body
            const resultado = await ContatoRepository.update(contato, id)
            if (resultado.affectedRows > 0) {
                res.status(200).json({ id, ...contato})
            } else {
                res.status(404).json({ 'erro': 'Contato não encontrado para atualizar' })            
            }
        } catch (erro) {
            res.status(500).json({ mensagem: 'Erro no banco de dados' })
        }
    }

    // Remover dados
    async delete(req, res) {
        try {
            const id = req.params.id
            const resultado = await ContatoRepository.delete(id)
            if (resultado.affectedRows > 0) {
                res.status(200).json({ mensagem: `Contato ${id} deletado com sucesso` })
            } else {
                res.status(404).json({mensagem: 'Contato não encontrado para deletar'})
            }
        } catch (erro) {
            res.status(500).json({ mensagem: 'Erro no banco de dados '})
        }
    }
}


export default new ContatosController()
