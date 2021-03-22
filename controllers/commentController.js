const Comment = require('../models/comment')

exports.create_comment = (req, res, next) => {
    const newComment = new Comment({...req.body});
    newComment.save((err) => {
        if (err) { return next(err)};
        res.send('Comment saved!')
    })
}

exports.delete_comment = (req, res, next) => {
    Comment.findByIdAndRemove(req.body.id)
    .exec((err) => {
        if (err) {return next(err)}
        res.send('Comment deleted')
    })
}

exports.comment_detail = (req, res, next) => {
    Comment.findById(req.params.id)
    .populate('post')
    .populate('user')
    .exec((err, comment_detail) => {
        if (err) { return next(err)}
        res.json(comment_detail)
    })
}

exports.update_comment = (req, res, next) => {
    const updatedComment = new Comment({
        text: req.body.text,
        timestamp: req.body.timestamp,
        user: req.body.user,
        post: req.body.post,
        _id: req.params.id
    })

    Comment.findByIdAndUpdate(req.params.id, updatedComment, {},  (err, updatedItem) => {
        if (err) { return next(err) }
        res.send('Comment Updated')
    })
}