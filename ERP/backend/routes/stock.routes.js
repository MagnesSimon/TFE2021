module.exports = app => {
    const piece = require("../controllers/stock.controllers.js");

    app.get("/stock", piece.findAll);

    app.get("/stock/:id", piece.findOne);

    app.put("/stock/:id", piece.update);

}