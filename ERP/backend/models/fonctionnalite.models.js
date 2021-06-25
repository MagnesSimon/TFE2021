const sql = require("./db");

// Constructor
const fonctionnalite = function (fonctionnalite) {
    this.id_fonctionnalite = fonctionnalite.id_fonctionnalite;
    this.libelle_fonctionnelite = fonctionnalite.libelle_fonctionnelite;
}
/*
Permet d'insérer une nouvelles fonctionnalite dans la DB
 */
fonctionnalite.create = (newFonctionnalite, result) => {
    sql.query("INSERT INTO fonctionnalite SET ?", newFonctionnalite, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }else {
            console.log("fonctionnalite crée avec succès",{ id: res.insertId, ...newFonctionnalite});
            result(null, { id: res.insertId, ...newFonctionnalite});
        }
    });
}

fonctionnalite.getAll = result => {
    sql.query("SELECT * FROM fonctionnalite", (err, res) => {
        if(err){
            console.log("Error: ", err);
            result(null, err);
            return;
        }else {
            result(null, res);
        }
    });
}

fonctionnalite.getById = (id_fonctionnalite, result) => {
    sql.query(`SELECT * FROM fonctionnalite WHERE id_fonctionnalite = ${id_fonctionnalite}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found fonctionnalite: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

fonctionnalite.updateById = (id_fonctionnalite, libelle_fonctionnalite, result) => {
    sql.query(
        "UPDATE fonctionnalite SET id_fonctionnalite = ?, libelle_fonctionnalite = ?",
        [fonctionnalite.id_fonctionnalite, fonctionnalite.libelle_fonctionnalite],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log("updated fonctionnalite: ", {id: id, ...fonctionnalite});
            result(null, {id: id, ...fonctionnalite});
        }
    );
};

fonctionnalite.remove = (id, result) => {
    sql.query("DELETE FROM fonctionnalite WHERE id_fonctionnalite = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("deleted fonctionnalite with id: ", id);
        result(null, res);
    });
};

module.exports = fonctionnalite;