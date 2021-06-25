const Categorie = require("../models/categorie.models.js");

exports.create = (req, res) => {
    if (!req.body){
        res.status(400).send({
            message: "Content can not be empty !"
        });
    }
    const categorie = new Categorie({
        id_categorie: req.body.id_categorie,
        nom_categorie: req.body.nom_categorie,
        id_pole: req.body.id_pole,
    });

    Categorie.create(categorie, (err,data) =>{
        if (err){
            res.status(500).send({
                message: err.message || "Some error occurred while creating the 'categorie'."
            });
        } else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Categorie.getAll((err, data) => {
        if (err){
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving 'categorie'."
            });
        } else {
            res.send(data);
        }
    });
}

exports.findOne = (req, res) => {
    Categorie.getById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found categorie with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving categorie with id " + req.params.id
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
    Categorie.updateById(
        req.params.id,
        new Categorie(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found categorie with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating categorie with id " + req.params.id
                    });
                }
            } else
                res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Categorie.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found categorie with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete categorie with id " + req.params.id
                });
            }
        } else res.send({ message: `categorie was deleted successfully!` });
    });
};