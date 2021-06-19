const Piece = require("../models/piece.models.js");

exports.create = (req, res) => {
    if (!req.body){
        res.status(400).send({
            message: "Content can not be empty !"
        });
    }
    const piece = new Piece({
        reference: req.body.reference,
        valeur_seuil: req.body.valeur_seuil,
        quantite_en_stock: req.body.quantite_en_stock,
        id_jeu_de_dimension: req.body.id_jeu_de_dimension,
        id_famille: req.body.id_famille,
        id_categorie: req.body.id_categorie,
        id_finition: req.body.id_finition
    });

    Piece.create(piece, (err,data) =>{
        if (err){
            res.status(500).send({
                message: err.message || "Some error occurred while creating the 'piece'."
            });
        } else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Piece.getAll((err, data) => {
        if (err){
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving 'piece'."
            });
        } else {
            res.send(data);
        }
    });
}