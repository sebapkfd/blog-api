const express = require('express');
const passport = require('passport');

const router = express.Router();

const user_controller = require('../controllers/userController');
const post_controller = require('../controllers/postController');
const msg_controller = require('../controllers/commentController');

// Home page
router.get('/', function(req, res, next) {
  res.redirect('/api/posts');
});

// POST create new post - api/posts
router.post('/posts', passport.authenticate("jwt", { session: false }), post_controller.create_post);

// // GET all posts - api/posts
router.get('/posts', post_controller.list_post);

// // GET single posts - api/posts/:id
router.get('/posts/:id', post_controller.post_detail);

// // PUT update post - api/posts/:id
router.put('/posts/edit/:id', passport.authenticate("jwt", { session: false }), post_controller.update_post);

// // DELETE delete post - api/posts/:id
router.delete('/posts/:id', passport.authenticate("jwt", { session: false }), post_controller.delete_post);

// // GET all unpublished posts - api/unpublished
router.get('/unpublished/:id', passport.authenticate("jwt", { session: false}), post_controller.list_unpublished);

// // POST publish post
// router.post('/posts/:id/publish', passport.authenticate("jwt", { session: false }), post_controller.publish_post);

// // POST unpublish post
// router.post('/posts/:id/unpublish', passport.authenticate("jwt", { session: false }), post_controller.unpublish_post);

// // POST create new comment - api/posts/:postid/comments
router.post('/comments', passport.authenticate("jwt", { session: false }), msg_controller.create_comment);

// // GET single comment -api/posts/:postid/comments/:commentid
router.get('/comments/:id', msg_controller.comment_detail);

// // PUT update comment - api/posts/:postid/comments/:commentid
router.put('/comments/edit/:id',passport.authenticate("jwt", { session: false }), msg_controller.update_comment);

// // DELETE delete comment - api/posts/:postid/comments/:commentid
router.delete('/comments/:id',passport.authenticate("jwt", { session: false }), msg_controller.delete_comment);

// POST user signup - api/signup
router.post('/signup', user_controller.signup);

// POST user login -api/login
router.post('/login', user_controller.login);

// GET user logout -api/logout
router.get('/logout', user_controller.logout);

module.exports = router;