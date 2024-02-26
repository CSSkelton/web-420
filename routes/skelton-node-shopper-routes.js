/**
 * Title: skelton-node-shopper-routes.js
 * Description: Customer API routes
 * Author: Cody Skelton
 * Date: 02.25.2024
 * Code requirements from WEB 420 week 7 assignment
 * Code derived from WEB 420 course repository
 */

const express = require('express');
const router = express.Router();
const Customer = require('../models/skelton-customer');

/**
 * createCustomer
 * @openapi
 * /api/customers:
 *  post:
 *    summary: Creates a customer object
 *    description: API for adding new person objects
 *    requestBody:
 *      description: Customer's information
 *      content:
 *        application/json:
 *          schema:
 *            required:
 *              - firstName
 *              - lastName
 *              - userName
 *            properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *              userName:
 *                type: string
 *    responses:
 *      '200':
 *        description: Composer documents
 *      '500': 
 *        description: Server Exception
 *      '501':
 *        description: MongoDB Exception
 *    tags:
 *      - Customer
 */
router.post('/customers', async(req, res) => {
    try{
        const newCustomer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
        }

        await Customer.create(newCustomer, function(err, customer) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(customer);
                res.json(customer);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

/**
 * createInvoiceByUserName
 * @openapi
 * /api/customers/{username}/invoices:
 *   post:
 *     summary: Creates an invoice
 *     description: API for creating an invoice based on customer username
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: Username of customer to invoice
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Invoice
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               subtotal:
 *                 type: number
 *               tax:
 *                 type: number
 *               dateCreated:
 *                 type: string
 *               dateShipped:
 *                 type: string
 *               lineItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     price:
 *                       type: number
 *                     quantity:
 *                       type: number
 *     responses:
 *       '200':
 *         description: Composer documents
 *       '500': 
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 *     tags:
 *      - Customer
 */
router.post('/customers/:username/invoices', async(req, res) => {
    try {
        const customer = await Customer.findOne({
            'userName': req.params.username
        });
        
        const newInvoice = {
            subtotal: req.body.subtotal,
            tax: req.body.tax,
            dateCreated: req.body.dateCreated,
            dateShipped: req.body.dateShipped,
            lineItems: req.body.lineItems
        }

        customer.invoices.push(newInvoice);

        await customer.save();

        console.log(customer);
        res.json(customer);
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
});

/**
 * findAllInvoicesByUserName
 * @openapi
 * /api/customers/{username}/invoices:
 *   get:
 *     summary: Displays all invoices for a user
 *     description: API to display invoices
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: Username of customer with invoices
 *         schema:
 *           type: string
 *     responses:
 *      '200':
 *        description: Person documents
 *      '500': 
 *        description: Server Exception
 *      '501':
 *        description: MongoDB Exception
 *     tags:
 *      - Customer
 */
router.get('/customers/:username/invoices', async(req, res) => {
    try {
        const customer = await Customer.findOne({
            userName: req.params.username
        });

        if (customer) {
            console.log(customer.invoices);
            res.json(customer.invoices);
        } else {
            res.status(401).send({
                'message': 'Customer doesn\'t exist'
            })
        }

    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
});

module.exports = router;