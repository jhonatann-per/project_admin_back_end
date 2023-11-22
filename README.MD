SEQUENCIA DE CRIAÇÃO DO PROJETO
### npm init
Cria o arquivo package.json

### npm intall express
### https://www.npmjs.com/package/express
Gerencia as requisições, rotas e urls entre outras funcionalidades.

### npm install -g nodemon
O nodemon serve para atualizar sempre que for salvo uma alteração sem precisar reiniciar o projeto.

### app.use(express.json)
para usar dados do tipo json com express é simples só adicionar e o express já vai pegar os arquivos em formato json

### npm install jsonwebtoken
JWT serve para autenticação e autorização em aplicativos da web e serviços da web.

### npm install dotenv --save
é uma biblioteca em Node.js que é usada para carregar variáveis de ambiente de arquivos .env em seu aplicativo. Ele é especialmente útil quando você deseja configurar e gerenciar variáveis de ambiente em um ambiente de desenvolvimento local, para que você possa separar as configurações específicas do ambiente do código-fonte do seu aplicativo.

### npm install --save cors
O CORS (Cross-Origin Resource Sharing) é um mecanismo de segurança usado pelos navegadores da web para controlar as solicitações de recursos (como fontes, scripts e dados) que são feitas a partir de um domínio (origem) para outro. Ele é um importante componente de segurança que visa proteger os usuários da web contra ataques maliciosos, como solicitações cruzadas de site (CSRF) e vazamento de informações confidenciais.

VERIFICAR O BANCO DE DADOS MYSQL NO PRONT DE COMANDO
### mysql -h localhost -u root -p

INSTALAR O SEQUELIZE(BIBLIOTECA JAVASCRIPT) PARA FACILITA GERENCIAMENTO DO BANCO DE DADOS = DRIVE DO MYSQL DO SEQUELIZE
### npm install --save sequelize
INSTALAR O DRIVE DO MYSQL NO PROJETO
### npm install --save mysql2

COMANDO PARA CRIAR O BANCO DE DADOS
### create database NOMEDOBANCO character set utf8mb4 collate utf8mb4_unicode_ci

PARA INCRIPITAR A SENHA É NECESSÁRIO USAR O BCRYPTJS
### npm install --save bcryptjs