export interface SolvedProblem {
    id: string;
    title: string;
    difficultyLevel: string;
    difficultyNum: number | null;
    topics: string[];
    totalTime: {
        fancy: string;
        nonFancy: number;
    }
    solved: boolean;
    solvedAt: number;
    solvedWithoutSolution: boolean
}

export interface Topic {
    lastPracticed: number | null;
    totalTopicProblemsAttempted: number;
    totalTopicProblemsSolved: number;
    topicTimeSum: number;
    topicDifficultySum: number;
    averageTopicTime: number | null;
    averageTopicDifficulty: number | null;
    topicProblemsSolved: SolvedProblem[];
    topicProblemsAttempted: SolvedProblem[];
    totalTopicProblemsSolvedWithSolution: number;
    totalTopicProblemsSolvedWithoutSolution: number;
    totalTopicEasySolved: number;
    totalTopicMediumSolved: number;
    totalTopicHardSolved: number;
    schedule: number[];
    scheduleIdx: number;
    problemsDone: number;
    name?: string;
    priorityScore?: number;
}

export interface AverageDifficultyInterval {
    overallAverageDifficulty: number;
    timestamp: number;
}

export interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    joinedDate: number;
    isPremiumUser: false;
    technicalData: {
        problems: {
            totalProblemsAttempted: number;
            totalProblemsSolved: number;
            totalProblemsSolvedWithSolution: number;
            totalProblemsSolvedWithoutSolution: number;
            totalEasySolved: number;
            totalMediumSolved: number;
            totalHardSolved: number;
        };
        problemIds: string[];
        totalPracticeTime: number;
        averageProblemTime: number;
        averageDifficultyIntervals: AverageDifficultyInterval[];
        topics: { [key: string]: Topic };
    }
}

export interface TopicWeight {
    [key: string]: number
}

export interface TopicProblems {
    [key: string]: TopicProblem[];
}

export interface TopicProblem {
    acRate: number;
    difficulty: string;
    frontendQuestionId: string;
    title: string;
    topicTags: string[];
    topic?: string;
}
