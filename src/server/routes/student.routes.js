const express = require("express");
const Router = express.Router();
const multer = require('multer');
const path = require('path');
const {getStudentList, insertStudent, getStudent, getPhoto, setPhoto, inscribeStudent, getStudentFullList, deleteStudent} = require("../controllers/getStudent.controller.js");


const storage = multer.diskStorage({
    destination: path.join(__dirname, "../utility/files"),
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

Router.get("/studentList", express.urlencoded(), getStudentList);

Router.get("/student", express.urlencoded(), getStudent);

Router.post("/student", express.json(), insertStudent);

Router.get("/photo", express.urlencoded(), getPhoto);

Router.post("/photo", multer({ storage, dest: "fileContainer" }).single("file"), setPhoto);

Router.post("/inscribe", express.json(), inscribeStudent);

Router.get("/studentFullList", express.urlencoded(), getStudentFullList);

Router.delete("/student", express.json(), deleteStudent);

module.exports = Router;