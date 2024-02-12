/**
 * Title: skelton-person.js
 * Description: Person, role, and dependent objects schema
 * Author: Cody Skelton
 * Date: 02.11.2024
 * Code requirements from WEB 420 week 5 assignment
 * Code derived from WEB 420 course repository
 */

var mongoose = require('mongoose');

let Schema = mongoose.Schema;

let roleSchema = new Schema({
    text: { type: String }
})

let dependentSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String }
})

let personSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    roles: [roleSchema],
    dependents: [dependentSchema],
    birthDate: { type: String }
})

module.exports = mongoose.model('Person', personSchema);