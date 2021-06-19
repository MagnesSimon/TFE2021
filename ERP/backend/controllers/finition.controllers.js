const Finition = require("../models/finition.models.js");

exports.create = (req, res) => {
    if (!req.body){
        res.status(400).send({
            message: "Content can not be empty !"
        });
    }
    const finition = new Finition({
        id_finition: req.body.id_finition,
        nom_finition: req.body.nom_finition,
        effet_finition: req.body.effet_finition,
    });

    Finition.create(finition, (err,data) =>{
        if (err){
            res.status(500).send({
                message: err.message || "Some error occurred while creating the 'finition'."
            });
        } else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Finition.getAll((err, data) => {
        if (err){
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving 'finition'."
            });
        } else {
            res.send(data);
        }
    });
}

exports.findOne = (req, res) => {
    Finition.getById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Finition with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Finition with id " + req.params.id
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
    Finition.updateById(
        req.params.id,
        new Finition(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Finition with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Finition with id " + req.params.id
                    });
                }
            } else
                res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Finition.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Finition with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Finition with id " + req.params.id
                });
            }
        } else res.send({ message: `Finition was deleted successfully!` });
    });
};