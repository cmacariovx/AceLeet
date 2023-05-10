import readJsonFile from "./readJsonFile";

interface Question {
    acRate: number,
    difficulty: 'Easy' | 'Medium' | 'Hard',
    frontendQuestionId: number,
    title: string,
    topicTags: {
        name: string;
        id: string;
    }[],
}

async function processJsonData() {
    let data = await readJsonFile('leetcodeAllQuestions.json');
    data = data['data'];

    if (data) {
        const countDifficultiesAndTopics = (questions: Question[]) => {
            const names: Record<number, string> = {};

            const difficultyCounts = {
                Easy: 0,
                Medium: 0,
                Hard: 0,
            }

            const topicCounts: Record<string, number> = {};

            questions.forEach((question: Question) => {
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

export interface TrieNodeI {
    children: {[key: string]: TrieNode};
    isEndOfWord: boolean;
    word: string | null;
    topics: string[];
}

class TrieNode implements TrieNodeI {
    children: {[key: string]: TrieNode};
    isEndOfWord: boolean;
    word: string | null;
    topics: string[];

    constructor() {
        this.children = {};
        this.isEndOfWord = false;
        this.word = null;
        this.topics = [];
    }
}

export class Trie {
    root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    insert(id: number, word: string, topicsArr: string[]) {
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
        currentNode.topics = topicsArr;
    }

    search(word: string) {
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

    startsWith(prefix: string) {
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

    autoComplete(prefix: string) {
        const result: any = [];
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

    dfs(node: TrieNode, prefix: string, result: any[]) {
        if (node.isEndOfWord) {
            result.push([node.word, node.topics]);
        }
        for (const char in node.children) {
            this.dfs(node.children[char], prefix + char, result);
        }
    }

    serialize() {
        return JSON.stringify(this.root);
    }

    deserialize(data: string) {
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
    problemTitles,
};
