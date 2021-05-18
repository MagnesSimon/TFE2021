const Article = require("../models/article.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const article = new Article({
        art_nom: req.body.art_nom,
        cat_id: req.body.cat_id,
        prix: req.body.prix,
        image: req.body.image,
        description: req.body.description
    });

    Article.create(article, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Article."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Article.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving articles."
            });
        else
            for(let i=0; i < data.length; i++){
                data[i].image = data[i].image.toString("base64")
            }
            res.send(data);
    });

};

exports.findOne = (req, res) => {
    Article.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Article with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Article with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Article.updateById(
        req.params.id,
        new Article(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Article with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Article with id " + req.params.id
                    });
                }
            } else
                res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Article.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Article with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Article with id " + req.params.id
                });
            }
        } else res.send({ message: `Article was deleted successfully!` });
    });
};
