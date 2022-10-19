INSERT INTO teachers(id,names,`lastNames`,ci,gender,birthdate,phone,email,admin,`user`,password) VALUES(1,'Francisco Javier','Rodríguez Hernández',16193765,'m','1984-02-24 00:00:00','04142946675','franciscoJavierr@gmail.com',1,'Xaver','123');

INSERT INTO teacher_subjects(id,`teacherId`,subjects) VALUES(1,1,' [
        {
           "Matemática": ["1A", "1B", "4A"],
            "Física": ["3A", "4B"],
            "Biología":["2A", "3A"]
        }
    ]');

INSERT INTO studentlists(id,names,`lastNames`,ci,gender,birthdate) VALUES(1,'Juaquin','Lopez',46465,'m','2002-09-26 00:00:00');

INSERT INTO grades(id,subjects,period,section,`schoolYear`,`studentId`) VALUES(1,'{
                "Matemática":{
                    "lap1": "18",
                    "lap2": "19",
                    "lap3": "20",
                    "def": "19"
                },"Física":{
                    "lap1": "12",
                    "lap2": "16",
                    "lap3": "14",
                    "def": "13"
 }
}',2022,'A',1,1);