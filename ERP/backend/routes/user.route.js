module.exports = app => {
    const user = require("../controllers/user.controller.js");

    app.post("/user", user.create);

    app.get("/user", user.findAll);

    app.get("/user/:id", user.findOne);

    app.get("/mail/:mail", user.findMail);

    app.put("/user/:id", user.update);

    app.delete("/user/:id", user.delete);

    app.get("/commands", user.findAllCommandByUser);

    app.get("/usercommande/:id", user.findCommandForUser);

};