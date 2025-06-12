const fs = require('fs');
const path = require('path')
const backupMessagesFilePath = path.resolve(__dirname, '../../data/backupMessages.json')

const usersController = {}

usersController.conectionResponse = (req, res) => {
    res.send('Servidor funcionando')
    console.log('Servidor funcionando');
}

usersController.updateBackupMessages = (req, res) => {
    const { messagesList } = req.body;

  fs.readFile(backupMessagesFilePath, (error, data) => {
    if (error) return res.status(500).send('Error al leer el archivo');

    const messages = JSON.parse(data);
    console.log(messages);
    

    // fs.writeFile(backupMessagesFilePath, JSON.stringify(updatedMessages), error => {
    //   if (error) return res.status(500).send('Error al actualizar el archivo');
    // });
  });

  res.send();
}

module.exports = usersController;