const sql = require("./db");

// Constructor
const profil = function (profil) {
    this.id_profil = profil.id_profil;
    this.libelle_profil = profil.libelle_profil;
    this.id_fonctionnalite = profil.id_fonctionnalite;
}
/*
Permet d'insérer une nouvelles profil dans la DB
 */
profil.create = (newProfil, result) => {
    sql.query("INSERT INTO profil SET ?", newProfil, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }else {
            console.log("profil crée avec succès",{ id: res.insertId, ...newProfil});
            result(null, { id: res.insertId, ...newProfil});
        }
    });
}

profil.getAll = result => {
    sql.query("SELECT * FROM profil", (err, res) => {
        if(err){
            console.log("Error: ", err);
            result(null, err);
            return;
        }else {
            result(null, res);
        }
    });
}

profil.getById = (id, result) => {
    sql.query(`SELECT * FROM profil WHERE id_profil = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found profil: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

profil.updateById = (id_profil, libelle_profil, id_fonctionnalite, result) => {
    sql.query(
        "UPDATE profil SET id_profil = ?, libelle_profil = ?, id_fonctionnalite = ?",
        [profil.id_profil, profil.libelle_profil, profil.id_fonctionnalite],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log("updated profil: ", {id: id, ...profil});
            result(null, {id: id, ...profil});
        }
    );
};

profil.remove = (id, result) => {
    sql.query("DELETE FROM profil WHERE id_profil = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("deleted profil with id: ", id);
        result(null, res);
    });
};

module.exports = profil;