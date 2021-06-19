const Fournisseur = require("../models/fournisseur.models");

exports.create = (req, res) => {
    if (!req.body){
        res.status(400).send({
            message: "Content can not be empty !"
        });
    }
    const fournisseur = new Fournisseur({
        reference: req.body.reference,
        valeur_seuil: req.body.valeur_seuil,
        quantite_en_stock: req.body.quantite_en_stock,
        id_jeu_de_dimension: req.body.id_jeu_de_dimension,
        id_famille: req.body.id_famille,
        id_categorie: req.body.id_categorie,
        id_finition: req.body.id_finition
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
                message: err.message || "Some error occurred while retrieving 'piece'."
            });
        } else {
            res.send(data);
        }
    });
}