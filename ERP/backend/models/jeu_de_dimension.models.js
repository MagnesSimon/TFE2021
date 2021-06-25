const sql = require("./db");

// Constructor
const jeu_de_dimension = function (jeu_de_dimension) {
    this.id_jeu_de_dimension = jeu_de_dimension.id_jeu_de_dimension;
    this.libelle = jeu_de_dimension.libelle;
    this.id_dimension = jeu_de_dimension.id_dimension;
}
/*
Permet d'insérer une nouvelles jeu_de_dimension dans la DB
 */
jeu_de_dimension.create = (newJeuDeDimension, result) => {
    sql.query("INSERT INTO jeu_de_dimension SET ?", newJeuDeDimension, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }else {
            console.log("jeu_de_dimension crée avec succès",{ id: res.insertId, ...newJeuDeDimension});
            result(null, { id: res.insertId, ...newJeuDeDimension});
        }
    });
}

jeu_de_dimension.getAll = result => {
    sql.query("SELECT * FROM jeu_de_dimension", (err, res) => {
        if(err){
            console.log("Error: ", err);
            result(null, err);
            return;
        }else {
            result(null, res);
        }
    });
}

jeu_de_dimension.getById = (id_jeu_de_dimension, result) => {
    sql.query(`SELECT * FROM jeu_de_dimension WHERE id_jeu_de_dimension = ${id_jeu_de_dimension}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found jeu_de_dimension: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

jeu_de_dimension.updateById = (id_jeu_de_dimension, libelle, id_dimension, result) => {
    sql.query(
        "UPDATE jeu_de_dimension SET id_jeu_de_dimension = ?, libelle = ?, id_dimension = ?",
        [jeu_de_dimension.id_jeu_de_dimension, jeu_de_dimension.libelle, jeu_de_dimension.id_dimension],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log("updated jeu_de_dimension: ", {id: id, ...jeu_de_dimension});
            result(null, {id: id, ...jeu_de_dimension});
        }
    );
};

jeu_de_dimension.remove = (id, result) => {
    sql.query("DELETE FROM jeu_de_dimension WHERE id_jeu_de_dimension = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("deleted jeu_de_dimension with id: ", id);
        result(null, res);
    });
};

module.exports = jeu_de_dimension;