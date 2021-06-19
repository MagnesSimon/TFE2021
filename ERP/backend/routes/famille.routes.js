module.exports = app => {
    const famille = require("../controllers/famille.controllers.js");

    app.get("/familles", famille.findAll);

    app.get("/famille/:id", famille.findOne);

    app.put("/famille/:id", famille.update);

    app.delete("/famille/:id", famille.delete);

}