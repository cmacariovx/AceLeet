import React, { useState } from "react";

import './Landing.css';
import x from '../assets/x.png'
import Auth from "../Components/Auth";
import DonutDemo from "../Components/DonutDemo";
import BarDemo from "../Components/BarDemo";
import StatusCircle from "../Components/StatusCircle";

function Landing() {
    const [showAuth, setShowAuth] = useState(false);
    const [isOpen2, setIsOpen2] = useState(true);
    const [showTopics, setShowTopics] = useState(false);
    const [recommendedProblems, setRecommendedProblems] = useState([
        {
            "acRate": 40.477034385314546,
            "difficulty": "Easy",
            "frontendQuestionId": "20",
            "title": "Valid Parentheses",
            "topicTags": [
                "String",
                "Stack"
            ],
            "topic": "Stack"
        },
        {
            "acRate": 40.59706101036053,
            "difficulty": "Medium",
            "frontendQuestionId": "71",
            "title": "Simplify Path",
            "topicTags": [
                "String",
                "Stack"
            ],
            "topic": "Stack"
        },
        {
            "acRate": 61.908850646599554,
            "difficulty": "Medium",
            "frontendQuestionId": "114",
            "title": "Flatten Binary Tree to Linked List",
            "topicTags": [
                "Linked List",
                "Stack",
                "Tree",
                "Depth-First Search",
                "Binary Tree"
            ],
            "topic": "Stack"
        },
        {
            "acRate": 56.85266607308409,
            "difficulty": "Medium",
            "frontendQuestionId": "802",
            "title": "Find Eventual Safe States",
            "topicTags": [
                "Depth-First Search",
                "Breadth-First Search",
                "Graph",
                "Topological Sort"
            ],
            "topic": "Topological Sort"
        },
        {
            "acRate": 58.47420436392999,
            "difficulty": "Medium",
            "frontendQuestionId": "851",
            "title": "Loud and Rich",
            "topicTags": [
                "Array",
                "Depth-First Search",
                "Graph",
                "Topological Sort"
            ],
            "topic": "Topological Sort"
        },
        {
            "acRate": 61.54658080474231,
            "difficulty": "Medium",
            "frontendQuestionId": "1136",
            "title": "Parallel Courses",
            "topicTags": [
                "Graph",
                "Topological Sort"
            ],
            "topic": "Topological Sort"
        },
        {
            "acRate": 53.15320183439168,
            "difficulty": "Medium",
            "frontendQuestionId": "133",
            "title": "Clone Graph",
            "topicTags": [
                "Hash Table",
                "Depth-First Search",
                "Breadth-First Search",
                "Graph"
            ],
            "topic": "Graph"
        },
        {
            "acRate": 47.14721680369789,
            "difficulty": "Medium",
            "frontendQuestionId": "261",
            "title": "Graph Valid Tree",
            "topicTags": [
                "Depth-First Search",
                "Breadth-First Search",
                "Union Find",
                "Graph"
            ],
            "topic": "Graph"
        },
        {
            "acRate": 46.65557775017086,
            "difficulty": "Medium",
            "frontendQuestionId": "277",
            "title": "Find the Celebrity",
            "topicTags": [
                "Two Pointers",
                "Greedy",
                "Graph",
                "Interactive"
            ],
            "topic": "Graph"
        }
    ]);
    const [topicsToRecommend, setTopicsToRecommend] = useState(["Array", "String", "Dynamic Programming", "Depth-First Search", "Binary Search", "Breadth-First Search", "Tree", "Matrix", "Two Pointers", "Binary Tree", "Stack", "Prefix Sum", "Graph", "Sliding Window", "Union Find", "Linked List", "Monotonic Stack", "Recursion","Binary Search Tree", "Topological Sort"]);

    return (
        <div className="landingContainer">
            {showAuth && <Auth onClose={() => setShowAuth(false)}/>}
            <div className="landingHeader">
                <div className="landingHeaderLeft">
                    <img src={x} className="landingHeaderLeftImg"/>
                    <p className="landingHeaderLeftText">AceLeet</p>
                    <p className="landingHeaderLeftText2">BETA</p>
                </div>
                <p className="landingHeaderRight" onClick={() => setShowAuth(true)}>Join Now</p>
            </div>
            <div className="landingIntro">
                <p className="landingIntroUpper">Optimize your LeetCode journey with AceLeet.</p>
                <p className="landingIntroLower">Discover the power of our Spaced Repetition LeetCode Assistant, designed to optimize your LeetCode journey and accelerate mastery. Zero fluff, a simple yet intuitive interface paired with our innovative learning algorithms that analyze your progress, adapt to your learning curve, and propel you towards success with unparalleled efficiency.</p>
            </div>
            <button className="landingButton" onClick={() => setShowAuth(true)}>Join Now</button>
            <div className="landingSection">
                <p className="landingSectionTitle">Visualize your progress</p>
                <p className="landingSectionDesc">Experience the benefits of our beautiful charts for visualizing and tracking your progress, providing a clear overview of your achievements and areas for improvement. Stay organized and motivated as you gain actionable insights, enabling you to optimize your learning and excel in your LeetCode journey.</p>
                <div className="landingSectionCharts">
                    <div className="landingSectionDonut">
                        <DonutDemo />
                    </div>
                    <div className="landingSectionBar">
                        <BarDemo />
                    </div>
                </div>
            </div>
            <div className="landingSection">
                <p className="landingSectionTitle">Personalized recommendations</p>
                <p className="landingSectionDesc">Experience the benefits of our beautiful charts for visualizing and tracking your progress, providing a clear overview of your achievements and areas for improvement. Stay organized and motivated as you gain actionable insights, enabling you to optimize your learning and excel in your LeetCode journey.</p>
                <div className="homeBodyDailyRecommendedLower" style={isOpen2 ? {overflow: 'hidden'} : {overflow: 'visible'}}>
                    <div className="homeBodyDailyRecommendedLower1">
                        <div className="homeBodyDailyRecommendedLowerText1" style={!isOpen2 ? {borderRadius: 10} : null} onClick={() => setIsOpen2(!isOpen2)}>
                            <p className="homeBodyDailyRecommendedLowerText11">Recommended Problems</p>
                            {isOpen2 ? <i className="fa-solid fa-chevron-up"></i> :
                            <i className="fa-solid fa-chevron-down"></i>}
                        </div>
                        {isOpen2 && <div className="homeBodyDailyRecommendedLowerText2Container">
                            <p className="homeBodyDailyRecommendedLowerText2">STATUS</p>
                            <p className="homeBodyDailyRecommendedLowerText22">PROBLEM</p>
                            <div className="homeBodyDailyRecommendedLowerText23">
                                <div className="homeBodyDailyRecommendedLowerText23Button" onClick={() => setShowTopics(!showTopics)}>
                                    <p>TOPICS</p>
                                    <i className={`fa-solid ${showTopics ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                                </div>
                            </div>
                            <p className="homeBodyDailyRecommendedLowerText24">DIFFICULTY</p>
                        </div>}
                    </div>
                    {isOpen2 && (
                        <>
                            {recommendedProblems.length > 0 &&
                            recommendedProblems.map((problem, index) => (
                                <div className='homeBodyDailyRecommendedLowerOptionContainer1' key={index}>
                                {index === 0 || problem.topic !== recommendedProblems[index - 1].topic ? (
                                    <p className="homeBodyDailyRecommendedDivider">{problem.topic}</p>
                                ) : null}
                                <div
                                    className="homeBodyDailyRecommendedLowerOption"
                                    onClick={() =>
                                    window.open(
                                        "https://leetcode.com/problems/" +
                                        problem.title.split(" ").join("-").toLowerCase() +
                                        "/",
                                        "_blank"
                                    )
                                    }
                                >
                                    <div className="homeBodyDailyRecommendedLowerOptionText1 blueText2">
                                    <StatusCircle color={"blue"} />
                                    </div>
                                    <p className="homeBodyDailyRecommendedLowerOptionText2 blueText">
                                    {problem.frontendQuestionId + ". " + problem.title}
                                    </p>
                                    <div className="homeBodyDailyRecommendedLowerTopics">
                                    {problem.topicTags.map((tag, tagIndex) => (
                                        <p key={tagIndex} className="homeBodyDailyRecommendedLowerTopic">
                                        {showTopics ? tag : ''}
                                        </p>
                                    ))}
                                    </div>
                                    <p
                                    className={`homeBodyDailyRecommendedLowerOptionText3 ${
                                        problem.difficulty === "Easy"
                                        ? "greenText"
                                        : problem.difficulty === "Medium"
                                        ? "yellowText"
                                        : "redText"
                                    }`}
                                    >
                                    {problem.difficulty}
                                    </p>
                                </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
            <div className="landingSection">
                <p className="landingSectionTitle">Become an early tester</p>
                <p className="landingSectionDesc2">Join our group of beta testers and experience a smarter way to enhance your LeetCode skills.</p>
                <p className="landingJoinButton" onClick={() => setShowAuth(true)}>Join Now</p>
            </div>
            <div className="landingFooter">
                <p className="landingFooterText">© 2023 AceLeet</p>
            </div>
        </div>
    )
}

export default Landing;
