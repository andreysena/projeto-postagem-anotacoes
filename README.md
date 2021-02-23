# Projeto de Postagens de Anotações
Projeto de criação de um app para postagem de anotações utilizando Node.JS e Express.

<br/>

***

<p align="center">

  <a href="https://github.com/andreysena/projeto-postagem-anotacoescommits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/andreysena/projeto-postagem-anotacoes">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
</p>

***

<br/>

## Requisitos para rodar o app

* Node.js
* MySQL

<br/>

## Configuração
1. Após clonar o repositório, entre na raiz do projeto e execute o seguinte comando no terminal:
```
npm install
```

<br/>

2. Crie um banco de dados MySQL e então na raiz do projeto procure a pasta ```models``` e dentro dela o arquivo ```db.js```. Nele você deve configurar as informações necessárias para estabelecer a conexão com o banco de dados, e essas são: nome do banco de dados, nome de usuário (por padrão o usuário root) e senha de usuário. <br/> Também é possível definir o fuso horário através do ```dialectOptions```, no meu caso está configurado como Horário Padrão de Brasília (GMT-3).

```
const sequelize = new Sequelize('NomeDoBancoDeDados', 'root', 'SenhaDeUsario', {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
        useUTC: false //for reading from database
    },
    timezone: '-03:00'
})
```

<br/>

3. Também na pasta `models` abra o arquivo `Post.js` e descomente a linha abaixo:
<br/><br/>
`//Post.sync({force: true})`
<br/><br/>
E então execute o seguinte comando: 
<br/><br/>
`node Post.js`
<br/><br/>
Depois de executar o comando a linha deve ser comentada novamente para que a tabela não seja recriada sempre que rodar o projeto.

<br>

## Rodando o projeto

Na raiz do projeto execute o seguinte comando:
```
node index.js
```
Na barra de endereço do navegador acesse o localhost na porta 8081:

![localhost](https://github.com/andreysena/projeto-postagem-anotacoes/blob/main/media/img/barra-de-endereco.png)

<br/>

Tudo pronto!

***

<br/>

## CRUD do app

<br/>

### Criação de uma anotação (Create) 
![Create](https://github.com/andreysena/projeto-postagem-anotacoes/blob/main/media/gifs/Create.gif)

<br/>

### Visualização das anotações (Read) 
![Read](https://github.com/andreysena/projeto-postagem-anotacoes/blob/main/media/gifs/Read.gif)

<br/>

### Atualização de uma anotação (Update) 
![Update](https://github.com/andreysena/projeto-postagem-anotacoes/blob/main/media/gifs/Update.gif)

<br/>

### Exclusão de uma anotação (Delete) 
![Delete](https://github.com/andreysena/projeto-postagem-anotacoes/blob/main/media/gifs/Delete.gif)

<br/><br/>

***

### Restauração de uma anotação (Restore) 
![Restore](https://github.com/andreysena/projeto-postagem-anotacoes/blob/main/media/gifs/Restore.gif)