const Localite = require("../models/localite.models.js");

exports.create = (req, res) => {
    if (!req.body){
        res.status(400).send({
            message: "Content can not be empty !"
        });
    }
    const localite = new Localite({
        code_postal: req.body.code_postal,
        nom_localite: req.body.nom_localite,
        id_pays: req.body.id_pays,
    });

    Localite.create(localite, (err,data) =>{
        if (err){
            res.status(500).send({
                message: err.message || "Some error occurred while creating the 'localite'."
            });
        } else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Localite.getAll((err, data) => {
        if (err){
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving 'localite'."
            });
        } else {
            res.send(data);
        }
    });
}

exports.findOne = (req, res) => {
    Localite.getById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found localite with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving localite with id " + req.params.id
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
    Localite.updateById(
        req.params.id,
        new Localite(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found localite with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating localite with id " + req.params.id
                    });
                }
            } else
                res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Localite.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found localite with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete localite with id " + req.params.id
                });
            }
        } else res.send({ message: `localite was deleted successfully!` });
    });
};