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