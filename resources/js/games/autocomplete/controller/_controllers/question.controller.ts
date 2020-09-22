import {Question} from "../../_models/question.interface";
import {User} from "../../_models/user.interface";
import {ListeningService} from "../_services/listening.service";
import {Answer} from "../../_models/answer.interface";
import {GameController} from "./game.controller";

export class QuestionController {
    private _questions: Question[];

    constructor(public listeningService: ListeningService,
                public gameController: GameController) {
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
            this.gameController.updateAnsweringCard(this._questions);

            if (this.allQuestionsAnswered()) {
                this.gameController.startVoting();
            }
        } else {
            console.log("Question not found");
        }
    }

    public allQuestionsAnswered(): boolean {
        const totalPlayers = this.gameController.playerController.players.length;

        this._questions.forEach(q => {
            if (q.answers.length <= totalPlayers) {
                return false;
            }
        })

        return true;
    }
}
