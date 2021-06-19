module.exports = app => {
    const piece = require("../controllers/piece.controllers.js");

    app.get("/pieces", piece.findAll);

}