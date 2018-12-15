require('dotenv').config(); // load .env file

// include external libraries
const express = require('express');
const path = require('path');
const request = require('request');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const routes = require('./routes/index');

// load env variables
const {
    MONGODB_URI,
    NODE_ENV,
    PORT
} = process.env;

const app = express();
let db;

// connect to mongo
MongoClient.connect(
    MONGODB_URI,
    { useNewUrlParser: true },
    (err, mongo) => {
        if (err) {
            console.error(`Unable to connect to MongoDB: ${MONGODB_URI}`);
        } else {
            console.log(`Connected to MongoDB.`);
            db = mongo.db();
        }
    }
);

// add express middleware
app.use(bodyParser.json());
app.use((req, res, next) => {
    req.db = db;
    next();
});

// add app routes
routes(app);

// serve react SPA
if (NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, '../dist')));
    const index = path.resolve(__dirname, '../dist/index.html');
    app.get('*', (req, res) => {
        res.set('Cache-Control', 'private, must-revalidate');
        res.sendFile(index);
    });
} else {
    console.log('webpack building...');
    const config = require(path.resolve(__dirname, '../webpack.dev.js'))(process.env);
    const compiler = require('webpack')(config);

    app.use(require('webpack-dev-middleware')(compiler, {
        publicPath: '/',
        watchOptions: { aggregateTimeout: 1000 },
        logLevel: 'warn'
    }));
    app.use(require('webpack-hot-middleware')(compiler));
    app.get('*', (req, res) => {
        request.get({
            method: 'GET',
            uri: `${req.protocol}://${req.hostname}:${PORT}/index.html`
        }, (err, r, body) => {
            if (err) { return res.status(500).send(err); }
            res.send(body);
        });
    });
}

app.listen(process.env.PORT, () => {
    console.log(`
        Started the VROOM SPA Server.
        mode: ${NODE_ENV} - port: ${PORT}
    `);
});

module.exports = {
    db,
    app
};
