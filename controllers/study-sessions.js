const StudySession = require('../models/study-session');
const User = require('../models/user');
const showTimeStamp = require('../utils/showTimeStamp');

function parseTime(s) {
    var c = s.split(':');
    return parseInt(c[0]) * 60 + parseInt(c[1]);
}



module.exports.index = async (req, res) => {
    const studySessions = await StudySession.find({}).populate('author');
    res.render('study-sessions/index', { studySessions, title: 'History' });
}

module.exports.renderNewForm = (req, res) => {
    res.render('study-sessions/new', {title: 'New Study Session'});
}

module.exports.createStudySession = async (req, res) => {
    const { title, category, timeStarted, timeEnded, description } = req.body;
    const studySession = new StudySession({
        title,
        category,
        timeStarted,
        timeEnded,
        duration: parseTime(timeEnded) - parseTime(timeStarted),
        description,
        author: req.user._id
    });

    const user = await User.findById(req.user._id);
    user.studySessions.unshift(studySession._id);

    await studySession.save();
    await user.save();

    console.log(user);

    req.flash('success', 'Successfully logged your study!');
    res.redirect(`/study-sessions/${studySession._id}`);
}

module.exports.showStudySession = async (req, res) => {
    const ss = await StudySession.findById(req.params.id).populate({
        path: 'comments',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!ss) {
        req.flash('error', 'Cannot find the study you are looking for :(');
        res.redirect('/study-sessions');
    }
    res.render('study-sessions/show', { ss, showTimeStamp, title: ss.title });
}

module.exports.renderEditForm = async (req, res) => {
    const id = req.params.id;
    const ss = await StudySession.findById(id);
    res.render('study-sessions/edit', { ss, title: 'Edit Study Session' });
}

module.exports.updateStudySession = async (req, res) => {
    const id = req.params.id;
    const { title, category, timeStarted, timeEnded, description } = req.body;
    await StudySession.findByIdAndUpdate(id, {
        title,
        category,
        timeStarted,
        timeEnded,
        duration: parseTime(timeEnded) - parseTime(timeStarted),
        description
    });
    req.flash('success', 'Successfully edited your study!');
    res.redirect(`/study-sessions/${id}`);
}

module.exports.deleteStudySession = async (req, res) => {
    const id = req.params.id;
    await StudySession.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted your study!');
    res.redirect('/study-sessions');
}