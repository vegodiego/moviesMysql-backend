const app = require('./app');
const PORT = process.env.PORT || 4000 //process.env.PORT necesario para el despliegue de heroku
require('dotenv').config();


app.listen(PORT, () => console.log(`Listening on port ${ PORT }!`));

//recordar no dejar comentarios ni impresiones en el backend de la aplicacion (los existentes en esta app son guias)
//recordar no dejar comentarios en el frontend de la aplicacion (los existentes en esta app son guias)
