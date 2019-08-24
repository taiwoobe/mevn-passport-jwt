const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const dbConfig = require('./config/config');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

// require('./authentication/passport');

// Connect to Mongoose and set connection variable
mongoose.connect(dbConfig.url, { useNewUrlParser: true, useCreateIndex: true}).then(() => {
    console.log("Successfully connected to the database"); 
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

const apiRoutes = require('./routes/routes');

app.get('/', (req, res) => {
    res.send({
        message: 'Hello World'
    })
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`MEVN passport-jwt App listening on port ${port}!`))

app.use('/api', apiRoutes);