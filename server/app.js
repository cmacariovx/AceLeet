const express = require("express")
const bodyParser = require("body-parser")
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const fs = require('fs');
const http = require('http');
const https = require('https');
const cookieParser = require('cookie-parser');

const authRouter = require("./routes/authRoutes")
const userRouter = require("./routes/userRoutes")

require("dotenv").config()

const isProduction = process.env.NODE_ENV === 'production';

const app = express()

app.use(helmet());
app.use(cookieParser());

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
        },
    })
);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});

app.use(limiter);

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

    if (isProduction) {
        const allowedOrigins = ['https://aceleet.io', 'https://www.aceleet.io'];
        const origin = req.headers.origin;

        if (allowedOrigins.indexOf(origin) > -1) {
            res.setHeader('Access-Control-Allow-Origin', origin);
        }
    } else {
        res.setHeader('Access-Control-Allow-Origin', '*');
    }

    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, CSRF-Token');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)

app.use((req, res, next) => {
    const error = new Error("Could not find this route.")
    throw error
})

app.use((error, req, res, next) => {
    if (res.headerSent) return next(error);

    res.status(error.status || 500)
    res.json({
        "message": error.message || "Unknown error occured.",
        "stack": isProduction ? null : error.stack,
    });
});


if (isProduction) {
    const privateKey = fs.readFileSync('/app/certs/privkey.pem', 'utf8');
    const certificate = fs.readFileSync('/app/certs/fullchain.pem', 'utf8');

    const credentials = {
        key: privateKey,
        cert: certificate,
    };

    const httpsServer = https.createServer(credentials, app);
    httpsServer.listen(process.env.PORT || 5000);
} else {
    const httpServer = http.createServer(app);
    httpServer.listen(process.env.PORT || 5000);
}
