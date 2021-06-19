const sql = require("./db");

// Constructor
const pays = function (pays) {
    this.id_pays = pays.id_pays;
    this.nom_pays = pays.nom_pays;
}
/*
Permet d'insérer un nouveau pays dans la DB
 */
pays.create = (newPays, result) => {
    sql.query("INSERT INTO pays SET ?", newPays, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }else {
            console.log("pays crée avec succès",{ id: res.insertId, ...newPays});
            result(null, { id: res.insertId, ...newPays});
        }
    });
}

pays.getAll = result => {
    sql.query("SELECT * FROM pays", (err, res) => {
        if(err){
            console.log("Error: ", err);
            result(null, err);
            return;
        }else {
            result(null, res);
        }
    });
}

pays.getById = (id, result) => {
    sql.query(`SELECT * FROM pays WHERE id_pays = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found pays: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

pays.updateById = (id_pays, nom_pays, result) => {
    sql.query(
        "UPDATE pays SET id_pays = ?, nom_pays = ?",
        [pays.id_pays, pays.nom_pays, pays.quantite_en_stock],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log("updated pays: ", {id: id, ...pays});
            result(null, {id: id, ...pays});
        }
    );
};

pays.remove = (id, result) => {
    sql.query("DELETE FROM pays WHERE id_pays = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("deleted pays with id: ", id);
        result(null, res);
    });
};

module.exports = pays;