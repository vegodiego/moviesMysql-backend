const bcrypt = require("bcrypt");

const helpers = {};

helpers.encryptPassword = async (password) => { //encriptacion
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (err) {
  	console.log(err)
  }	
};

helpers.matchPassword = async (password, savedPassword) => { //comparacion
  try {
    return await bcrypt.compare(password, savedPassword);
  } catch (err) {
    console.log(err)
  }
};

module.exports = helpers;