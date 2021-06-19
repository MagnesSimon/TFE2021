module.exports = app => {
    const pays = require("../controllers/pays.controllers.js");

    app.get("/pays", pays.findAll);

}