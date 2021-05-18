const sql = require("./db.js");

// constructor
const Commande = function(commande) {
    this.cli_id = commande.cli_id;
    this.art_id = commande.art_id;
};

Commande.create = (newCommande, result) => {
    sql.query("INSERT INTO commandes SET ?", newCommande, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created command: ", { id: res.insertId, ...newCommande });
        result(null, { id: res.insertId, ...newCommande });
    });
};

Commande.findByUserId = (userId, result) => {
    sql.query(`SELECT * FROM commandes WHERE cli_id = ${userId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found user command: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

Commande.findById = (userId, result) => {
    sql.query(`SELECT * FROM commandes WHERE com_id = ${userId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found user command: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};



Commande.getAll = result => {
    sql.query("SELECT * FROM commandes", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

Commande.remove = (id, result) => {
    sql.query("DELETE FROM commandes WHERE com_id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("deleted command with id: ", id);
        result(null, res);
    });
};


module.exports = Commande;