/**
 * Title: skelton-person-routes.js
 * Description: Person API routes
 * Author: Cody Skelton
 * Date: 02.11.2024
 * Code requirements from WEB 420 week 5 assignment
 * Code derived from WEB 420 course repository
 */

const express = require('express');
const router = express.Router();
const Person = require('../models/skelton-person');

/**
 * findAllPersons
 * @openapi
 * /api/persons:
 *  get:
 *   summary: Returns a list of person documents
 *   description: API for returning a list of persons from MongoDB Atlas
 *   responses:
 *    '200':
 *      description: Person documents
 *    '500': 
 *      description: Server Exception
 *    '501':
 *      description: MongoDB Exception
 *   tags:
 *    - Person
 */
router.get('/persons', async(req, res) => {
    try {
        Person.find({}, function(err, persons) {
            if (err) {
                console.log(err);
                req.statusCode(501).send({
                    'message': `MongoDB Exception: ${err}` 
                })
            } else {
                console.log(persons);
                res.json(persons);
            }
        })
    } catch (e) {
        console.log(e);
        req.statusCode(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

/**
 * createPerson
 * @openapi
 * /api/persons:
 *  post:
 *    summary: Creates a person object
 *    description: API for adding new person objects
 *    requestBody:
 *      description: Person's information
 *      content:
 *        application/json:
 *          schema:
 *            required:
 *              - firstName
 *              - lastName
 *              - roles
 *              - birthDate
 *            properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *              roles:
 *                type: array
 *                items: 
 *                  type: object
 *                  properties:
 *                    text:
 *                      type: string
 *              dependents:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    firstName:
 *                      type: string
 *                    lastName:
 *                      type: string
 *              birthDate:
 *                type: string
 *    responses:
 *      '200':
 *        description: Composer documents
 *      '500': 
 *        description: Server Exception
 *      '501':
 *        description: MongoDB Exception
 *    tags:
 *      - Person
 */
router.post('/persons', async(req, res) => {
    try {
        const newPerson = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            roles: req.body.roles,
            dependents: req.body.dependents,
            birthDate: req.body.birthDate
        }

        await Person.create(newPerson, function(err, person) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(person);
                res.json(person);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

module.exports = router;