/**
 * Title: skelton-capstone.js
 * Description: Capstone project object schema
 * Author: Cody Skelton
 * Date: 03.08.24
 * Code requirements from WEB 420 week 9 capstone assignment
 * Code derived from WEB 420 course repository
 */

var mongoose = require('mongoose');

let Schema = mongoose.Schema;

let playerSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    salary: { type: Number }
})

let teamSchema = new Schema({
    name: { type: String },
    mascot: { type: String },
    players: [playerSchema]
})

module.exports = mongoose.model('Team', teamSchema);