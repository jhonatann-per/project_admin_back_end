const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { eAdmin } = require('./middlewares/auth');
const db = require('./models/db');
const Usuario = require('./models/Usuario');
require('dotenv').config();
app.use(express.json());require('dotenv').config();
const bcrypt = require('bcryptjs');

app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
    app.use(cors());
    next();
})
//Listar usuarios
app.get('/usuarios', eAdmin, async (req, res) => {
    await Usuario.findAll({order: [['id', 'DESC']]})
    .then((usuarios)=>{
        return res.json({
            erro: false,
            usuarios: usuarios
        })
    }).catch(()=>{
        return res.json({
            erro: true,
            messagem: "Erro: Usuário não encontrado"
        })
    })
});
//Vizualizar por id especifico
app.get('/usuario/:id', eAdmin, async (req, res) =>{
    await Usuario.findByPk(req.params.id)
    .then(usuario => {
        return res.json({
            erro: false,
            usuario: usuario
        })
    }).catch( () =>{
        return res.json({
            erro: true,
            messagem: "Id de usuario não encontrado"
        })
    })
    
})
//Cadastrar
app.post('/usuario', async (req, res) =>{
    // Com bcrypt instalado no projeto é só essas duas linhas abaixo
    // Fazer a incriptação do projeto.
    var dados = req.body;
    dados.senha = await bcrypt.hash(dados.senha, 8);

    await Usuario.create(dados)
    .then(()=>{
        return res.json({
            erro: false,
            messagem: "Usuário cadastrado com SUCESSO!"
        })
    }).catch(() =>{
        return res.json({
            erro: true,
            messagem: "Usuário não cadastrado verifique o formulario"
        })
    })
});
//Editar usuário
app.put('/editar', eAdmin, async (req, res) => {
    var dados = req.body;
    dados.senha = await bcrypt.hash(dados.senha, 8);
    await Usuario.update(dados, {where: {id: dados.id}}).then(() =>{
        return res.json({
            erro: false,
            messagem: "Usuário editado com sucesso!!"
        })
    }).catch(() =>{
        return res.json({
            erro: true,
            messagem: "Erro: Usuário não editado"
        })
    })
})
//Deletar usuário
app.delete('/deletar/:id', eAdmin, async (req, res) =>{
    await Usuario.destroy({where: {id: req.params.id}})
    .then(()=>{
        return res.json({
            erro: false,
            messagem: "Usuário apagado com sucesso!!"
        })
    }).catch(() =>{
        return res.json({
            erro: true,
            messagem: "Erro: Usuário não apagado com sucesso!"
        })
    })
})
//Login
app.post('/login', async (req, res) => {
    // Aqui estamos verificando se o email é igual ao que ta no banco:
    // findOne é para buscar um único registro no banco 
    // where é = encontre um registro onde o valor de email é igual ao do usuario informado
    // Que está sendo passado  
    const usuario = await Usuario.findOne({ where: { email: req.body.usuario } });
    if (usuario === null) {
        return res.json({
            erro: true,
            messagem: "Erro: Usuário ou senha incorreta!"
        });
    }

    // Aqui estamos verificando se a senha é igual a que está no banco e comparando
    // Sempre que o "if" tem dentro de sua função(!) esse ! é igual a se então if(!) = se
    if (!(await bcrypt.compare(req.body.senha, usuario.senha))) {
        return res.json({
            erro: true,
            messagem: "Erro: Usuário ou senha incorreta!"
        });
    }
    var token = jwt.sign({ id: usuario.id }, process.env.SECRET, {
        //expiresIn: é o que define o prazo para o vencimento do token
        expiresIn: '7d' //7 dias
    })

    return res.json({
        erro: false,
        messagem: "Login realizado com sucesso!",
        token
    });
});

app.listen(8080, () =>{
    console.log('Servidor iniciado com sucesso na porta: http://localhost:8080')
});