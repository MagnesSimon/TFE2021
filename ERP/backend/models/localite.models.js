const sql = require("./db");

// Constructor
const localite = function (localite) {
    this.code_postal = localite.code_postal;
    this.nom_localite = localite.nom_localite;
    this.id_pays = localite.id_pays;
}
/*
Permet d'insérer une nouvelles localite dans la DB
 */
localite.create = (newLocalite, result) => {
    sql.query("INSERT INTO localite SET ?", newLocalite, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }else {
            console.log("localite crée avec succès",{ id: res.insertId, ...newLocalite});
            result(null, { id: res.insertId, ...newLocalite});
        }
    });
}

localite.getAll = result => {
    sql.query("SELECT * FROM localite", (err, res) => {
        if(err){
            console.log("Error: ", err);
            result(null, err);
            return;
        }else {
            result(null, res);
        }
    });
}

localite.getById = (id, result) => {
    sql.query(`SELECT * FROM localite WHERE code_postal = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found localite: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

localite.updateById = (code_postal, nom_localite, id_pays,result) => {
    sql.query(
        "UPDATE localite SET code_postal = ?, nom_localite = ?, id_pays = ?",
        [localite.code_postal, localite.nom_localite, localite.id_pays],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log("updated localite: ", {id: id, ...localite});
            result(null, {id: id, ...localite});
        }
    );
};

localite.remove = (id, result) => {
    sql.query("DELETE FROM localite WHERE code_postal = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("deleted localite with id: ", id);
        result(null, res);
    });
};

module.exports = localite;