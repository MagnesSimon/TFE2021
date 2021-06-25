module.exports = app => {
    const historique = require("../controllers/historique.controllers.js");

    app.get("/historiques", historique.findAll);

    app.get("/historique/:id", historique.findOne);

    app.put("/historique/:id", historique.update);

    app.delete("/historique/:id", historique.delete);

}