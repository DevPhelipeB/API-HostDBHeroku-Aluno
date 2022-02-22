const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { Prohairesis } = require('prohairesis');
const env = require('./env');
const database = new Prohairesis(env.CLEARDB_DATABASE_URL);

const app = express();

app 
    .use(morgan('dev'))
    .use(bodyParser.urlencoded({ extended: false}))
    .use(bodyParser.json())

    .get('/cadastro', async (req, res) => {
        res.send("Formulario de cadastro do Portal!!!!");
    })

    .post('cadastro/aluno', async (req,res) => {
        const {nome,apelido,email,senha} = req.body;

        try{
            await database.query (`
                INSERT INTO cadastro_aluno(
                    nome,
                    apelido,
                    email,
                    senha,
                    date_added
                ) VALUES (
                    @nome,
                    @apelido,
                    @email,
                    @senha,
                    NOW()
                )
            `, {
                nome: nome,
                apelido: apelido,
                email: email,
                senha: senha
            });
            res.status(200);
            res.end("Aluno Cadastrado com sucesso");
        }catch (e) {
            console.log("Erro ao tentar inserir aluno, entre em contato com suporte");
            res.status(500);
            res.end("Erro ao tentar inserir aluno, verique os dados");
        }
    });

