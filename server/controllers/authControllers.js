const mongo = require('../mongo')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require("dotenv").config()

async function userSignup (req, res, next) {
    const { username, email, password } = req.body

    const usernameRegex = /^[a-zA-Z0-9]{3,}$/;
    if (!usernameRegex.test(username)) {
        return res.status(400).json({ message: 'Username must be at least 3 characters and contain only letters and numbers.' })
    }

    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Please enter a valid email address.' })
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: 'Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, and one number.' })
    }

    let plainPassword = password
    let hashedPassword = await bcrypt.hash(password, 12)

    const createdUser = {
        username,
        email,
        password: hashedPassword,
        joinedDate: Date.now(),
    }

    let signupResult = await mongo.userSignup(req, res, next, createdUser)

    if (signupResult.status === 200 && !signupResult.error) {
        const loginUser = {
            email: email,
            password: plainPassword,
        }
        await userLogin(req, res, next, loginUser)
    }
      else {
        res.status(signupResult.status).json({ error: signupResult.error })
    }
}

async function userLogin (req, res, next, loginUser = null) {
    if (loginUser != null) {
        const { email, password } = loginUser;
        let loginResult = await mongo.userLogin(req, res, next, {
            email: email,
            password: password,
        })
    }
    else {
        let loginResult = await mongo.userLogin(req, res, next, null);
    }
}

exports.userSignup = userSignup
exports.userLogin = userLogin
