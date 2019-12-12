const User = require('../models/user');

const login = async function(req, res, next) {
    let email = req.body.email;
    let password = req.body.password;
  
    console.log(email, password, '??>>>')
    user = await User.findOne({email: email, password: password});

    if(user){
        res.status(200).json({status: 'success', user: user})
    } else {
        res.status(401).json({status: 'failure', user: {}})
    }
};
  
logout = function(req, res, next){
    let token = req.body.token;
};

module.exports = {
    login: login,
    logout: logout
}