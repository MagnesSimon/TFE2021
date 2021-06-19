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
                message: err.message || "Some error occurred while retrieving 'pays'."
            });
        } else {
            res.send(data);
        }
    });

    exports.findOne = (req, res) => {
        Pays.getById(req.params.id, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found pays with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error retrieving pays with id " + req.params.id
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
        Pays.updateById(
            req.params.id,
            new Piece(req.body),
            (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        res.status(404).send({
                            message: `Not found pays with id ${req.params.id}.`
                        });
                    } else {
                        res.status(500).send({
                            message: "Error updating pays with id " + req.params.id
                        });
                    }
                } else
                    res.send(data);
            }
        );
    };

    exports.delete = (req, res) => {
        Pays.remove(req.params.id, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found pays with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Could not delete pays with id " + req.params.id
                    });
                }
            } else res.send({ message: `piece pays deleted successfully!` });
        });
    };
}