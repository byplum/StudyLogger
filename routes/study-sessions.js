const express = require('express');
const router = express.Router();

const studySessions = require('../controllers/study-sessions');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const StudySession = require('../models/study-session');
const {isLoggedIn, isAuthor, validateStudySession} = require('../middleware');

router.route('/')
    .get(catchAsync(studySessions.index))
    .post(isLoggedIn, validateStudySession, catchAsync(studySessions.createStudySession));

router.get('/new', isLoggedIn, studySessions.renderNewForm);

router.route('/:id')
    .get(catchAsync(studySessions.showStudySession))
    .put(isLoggedIn, isAuthor, validateStudySession, catchAsync(studySessions.updateStudySession))
    .delete(isLoggedIn, isAuthor, catchAsync(studySessions.deleteStudySession));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(studySessions.renderEditForm));

module.exports = router;