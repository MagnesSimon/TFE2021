module.exports = app => {
    const categorie = require("../controllers/categorie.controllers.js");

    app.get("/categories", categorie.findAll);

    app.get("/categorie/:id", categorie.findOne);

    app.put("/categorie/:id", categorie.update);

    app.delete("/categorie/:id", categorie.delete);

}