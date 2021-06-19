const Fournisseur = require("../models/piece.models.js");

exports.create = (req, res) => {
    if (!req.body){
        res.status(400).send({
            message: "Content can not be empty !"
        });
    }
    const fournisseur = new Fournisseur({
        id_fournisseur: req.body.id_fournisseur,
        nom_fournisseur: req.body.nom_fournisseur,
        mail_fournisseur: req.body.mail_fournisseur,
        telephone_fournisseur: req.body.telephone_fournisseur,
        adresse_fournisseur: req.body.adresse_fournisseur,
        code_postal: req.body.code_postal,
    });

    Fournisseur.create(fournisseur, (err,data) =>{
        if (err){
            res.status(500).send({
                message: err.message || "Some error occurred while creating the 'fournisseur'."
            });
        } else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Fournisseur.getAll((err, data) => {
        if (err){
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving 'fournisseur'."
            });
        } else {
            res.send(data);
        }
    });
}

exports.findOne = (req, res) => {
    Fournisseur.getById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found fournisseur with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving fournisseur with id " + req.params.id
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
    Fournisseur.updateById(
        req.params.id,
        new Fournisseur(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found fournisseur with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating fournisseur with id " + req.params.id
                    });
                }
            } else
                res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Fournisseur.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found fournisseur with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete fournisseur with id " + req.params.id
                });
            }
        } else res.send({ message: `fournisseur was deleted successfully!` });
    });
};