module.exports = app => {
    const fournisseur = require("../controllers/fournisseur.controllers");

    app.get("/fournisseurs", fournisseur.findAll);

    app.get("/fournisseur/:id", fournisseur.findOne);

    app.put("/fournisseur/:id", fournisseur.update);

    app.delete("/fournisseur/:id", fournisseur.delete);

}