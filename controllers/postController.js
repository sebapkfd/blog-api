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

exports.update_post = (req, res, next) => {
    const updatedPost = new Post({
        title: req.body.title,
        text: req.body.text,
        timestamp: req.body.timestamp,
        user: req.body.user,
        published: req.body.published,
        _id: req.params.id
    })

    Post.findByIdAndUpdate(req.params.id, updatedPost, {},  (err, updatedItem) => {
        if (err) { return next(err) }
        res.send('Post Updated')
    })
}

exports.list_unpublished = (req, res, next) => { //this could be simplified
    Post.find({'published': false, 'user': req.params.id})
    .populate('user')
    .exec((err, list_post) => {
        if (err) { return next(err)}
        res.json(list_post)
    })
}