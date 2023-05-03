///////////////////////////
///////////////////////////
// MISC creation algorithms
///////////////////////////
///////////////////////////

function createTopicProblemObject(topics, questions) {
    // Initialize the object with topics as keys and empty arrays as values
    const topicProblemObject = {};
    topics.forEach(topic => {
      topicProblemObject[topic] = [];
    });

    // Iterate through questions and place them into the appropriate topic keys
    questions.forEach(question => {
      // Create a new object with the desired properties and topicTags as an array of strings
      const simplifiedQuestion = {
        acRate: question.acRate,
        difficulty: question.difficulty,
        frontendQuestionId: question.frontendQuestionId,
        title: question.title,
        topicTags: question.topicTags.map(tag => tag.name)
      };

      // Place the simplified question into the appropriate topic keys
      simplifiedQuestion.topicTags.forEach(topicName => {
        if (topicProblemObject.hasOwnProperty(topicName)) {
          topicProblemObject[topicName].push(simplifiedQuestion);
        }
      });
    });

    return topicProblemObject;
}

async function run() {
    // Define the topics and question data as given in the question
    let topics = ["Array", "String", "Hash Table", "Math", "Dynamic Programming", "Sorting", "Greedy", "Depth-First Search", "Binary Search", "Database", "Breadth-First Search", "Tree", "Matrix", "Two Pointers", "Binary Tree", "Bit Manipulation", "Heap (Priority Queue)", "Stack", "Prefix Sum", "Graph", "Design", "Simulation", "Counting", "Backtracking", "Sliding Window", "Union Find", "Linked List", "Ordered Set", "Monotonic Stack", "Enumeration", "Recursion", "Trie", "Divide and Conquer", "Binary Search Tree", "Bitmask", "Queue", "Number Theory", "Memoization", "Segment Tree", "Geometry", "Topological Sort", "Binary Indexed Tree", "Hash Function", "Game Theory", "Shortest Path", "Combinatorics", "Data Stream", "Interactive", "String Matching", "Rolling Hash", "Brainteaser", "Randomized", "Monotonic Queue", "Merge Sort", "Iterator", "Concurrency", "Doubly-Linked List", "Probability and Statistics", "Quickselect", "Bucket Sort", "Suffix Array", "Minimum Spanning Tree", "Counting Sort", "Shell", "Line Sweep", "Reservoir Sampling", "Eulerian Circuit", "Radix Sort", "Strongly Connected Component", "Rejection Sampling", "Biconnected Component"];

    const questionData = await readJsonFile('leetcodeAllQuestions.json');

    // Call the function with topics and questions data
    const topicProblemJSON = createTopicProblemObject(topics, questionData.data.problemsetQuestionList.questions);

    // Log the result as a JSON string
    console.log(JSON.stringify(topicProblemJSON));
}
