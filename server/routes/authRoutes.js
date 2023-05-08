const express = require("express")
const authControllers = require('../controllers/authControllers')

const router = express.Router()

router.post("/signup", authControllers.validateSignup, authControllers.handleValidationErrors, authControllers.userSignup);

router.post("/login", authControllers.validateLogin, authControllers.handleValidationErrors, authControllers.userLogin);

module.exports = router
