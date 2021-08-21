const express = require("express");

const userController = require("./controllers/userController");
const loginController = require("./controllers/loginController");

const app = express();
app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get("/", (request, response) => {
    response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use("/users", userController);
app.use("/login", loginController);

module.exports = app;
