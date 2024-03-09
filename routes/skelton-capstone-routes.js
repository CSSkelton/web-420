/**
 * Title: skelton-capstone-routes.js
 * Description: Capstone API routes
 * Author: Cody Skelton
 * Date: 03.08.2024
 * Code requirements from WEB 420 week 9 capstone assignment
 * Code derived from WEB 420 course repository
 */

const express = require('express');
const router = express.Router();
const Team = require('../models/skelton-capstone');

/**
 * findAllTeams
 * @openapi
 * /api/teams:
 *   get:
 *     summary: Returns a list of team documents
 *     description: API for returning a list of teams from MongoDB Atlas
 *     responses:
 *       '200':
 *         description: Team documents
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 *     tags:
 *       - Team
 */
router.get('/teams', async(req, res) => {
    try {
        Team.find({}, function(err, teams) {
            if (err) {
                console.log(err);
                req.statusCode(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(teams);
                res.json(teams);
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
 * assignPlayerToTeam
 * @openapi
 * /api/teams/{id}/players:
 *   post:
 *     summary: Add a player to a team
 *     description: API for adding a player object to a team's player array
 *     parameters:
 *       -  name: id
 *          in: path
 *          required: true
 *          description: teamId
 *          schema:
 *            type: string
 *     requestBody:
 *       description: Player's information
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               firstName:
 *                  type: string
 *                  description: First name of player
 *               lastName:
 *                   type: string
 *                   description: Last name of player
 *               salary:
 *                   type: number
 *                   description: Salary the player is being paid
 *     responses:
 *       '200':
 *         description: Player document
 *       '401':
 *         description: Invalid teamId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 *     tags:
 *       - Team
 */
router.post('/teams/:id/players', async(req, res) => {
    try {
        const team = await Team.findOne({
            '_id': req.params.id
        });

        const newPlayer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            salary: req.body.salary
        }

        team.players.push(newPlayer);

        await team.save();

        console.log(team);
        res.status(200).send({
            'message': `Updated team: ${team}`
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

/**
 * findAllPlayersByTeamId
 * @openapi
 * /api/teams/{id}/players:
 *   get:
 *     summary: Retrieves all player documents on a team
 *     description: API for retrieving players by team
 *     parameters:
 *       -  name: id
 *          in: path
 *          required: true
 *          description: teamId
 *          schema:
 *            type: string
 *     responses:
 *       '200':
 *         description: Array of player documents
 *       '401':
 *         description: Invalid teamId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 *     tags:
 *       -  Team
 */
router.get('/teams/:id/players', async(req, res) => {
    try {
        Team.findOne({ '_id': req.params.id })
        .then((team) => {
            if (!team) {
                console.log('Error: Invalid teamId');
                res.status(401).send({
                    'message': 'Invalid teamId'
                })
            } else {
                console.log(team);
                res.status(200).send({
                    'message': `${team}`
                })
            }
        })
        .catch((err) => {
            res.status(501).send({
                'message': `MongoDB Exception: ${err}`
            })
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

/**
 * deleteTeamById
 * @openapi
 * /api/teams/{id}:
 *   delete:
 *     summary: Deletes a team
 *     description: API for deleting a team based on teamId
 *     parameters:
 *       -  name: id
 *          in: path
 *          required: true
 *          description: teamId
 *          schema:
 *            type: string
 *     responses:
 *       '200':
 *         description: Team document
 *       '401':
 *         description: Invalid teamId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 *     tags:
 *       - Team
 */
router.delete('/teams/:id', async (req, res) => {
    try {
        const teamDocId = req.params.id;

        Team.findByIdAndDelete({'_id': teamDocId}, function(err, team) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else if (!team) {
                console.log('Error: Invalid teamId');
                res.status(401).send({
                    'message': 'Error: Invalid teamId'
                })
            } else {
                console.log(team);
                res.status(200).send({
                    'message': `Team document: ${team}`
                })
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