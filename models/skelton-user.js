/**
 * Title: skelton-user.js
 * Description: User object schema
 * Author: Cody Skelton
 * Date: 02.18.2024
 * Code requirements from WEB 420 week 6 assignment
 * Code derived from WEB 420 course repository
 */

var mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    userName: { type: String },
    password: { type: String },
    emailAddress: []
})

module.exports = mongoose.model('User', userSchema);