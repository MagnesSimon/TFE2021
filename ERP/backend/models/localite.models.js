const sql = require("./db");

// Constructor
const localite = function (localite) {
    this.reference = localite.reference;
    this.valeur_seuil = localite.valeur_seuil;
    this.quantite_en_stock = localite.quantite_en_stock;
    this.id_jeu_de_dimension = localite.id_jeu_de_dimension;
    this.id_famille = localite.id_famille;
    this.id_categorie = localite.id_categorie;
    this.id_finition = localite.id_finition;
}
/*
Permet d'insérer une nouvelles pieces dans la DB
 */
localite.create = (newLocalite, result) => {
    sql.query("INSERT INTO localite SET ?", newLocalite, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }else {
            console.log("Piece crée avec succès",{ id: res.insertId, ...newLocalite});
            result(null, { id: res.insertId, ...newLocalite});
        }
    });
}
/*
Permet de récupérer la liste de toutes les pièces avec tout ses attributs
 */
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

module.exports = localite;