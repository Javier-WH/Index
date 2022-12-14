const express = require("express");
const path = require("path");
const app = express();
const IP = require("./libraries/networkInterfaces.js");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, ".env") });
const rutines = require("./libraries/startRoutines.js");
const sess = require("./libraries/sessionStore.js")

app.use(sess)
app.use(express.static(path.join(__dirname,"../client/" )));



app.use(require("./routes/home.routes.js"));
app.use(require("./routes/login.routes.js"));
app.use(require("./routes/student.routes.js"));
app.use(require("./routes/teacherSubjects.routes.js"));
app.use(require("./routes/studentGrades.routes.js"));
app.use(require("./routes/user.routes.js"));
app.use(require("./routes/pensum.routes.js"));
app.use(require("./routes/tutor.routes.js"));
app.use(require("./routes/teacher.routes.js"))
app.use(require("./routes/config.routes.js"));
app.use(require("./routes/evalPlan.routes.js"))

require("./database/sequalize/relations/relations.js");

app.listen(process.env.PORT, process.env.IP, error=>{
    console.clear();
    if(error){
        console.error(error);
        return
    }
    rutines();
    console.log(`*********************************************************************************************************************************************************************`);
    console.log(`El servidor se ha iniciado en -> ${IP()}:${process.env.PORT} `);

})