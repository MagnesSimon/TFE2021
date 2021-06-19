module.exports = app => {
    const fournisseur = require("../controllers/fournisseur.controllers");

    app.get("/fournisseurs", fournisseur.findAll);

}