import {Question} from "../../_models/question.interface";
import {User} from "../../_models/user.interface";
import {ListeningService} from "../_services/listening.service";

export class QuestionController {
    private _questions: Question[];

    constructor(public listeningService: ListeningService) {

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

    public
}
