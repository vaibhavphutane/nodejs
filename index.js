const express = require('express');
const app = express();
const users = require('./routes/users');
app.use(express.json());

app.use('/api/users', users);

app.listen(3000, (res) => {
    console.log('Listening on 3000..');
});
