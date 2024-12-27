const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    task:{type: String, required: true},
    taskDone:{type: Boolean, default: false},
    description:{type: String},
    date:{type: Date, default: Date.now, required: true},
    status:{type: String, required: true},
    priority:{type: String, required: true}
});


const TodoModel = mongoose.model('todo',TodoSchema);

module.exports = TodoModel
