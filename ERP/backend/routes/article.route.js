module.exports = app => {
    const articles = require("../controllers/article.controller.js");

    app.get("/articles", articles.findAll);

    app.get("/articles/:id", articles.findOne);

    app.put("/articles/:id", articles.update);

    app.delete("/articles/:id", articles.delete);

};