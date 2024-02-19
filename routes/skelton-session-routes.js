/**
 * Title: skelton-session-routes.js
 * Description: User API routes
 * Author: Cody Skelton
 * Date: 02.18.2024
 * Code requirements from WEB 420 week 6 assignment
 * Code derived from WEB 420 course repository
 */

const express = require('express');
const router = express.Router();
const User = require('../models/skelton-user');
const bcrypt = require('bcryptjs');

const saltRounds = 10;

/**
 * signup
 * @openapi
 * /api/signup:
 *   post:
 *     name: signup
 *     summary: Sign up for service
 *     requestBody:
 *       description: User Information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               -userName
 *               -password
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *               emailAddress:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       '200':
 *         description: Registered user
 *       '401':
 *         description: Username is already in use
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 *     tags:
 *       - Password
 */
router.post('/signup', async(req,res) => {
    try {
      User.findOne({'userName': req.body.userName}, function(err, user) {
        if (err) {
            console.log(err);
            res.status(501).send({
                'message': `MongoDB Exception: ${err}`
            })
        } else {
            if(!user) {
                const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

                const newRegisteredUser = {
                    userName: req.body.userName,
                    password: hashedPassword,
                    emailAddress: req.body.emailAddress
                }

                User.create(newRegisteredUser, function(err, user) {
                    if (err) {
                        console.log(err);
                        res.status(501).send({
                            'message': `MongoDB Exception: ${err}`
                        })
                    } else {
                        console.log(user);
                        res.json(user);
                    }
                })
            } else {
                console.log('Username is taken');
                res.status(401).send({
                    'message': 'Username is taken'
                })
            }        
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
 * login
 * @openapi
 * /api/login:
 *   post:
 *     summary: Logs users into application
 *     description: API for login
 *     requestBody:
 *       description: Login
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Registered user
 *       '401':
 *         description: Invalid username and/or password
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 *     tags:
 *       - Password
 */
router.post('/login', async(req, res) => {
    try {
      User.findOne({'userName': req.body.userName}, function(err, password) {
        if (err) {
            console.log(err);
            res.status(501).send({
                'message': `MongoDB Exception: ${err}`
            })
        } else {
            console.log(password);
            if (password) {
                let passwordIsValid = bcrypt.compareSync(req.body.password, password.password);

                if (passwordIsValid) {
                    console.log('Password Matches');
                    res.status(200).send({
                        'message': 'Password matches'
                    })
                } else {
                    console.log('Password is incorrect');
                    res.status(401).send({
                        'message': 'Invalid username or password'
                    })
                }
            } else {
                console.log('Invalid username');
                res.status(401).send({
                    'message': 'Invalid username or password'
                })
            }
        }
      })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e}`
        })
    }
})


module.exports = router;