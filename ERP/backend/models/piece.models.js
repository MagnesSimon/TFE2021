const sql = require("./db");

// Constructor
const piece = function (piece) {
    this.reference = piece.reference;
    this.valeur_seuil = piece.valeur_seuil;
    this.quantite_en_stock = piece.quantite_en_stock;
    this.id_jeu_de_dimension = piece.id_jeu_de_dimension;
    this.id_famille = piece.id_famille;
    this.id_categorie = piece.id_categorie;
    this.id_finition = piece.id_finition;
}
/*
Permet d'insérer une nouvelles pieces dans la DB
 */
piece.create = (newPiece, result) => {
    sql.query("INSERT INTO piece SET ?", newPiece, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }else {
            console.log("Piece crée avec succès",{ id: res.insertId, ...newPiece});
            result(null, { id: res.insertId, ...newPiece});
        }
    });
}
/*
Permet de récupérer la liste de toutes les pièces avec tout ses attributs
 */
piece.getAll = result => {
    sql.query("SELECT * FROM piece", (err, res) => {
        if(err){
            console.log("Error: ", err);
            result(null, err);
            return;
        }else {
            result(null, res);
        }
    });
}

module.exports = piece;