module.exports = app => {
    const localite = require("../controllers/localite.controllers.js");

    app.get("/localites", localite.findAll);

}