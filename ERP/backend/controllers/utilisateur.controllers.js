const Utilisateur = require("../models/utilisateur.models.js");

exports.create = (req, res) => {
    if (!req.body){
        res.status(400).send({
            message: "Content can not be empty !"
        });
    }
    const utilisateur = new Utilisateur({
        id_utilisateur: req.body.id_utilisateur,
        nom_utilisateur: req.body.nom_utilisateur,
        psw_utilisateur: req.body.psw_utilisateur,
        id_profil: req.body.id_profil,
    });

    Utilisateur.create(utilisateur, (err,data) =>{
        if (err){
            res.status(500).send({
                message: err.message || "Some error occurred while creating the 'utilisateur'."
            });
        } else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Utilisateur.getAll((err, data) => {
        if (err){
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving 'utilisateur'."
            });
        } else {
            res.send(data);
        }
    });
}

exports.findOne = (req, res) => {
    Utilisateur.getById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found utilisateur with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving utilisateur with id " + req.params.id
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
    Utilisateur.updateById(
        req.params.id,
        new Utilisateur(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found utilisateur with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating utilisateur with id " + req.params.id
                    });
                }
            } else
                res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Utilisateur.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found utilisateur with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete utilisateur with id " + req.params.id
                });
            }
        } else res.send({ message: `utilisateur was deleted successfully!` });
    });
};