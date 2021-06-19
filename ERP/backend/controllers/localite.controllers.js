const Localite = require("../models/localite.models.js");

exports.create = (req, res) => {
    if (!req.body){
        res.status(400).send({
            message: "Content can not be empty !"
        });
    }
    const localite = new Localite({
        code_postal: req.body.code_postal,
        nom_localite: req.body.nom_localite,
        id_pays: req.body.id_pays,
    });

    Localite.create(localite, (err,data) =>{
        if (err){
            res.status(500).send({
                message: err.message || "Some error occurred while creating the 'localite'."
            });
        } else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Localite.getAll((err, data) => {
        if (err){
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving 'localite'."
            });
        } else {
            res.send(data);
        }
    });
}