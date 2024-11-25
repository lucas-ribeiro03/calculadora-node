const mongoose = require('mongoose');
const { type } = require('os');

const calcSchema = new mongoose.Schema({
    conta: {type: String, required: true},
    resultado: {type: Number, required: false},
    feitoEm: {type: Date, default: Date.now}
});

const CalcModel = mongoose.model('contas', calcSchema);
module.exports = CalcModel;