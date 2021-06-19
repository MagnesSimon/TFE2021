const sql = require("./db");

// Constructor
const localite = function (localite) {
    this.code_postal = localite.code_postal;
    this.nom_localite = localite.nom_localite;
    this.id_pays = localite.id_pays;
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