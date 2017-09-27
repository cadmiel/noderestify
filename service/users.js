const sha1 = require('sha1');

const users = (deps) => { 
    
    return {
        all:()=>{
            return new Promise((resolve, reject) => {
                
                const {connection, errorHandler} = deps;
    
                connection.query('SELECT * FROM users', function (error, results, fields) {
                    if (error) {
                        errorHandler(error, 'Erro ao listar as user', reject);
                        return false;
                    }
                        resolve( {users:results} );
                });
    
            })
        },
        save:(name, email, password)=>{
            return new Promise((resolve, reject) => {
                
                const {connection, errorHandler} = deps;
    
                connection.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, sha1(password)], function (error, results, fields) {
                    if (error) {
                        errorHandler(error, 'Erro ao cadastrar user', reject);
                        return false;
                    }
                        resolve( {user:{name:name,email:email,id:results.insertId} } );
                });
    
            })
        },
        update:(id,name,email)=>{
            return new Promise((resolve, reject) => {
                
                const {connection, errorHandler} = deps;
    
                connection.query('UPDATE users set name=?, email=? where id=?', [name, email, id], function (error, results, fields) {
                    if (error) {
                        errorHandler(error, 'Falha ao atualizar user', reject);
                        return false;
                    }
                        resolve( {user:{name:name,email:email,id:id} } );
                });
    
            }) 
        },
        del:(id)=>{
            return new Promise((resolve, reject) => {
                
                const {connection, errorHandler} = deps;
    
                connection.query('DELETE FROM users where id=?', [id], function (error, results, fields) {
                    if (error) {
                        errorHandler(error, 'Falha ao deletar user', reject);
                        return false;
                    }
                        resolve( {category:{id:id} } );
                });
    
            }) 
        }
        
    }
    
    
    
    };
    
    module.exports = users;