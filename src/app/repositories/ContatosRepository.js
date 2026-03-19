import conexao from '../../../infra/conexao.js'

class ContatosRepository {
consulta(sql, valores = '', mensagemReject = 'Erro') {
    return new Promise((resolve, reject) => {
        conexao.query(sql, valores, (erro, resultado) => {
            if (erro) {
                return reject(erro); 
            }
            return resolve(resultado);
        });
    });
}

    create(selecao) {
        const sql = "INSERT INTO dbagenda.contatos SET ?;"
        return this.consulta(sql, selecao, 'Não foi possivel cadastrar contato')
    }
    
    findAll() {
        const sql = "SELECT * FROM dbagenda.contatos;"
        return this.consulta(sql, '', 'Não foi possivel listar os contatos')
    }
    
    findById(id) {
        const sql = "SELECT * FROM dbagenda.contatos WHERE id=?;"
        return this.consulta(sql, id, 'Não foi possivel localizar os contatos')
    }
    

    update(selecao, id) {
        const sql = "UPDATE dbagenda.contatos SET ? WHERE id=?;"
        return this.consulta(sql, [selecao, id], 'Não foi possivel atualizar o contato')
    }

    delete(id) {
        const sql = "DELETE FROM dbagenda.contatos WHERE id=?;"
        return this.consulta(sql, id, 'Não foi possivel deletar o contato')
    }
}

export default new ContatosRepository()
