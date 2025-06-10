const express = require('express');
const app = express();
const port = 3000;

const http = require('http');
const usersRoutes = require('./routes/users.routes');
const server = http.createServer(app)

const cors = require('cors');
const corsOptions = {
  origin: '*', // Orígenes permitidos (cuando esté en un dominio real, lo cambiaremos por ese dominio)
  methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'] // Headers permitidos
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/', usersRoutes);

const io = require('socket.io')(server, { cors: corsOptions})
io.on('connection', client => {
    console.log(`usuario conectado`);
    client.on('client-message', data => {
      io.emit('server-message', data)
    })
})

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
