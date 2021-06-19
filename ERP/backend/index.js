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

app.listen(3001, () => {
    console.log("Server is running on port 3001.");
});