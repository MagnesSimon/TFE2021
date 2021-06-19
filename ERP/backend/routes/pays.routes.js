module.exports = app => {
    const pays = require("../controllers/pays.controllers.js");

    app.get("/pays", pays.findAll);

    //app.get("/pays/:id", pays.findOne);

    //app.put("/pays/:id", pays.update);

    //app.delete("/pays/:id", pays.delete);
}