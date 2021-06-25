const sql = require("./db");

// Constructor
const famille = function (famille) {
    this.id_famille = famille.id_famille;
    this.nom_famille = famille.nom_famille;
    this.materiau = famille.materiau;
    this.pour_trou = famille.pour_trou;
    this.specificite_technique = famille.specificite_technique;
    this.image = famille.image;
    this.id_fournisseur = famille.id_fournisseur;
}
/*
Permet d'insérer une nouvelles pieces dans la DB
 */
famille.create = (newFamille, result) => {
    sql.query("INSERT INTO famille SET ?", newFamille, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }else {
            console.log("famille crée avec succès",{ id: res.insertId, ...newFamille});
            result(null, { id: res.insertId, ...newFamille});
        }
    });
}
/*
Permet de récupérer la liste de toutes les pièces avec tout ses attributs
 */
famille.getAll = result => {
    sql.query("SELECT * FROM famille", (err, res) => {
        if(err){
            console.log("Error: ", err);
            result(null, err);
            return;
        }else {
            result(null, res);
        }
    });
}

famille.getById = (reference, result) => {
    sql.query(`SELECT * FROM famille WHERE reference = ${reference}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found famille: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

famille.updateById = (id_famille, nom_famille, materiau, pour_trou,
                    specificite_technique, image, id_fournisseur, result) => {
    sql.query(
        "UPDATE famille SET specificite_technique = ?, nom_famille = ?, materiau = ?, pour_trou = ?," +
        " specificite_technique = ?, image = ?, id_fournisseur = ?",
            [famille.reference, famille.valeur_seuil, famille.quantite_en_stock, famille.id_jeu_de_dimension,
            famille.id_famille, famille.id_categorie, famille.id_finition],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log("updated famille: ", {id: id, ...famille});
            result(null, {id: id, ...famille});
        }
    );
};

famille.remove = (id, result) => {
    sql.query("DELETE FROM famille WHERE id_famille = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("deleted famille with id: ", id);
        result(null, res);
    });
};

module.exports = famille;