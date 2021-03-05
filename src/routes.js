const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const users = require('./controllers/API/userController.js');
const movies = require('./controllers/API/movieController.js');
const pool = require("./database");



// Authorization middleware
const requireApiUser = async (req, res, next) => {
  try{
    const token = req.header("Authorization");  //token enviado en el encabezado   
  	const decoded = await jwt.verify(token, process.env.SECRET_KEY); //decodificación del token para ver si es válido (si si, se tiene el objeto {userId: user._id} guaradado en el post login)
    const rows = await pool.query('SELECT * FROM User WHERE id = ?', [decoded.userId]); //buscando el userId de la decodificación en el modelo User
    if(rows.length === 1){ //el usuario existe (token válido)
      next();
    }
    else{ // token no válido (caso en el que no hay usuario con ese id generado)
      res.status(401).send({error: "Not authenticated"});
    }
  } catch(err){ //token no válido (por otras cosas) ó token no enviado
  	if(err.name === "JsonWebTokenError"){
  		res.status(401).send({error: "Invalid token"});
    } else{
  		return next(err);
  	}
  }
};


// user routes //

// post register
router.post("/register", users.postRegister);

// post login
router.post("/login", users.postLogin);


// movie routes //

// get movies
router.get("/movies", requireApiUser, movies.getMovies);

// post new movie
router.post("/movies", requireApiUser, movies.postNewMovie);

// delete movie
router.get("/movies/:id/delete", requireApiUser, movies.deleteMovie);


module.exports = router;