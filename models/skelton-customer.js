/**
 * Title: skelton-customer.js
 * Description: Customer object schema
 * Author: Cody Skelton
 * Date: 02.25.2024
 * Code requirements from WEB 420 week 7 assignment
 * Code derived from WEB 420 course repository
 */

var mongoose = require('mongoose');

let Schema = mongoose.Schema;

let lineItemSchema = new Schema({
    name: { type: String },
    price: { type: Number },
    quantity: { type: Number }
})

let invoiceSchema = new Schema({
    subtotal: { type: Number },
    tax: { type: Number },
    dateCreated: { type: String },
    dateShipped: { type: String },
    lineItems: [lineItemSchema]
})

let customerSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String },
    invoices: [invoiceSchema]
})

module.exports = mongoose.model('Customer', customerSchema);