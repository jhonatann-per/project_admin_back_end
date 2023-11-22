//Sequelize com "S" maiusculo é pq você está importando a biblioteca
//do Sequelize
const Sequelize = require('sequelize');
const db = require('./db');

// Nesta parte, você está definindo o modelo de usuário usando db.define.
// Isso cria uma tabela chamada 'usuarios' no banco de dados com quatro
// colunas: 'id', 'nome', 'email' e 'senha'. 
// INTERGER E STRING é o tipo do itém allowNull é se ele é obrigatorio 
// autoIncrement vai ser sempre no id para o banco criar o item sempre.
const Usuario = db.define('usuarios', {
// Aqui estamos falando como deve ser os itens no banco de dados
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true

    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    senha:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

// O metodo sync é utilizado para criar uma atualização automatica
// no banco de dados sempre criando ou atualizando caso tenha uma alteração
Usuario.sync();

module.exports = Usuario;