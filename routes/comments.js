const express = require('express');
const router = express.Router({ mergeParams: true });

const comments = require('../controllers/comments');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const StudySession = require('../models/study-session');
const Comment = require('../models/comment');
const { commentSchema } = require('../schemas');
const {isLoggedIn, isCommentAuthor, validateComment} = require('../middleware');


router.post('/', isLoggedIn, validateComment, catchAsync(comments.createComment));

router.delete('/:cId', isLoggedIn, isCommentAuthor, catchAsync(comments.deleteComment));

module.exports = router;