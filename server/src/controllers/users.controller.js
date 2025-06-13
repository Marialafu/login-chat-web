const fs = require('fs');
const path = require('path');
const backupMessagesFilePath = path.resolve(
  __dirname,
  '../../data/backupMessages.json'
);

const usersController = {};

usersController.conectionResponse = (req, res) => {
  res.send('Servidor funcionando');
  console.log('Servidor funcionando');
};

usersController.updateBackupMessages = (req, res) => {
  const currentMessage = req.body;

  fs.readFile(backupMessagesFilePath, (error, data) => {
    if (error) return res.status(500).send('Error al leer el archivo');

    const jsonMessages = JSON.parse(data);

    //push del nuevo mensaje al listado de los mensajes ya guardados en json
    jsonMessages.push(currentMessage);

    //alternativa al push:
    //const updatedJsonMessages = [...jsonMessages, currentMessage]
    //expandimos los mensajes ya guardados y añadimos el nuevo

    fs.writeFile(
      backupMessagesFilePath,
      JSON.stringify(jsonMessages),
      error => {
        if (error)
          return res.status(500).send('Error al actualizar el archivo');
      }
    );
  });

  //siempre hay que enviar algo, en este caso confirmamos que el mensaje se ha guardado bien. A modo de objeto, sino no lo lee bien.
  res.send({ message: 'Mensaje guardado con éxito' });
};

usersController.getBackupMessages = (req, res) => {
  fs.readFile(backupMessagesFilePath, (error, data) => {
    if (error) return res.status(500).send('Error al leer el archivo');
    //no hace falta por que se convierte en el api. Si voy a utilizar aquí el dato para hacer algo entonces si tengo que cambiarlo.
    //const jsonMessages = JSON.parse(data);
    res.send(data);
  });
};

module.exports = usersController;
