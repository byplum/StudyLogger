const mongoose = require('mongoose');
const Comment = require('./comment');
const User = require('./user');
const Schema = mongoose.Schema;

const StudySessionSchema = new Schema({
        category: {
            type: String,
            required: true,
            enum: ['Reading', 'Vocab', 'Homework', 'Skill Development', 'Other']
        },
        title: String,
        timeStarted: String,
        timeEnded: String,
        duration: Number,
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        description: String,
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ],
    },
    { timestamps: true }
);

StudySessionSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Comment.deleteMany({
            _id: {
                $in: doc.comments
            }
        });
        await User.findByIdAndUpdate(doc.author, { $pull: { studySessions: doc._id } });
    }
})

module.exports = mongoose.model('StudySession', StudySessionSchema);