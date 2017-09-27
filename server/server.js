const restify = require('restify');
const server = restify.createServer();
const routers = require('./../http/routers');
const cors  =   require('./cors');
const jwtMiddleware = require('./../http/jwtMiddleware');

server.use(restify.plugins.queryParser({
    mapParams: true
}));
server.use(restify.plugins.bodyParser({
    mapParams: true
}));

const except = ['/autenticacao'];

server.pre(cors.preflight)
server.use(cors.actual)
server.use(restify.plugins.bodyParser())
server.use(jwtMiddleware({except}))

routers(server);

module.exports = server;
