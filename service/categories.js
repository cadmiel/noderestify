//const connection = require('./mysql')

const categories = (deps) => { 

return {
    all:()=>{
        return new Promise((resolve, reject) => {
            
            const {connection, errorHandler} = deps;

            connection.query('SELECT * FROM categories', function (error, results, fields) {
                if (error) {
                    errorHandler(error, 'Erro ao listar as categorias', reject);
                    return false;
                }
                    resolve( {categorias:results} );
            });

        })
    },
    save:(name)=>{
        return new Promise((resolve, reject) => {
            
            const {connection, errorHandler} = deps;

            connection.query('INSERT INTO categories (name) VALUES (?)', [name], function (error, results, fields) {
                if (error) {
                    errorHandler(error, 'Erro ao cadastrar categoria', reject);
                    return false;
                }
                    resolve( {category:{name:name,id:results.insertId} } );
            });

        })
    },
    update:(id,name)=>{
        return new Promise((resolve, reject) => {
            
            const {connection, errorHandler} = deps;

            connection.query('UPDATE categories set name=? where id=?', [name, id], function (error, results, fields) {
                if (error) {
                    errorHandler(error, 'Falha ao atualizar categoria', reject);
                    return false;
                }
                    resolve( {category:{name:name,id:id} } );
            });

        }) 
    },
    del:(id)=>{
        return new Promise((resolve, reject) => {
            
            const {connection, errorHandler} = deps;

            connection.query('DELETE FROM categories where id=?', [id], function (error, results, fields) {
                if (error) {
                    errorHandler(error, 'Falha ao deletar categoria', reject);
                    return false;
                }
                    resolve( {category:{id:id} } );
            });

        }) 
    }
    
}



};

module.exports = categories;