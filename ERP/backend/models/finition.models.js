const sql = require("./db");

// Constructor
const finition = function (finition) {
    this.id_finition = finition.id_finition;
    this.nom_finition = finition.nom_finition;
    this.effet_finition = finition.effet_finition;

}
/*
Permet d'insérer une nouvelle finition dans la DB
 */
finition.create = (newFinition, result) => {
    sql.query("INSERT INTO finition SET ?", newFinition, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }else {
            console.log("Finition crée avec succès",{ id: res.insertId, ...newFinition});
            result(null, { id: res.insertId, ...newFinition});
        }
    });
}
/*
Permet de récupérer la liste de toutes les finitions avec tout ses attributs
 */
finition.getAll = result => {
    sql.query("SELECT * FROM finition", (err, res) => {
        if(err){
            console.log("Error: ", err);
            result(null, err);
            return;
        }else {
            result(null, res);
        }
    });
}

finition.getById = (finitionId, result) => {
    sql.query(`SELECT * FROM finition WHERE id_finition = ${finitionId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found finition: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

finition.updateById = (id, nom_finition, result) => {
    sql.query(
        "UPDATE finition SET nom_finition = ?, effet_finition = ?",
        [finition.nom_finition, finition.effet_finition],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log("updated finition: ", {id: id, ...finition});
            result(null, {id: id, ...finition});
        }
    );
};

finition.remove = (id, result) => {
    sql.query("DELETE FROM finition WHERE id_finition = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("deleted finition with id: ", id);
        result(null, res);
    });
};


module.exports = finition;