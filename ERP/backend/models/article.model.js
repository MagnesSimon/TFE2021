const sql = require("./db.js");

// constructor
const Article = function(article) {
    this.art_nom = article.art_nom;
    this.cat_id = article.cat_id;
    this.prix = article.prix;
    this.image = article.image;
    this.description = article.description
};

Article.create = (newArticle, result) => {
    sql.query("INSERT INTO articles SET ?", newArticle, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created article: ", { id: res.insertId, ...newArticle });
        result(null, { id: res.insertId, ...newArticle });
    });
};

Article.findById = (articleId, result) => {
    sql.query(`SELECT * FROM articles WHERE art_id = ${articleId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found article: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

Article.getAll = result => {
    sql.query("select art_id, art_nom, articles.cat_Id,categories.cat_nom as catNom, prix, image, description from articles inner join categories on articles.cat_Id = categories.cat_Id", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

Article.updateById = (id, article, result) => {
    sql.query(
        "UPDATE articles SET art_nom = ?, cat_id = ?, prix = ? , description = ? WHERE cat_id = ?",
        [article.art_nom, article.cat_id, article.prix, article.description, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }


            console.log("updated article: ", { id: id, ...article });
            result(null, { id: id, ...article });
        }
    );
};

Article.remove = (id, result) => {
    sql.query("DELETE FROM articles WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("deleted article with id: ", id);
        result(null, res);
    });
};


module.exports = Article;