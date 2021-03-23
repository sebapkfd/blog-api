const Post = require('../models/post');
const Comment = require('../models/comment');
const async = require('async');

exports.create_post = (req, res, next) => {
    const newPost = new Post({...req.body});
    newPost.save((err) => {
        if (err) { return next(err)}
        res.send('Saved!')
    })
}

exports.list_post = (req, res, next) => {
    Post.find({'published': true})
    .sort({'timestamp':'Descending'})
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
    async.parallel({
        post_detail: (callback) => {
            Post.findById(req.params.id)
            .populate('user')
            .exec(callback);
        },
        post_comments: (callback) => {
            Comment.find({'post': req.params.id})
            .populate('post')
            .populate('user')
            .exec(callback);
        }
    }, (err, results) => {
        if (err) { return next(err)}
        if(results.post_detail === null) {
            let err = new Error('Post not found');
            err.status = 404;
            return next(err)
        }
        res.json({post_detail: results.post_detail, post_comments: results.post_comments})
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

exports.list_unpublished = (req, res, next) => {
    Post.find({'published': false, 'user': req.params.id})
    .populate('user')
    .exec((err, list_post) => {
        if (err) { return next(err)}
        res.json(list_post)
    })
}