const Jeu_de_dimension = require("../models/jeu_de_dimension.models");

exports.create = (req, res) => {
    if (!req.body){
        res.status(400).send({
            message: "Content can not be empty !"
        });
    }
    const jeu_de_dimension = new Jeu_de_dimension({
        id_jeu_de_dimension: req.body.id_jeu_de_dimension,
        libelle: req.body.libelle,
        id_dimension: req.body.id_dimension,
    });

    Jeu_de_dimension.create(jeu_de_dimension, (err,data) =>{
        if (err){
            res.status(500).send({
                message: err.message || "Some error occurred while creating the 'jeu_de_dimension'."
            });
        } else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Jeu_de_dimension.getAll((err, data) => {
        if (err){
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving 'jeu_de_dimension'."
            });
        } else {
            res.send(data);
        }
    });
}

exports.findOne = (req, res) => {
    Jeu_de_dimension.getById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found jeu_de_dimension with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving jeu_de_dimension with id " + req.params.id
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
    Jeu_de_dimension.updateById(
        req.params.id,
        new Jeu_de_dimension(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found jeu_de_dimension with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating jeu_de_dimension with id " + req.params.id
                    });
                }
            } else
                res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Jeu_de_dimension.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found jeu_de_dimension with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete jeu_de_dimension with id " + req.params.id
                });
            }
        } else res.send({ message: `jeu_de_dimension was deleted successfully!` });
    });
};