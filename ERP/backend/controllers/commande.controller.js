const Commande = require("../models/commande.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const commande = new Commande({
        cli_id: req.body.cli_id,
        art_id: req.body.art_id,
    });

    Commande.create(commande, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Commande."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Commande.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Commande."
            });
        else
            res.send(data);
    });

};

exports.findOne = (req, res) => {
    Commande.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Commande with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Commande with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

exports.findComUser = (req, res) => {
    Commande.findByUserId(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Commandes with cli_id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Commande with cli_id " + req.params.id
                });
            }
        } else res.send(data);
    });
};


exports.delete = (req, res) => {
    Commande.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Article with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Commande with id " + req.params.id
                });
            }
        } else res.send({ message: `Commande was deleted successfully!` });
    });
};
