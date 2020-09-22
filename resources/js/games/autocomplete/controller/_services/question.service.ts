import * as data from '../../settings.json';
import {Question} from "../../_models/question.interface";
import {v4 as uuidv4} from 'uuid';

export class QuestionService {
    constructor() {

    }

    /**
     * Returns an array of questions without doubles
     * @param amount The amount of questions to receive
     */
    static getQuestions(amount: number): Question[] {
        const questions: Question[] = [];

        const n = Math.min(data.questions.length, amount);
        const q = data.questions
            .map(x => ({ x, r: Math.random() }))
            .sort((a, b) => a.r - b.r)
            .map(a => a.x)
            .slice(0, n);

        q.forEach(question => {
            questions.push({
                id: uuidv4(),
                question: question,
                answers: []
            })
        })

        return questions;
    }

    /**
     * Returns a single random question
     */
    static getQuestion(): string {
        return data.questions[Math.floor(Math.random() * data.questions.length)];
    }
}
