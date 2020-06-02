const express = require('express');

const server = express();

server.use(express.json())

// Query Paramas = ?nome=NodeJs
// Route Params = /curso/2
// Request Body = { nome: 'Nodejs', tipo: 'Backend'}

// CRUD Create, read, update, delete

const cursos = ['Nodejs','JS','React'];


// Middleware Global
server.use((req,res, next)=>{

    console.log(`URL Chamada: ${req.url}`);
    return next();
})


function checkCurso(req, res, next){
    if(!req.body.name){
        return res.status(400).json({error : "Nome do Curso é obrigatório"})
    }

    return next();
}


function checkIndexCurso(req,res,next){
    const curso = cursos[req.params.index]
    if(!curso){
        return res.status(400).json({error : "Não encontramos curso"})
    }

    req.curso = curso;

    return next();
}



server.get('/cursos',checkIndexCurso, (req,res) => {

    return res.json( req.curso)

});

//localhost:3000/curso
server.get('/cursos/:index', checkIndexCurso, (req, res) => {

    const {index} = req.params;
    
    return res.send(cursos[index])

})

// criado novo curso
server.post('/cursos', checkCurso, (req,res) => {
    const {name} = req.body;
    cursos.push(name);

    return res.json(cursos);

});


// Atualizando curso
server.put('/cursos/:index', checkCurso, (req, res) => {

    const { index } = req.params;
    const { name } = req.body;

    cursos[index] = name;
    
    return res.json(cursos)

})


// deletando curso
server.delete('/cursos/:index', checkIndexCurso, (req,res) => {
    const { index } = req.params;
    
    cursos.splice(index, 1);

    return res.json({message: "Curso deletado com sucesso!"});

});


server.listen(3000);
