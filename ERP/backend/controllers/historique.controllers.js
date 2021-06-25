const Historique = require("../models/historique.models.js");

exports.create = (req, res) => {
    if (!req.body){
        res.status(400).send({
            message: "Content can not be empty !"
        });
    }
    const historique = new Historique({
        id_fiche_historique: req.body.id_fiche_historique,
        date: req.body.date,
        quantite_modifie: req.body.quantite_modifie,
        id_utilisateur: req.body.id_utilisateur,
        reference: req.body.reference,
    });

    Historique.create(historique, (err,data) =>{
        if (err){
            res.status(500).send({
                message: err.message || "Some error occurred while creating the 'historique'."
            });
        } else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Historique.getAll((err, data) => {
        if (err){
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving 'historique'."
            });
        } else {
            res.send(data);
        }
    });
}

exports.findOne = (req, res) => {
    Historique.getById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found historique with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving historique with id " + req.params.id
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
    Historique.updateById(
        req.params.id,
        new Historique(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found historique with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating historique with id " + req.params.id
                    });
                }
            } else
                res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Historique.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found historique with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete historique with id " + req.params.id
                });
            }
        } else res.send({ message: `historique was deleted successfully!` });
    });
};