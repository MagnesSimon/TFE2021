const Fonctionnalite = require("../models/fonctionnalite.models.js");

exports.create = (req, res) => {
    if (!req.body){
        res.status(400).send({
            message: "Content can not be empty !"
        });
    }
    const fonctionnalite = new Fonctionnalite({
        id_fonctionnalite: req.body.id_fonctionnalite,
        libelle_fonctionnelite: req.body.libelle_fonctionnelite,
    });

    Fonctionnalite.create(fonctionnalite, (err,data) =>{
        if (err){
            res.status(500).send({
                message: err.message || "Some error occurred while creating the 'fonctionnalite'."
            });
        } else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Fonctionnalite.getAll((err, data) => {
        if (err){
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving 'fonctionnalite'."
            });
        } else {
            res.send(data);
        }
    });
}

exports.findOne = (req, res) => {
    Fonctionnalite.getById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found fonctionnalite with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving fonctionnalite with id " + req.params.id
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
    Fonctionnalite.updateById(
        req.params.id,
        new Fonctionnalite(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found fonctionnalite with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating fonctionnalite with id " + req.params.id
                    });
                }
            } else
                res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Fonctionnalite.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found fonctionnalite with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete fonctionnalite with id " + req.params.id
                });
            }
        } else res.send({ message: `fonctionnalite was deleted successfully!` });
    });
};