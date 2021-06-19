module.exports = app => {
    const famille = require("../controllers/famille.controllers.js");

    app.get("/familles", famille.findAll);

}