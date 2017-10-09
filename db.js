var users = [];

let methods = {
	insert: function(newuser) {
        	users.push(newuser);
	},
	select: function(id) {
        	return users[id];
	}
};

exports.data = methods;