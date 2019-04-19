const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { validateAuth, User, validateUser } = require('../model/auth');
const jwt = require('jsonwebtoken');

router.post('/authenticate', async (req, res) => {
    const { error } = validateAuth(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findOne({email: req.body.email});
    if (!user) 
    return res.status(400).send('email or password is invalid');
    const valid = await bcrypt.compare(req.body.password, user.password);
    if(valid) {
        const token = await jwt.sign(_.pick(user, ['_id', 'name', 'email']), 'xToolSecrete');
        res.header('x-auth-token', token).status(200).send(_.pick(user, ['_id', 'name', 'email']))
    } else {
        res.status(400).send('Password or email is invalid');
    }
});

router.post('/register', async (req, res) => {
    const {error} =  validateUser(_.pick(req.body, ['name', 'email', 'password']));
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({email: req.body.email})
    if (user) return res.status(400).send('User already exist');
    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(15);
    user.password = await bcrypt.hash(user.password, salt);
    const result = await user.save();
    if (result) return res.status(200).send({message:'User Registered Successfully'});
});

module.exports = router;