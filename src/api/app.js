const express = require("express");
const path = require("path");

const userController = require("./controllers/userController");
const loginController = require("./controllers/loginController");
const recipeController = require("./controllers/recipeController");

const app = express();
app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get("/", (request, response) => {
    response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use("/users", userController);
app.use("/login", loginController);
app.use("/recipes", recipeController);
app.use("/images/", express.static(path.join(__dirname, "../uploads")));

module.exports = app;
