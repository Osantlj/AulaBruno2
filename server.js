import app from './src/app.js'
const port = 3000

console.log(`Conexao realizada com sucesso`)
app.listen(port, () => {
    console.log(`Servidor rodando http://localhost:${port}`)
})