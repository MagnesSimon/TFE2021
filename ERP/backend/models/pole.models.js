const sql = require("./db");

// Constructor
const pole = function (pole) {
    this.id_pole = pole.id_pole;
    this.nom_pole = pole.nom_pole;
    this.quantite_type = pole.quantite_type;
}
/*
Permet d'insérer une nouvelles pole dans la DB
 */
pole.create = (newPole, result) => {
    sql.query("INSERT INTO pole SET ?", newPole, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }else {
            console.log("pole crée avec succès",{ id: res.insertId, ...newPole});
            result(null, { id: res.insertId, ...newPole});
        }
    });
}

pole.getAll = result => {
    sql.query("SELECT * FROM pole", (err, res) => {
        if(err){
            console.log("Error: ", err);
            result(null, err);
            return;
        }else {
            result(null, res);
        }
    });
}

pole.getById = (id_pole, result) => {
    sql.query(`SELECT * FROM pole WHERE id_pole = ${id_pole}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found pole: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

pole.updateById = (id_pole, nom_pole, quantite_type, result) => {
    sql.query(
        "UPDATE pole SET id_pole = ?, nom_pole = ?, quantite_type = ?",
        [pole.id_pole, pole.nom_pole, pole.quantite_type],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log("updated pole: ", {id: id, ...pole});
            result(null, {id: id, ...pole});
        }
    );
};

pole.remove = (id, result) => {
    sql.query("DELETE FROM pole WHERE id_pole = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("deleted pole with id: ", id);
        result(null, res);
    });
};

module.exports = pole;