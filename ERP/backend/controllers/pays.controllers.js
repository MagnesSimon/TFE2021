const Pays = require("../models/pays.models.js");

exports.create = (req, res) => {
    if (!req.body){
        res.status(400).send({
            message: "Content can not be empty !"
        });
    }
    const pays = new Pays({
        id_pays: req.body.id_pays,
        nom_pays: req.body.nom_pays,
    });

    Pays.create(pays, (err,data) =>{
        if (err){
            res.status(500).send({
                message: err.message || "Some error occurred while creating the 'pays'."
            });
        } else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Pays.getAll((err, data) => {
        if (err){
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving 'piece'."
            });
        } else {
            res.send(data);
        }
    });
}