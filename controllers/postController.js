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

exports.delete_post = (req, res, next) => {
    Post.findByIdAndRemove(req.body.id)
    .exec((err) => {
        if (err) {return next(err)}
        res.send('Post deleted')
    })
}

exports.post_detail = (req, res, next) => {
    Post.findById(req.params.id) //Later need to populate
    .populate('user')
    .exec((err, post) => {
        if(err) { return next(err) }
        res.send(post);
    })
}