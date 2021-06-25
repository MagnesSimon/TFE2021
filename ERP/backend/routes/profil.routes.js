module.exports = app => {
    const profil = require("../controllers/profil.controllers.js");

    app.get("/profils", profil.findAll);

    app.get("/profil/:id", profil.findOne);

    app.put("/profil/:id", profil.update);

    app.delete("/profil/:id", profil.delete);

}