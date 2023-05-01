const mongo = require('../mongo')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require("dotenv").config()

async function fetchUser(req, res, next) {
    let userResult = await mongo.fetchUser(req, res, next);
    res.status(userResult.status).json(userResult);
}

async function updateUserTech(req, res, next) {
    let result = await mongo.updateUserTech(req, res, next);
    res.status(result.status).json(result);
}

exports.fetchUser = fetchUser;
exports.updateUserTech = updateUserTech;
