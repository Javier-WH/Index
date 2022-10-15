const teachers = require("../database/sequalize/models/teachers/teachers.model")

async function validateUser(req, res) {
    try {
    const { user, pass, type } = req.body;

        //esto determina si se valida un profesor, administrador o representante
        let storagedUser = [];
        if (type === 0) {
            storagedUser = await teachers.findAll({ where: { user } });
        }  
        
        
        if (storagedUser.length > 0) {
            let userFounded = storagedUser[0];
            
            if (userFounded.password !== pass) {
                res.json({ error: "La contraseña no es correcta" })
            } else {
                req.session.teachersID = userFounded.id;
                //la respuesta depende si es un profesor, administrador o representante
                if (type === 0) {
                    res.json({ code: 1 });
                } 
                
            }
        } else {
            res.json({ error: "El usuario no está registrado" })
        }
    } catch (error) {
        res.json({ error: "Ha ocurrido un error al realizar la consulta" })
    }
}

module.exports = { validateUser }