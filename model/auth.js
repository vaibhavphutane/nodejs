const Joi = require('joi');
const mongoose = require('mongoose');
const config = require('config');

 const connectionUrl = config.get('db');
// mongodb+srv://xToolAdmin:xTool@cluster0-jnjyv.mongodb.net/test?retryWrites=true
mongoose.connect(connectionUrl)
        .then(res => console.log('Mongo Connected..'))
        .catch(err => console.log(err))

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 255,
        unique: true
    }
});

const User = mongoose.model('User', userSchema);

function validateAuthentication(user) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(255).required()
    }
    return Joi.validate(user, schema);
}

function validateUser(user) {
    const schema = {
        name: Joi.string().required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(255).required()
    }
    return Joi.validate(user, schema);
} 

module.exports.validateAuth = validateAuthentication;
module.exports.validateUser = validateUser;
module.exports.User = User;
