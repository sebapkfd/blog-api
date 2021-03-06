const User = require('../models/user');

const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY || 'other';


exports.signup = (req, res, next)=>{

    User.findOne({'username' : req.body.username})
    .exec((err, foundUser) => {
        if (err) { return next(err)}
        if(foundUser) {
            return res.json({ msg: 'Username already used'});
        }
        else {
            const user = new User({
                username: req.body.username
            });
            bcrypt.hash(req.body.password, 10, (err, hashedPassword)=>{
                if(err) {return next(err);}
                user.set('password', hashedPassword);
                user.save(err=>{
                    if(err) {return next(err);}
                    res.status(200).json({
                        message: "Sign up succesfull" + user.username,
                        user: req.user
                    })
                })
            });
        }
    })
}

exports.login = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({ msg: 'Something went wrong.' });
        }
        req.login(user, { session: false }, (error) => {
            if (error) res.send(error);
            const token = jwt.sign({ user }, secret, {
                expiresIn: '1d',
            });
            let data = { _id: user._id, username: user.username};
            return res.json({ user: data, token });
        });
    })(req, res);
}
  
exports.logout = function (req, res) {
    req.logout();
    res.status(200).json({msg: "logged out"});
};