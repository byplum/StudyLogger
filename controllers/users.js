const User = require('../models/user');

module.exports.renderSignup = (req, res) => {
    res.render('users/signup');
}

module.exports.signup = async (req, res, next) => {
    try {
        const { firstName, lastName, email, username, password } = req.body;
        const user = new User({ firstName, lastName, email, username });
        const regUser = await User.register(user, password);
        req.login(regUser, err => {
            if (err) return next(err)
            req.flash('success', 'Welcome to Study Logger!');
            res.redirect('/study-sessions');
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/signup');
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.login = (req, res) => {
    req.flash("success", "Welcome to Study Logger");
    const redirectUrl = req.session.returnTo || "/study-sessions";
    delete req.session.returnTo;
    res.redirect(redirectUrl);
  }

module.exports.logout = (req, res, next) => {
    req.logout(err => {
        if (err) return next(err);
        req.flash('success', "Goodbye!");
        res.redirect('/');
    });
}

module.exports.renderRank = async (req, res) => {
    const users = await User.find({}).populate({
        path: 'studySessions'
    });

   
    for(let i = 0; i < users.length; i++) {
        users[i].totalTime = users[i].studySessions.reduce(
            (previousValue, currentValue) => previousValue + currentValue.duration, 
            0,
        );
    }

    res.render('users/rank', {users});
}

module.exports.showUser = async (req, res) => {
    const {username} = req.params;
    const user = await User.findOne({username}).populate({
        path: 'studySessions'
    });
    user.totalTime = user.studySessions.reduce(
        (previousValue, currentValue) => previousValue + currentValue.duration, 
        0,
    );
    res.render('users/show', {user});
}