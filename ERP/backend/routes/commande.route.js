module.exports = app => {
    const commande = require("../controllers/commande.controller.js");

    app.post("/commande", commande.create);

    app.get("/commande", commande.findAll);

    app.get("/commande/:id", commande.findOne);

    app.get("/commande/user/:id", commande.findComUser);

    app.delete("/commande/:id", commande.delete);

};