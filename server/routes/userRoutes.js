const express = require("express")
const userControllers = require('../controllers/userControllers')
const checkAuth = require("../middleware/check-auth")

const router = express.Router()

router.use(checkAuth)

router.post('/all', userControllers.fetchUser);

router.post('/updateUserTech', userControllers.updateUserTech);

module.exports = router