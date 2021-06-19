module.exports = app => {
    const finition = require("../controllers/finition.controllers.js");

    app.get("/finitions", finition.findAll);

    app.get("/finition/:id", finition.findOne);

    app.put("/finition/:id", finition.update);

    app.delete("/finition/:id", finition.delete);

};