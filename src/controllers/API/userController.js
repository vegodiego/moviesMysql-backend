const jwt = require("jsonwebtoken");
const pool = require("../../database");
const helpers = require("../../helpers");


// post register
exports.postRegister = async (req, res, next) => {
  try {
    const data = {
      email: req.body.email,
      password: req.body.password
    }
    
    const newUser = await pool.query("INSERT INTO User SET ?", [data]); //creando el objeto en la bd sin password encriptado (como tal este no es el objeto creado, es un objeto resultado del exito de dicha creacion que en su key insertId tiene el id del objeto creado)
    data.password = await helpers.encryptPassword(data.password); //encriptando del password
    await pool.query("UPDATE User SET ? WHERE id = ?",[data,newUser.insertId]) //modificando el objeto ya con el password encriptado
    console.log("Nuevo usuario creado");

    res.json({"userId":newUser.insertId, "error":"false"});
  } catch(err){ //si hay errores
    if(err.code === "ER_DUP_ENTRY"){ //error de validación en la base de datos pues el usuario ya existe
    
      res.json({"user":null, "error":"true"}); 
    }else{ //otro error
      return next(err); 
    }   
  }
};

// post login
exports.postLogin = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const rows = await pool.query("SELECT * FROM User WHERE email = ?", [email]); //buscando el usuario en la bd
    if(rows.length === 1){ //el usuario existe 
      const user = rows[0]; //sacando el usuario de rows
      const validPassword = await helpers.matchPassword(password, user.password) //validando el password ingresado con el password de la bd
      if (validPassword) { 
        const tokenUserId = jwt.sign({userId: user.id}, process.env.SECRET_KEY); //Generacion del token del usuario(guarda el objeto {userId: user._id})
        console.log("Nuevo ingreso de usuario");

        res.json({"tokenUserId":tokenUserId, "error":"false"});
      } else {
        console.log("Ingreso de usuario fallido porque la contraseña no es la del usuario"); //error pues los valores ingresados no corresponden entre ellos
        
        res.json({"tokenUserId":null, "error":"true"});
      }
    } else { // el usuario no existe
      console.log("Ingreso de usuario fallido porque el usuario no existe"); //error pues el usuario no existe
      
      res.json({"tokenUserId":null, "error":"true"});
    }
  } catch (err) { //otro error
    return next(err); 
  }
};