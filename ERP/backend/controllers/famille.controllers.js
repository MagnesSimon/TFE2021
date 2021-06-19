const Famille = require("../models/famille.models.js");

exports.create = (req, res) => {
    if (!req.body){
        res.status(400).send({
            message: "Content can not be empty !"
        });
    }
    const famille = new Famille({
        id_famille: req.body.id_famille,
        nom_famille: req.body.nom_famille,
        materiau: req.body.materiau,
        pour_trou: req.body.pour_trou,
        specificite_technique: req.body.specificite_technique,
        image: req.body.image,
        id_fournisseur: req.body.id_fournisseur
    });

    Famille.create(famille, (err,data) =>{
        if (err){
            res.status(500).send({
                message: err.message || "Some error occurred while creating the 'piece'."
            });
        } else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Famille.getAll((err, data) => {
        if (err){
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving 'piece'."
            });
        } else {
            for(let i=0; i < data.length; i++){
                if (data[i].image){
                    data[i].image = data[i].image.toString("base64")
                }
            }
            res.send(data);
        }
    });
}

exports.findOne = (req, res) => {
    Famille.getById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found famille with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving famille with id " + req.params.id
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
    Famille.updateById(
        req.params.id,
        new Piece(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found famille with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating famille with id " + req.params.id
                    });
                }
            } else
                res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Famille.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found famille with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete famille with id " + req.params.id
                });
            }
        } else res.send({message: `famille was deleted successfully!`});
    });
}