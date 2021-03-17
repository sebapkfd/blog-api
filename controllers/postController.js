const Post = require('../models/post')

exports.create_post = (req, res, next) => {
    const newPost = new Post({...req.body});
    newPost.save((err) => {
        if (err) { return next(err)}
        res.send('Saved!')
    })
}