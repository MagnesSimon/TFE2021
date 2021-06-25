module.exports = app => {
    const pole = require("../controllers/pole.controllers.js");

    app.get("/poles", pole.findAll);

    app.get("/pole/:id", pole.findOne);

    app.put("/pole/:id", pole.update);

    app.delete("/pole/:id", pole.delete);

}