const sql = require("./db");

// Constructor
const stock = function (stock) {
    this.reference = stock.reference;
    this.valeur_seuil = stock.valeur_seuil;
    this.quantite_en_stock = stock.quantite_en_stock;
    this.nom_famille = stock.nom_famille;
    this.nom_categorie = stock.nom_categorie;
    this.nom_finition = stock.nom_finition;
    this.effet_finition = stock.effet_finition;
}

stock.getAll = result => {
    sql.query("SELECT FA.nom_famille, CA.nom_categorie, P.reference, F.nom_finition , F.effet_finition , P.valeur_seuil, P.quantite_en_stock\n" +
        "FROM famille as FA, piece as P, categorie as CA, finition as F \n" +
        "WHERE P.id_famille = FA.id_famille AND P.id_categorie = CA.id_categorie AND P.id_finition = F.id_finition",
        (err, res) => {
        if(err){
            console.log("Error: ", err);
            result(null, err);
            return;
        }else {
            result(null, res);
        }
    });
}

stock.getById = (reference, result) => {
    sql.query(`SELECT FA.nom_famille, CA.nom_categorie, P.reference, F.nom_finition , F.effet_finition , P.valeur_seuil, P.quantite_en_stock
                FROM famille as FA, piece as P, categorie as CA, finition as F 
                WHERE P.id_famille = FA.id_famille AND P.id_categorie = CA.id_categorie AND 
                P.id_finition = F.id_finition AND reference = ${reference}`,
        (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found stock: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

stock.updateById = (nom_famille, nom_categorie, reference, nom_finition,
                    effet_finition, valeur_seuil, quantite_en_stock, result) => {
    sql.query(
        "UPDATE stock SET nom_famille = ?, nom_categorie = ?, reference = ?, nom_finition = ?," +
        " effet_finition = ?, valeur_seuil = ?, quantite_en_stock = ?",
        [stock.nom_famille, stock.nom_categorie, stock.reference, stock.nom_finition,
            stock.effet_finition, stock.valeur_seuil, stock.quantite_en_stock],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log("updated stock: ", {id: id, ...stock});
            result(null, {id: id, ...stock});
        }
    );
};

module.exports = stock;