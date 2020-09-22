import {Question} from "../../_models/question.interface";
import {User} from "../../_models/user.interface";
import {ListeningService} from "../_services/listening.service";

export class QuestionController {
    constructor(public listeningService: ListeningService) {

    }

    public askQuestions(questions: Question[], players: User[], questions_per_player: number, answers_per_question: number) {
        players.forEach(p => {
            this.listeningService.broadcast({
                'type': 'askQuestions',
                'player': p,
                'questions': questions
            })
        })
    }
}
