/**
 * Title: app.js
 * Author: Cody Skelton
 * Date: 1.13.2024
 * Updated: 02.04.2024
 * Description: Initial file for WEB-420 Repository 
 * Code derived from WEB 420 course repository
 */

const express = require('express');
const http = require('http');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const composerAPI = require('./routes/skelton-composer-routes');
const personAPI = require('./routes/skelton-person-routes');
const loginAPI = require('./routes/skelton-session-routes');
const customerAPI = require('./routes/skelton-node-shopper-routes');
const teamAPI = require('./routes/skelton-capstone-routes');

//DB Connection
var mongoose = require('mongoose');
const conn = "mongodb+srv://web420_user:whHDBZVqyYRpPlJU@cluster0.ifz0to0.mongodb.net/web420DB?retryWrites=true&w=majority"

mongoose.connect(conn, {
    promiseLibrary: require('bluebird'),
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log("Connection to the database was successful");
}).catch(err => {
    console.log(`MongoDB Error: ${err.message}`);
})

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'WEB 420 RESTful APIs',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.js'], // Files containing annotations for the OpenAPI Specification
};

const openapiSpecification = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use('/api', composerAPI);
app.use('/api', personAPI);
app.use('/api', loginAPI);
app.use('/api', customerAPI);
app.use('/api', teamAPI);

http.createServer(app).listen(app.get('port'), function() {
    console.log(`Application started and listening on port ${app.get('port')}`);
})