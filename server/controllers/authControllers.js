const mongo = require('../mongo')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator');
require("dotenv").config()

let topics = ["Array", "String", "Hash Table", "Math", "Dynamic Programming", "Sorting", "Greedy", "Depth-First Search", "Binary Search", "Database", "Breadth-First Search", "Tree", "Matrix", "Two Pointers", "Binary Tree", "Bit Manipulation", "Heap (Priority Queue)", "Stack", "Prefix Sum", "Graph", "Design", "Simulation", "Counting", "Backtracking", "Sliding Window", "Union Find", "Linked List", "Ordered Set", "Monotonic Stack", "Enumeration", "Recursion", "Trie", "Divide and Conquer", "Binary Search Tree", "Bitmask", "Queue", "Number Theory", "Memoization", "Segment Tree", "Geometry", "Topological Sort", "Binary Indexed Tree", "Hash Function", "Game Theory", "Shortest Path", "Combinatorics", "Data Stream", "Interactive", "String Matching", "Rolling Hash", "Brainteaser", "Randomized", "Monotonic Queue", "Merge Sort", "Iterator", "Concurrency", "Doubly-Linked List", "Probability and Statistics", "Quickselect", "Bucket Sort", "Suffix Array", "Minimum Spanning Tree", "Counting Sort", "Shell", "Line Sweep", "Reservoir Sampling", "Eulerian Circuit", "Radix Sort", "Strongly Connected Component", "Rejection Sampling", "Biconnected Component"];

function initializeTopics() {
    const topicsObj = {};

    topics.forEach((topic) => {
        topicsObj[topic] = {
            lastPracticed: null,
            totalTopicProblemsAttempted: 0,
            totalTopicProblemsSolved: 0,
            topicTimeSum: 0,
            topicDifficultySum: 0,
            averageTopicTime: null,
            averageTopicDifficulty: null,
            topicProblemsSolved: [],
            topicProblemsAttempted: [],
            totalTopicProblemsSolvedWithSolution: 0,
            totalTopicProblemsSolvedWithoutSolution: 0,
            totalTopicEasySolved: 0,
            totalTopicMediumSolved: 0,
            totalTopicHardSolved: 0,
            schedule: [0, 1, 4, 7, 14, 28],
            scheduleIdx: 0,
            problemsDone: 0,
        };
    });

    return topicsObj;
}

const validateSignup = [
    check('username')
      .trim()
      .notEmpty().withMessage('Username is required')
      .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
      .isAlphanumeric().withMessage('Username must contain only letters and numbers'),
    check('email')
      .trim()
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Please enter a valid email address'),
    check('password')
      .trim()
      .notEmpty().withMessage('Password is required')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/).withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
];

const validateLogin = [
    check('username')
        .trim()
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
        .isAlphanumeric().withMessage('Username must contain only letters and numbers'),
    check('password')
        .trim()
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/).withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
];

async function handleValidationErrors(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }
    next();
}

async function userSignup (req, res, next) {
    const { username, email, password } = req.body;

    let plainPassword = password;
    let hashedPassword = await bcrypt.hash(password, 12);

    const createdUser = {
        username,
        email,
        password: hashedPassword,
        joinedDate: Date.now(),
        isPremiumUser: false,
        technicalData: {
            problems: {
                totalProblemsAttempted: 0,
                totalProblemsSolved: 0,
                totalProblemsSolvedWithSolution: 0,
                totalProblemsSolvedWithoutSolution: 0,
                totalEasySolved: 0,
                totalMediumSolved: 0,
                totalHardSolved: 0,
            },
            problemIds: [],
            totalPracticeTime: 0,
            averageProblemTime: 0,
            averageDifficultyIntervals: [],
            topics: initializeTopics(),
        }
    };

    let signupResult = await mongo.userSignup(req, res, next, createdUser);

    if (signupResult.status == 200 && !signupResult.error) {
        const loginUser = {
            username: username,
            password: plainPassword,
        }
        await userLogin(req, res, next, loginUser);
    }
    else {
        res.status(signupResult.status).json({ error: signupResult.error });
    }
}

async function userLogin (req, res, next, loginUser = null) {
    if (loginUser != null) {
        const { username, password } = loginUser;
        let loginResult = await mongo.userLogin(req, res, next, {
            username: username,
            password: password,
        });
    }
    else {
        let loginResult = await mongo.userLogin(req, res, next, null);
    }
}

exports.validateSignup = validateSignup;
exports.validateLogin = validateLogin;
exports.handleValidationErrors = handleValidationErrors;
exports.userSignup = userSignup
exports.userLogin = userLogin
