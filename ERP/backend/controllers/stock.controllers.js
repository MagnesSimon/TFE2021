const Stock = require("../models/stock.models.js");

exports.findAll = (req, res) => {
    Stock.getAll((err, data) => {
        if (err){
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving 'stock'."
            });
        } else {
            res.send(data);
        }
    });
}

exports.findOne = (req, res) => {
    Stock.getById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found stock with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving stock with id " + req.params.id
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
    Stock.updateById(
        req.params.id,
        new Stock(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found stock with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating stock with id " + req.params.id
                    });
                }
            } else
                res.send(data);
        }
    );
};