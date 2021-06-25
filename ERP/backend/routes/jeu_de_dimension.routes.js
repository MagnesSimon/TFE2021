module.exports = app => {
    const jeuDeDimension = require("../controllers/jeu_de_dimension.controllers");

    app.get("/jeuDeDimensions", jeuDeDimension.findAll);

    app.get("/jeuDeDimension/:id", jeuDeDimension.findOne);

    app.put("/jeuDeDimension/:id", jeuDeDimension.update);

    app.delete("/jeuDeDimension/:id", jeuDeDimension.delete);

}