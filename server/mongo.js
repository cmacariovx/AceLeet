const MongoClient = require("mongodb").MongoClient
const ObjectId = require("mongodb").ObjectId
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

require("dotenv").config()

const mongoUrl = process.env.MONGO_URL
const jwtSecret = process.env.JWT_SECRET

async function escapeAndFind(collection, field, value) {
    const escapeStringRegexp = await import('escape-string-regexp');
    const escapedValue = escapeStringRegexp.default(value);
    return collection.findOne({ [field]: escapedValue });
}

async function userSignup(req, res, next, newUser) {
    const client = new MongoClient(mongoUrl);
    let result;
    let existingUserByEmail;
    let existingUserByUsername;

    try {
        await client.connect();
        const db = client.db("sr");

        existingUserByEmail = await escapeAndFind(db.collection('users'), 'email', newUser.email);
        existingUserByUsername = await escapeAndFind(db.collection('users'), 'username', newUser.username);

        if (existingUserByEmail && existingUserByUsername) {
            client.close();
            return { status: 409, message: null, error: "Email and username already exist.", result: null };
        }

        if (existingUserByEmail) {
            client.close();
            return { status: 409, message: null, error: "Email already exists.", result: null };
        }

        if (existingUserByUsername) {
            client.close();
            return { status: 409, message: null, error: "Username already exists.", result: null };
        }

        result = await db.collection("users").insertOne(newUser);

        client.close();

        return { status: 200, message: "User created successfully.", error: null, result: null };
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
        return { status: 500, message: null, error: "Sorry! Could not add user, please try again.", result: null };
    }
}

async function userLogin(req, res, next, user) {
    const client = new MongoClient(mongoUrl);

    try {
        await client.connect();
        const db = client.db("sr");
        let result;

        if (user == null) {
            result = await escapeAndFind(db.collection('users'), 'username', req.body.text);
        }
        else {
            result = await escapeAndFind(db.collection('users'), 'username', user.username);
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
            { username: result.username },
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
        console.error("Error connecting to MongoDB:", error);
        client.close();
        return res.status(500).json({ error: 'Something went wrong. Please try again.' });
    }
}

async function fetchUser(req, res, next) {
    const { userId, email } = req.body;

    const client = new MongoClient(mongoUrl);

    try {
        await client.connect();
        const db = client.db('sr');

        const userIdObjectId = new ObjectId(userId);

        const user = await db.collection('users').findOne({
            _id: userIdObjectId,
            email: email,
        });

        client.close();

        return { status: 200, message: 'User found.', error: null, result: user };
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
        client.close();
        return { status: 500, message: null, error: "Could not find user.", result: null };
    }
}

async function updateUserTech(req, res, next) {
    const { userId, userTechnicalData } = req.body;

    const client = new MongoClient(mongoUrl);

    try {
        await client.connect();
        const db = client.db('sr');

        const userIdObjectId = new ObjectId(userId);

        const result = await db.collection('users').updateOne(
            { _id: userIdObjectId },
            { $set: { "technicalData": userTechnicalData } }
        );

        client.close();

        if (result.modifiedCount === 1) {
            return { status: 200, message: 'User technical data updated.', error: null, result: result };
        } else {
            return { status: 400, message: 'User not found.', error: null, result: null };
        }
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
        client.close();
        return { status: 500, message: null, error: "Could not update user's technical data.", result: null };
    }
}

exports.userSignup = userSignup;
exports.userLogin = userLogin;
exports.fetchUser = fetchUser;
exports.updateUserTech = updateUserTech;
