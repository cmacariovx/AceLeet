const mongo = require('../mongo')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require("dotenv").config()

async function fetchUser(req, res, next) {
    let userResult = await mongo.fetchUser(req, res, next);

    if (userResult.status == 200 && !userResult.error) {
        res.status(userResult.status).json(userResult);
    }
    else {
        res.status(userResult.status).json(userResult);
    }
}

exports.fetchUser = fetchUser;
