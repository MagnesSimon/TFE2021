const Dimension = require("../models/dimension.models.js");

exports.create = (req, res) => {
    if (!req.body){
        res.status(400).send({
            message: "Content can not be empty !"
        });
    }
    const dimension = new Dimension({
        valeur_dimension: req.body.valeur_dimension,
    });

    Dimension.create(dimension, (err,data) =>{
        if (err){
            res.status(500).send({
                message: err.message || "Some error occurred while creating the 'Dimension'."
            });
        } else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Dimension.getAll((err, data) => {
        if (err){
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving 'Dimension'."
            });
        } else {
            res.send(data);
        }
    });
}

exports.findOne = (req, res) => {
    Dimension.getById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Dimension with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Dimension with id " + req.params.id
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
    Dimension.updateById(
        req.params.id,
        new Dimension(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Dimension with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Dimension with id " + req.params.id
                    });
                }
            } else
                res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Dimension.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Dimension with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Dimension with id " + req.params.id
                });
            }
        } else res.send({ message: `Dimension was deleted successfully!` });
    });
};