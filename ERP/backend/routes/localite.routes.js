module.exports = app => {
    const localite = require("../controllers/localite.controllers.js");

    app.get("/localites", localite.findAll);

    app.get("/localite/:id", localite.findOne);

    app.put("/localite/:id", localite.update);

    app.delete("/localite/:id", localite.delete);
}