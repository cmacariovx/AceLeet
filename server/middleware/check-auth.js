const jwt = require('jsonwebtoken')
require("dotenv").config()

const jwtSecret = process.env.JWT_SECRET

module.exports = (req, res, next) => {
    if (req.method === "OPTIONS") return next()

    try {
        const token = req.headers.authorization.split(" ")[1]

        if (!token) {
            throw new Error("Auth failed")
        }

        const decodedToken = jwt.verify(token, jwtSecret)

        req.userData = { username: decodedToken.username }
        next()
    }
    catch (error) {
        console.log("Auth failed")
        return;
    }
}
