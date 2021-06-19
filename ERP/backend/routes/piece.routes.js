module.exports = app => {
    const piece = require("../controllers/piece.controllers.js");

    app.get("/pieces", piece.findAll);

    app.get("/piece/:id", piece.findOne);

    app.put("/piece/:id", piece.update);

    app.delete("/piece/:id", piece.delete);

}