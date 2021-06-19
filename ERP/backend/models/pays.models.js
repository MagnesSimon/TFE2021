const sql = require("./db");

// Constructor
const pays = function (pays) {
    this.id_pays = pays.id_pays;
    this.nom_pays = pays.nom_pays;
}
/*
Permet d'insérer une nouvelles pieces dans la DB
 */
pays.create = (newPays, result) => {
    sql.query("INSERT INTO pays SET ?", newPays, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }else {
            console.log("Piece crée avec succès",{ id: res.insertId, ...newPays});
            result(null, { id: res.insertId, ...newPays});
        }
    });
}
/*
Permet de récupérer la liste de toutes les pièces avec tout ses attributs
 */
pays.getAll = result => {
    sql.query("SELECT * FROM pays", (err, res) => {
        if(err){
            console.log("Error: ", err);
            result(null, err);
            return;
        }else {
            result(null, res);
        }
    });
}

module.exports = pays;