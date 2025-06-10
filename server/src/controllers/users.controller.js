const usersController = {}

usersController.conectionResponse = (req, res) => {
    res.send('Servidor funcionando')
    console.log('Servidor funcionando');
}

module.exports = usersController;