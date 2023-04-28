const MongoClient = require("mongodb").MongoClient
const ObjectId = require("mongodb").ObjectId
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

require("dotenv").config()

const mongoUrl = process.env.MONGO_URL
const jwtSecret = process.env.JWT_SECRET

async function userSignup(req, res, next, newUser) {
    const client = new MongoClient(mongoUrl);
    let result;
    let existingUserByEmail;
    let existingUserByUsername;

    try {
        await client.connect();
        const db = client.db("sr");

        existingUserByEmail = await db.collection("users").findOne({ email: newUser.email });
        existingUserByUsername = await db.collection("users").findOne({ username: newUser.username });

        if (existingUserByEmail && existingUserByUsername) {
            client.close();
            return { status: 409, error: "Email and username already exist." };
        }

        if (existingUserByEmail) {
            client.close();
            return { status: 409, error: "Email already exists." };
        }

        if (existingUserByUsername) {
            client.close();
            return { status: 409, error: "Username already exists." };
        }

        result = await db.collection("users").insertOne(newUser);

        client.close();

        return { status: 200, message: "User created successfully." };
    }
    catch (error) {
        return { status: 500, error: "Sorry! Could not add user, please try again." };
    }
}

async function userLogin(req, res, next, user) {
    const client = new MongoClient(mongoUrl);

    try {
        await client.connect();
        const db = client.db("sr");
        let result;

        if (user == null) {
            result = await db.collection('users').findOne({ email: req.body.text });
            if (!result) result = await db.collection('users').findOne({ username: req.body.text });
        }
        else {
            result = await db.collection('users').findOne({ email: user.email });
        }

        if (!result) {
            client.close();
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        let isPasswordValid;

        if (user == null) {
            isPasswordValid = await bcrypt.compare(req.body.password, result.password);
        }
        else {
            isPasswordValid = await bcrypt.compare(user.password, result.password);
        }

        if (!isPasswordValid) {
            client.close();
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        const token = jwt.sign(
            { userId: result._id.toString(), email: result.email, username: result.username },
            jwtSecret,
        )

        client.close()
        return res.status(200).json({
            userId: result._id.toString(),
            token,
            email: result.email,
            username: result.username,
            joinedDate: result.joinedDate,
        })
    }
    catch (error) {
        client.close();
        return res.status(500).json({ error: 'Something went wrong. Please try again.' });
    }
}

exports.userSignup = userSignup
exports.userLogin = userLogin
