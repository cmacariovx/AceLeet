const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const csrf = require('csurf');

const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");

require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";

const app = express();

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

app.use(bodyParser.json({ limit: '10mb' }));

app.use((req, res, next) => {
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

    if (isProduction) {
        const allowedOrigins = ["https://aceleet.io", "https://www.aceleet.io"];
        const origin = req.headers.origin;

        if (allowedOrigins.indexOf(origin) >= 0) {
            res.setHeader("Access-Control-Allow-Origin", origin);
        }
    } else {
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    }

    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, CSRF-Token");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Credentials", "true");

    if (req.method === "OPTIONS") {
        return res.status(200).json({});
    }

    next();
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.use((req, res, next) => {
    const error = new Error("Could not find this route.");
    throw error;
});

app.use((error, req, res, next) => {
    if (res.headerSent) return next(error);

    res.status(error.status || 500);
    res.json({
        message: error.message || "Unknown error occurred.",
        stack: isProduction ? null : error.stack,
    });
});

app.listen(process.env.PORT || 5000);
