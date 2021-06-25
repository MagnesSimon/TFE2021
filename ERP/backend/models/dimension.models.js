const sql = require("./db");

// Constructor
const dimension = function (piece) {
    this.valeur_dimension = piece.valeur_dimension;
}
/*
Permet d'insérer une nouvelles dimension dans la DB
 */
dimension.create = (newDimension, result) => {
    sql.query("INSERT INTO dimension SET ?", newDimension, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }else {
            console.log("dimension crée avec succès",{ id: res.insertId, ...newDimension});
            result(null, { id: res.insertId, ...newDimension});
        }
    });
}

dimension.getAll = result => {
    sql.query("SELECT * FROM dimension", (err, res) => {
        if(err){
            console.log("Error: ", err);
            result(null, err);
            return;
        }else {
            result(null, res);
        }
    });
}

dimension.getById = (valeur_dimension, result) => {
    sql.query(`SELECT * FROM dimension WHERE valeur_dimension = ${valeur_dimension}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found dimension: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

dimension.updateById = (valeur_dimension, result) => {
    sql.query(
        "UPDATE dimension SET valeur_dimension = ?",
        [dimension.valeur_dimension],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log("updated dimension: ", {id: id, ...dimension});
            result(null, {id: id, ...dimension});
        }
    );
};

dimension.remove = (id, result) => {
    sql.query("DELETE FROM dimension WHERE valeur_dimension = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("deleted dimension with id: ", id);
        result(null, res);
    });
};

module.exports = dimension;