const StudySession = require('../models/study-session');
const Comment = require('../models/comment');

module.exports.createComment = async (req, res) => {
    const { id } = req.params;
    const ss = await StudySession.findById(id);
    const newComment = new Comment(req.body.comment);
    newComment.author = req.user._id;
    ss.comments.unshift(newComment);
    await newComment.save();
    await ss.save();
    req.flash('success', 'Added your comment!');
    res.redirect(`/study-sessions/${id}`);
}

module.exports.deleteComment = async (req, res) => {
    const { id, cId } = req.params;
    await StudySession.findByIdAndUpdate(id, { $pull: { comments: cId } });
    await Comment.findByIdAndDelete(cId);
    req.flash('success', 'Successfully deleted your comment!');
    res.redirect(`/study-sessions/${id}`);
}