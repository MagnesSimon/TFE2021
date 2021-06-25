module.exports = app => {
    const dimension = require("../controllers/dimension.controllers.js");

    app.get("/dimensions", dimension.findAll);

    app.get("/dimension/:id", dimension.findOne);

    app.put("/dimension/:id", dimension.update);

    app.delete("/dimension/:id", dimension.delete);

}