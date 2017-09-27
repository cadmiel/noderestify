const sha1 = require('sha1');
const jwt = require('jsonwebtoken');

const auth = (deps) => { 
    
    return { 
        authenticate:(email, password)=>{
            return new Promise((resolve, reject) => {
                const {connection, errorHandler} = deps;
    
                connection.query('SELECT * FROM users where email=? and password=?',[email, sha1(password)], function (error, results, fields) {
                    if (error || !results.length) {
                        errorHandler(error, 'Erro ao listar as categorias', reject);
                        return false;
                    }
                    
                    const {email, id } = results[0];
                    const token = jwt.sign({ email,id }, process.env.JWT_SECRETE, {expiresIn: 60 * 60 * 24});

                    resolve( {token} );
                });
    
            })
        }
    }
}

module.exports = auth