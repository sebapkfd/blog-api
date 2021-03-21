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