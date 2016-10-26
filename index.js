let express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    routes = require('./server-assets/routes/index'),
    handlers = require('./utils/handlers'),
    server = express(),
    port = process.env.PORT || 1582;
var http = require('http').Server(server);
var io = require('socket.io')(http);

//Registers Middleware for server
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use('/', express.static(`${__dirname}/public/planets/`));
server.use('/api', cors(handlers.corsOptions), routes.router);
server.use('/', handlers.defaultErrorHandler);

server.get('/', function(req, res) {
    res.sendfile('index.html');
});

io.on('connection', function(socket) {
    console.log('A user connected');

    setInterval(function() {
        socket.emit('ping', 'The time now is either what your watch says or ' + new Date().getTime())
    }, 5000)
});

http.listen(port, function () {
    console.log(`Creating worlds on port: ${port}`);
})