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
Permet d'insérer une nouvelles pieces dans la DB
 */
fournisseur.create = (newFournisseur, result) => {
    sql.query("INSERT INTO fournisseur SET ?", newFournisseur, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }else {
            console.log("Fournisseur crée avec succès",{ id: res.insertId, ...newFournisseur});
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

module.exports = fournisseur;