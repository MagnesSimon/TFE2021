const sql = require("./db.js");

// constructor
const User = function(user) {
    this.nom = user.nom;
    this.prenom = user.prenom;
    this.mail = user.mail;
    this.tel = user.tel;
    this.mdp = user.mdp;
};

User.create = (newUser, result) => {
    sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created user: ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
};

User.findById = (userId, result) => {
    sql.query(`SELECT * FROM user WHERE id = ${userId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

User.findByMail = (userMail, result) => {
    sql.query(`SELECT * FROM user WHERE mail = "${userMail}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

User.getAll = result => {
    sql.query("SELECT * FROM user", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

User.updateById = (id, user, result) => {
    sql.query(
        `UPDATE user SET nom = ?, prenom = ?, mail = ? , tel = ? , mdp = ? WHERE id = ${id}`,
        [user.nom, user.prenom, user.mail, user.tel,user.mdp, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }


            console.log("updated user: ", { id: id, ...user });
            result(null, { id: id, ...user });
        }
    );
};

User.remove = (id, result) => {
    sql.query("DELETE FROM user WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("deleted user with id: ", id);
        result(null, res);
    });
};

User.findAllCommandByUser = (result) => {
    sql.query(
        "SELECT us.nom, us.prenom, us.mail,us.tel, ar.art_nom, ar.prix FROM commandes as co join user as us on co.cli_id = us.id join articles as ar on ar.art_id = co.art_id", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            result(null, res);
        });
};

User.findCommandForUser = (userId, result) => {
    sql.query(`SELECT us.nom, us.prenom, us.mail,us.tel, ar.art_nom, ar.prix FROM commandes as co join user as us on co.cli_id = us.id 
    join articles as ar on ar.art_id = co.art_id WHERE us.id ="${userId}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found user: ", res);
            result(null, res);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};


module.exports = User;