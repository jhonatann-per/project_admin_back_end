const Sequelize = require('sequelize');

const sequelize = new Sequelize('imersaooito', 'root', '270319', {
    host: 'localhost',
    dialect: 'mysql'
});
sequelize.authenticate().then(() =>{
    console.log("Conexão com o banco de dados realizado com sucesso!")
}).catch(()=>{
    console.log("Erro: Conexão com o banco de dados não realizado com sucesso!");
})

module.exports = sequelize;