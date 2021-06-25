const sql = require("./db");

// Constructor
const categorie = function (categorie) {
    this.id_categorie = categorie.id_categorie;
    this.nom_categorie = categorie.nom_categorie;
    this.id_pole = categorie.id_pole;
}
/*
Permet d'insérer une nouvelles categorie dans la DB
 */
categorie.create = (newCategorie, result) => {
    sql.query("INSERT INTO categorie SET ?", newCategorie, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }else {
            console.log("categorie crée avec succès",{ id: res.insertId, ...newCategorie});
            result(null, { id: res.insertId, ...newCategorie});
        }
    });
}

categorie.getAll = result => {
    sql.query("SELECT * FROM categorie", (err, res) => {
        if(err){
            console.log("Error: ", err);
            result(null, err);
            return;
        }else {
            result(null, res);
        }
    });
}

categorie.getById = (id, result) => {
    sql.query(`SELECT * FROM categorie WHERE id_categorie = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found categorie: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

categorie.updateById = (id_categorie, nom_categorie, id_pole, result) => {
    sql.query(
        "UPDATE categorie SET id_categorie = ?, nom_categorie = ?, id_pole = ?",
        [categorie.id_categorie, categorie.nom_categorie, categorie.id_pole],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log("updated categorie: ", {id: id, ...categorie});
            result(null, {id: id, ...categorie});
        }
    );
};

categorie.remove = (id, result) => {
    sql.query("DELETE FROM categorie WHERE id_categorie = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("deleted categorie with id: ", id);
        result(null, res);
    });
};

module.exports = categorie;