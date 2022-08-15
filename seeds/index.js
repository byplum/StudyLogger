const mongoose = require('mongoose');
const {adjectives, nouns, names} = require('./seedHelper');
const StudySession = require('../models/study-session');

mongoose.connect('mongodb://localhost:27017/study-logger');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];
const types = ['Reading', 'Vocab', 'Homework', 'Skill Development', 'Other'];

const seedDB = async () => {
    await StudySession.deleteMany({});
    for(let i = 0; i < 50; ++i) {
        const ss = new StudySession({
            author: '62f930c8b72a7af5fe0f00ea',
            title: `${sample(adjectives)} ${sample(nouns)}`,
            category: `${sample(types)}`,
            duration: Math.floor(Math.random() * 120) + 1
        });
        await ss.save();
    }
}

seedDB();