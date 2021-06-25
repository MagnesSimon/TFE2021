const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const nodemailer = require('nodemailer');
const creds = require('./config/mail.config.js');

//var supportRouter = require('./routes/contact.route');

const app = express();

app.use( bodyParser.json() )
    .use(bodyParser.urlencoded({
        extended: true
    }))
    .use(cors())
    .use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

//app.use('/send', supportRouter);


app.get("/", (req, res) => {
    res.json("Bienvenue dans l'API ERP.");
});

require("./routes/piece.routes")(app);
require("./routes/famille.routes")(app);
require("./routes/fournisseur.routes")(app);
require("./routes/localite.routes")(app);
require("./routes/pays.routes")(app);
require("./routes/finition.routes")(app);
require("./routes/categorie.routes")(app);
require("./routes/pole.routes")(app);
require("./routes/jeu_de_dimension.routes")(app);
require("./routes/dimension.routes")(app);
require("./routes/historique.routes")(app);
require("./routes/utilisateur.routes")(app);
require("./routes/profil.routes")(app);
require("./routes/fonctionnalite.routes")(app);
require("./routes/stock.routes")(app);

app.listen(3001, () => {
    console.log("Server is running on port 3001.");
});