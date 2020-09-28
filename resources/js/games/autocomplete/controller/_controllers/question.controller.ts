import {Question} from "../../_models/question.interface";
import {User} from "../../_models/user.interface";
import {ListeningService} from "../_services/listening.service";
import {Answer} from "../../_models/answer.interface";
import {GameController} from "./game.controller";
import {Game} from "../../_models/game.interface";
import {AnsweringView} from "../_views/answering.view";

export class QuestionController {
    private _questions: Question[];
    private _highlightedQuestion: Question;

    get questions(): Question[] {
        return this._questions;
    }

    get highlightedQuestion(): Question {
        return this._highlightedQuestion;
    }

    constructor(private listeningService: ListeningService,
                private gameController: GameController) {
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

        window.addEventListener("submitVote", ((evt: CustomEvent) => {
            const data: {
                answer_id: string,
                user_id: string
            } = evt.detail;

            this.submitVote(data.answer_id);
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

    private saveQuestions(): Promise<Game> {
        return this.gameController.gameService.saveQuestions(this._questions);
    }

    public findQuestion(question_id: string) {
        return this._questions.find(q => q.id == question_id);
    }

    public answerQuestion(question_id: string, answer: Answer) {
        const question: Question = this._questions.find(q => q.id == question_id);

        if (question) {
            question.answers.push(answer);

            this.gameController.updateAnsweringCard(this._questions);

            if (this.allQuestionsAnswered()) {
                AnsweringView.hideAnsweringCard();
                this.gameController.loadingView.showLoading();

                this.saveQuestions().then(() => {
                    this.gameController.startVoting();
                });
            }
        } else {
            console.log("Question not found");
        }
    }

    public allQuestionsAnswered(): boolean {
        const totalPlayers = this.gameController.playerController.players.length;

        const notAllQuestionsAnswered = this._questions.find(q => totalPlayers > q.answers.length);
        return notAllQuestionsAnswered == null;
    }

    public getNextQuestionToVoteOn(): Question {
        if (this._highlightedQuestion == null){
            this._highlightedQuestion = this._questions[0];
            return this._highlightedQuestion;
        }

        if (this._questions.indexOf(this._highlightedQuestion) == this._questions.length) {
            this._highlightedQuestion = null;
            return null;
        }

        this._highlightedQuestion = this._questions[this.highlightedQuestion ? this._questions.indexOf(this._highlightedQuestion) + 1 : 0];
        return this._highlightedQuestion
    }

    public submitVote(answer_id: string) {
        const answer = this._highlightedQuestion.answers.find(a => a.id == answer_id);
        if (answer) {
            console.log(answer);
        }
    }
}
