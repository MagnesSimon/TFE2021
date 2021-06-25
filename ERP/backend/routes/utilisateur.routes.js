module.exports = app => {
    const utilisateur = require("../controllers/utilisateur.controllers.js");

    app.get("/utilisateurs", utilisateur.findAll);

    app.get("/utilisateur/:id", utilisateur.findOne);

    app.put("/utilisateur/:id", utilisateur.update);

    app.delete("/utilisateur/:id", utilisateur.delete);

}