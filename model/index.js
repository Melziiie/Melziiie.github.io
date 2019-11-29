var mysql = require('mysql');
var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'phase',
    debug: false
});

let query = function( sql, values ) {
    // Promise
    return new Promise(( resolve, reject ) => {
      connection.getConnection(function(err, connection) {
        if (err) {
          reject( err )
        } else {
            console.log(sql);
          connection.query(sql, values, ( err, rows) => {
  
            if ( err ) {
              reject( err )
            } else {
              resolve( rows )
            }
            
            connection.release()
          })
        }
      })
    })
  }

module.exports = query;