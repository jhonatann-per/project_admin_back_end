
const jwt = require('jsonwebtoken');
const {promisify} = require('util');
require('dotenv').config();

// função de Verficar se o token é valido:
module.exports ={
    eAdmin: async function  (req, res, next){
       const authHeader = req.headers.authorization;
       const [Bearer, token] = authHeader.split(' ');;
            if(!token){
                return res.json({
                erro: true,
                messagem: "Erro: Necessário realizar o login para acessar a página"
            });
        };
        try{
            const decode = await promisify(jwt.verify)(token, process.env.SECRET);
            req.userId = decode.id;
            return next();
        }catch(err){
                return res.json({
                erro: true,
                messagem: "Erro: Token de usuário inválido!"
            });
        }
    
    
    }
}