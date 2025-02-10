
module.exports = (req, res) => {
    const clave = process.env.APIKEY; // Accede a la variable de entorno
  
    res.status(200).json({ clave: clave }); // Envía la clave como respuesta
  };