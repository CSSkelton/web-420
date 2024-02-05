/**
 * Title: skelton-composer-routes.js
 * Description: Composer API routes
 * Author: Cody Skelton
 * Date: 02.04.2024
 * Code requirements from WEB 420 week 4 assignment
 * Code derived from WEB 420 course repository
 */

const express = require('express');
const router = express.Router();
const Composer = require('../models/skelton-composer');

/**
 * findAllComposers
 * @openapi
 * /api/composers:
 *  get:
 *   summary: Returns a list of composer documents
 *   description: API for returning a list of composers from MongoDB Atlas
 *   responses:
 *    '200':
 *      description: Composer documents
 *    '500': 
 *      description: Server Exception
 *    '501':
 *      description: MongoDB Exception
 *   tags:
 *    - Composers
 */
router.get('/composers', async(req, res) => {
    try {
        Composer.find({}, function(err, composers) {
            if (err) {
                console.log(err);
                req.statusCode(501).send({
                    'message': `MongoDB Exception: ${err}` 
                })
            } else {
                console.log(composers);
                res.json(composers);
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
 * findComposerById
 * @openapi
 * /api/composers/{id}:
 *  get:
 *   summary: Returns a composer document
 *   description: API for returning a single composer object from MongoDB
 *   parameters: 
 *    - name: id
 *      in: path
 *      required: true
 *      description: The composerID requested by the user.
 *      schema:
 *       type: string
 *   responses:
 *    '200':
 *      description: Composer documents
 *    '500': 
 *      description: Server Exception
 *    '501':
 *      description: MongoDB Exception
 *   tags:
 *    - Composers
 */
router.get('/composers/:id', async(req, res) => {
    try {
        Composer.findOne({'_id': req.params.id}, function(err, composer) {
            if (err) {
                console.log(err);
                req.statusCode(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(composer);
                res.json(composer);
            }
        })
    } catch (e) {
        console.log(e);
        req.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

/**
 * createComposer
 * @openapi
 * /api/composers:
 *  post:
 *    summary: Creates a composer object
 *    description: API for adding new composer objects
 *    requestBody:
 *      description: Composer's information
 *      content:
 *        application/json:
 *          schema:
 *            properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *    responses:
 *      '200':
 *        description: Composer documents
 *      '500': 
 *        description: Server Exception
 *      '501':
 *        description: MongoDB Exception
 *    tags:
 *      - Composers
 */
router.post('/composers', async(req, res) => {
    try {
        const newComposer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }

        await Composer.create(newComposer, function(err, composer) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(composer);
                res.json(composer);
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