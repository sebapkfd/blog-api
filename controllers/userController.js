const User = require('../models/user');

exports.log_in = (req, res, next) => {
    res.json('Xddd')
}

exports.sign_up = (req, res, next) => {
    let newUser = new User({
        username: req.body.username,
        password: req.body.password
    });
    
    newUser.save(err => {
        if (err) { return next(err) }
    })

    res.json(newUser.rows);
}
