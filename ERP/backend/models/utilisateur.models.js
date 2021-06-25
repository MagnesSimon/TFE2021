const sql = require("./db");

// Constructor
const utilisateur = function (utilisateur) {
    this.id_utilisateur = utilisateur.reference;
    this.nom_utilisateur = utilisateur.valeur_seuil;
    this.psw_utilisateur = utilisateur.quantite_en_stock;
    this.id_profil = utilisateur.id_jeu_de_dimension;
}
/*
Permet d'insérer une nouvelles utilisateur dans la DB
 */
utilisateur.create = (newUtilisateur, result) => {
    sql.query("INSERT INTO utilisateurs SET ?", newUtilisateur, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }else {
            console.log("utilisateur crée avec succès",{ id: res.insertId, ...newUtilisateur});
            result(null, { id: res.insertId, ...newUtilisateur});
        }
    });
}

utilisateur.getAll = result => {
    sql.query("SELECT * FROM utilisateurs", (err, res) => {
        if(err){
            console.log("Error: ", err);
            result(null, err);
            return;
        }else {
            result(null, res);
        }
    });
}

utilisateur.getById = (id_utilisateur, result) => {
    sql.query(`SELECT * FROM utilisateurs WHERE id_utilisateur = ${id_utilisateur}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found utilisateur: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

utilisateur.updateById = (id_utilisateur, nom_utilisateur, psw_utilisateur, id_profil, result) => {
    sql.query(
        "UPDATE utilisateurs SET id_utilisateur = ?, nom_utilisateur = ?, psw_utilisateur = ?, id_profil = ?, id_famille = ?, id_categorie = ?, id_finition = ?",
        [utilisateur.id_utilisateur, utilisateur.nom_utilisateur, utilisateur.psw_utilisateur, utilisateur.id_profil],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log("updated utilisateur: ", {id: id, ...utilisateur});
            result(null, {id: id, ...utilisateur});
        }
    );
};

utilisateur.remove = (id, result) => {
    sql.query("DELETE FROM utilisateurs WHERE id_utilisateur = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("deleted utilisateur with id: ", id);
        result(null, res);
    });
};

module.exports = utilisateur;