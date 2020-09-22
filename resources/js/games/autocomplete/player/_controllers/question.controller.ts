import {Question} from "../../_models/question.interface";
import {GameController} from "./game.controller";
import {v4 as uuidv4} from 'uuid';
import {Answer} from "../../_models/answer.interface";

export class QuestionController {
    private readonly _questions: Question[];
    private _selectedQuestion: Question;

    get questions(): Question[] {
        return this._questions;
    }

    constructor(private gameController: GameController) {
        window.addEventListener("askQuestions", ((evt: CustomEvent) => {
            this.addQuestions(evt.detail.questions)
            this.gameController.showQuestion();
        }) as EventListener);

        this._questions = [];
    }


    private addQuestions(questions: Question[]) {
        questions.forEach(value => this.addQuestion(value));
    }

    private addQuestion(question: Question) {
        this._questions.push(question);
    }

    public selectQuestion(question_id: string): boolean {
        this._questions.forEach(q => {
            if (q.id == question_id) {
                this._selectedQuestion = q;
                this.gameController.inputView.setQuestion(q.question);

                return true;
            }
        })

        return false;
    }

    public submitAnswer(answer: string) {
        const a: Answer = {
            id: uuidv4(),
            answer: answer
        };

        this._selectedQuestion.answers.push(a);

        // Use PubNub to communicate answer to Controller
        this.gameController.userService.getSavedPlayerInfo().then(user => {
            this.gameController.listeningService.broadcast({
                'destination': 'controller',
                'type': 'submitAnswer',
                'player_id': user.id,
                'question': this._selectedQuestion,
                'answer': a
            });
        });

        this._selectedQuestion = null;
        return true;
    }
}
