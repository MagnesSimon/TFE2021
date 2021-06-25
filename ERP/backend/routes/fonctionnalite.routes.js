module.exports = app => {
    const fonctionnalite = require("../controllers/fonctionnalite.controllers.js");

    app.get("/fonctionnalites", fonctionnalite.findAll);

    app.get("/fonctionnalite/:id", fonctionnalite.findOne);

    app.put("/fonctionnalite/:id", fonctionnalite.update);

    app.delete("/fonctionnalite/:id", fonctionnalite.delete);

}