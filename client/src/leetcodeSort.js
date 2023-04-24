const readJsonFile = require('./readJsonFile');

const processJsonData = async () => {
    let data = await readJsonFile('leetcodeAllQuestions.txt');
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

                // Log question ID and title
                // console.log(`ID: ${question.frontendQuestionId}, Title: ${question.title}`);
            })

            return { difficultyCounts, topicCounts, names };
        }

        // const { difficultyCounts, topicCounts, names } = countDifficultiesAndTopics(data.problemsetQuestionList.questions);

        return countDifficultiesAndTopics(data.problemsetQuestionList.questions);

        // console.log('Difficulty counts:', difficultyCounts);
        // console.log('Topic counts:', Object.fromEntries(Object.entries(topicCounts).sort((a, b) => b[1] - a[1])));
    }
};

module.exports = processJsonData;
