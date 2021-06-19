const sql = require("./db");

// Constructor
const fournisseur = function (fournisseur) {
    this.id_fournisseur = fournisseur.reference;
    this.nom_fournisseur = fournisseur.nom_fournisseur;
    this.mail_fournisseur = fournisseur.mail_fournisseur;
    this.telephone_fournisseur = fournisseur.telephone_fournisseur;
    this.adresse_fournisseur = fournisseur.adresse_fournisseur;
    this.code_postal = fournisseur.code_postal;
}
/*
Permet d'insérer une nouvelles piece dans la DB
 */
fournisseur.create = (newFournisseur, result) => {
    sql.query("INSERT INTO fournisseur SET ?", newFournisseur, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }else {
            console.log("fournisseur crée avec succès",{ id: res.insertId, ...newFournisseur});
            result(null, { id: res.insertId, ...newFournisseur});
        }
    });
}
/*
Permet de récupérer la liste de toutes les pièces avec tout ses attributs
 */
fournisseur.getAll = result => {
    sql.query("SELECT * FROM fournisseur", (err, res) => {
        if(err){
            console.log("Error: ", err);
            result(null, err);
            return;
        }else {
            result(null, res);
        }
    });
}

fournisseur.getById = (id, result) => {
    sql.query(`SELECT * FROM fournisseur WHERE id_fournisseur = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found fournisseur: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

fournisseur.updateById = (id_fournisseur, nom_fournisseur, mail_fournisseur, telephone_fournisseur,
                    adresse_fournisseur, code_postal, result) => {
    sql.query(
        "UPDATE fournisseur SET id_fournisseur = ?, nom_fournisseur = ?, mail_fournisseur = ?, telephone_fournisseur = ?," +
        " adresse_fournisseur = ?, code_postal = ?",
            [fournisseur.id_fournisseur, fournisseur.nom_fournisseur, fournisseur.mail_fournisseur, fournisseur.telephone_fournisseur,
            fournisseur.adresse_fournisseur, fournisseur.code_postal],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log("updated fournisseur: ", {id: id, ...fournisseur});
            result(null, {id: id, ...fournisseur});
        }
    );
};

fournisseur.remove = (id, result) => {
    sql.query("DELETE FROM fournisseur WHERE id_fournisseur = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("deleted fournisseur with id: ", id);
        result(null, res);
    });
};

module.exports = fournisseur;