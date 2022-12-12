/*const path = require('path');
const Session = require("express-session");
const mysqlSession = require("express-mysql-session");
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, ".env") });


const sessionStore = new mysqlSession({
    hots: process.env.DB_HOST,
    port: process.env.BD_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const session = Session({
    key: "index_cookie",
    secret: "BlackTemplar",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    //endConnectionOnClose: true
});

module.exports = session;*/



var session = require('express-session');
var mysql2 = require('mysql2/promise');
var MySQLStore = require('express-mysql-session')(session);

var options = {
    host: process.env.DB_HOST,
    port: process.env.BD_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

let connection = mysql2.createPool(options);
let sessionStore = new MySQLStore({}, connection);


let sess = session({
    key: 'index_cookie',
    secret: 'BlackTemplar',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
});

module.exports = sess;