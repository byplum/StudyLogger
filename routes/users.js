const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/users');


router.route('/signup')
    .get(users.renderSignup)
    .post(catchAsync(users.signup));

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
      failureMessage: true,
      keepSessionInfo: true,
    }), users.login);

router.get('/logout', users.logout);

router.get('/rank', users.renderRank);

router.get('/users/:username', users.showUser);

module.exports = router;