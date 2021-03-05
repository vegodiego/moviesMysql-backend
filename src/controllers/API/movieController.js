const jwt = require("jsonwebtoken");
const pool = require("../../database");


// get movies
exports.getMovies = async (req, res, next) => {
  try {
    const tokenUserId = req.header("Authorization");  //token enviado en el encabezado  
    const decoded = await jwt.verify(tokenUserId, process.env.SECRET_KEY); //decodificación del token (se tiene el objeto {userId: user._id} guardado en el post login)
    const userId = decoded.userId;  
    const movies = await pool.query("SELECT * FROM Movie WHERE userId = ?", [userId]); 

    res.json(movies);
  } catch(err){ //Error 
    return next(err); 
  }
};

// post new movie
exports.postNewMovie = async (req, res, next) => {
  try {
    const tokenUserId = req.header("Authorization");  //token enviado en el encabezado
    const decoded = await jwt.verify(tokenUserId, process.env.SECRET_KEY); //decodificación del token (se tiene el objeto {userId: user._id} guardado en el post login)
    const userId = decoded.userId; 
    
    const data = {
      title: req.body.title,
      poster_path: req.body.poster_path,
      release_date: req.body.release_date,
      vote_average: req.body.vote_average,
      userId: userId
    }

    const insert = await pool.query("INSERT INTO Movie SET ?", [data]); //insertando la nueva pelicula (como tal este no es el objeto creado, es un objeto resultado del exito de dicha creacion que en su key insertId tiene el id del objeto creado)
    console.log("Nueva película favorita agregada");
    const rows = await pool.query("SELECT * FROM Movie WHERE id = ?", [insert.insertId]); //buscando la pelicula recien insertada
    const newMovie = rows[0]; //sacando la pelicula de rows

    res.json(newMovie);
  } catch(err){ //Error   
    return next(err); 
  }
};

// delete movie
exports.deleteMovie = async (req, res, next) => {
  try {
    await pool.query("DELETE FROM Movie WHERE id = ?", [req.params.id]); 
    console.log("Película favorita eliminada");
    
    res.json({"exito":"ok"});
  } catch(err){ //Error 
    return next(err); 
  }
};