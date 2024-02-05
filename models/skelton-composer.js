/**
 * Title: skelton-composer.js
 * Description: Composer object schema
 * Author: Cody Skelton
 * Date: 02.04.2024
 * Code requirements from WEB 420 week 4 assignment
 * Code derived from WEB 420 course repository
 */

var mongoose = require('mongoose');

let Schema = mongoose.Schema;

let composerSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String }
})

module.exports = mongoose.model('Composer', composerSchema);