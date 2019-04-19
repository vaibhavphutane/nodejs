const express = require('express');
const app = express();
const users = require('./routes/users');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const morganStreamLog = fs.createWriteStream(path.join(__dirname, 'logs/app.log'), {flags: 'a'});

app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Expose-Headers', 'x-auth-token');
    next();
});
app.use(express.json());
app.use(morgan('combined', {stream: morganStreamLog}));
app.use('/api/users', users);

const PORT = process.env.PORT || config.httpPort;

app.listen(PORT, (res) => {
    console.log('Listening on 3000..');
});
