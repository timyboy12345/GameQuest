import {UserService} from "../../controller/_services/user.service";
import {ListeningService} from "../_services/listening.service";
import {GameService} from "../_services/game.service";
import {QuestionController} from "./question.controller";
import {Question} from "../../_models/question.interface";
import {InputView} from "../_views/input.view";
import {QueueView} from "../_views/queue.view";
import {LoadingView} from "../_views/loading.view";
import {VotingController} from "./voting.controller";
import {VotingView} from "../_views/voting.view";

export class GameController {
    public readonly userService: UserService;
    public readonly gameService: GameService;
    public readonly questionController: QuestionController;
    public readonly listeningService: ListeningService;
    public readonly inputView: InputView;
    public readonly votingController: VotingController;
    public readonly votingView: VotingView;

    constructor() {
        this.userService = new UserService();
        this.gameService = new GameService(this);
        this.questionController = new QuestionController(this);
        this.listeningService = new ListeningService(this);
        this.votingController = new VotingController(this);
        this.votingView = new VotingView(this);
        const l = this.listeningService;

        this.inputView = new InputView(this);
        LoadingView.showLoadingCard();

        this.gameService.getCurrentGame().then(game => {
            if (game == null) {
                window.alert("Er is geen game gevonden!");
                return;
            }

            this.userService.getPlayerInfo().then(user => {
                l.listen(game.id);
                l.broadcast({
                    'type': 'joinedGame',
                    user, game
                }).then(() => {
                    LoadingView.hideLoadingCard();
                    QueueView.showQueueCard();
                });
            }).catch(reason => {
                console.error(reason);
            })
        });
    }

    public showQuestion(): boolean {
        const unansweredQuestions: Question[] = [];

        this.questionController.questions.forEach(q => {
            if (q.answers.length == 0) {
                unansweredQuestions.push(q);
            }
        })

        if (unansweredQuestions.length >= 1) {
            this.questionController.selectQuestion(unansweredQuestions[0].id);
            return true;
        }

        return false;
    }

    public async submitAnswer(answer: string) {
        const c = this;

        this.questionController.submitAnswer(answer);

        if (!c.showQuestion()) {
            // No more questions to ask
            console.log("All questions were answered");
        }
    }

    public showVotingCard(question: Question) {
        this.votingView.showAnswerBlocks(question);
    }
}
