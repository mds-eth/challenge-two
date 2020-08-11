const express = require('express');
const cors = require('cors');
const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get('/repositories', (req, res) => {
   
    return res.status(200).json(repositories);
});

app.post("/repositories", (req, res) => {

    const {title, url, techs} = req.body;

    const repositorie = {id: uuid(), title, url, techs, likes: 0};

    repositories.push(repositorie);

    return res.status(201).json(repositories);
});

app.put('/repositories/:id', (req, res) => {

    const {id} = req.params;
    const {title, url, techs}  =req.body;
    
    const repositorie = repositories.find(repo => (repo.id === id));

    repositorie.title = title;
    repositorie.url = url;
    repositorie.techs = techs;

    repositories.push(repositorie);

    return res.status(200).json(repositories);
});

app.delete('/repositories/:id', (req, res) => {

    const { id } = req.params;
    
    const repositorieIndex = repositories.findIndex(repo => (repo.id === id));

    if(repositorieIndex === null){
        return res.status(400).json('Repositorie not found');
    }

    repositories.splice(repositorieIndex, 1);

    return res.status(200).json(repositories);

});

app.post("/repositories/:id/like", (req, res) => {

    const { id } = req.params;
    
    const repositorie = repositories.find(repo => (repo.id === id));
    
    const {like} = repositorie;

    like++;

    repositories.push(repositorie);

});

module.exports = app;