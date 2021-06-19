module.exports = app => {
    const piece = require("../controllers/piece.controllers");

    app.get("/pieces", piece.findAll);

}