const Pole = require("../models/pole.models.js");

exports.create = (req, res) => {
    if (!req.body){
        res.status(400).send({
            message: "Content can not be empty !"
        });
    }
    const pole = new Pole({
        id_pole: req.body.id_pole,
        nom_pole: req.body.nom_pole,
        quantite_type: req.body.quantite_type,
        });

    Pole.create(pole, (err,data) =>{
        if (err){
            res.status(500).send({
                message: err.message || "Some error occurred while creating the 'pole'."
            });
        } else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Pole.getAll((err, data) => {
        if (err){
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving 'pole'."
            });
        } else {
            res.send(data);
        }
    });
}

exports.findOne = (req, res) => {
    Pole.getById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found pole with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving pole with id " + req.params.id
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
    Pole.updateById(
        req.params.id,
        new Pole(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found pole with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating pole with id " + req.params.id
                    });
                }
            } else
                res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Pole.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found pole with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete pole with id " + req.params.id
                });
            }
        } else res.send({ message: `pole was deleted successfully!` });
    });
};