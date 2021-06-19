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
            console.log("Famille crée avec succès",{ id: res.insertId, ...newFamille});
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

module.exports = famille;