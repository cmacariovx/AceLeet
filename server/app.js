const express = require("express")
const bodyParser = require("body-parser")
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const authRouter = require("./routes/authRoutes")
const userRouter = require("./routes/userRoutes")

const app = express()

app.use(helmet());

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
        },
    })
);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200)
    }

    next()
})

app.use("/auth", authRouter)
app.use("/user", userRouter)

app.use((req, res, next) => {
    const error = new Error("Could not find this route.")
    throw error
})

app.use((error, req, res, next) => {
    if (res.headerSent) return next(error)

    res.status(error.status || 500)
    res.json({"message": error.message || "Unknown error occured."})
})

app.listen(process.env.PORT || 5000)
