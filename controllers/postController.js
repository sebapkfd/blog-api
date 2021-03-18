const Post = require('../models/post')

exports.create_post = (req, res, next) => {
    const newPost = new Post({...req.body});
    newPost.save((err) => {
        if (err) { return next(err)}
        res.send('Saved!')
    })
}

exports.list_post = (req, res, next) => {
    Post.find({'published': true})
    .populate('user')
    .exec((err, list_post) => {
        if (err) { return next(err)}
        res.json(list_post)
    })
}