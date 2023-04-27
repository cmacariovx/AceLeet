import readJsonFile from "./readJsonFile";

async function processJsonData() {
    let data = await readJsonFile('leetcodeAllQuestions.json');
    data = data['data'];

    if (data) {
        const countDifficultiesAndTopics = (questions) => {
            const names = {}

            const difficultyCounts = {
                Easy: 0,
                Medium: 0,
                Hard: 0,
            }

            const topicCounts = {};

            questions.forEach((question) => {
                // Count difficulties
                difficultyCounts[question.difficulty]++;

                names[question.frontendQuestionId] = question.title;

                // Count topics
                question.topicTags.forEach((topic) => {
                    if (topicCounts[topic.name]) {
                        topicCounts[topic.name]++;
                    } else {
                        topicCounts[topic.name] = 1;
                    }
                });
            })

            return { difficultyCounts, topicCounts, names };
        }

        return countDifficultiesAndTopics(data.problemsetQuestionList.questions);
    }
};

class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
        this.word = null;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(id, word) {
        let currentNode = this.root;
        const originalWord = word;
        word = word.toLowerCase();
        for (const char of word) {
            if (!currentNode.children[char]) {
                currentNode.children[char] = new TrieNode();
            }
            currentNode = currentNode.children[char];
        }
        currentNode.isEndOfWord = true;
        currentNode.word = `${id}. ${originalWord}`;
    }

    search(word) {
        let currentNode = this.root;
        word = word.toLowerCase();
        for (const char of word) {
            if (!currentNode.children[char]) {
                return false;
            }
            currentNode = currentNode.children[char];
        }
        return currentNode.isEndOfWord;
    }

    startsWith(prefix) {
        let currentNode = this.root;
        prefix = prefix.toLowerCase();
        for (const char of prefix) {
            if (!currentNode.children[char]) {
                return false;
            }
            currentNode = currentNode.children[char];
        }
        return true;
    }

    autoComplete(prefix) {
        const result = [];
        let currentNode = this.root;
        prefix = prefix.toLowerCase();
        for (const char of prefix) {
            if (!currentNode.children[char]) {
                return result;
            }
            currentNode = currentNode.children[char];
        }
        this.dfs(currentNode, prefix, result);
        return result;
    }

    dfs(node, prefix, result) {
        if (node.isEndOfWord) {
            result.push(node.word);
        }
        for (const char in node.children) {
            this.dfs(node.children[char], prefix + char, result);
        }
    }

    serialize() {
        return JSON.stringify(this.root);
    }

    deserialize(data) {
        this.root = JSON.parse(data);
    }
}

async function problemTitles() {
    try {
        const response = await fetch('trie.json');
        const trieData = await response.json();

        const trie = new Trie();
        trie.deserialize(JSON.stringify(trieData));

        return trie;
    }
    catch (error) {
        console.error('Error reading trie.json:', error);
        return null;
    }
}

export default {
    processJsonData,
    problemTitles
};
