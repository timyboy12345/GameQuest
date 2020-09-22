import {Question} from "../../_models/question.interface";
import {User} from "../../_models/user.interface";
import {ListeningService} from "../_services/listening.service";
import {Answer} from "../../_models/answer.interface";

export class QuestionController {
    private _questions: Question[];

    constructor(public listeningService: ListeningService) {
        window.addEventListener("submitAnswer", ((evt: CustomEvent) => {
            const data: {
                answer: Answer,
                destination: string,
                player_id: string,
                question: Question,
                type: string
            } = evt.detail;

            this.answerQuestion(data.question.id, data.answer);
        }) as EventListener)
    }

    public setQuestions(questions: Question[]) {
        this._questions = questions;
    }

    public async askQuestions(questions: Question[], players: User[], questions_per_player: number, answers_per_question: number): Promise<void> {
        for (const p of players) {
            await this.listeningService.broadcast({
                'destination': 'player',
                'type': 'askQuestions',
                'player': p,
                'questions': questions
            })
        }

        return;
    }

    public answerQuestion(question_id: string, answer: Answer) {
        const question: Question = this._questions.find(q => q.id == question_id);

        if (question) {
            question.answers.push(answer);
            console.log(question);
        } else {
            console.log("Question not found");
        }
    }
}
