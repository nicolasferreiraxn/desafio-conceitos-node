const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const createRepositories = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(createRepositories)
  return response.json(createRepositories)
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;
  const { id } = request.params;

  const repositorySearchIndex = repositories.findIndex(repository => repository.id === id);
  if(repositorySearchIndex === -1){
    return response.status(400).json({ error: "Was not found repository."})
  }

  repositories[repositorySearchIndex] = {
    id,
    title: title ? title: repositories[repositorySearchIndex].title,
    url: url ? url: repositories[repositorySearchIndex].url,
    techs: techs ? techs: repositories[repositorySearchIndex].techs,
    likes: repositories[repositorySearchIndex].likes,
  }
  
  return response.send(repositories[repositorySearchIndex])

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositorySearchIndex = repositories.findIndex(repository => repository.id === id);
  if(repositorySearchIndex === -1){
    return response.status(400).json({ error: "Was not found repository."})
  }

  repositories.splice(repositorySearchIndex, 1);

  return response.send(204)

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repositorySearchIndex = repositories.findIndex(repository => repository.id === id);
  if(repositorySearchIndex === -1){
    return response.status(400).json({ error: "Was not found repository."})
  }

  repositories[repositorySearchIndex].likes++;

  return response.send(repositories[repositorySearchIndex])

});

module.exports = app;
