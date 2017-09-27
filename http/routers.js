
const db = require('./../service/mysql');

routers = (server) => {

    server.get('/', function(req, res, next) {        
        res.send('sera que vai');
        next();
      });

      server.post('/autenticacao',  async function(req, res, next) {
        res.send(await db.auth().authenticate('jorge@hotmail.com',123456))
          next();
      });

      server.get('/categoria',  async function(req, res, next) {
        
          try {
            res.send(await db.category().all())
          } catch (error) {
            res.send(error);
          }
          next();
      });

      server.post('/categoria', async function(req, res, next) {
        const {name}  = req.params;
        try {
            res.send(await db.category().save(name))
          } catch (error) {
            res.send(error);
          }
          next();
      });

      server.put('/categoria', async function(req, res, next) {
        const {id, name}  = req.params;
        try {
            res.send(await db.category().update(id, name))
          } catch (error) {
            res.send(error); 
          }
          next();
      });

      server.del('/categoria', async function(req, res, next) {
        const {id}  = req.params;
        try {
            res.send(await db.category().del(id))
          } catch (error) {
            res.send(error);
          }
          next();
      });

}

module.exports = routers;