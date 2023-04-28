const mongo = require('../mongo')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require("dotenv").config()

let topics = ["Array", "String", "Hash Table", "Math", "Dynamic Programming", "Sorting", "Greedy", "Depth-First Search", "Binary Search", "Database", "Breadth-First Search", "Tree", "Matrix", "Two Pointers", "Binary Tree", "Bit Manipulation", "Heap (Priority Queue)", "Stack", "Prefix Sum", "Graph", "Design", "Simulation", "Counting", "Backtracking", "Sliding Window", "Union Find", "Linked List", "Ordered Set", "Monotonic Stack", "Enumeration", "Recursion", "Trie", "Divide and Conquer", "Binary Search Tree", "Bitmask", "Queue", "Number Theory", "Memoization", "Segment Tree", "Geometry", "Topological Sort", "Binary Indexed Tree", "Hash Function", "Game Theory", "Shortest Path", "Combinatorics", "Data Stream", "Interactive", "String Matching", "Rolling Hash", "Brainteaser", "Randomized", "Monotonic Queue", "Merge Sort", "Iterator", "Concurrency", "Doubly-Linked List", "Probability and Statistics", "Quickselect", "Bucket Sort", "Suffix Array", "Minimum Spanning Tree", "Counting Sort", "Shell", "Line Sweep", "Reservoir Sampling", "Eulerian Circuit", "Radix Sort", "Strongly Connected Component", "Rejection Sampling", "Biconnected Component"]

function initializeTopics() {
    const topicsObj = {};

    topics.forEach((topic) => {
        topicsObj[topic] = {
            lastPracticed: null,
            totalTopicProblemsSolved: 0,
            totalTopicProblemsSolvedWithSolution: 0,
            totalTopicProblemsSolvedWithoutSolution: 0,
            totalTopicEasySolved: 0,
            totalTopicMediumSolved: 0,
            totalTopicHardSolved: 0,
            averageTopicTime: 0,
            topicProblems: [],
        };
    });

    return topicsObj;
}

async function userSignup (req, res, next) {
    const { username, email, password } = req.body;

    const usernameRegex = /^[a-zA-Z0-9]{3,}$/;
    if (!usernameRegex.test(username)) {
        return res.status(400).json({ message: 'Username must be at least 3 characters and contain only letters and numbers.' });
    }

    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Please enter a valid email address.' });
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: 'Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, and one number.' });
    }

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
                totalProblemAttempted: {
                    totalProblemsAttemptedNum: 0,
                    totalProblemsAttemptedArr: [],
                },
                totalProblemsSolved: {
                    totalProblemsSolvedNum: 0,
                    totalProblemsSolvedArr: [],
                },
                totalProblemsSolvedWithSolution: 0,
                totalProblemsSolvedWithoutSolution: 0,
                totalEasySolved: 0,
                totalMediumSolved: 0,
                totalHardSolved: 0,
            },
            totalPracticeHours: 0,
            averageProblemTime: 0,
            averageDifficultyIntervals: [],
            topics: initializeTopics(),
        }
    };

    let signupResult = await mongo.userSignup(req, res, next, createdUser);

    if (signupResult.status === 200 && !signupResult.error) {
        const loginUser = {
            email: email,
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
        const { email, password } = loginUser;
        let loginResult = await mongo.userLogin(req, res, next, {
            email: email,
            password: password,
        });
    }
    else {
        let loginResult = await mongo.userLogin(req, res, next, null);
    }
}

exports.userSignup = userSignup
exports.userLogin = userLogin
