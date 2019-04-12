const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { validateAuth, User } = require('../model/auth');
const jwt = require('jsonwebtoken');

router.post('/authenticate', async (req, res) => {
    const { error } = validateAuth(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findOne({email: req.body.email});
    if (!user) 
    return res.status(400).send('email or password is invalid');
    const valid = bcrypt.compare(user.psassword, req.body.password);
    if(valid) {
        const token = jwt.sign({_id: user._id}, 'xToolSecrete');
        res.status(200).send({token: token})
    }
});

router.post('/adduser', (req, res) => {
    console.log(req.body);
});

module.exports = router;