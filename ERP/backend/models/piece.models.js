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

    this.id_pays = pays.id_pays;
    this.nom_pays = pays.nom_pays;
}
/*
Permet d'insérer une nouvelles piece dans la DB
 */
piece.create = (newPiece, result) => {
    sql.query("INSERT INTO piece SET ?", newPiece, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }else {
            console.log("piece crée avec succès",{ id: res.insertId, ...newPiece});
            result(null, { id: res.insertId, ...newPiece});
        }
    });
}

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

piece.getById = (reference, result) => {
    sql.query(`SELECT * FROM piece WHERE reference = ${reference}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found piece: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

piece.updateById = (reference, valeur_seuil, quantite_en_stock, id_jeu_de_dimension,
                    id_famille, id_categorie, id_finition, result) => {
    sql.query(
        "UPDATE piece SET reference = ?, valeur_seuil = ?, quantite_en_stock = ?, id_jeu_de_dimension = ?," +
        " id_famille = ?, id_categorie = ?, id_finition = ?",
        [piece.reference, piece.valeur_seuil, piece.quantite_en_stock, piece.id_jeu_de_dimension,
            piece.id_famille, piece.id_categorie, piece.id_finition],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log("updated piece: ", {id: id, ...piece});
            result(null, {id: id, ...piece});
        }
    );
};

piece.remove = (id, result) => {
    sql.query("DELETE FROM piece WHERE id_fournisseur = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("deleted piece with id: ", id);
        result(null, res);
    });
};

module.exports = piece;