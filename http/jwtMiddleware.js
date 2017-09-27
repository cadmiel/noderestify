const jwt = require('jsonwebtoken');

const jwtMiddleware = (deps) => {
 
  return async (req,res,next) => {

        if(!deps.except.includes(req.href()))
        {

        const token = req.headers['x-access-token'];
        if(!token)
        {
            res.send(403,{error:'toke não fornecido'})
            return false
        }

        try {
            const result = await jwt.verify(token,process.env.JWT_SECRETE)
            req.decoded=result.decoded
        } catch (error) {
            res.send(403,{error:'falha na autenticacao do token'})
            return false
        }
        
    }
        next()
    }

}

module.exports = jwtMiddleware;