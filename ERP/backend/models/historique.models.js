const sql = require("./db");

// Constructor
const historique = function (historique) {
    this.id_fiche_historique = historique.id_fiche_historique;
    this.date = historique.date;
    this.quantite_modifie = historique.quantite_modifie;
    this.id_utilisateur = historique.id_utilisateur;
    this.reference = historique.reference;
}
/*
Permet d'insérer une nouvelles historique dans la DB
 */
historique.create = (newHistorique, result) => {
    sql.query("INSERT INTO historique SET ?", newHistorique, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }else {
            console.log("historique crée avec succès",{ id: res.insertId, ...newHistorique});
            result(null, { id: res.insertId, ...newHistorique});
        }
    });
}

historique.getAll = result => {
    sql.query("SELECT * FROM historique", (err, res) => {
        if(err){
            console.log("Error: ", err);
            result(null, err);
            return;
        }else {
            result(null, res);
        }
    });
}

historique.getById = (id_fiche_historique, result) => {
    sql.query(`SELECT * FROM historique WHERE id_fiche_historique = ${id_fiche_historique}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found historique: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

historique.updateById = (id_fiche_historique, date, quantite_modifie, id_utilisateur, reference, result) => {
    sql.query(
        "UPDATE historique SET id_fiche_historique = ?, date = ?, quantite_modifie = ?, id_utilisateur = ?, reference = ?",
        [historique.id_fiche_historique, historique.date, historique.quantite_modifie, historique.id_utilisateur, historique.reference],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log("updated historique: ", {id: id, ...historique});
            result(null, {id: id, ...historique});
        }
    );
};

historique.remove = (id, result) => {
    sql.query("DELETE FROM historique WHERE id_fiche_historique = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("deleted historique with id: ", id);
        result(null, res);
    });
};

module.exports = historique;