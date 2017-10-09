var db = require('./db');

function saveUser(user) {
    db.data.insert(user)
} 

 function loadUser(id) {
     return db.data.select(id);
 } 

 exports.data = {
    saveUser: saveUser,
    loadUser: loadUser    
}