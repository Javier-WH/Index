const express = require("express");
const path = require("path");
const app = express();
const IP = require("./libraries/networkInterfaces.js");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, ".env") });



app.use(express.static(path.join(__dirname,"../client/" )));



app.use(require("./routes/home.routes.js"));
app.use(require("./routes/login.routes.js"));
app.use(require("./routes/student.routes.js"));

require("./database/sequalize/relations/oneToMany.js");
app.listen(process.env.PORT, process.env.IP, error=>{
    console.clear();
    if(error){
        console.error(error);
        return
    }
    console.log(`El servidor se ha iniciado en -> ${IP()}:${process.env.PORT} `);
})