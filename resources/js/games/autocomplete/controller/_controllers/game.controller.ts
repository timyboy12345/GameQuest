import {ListeningService} from "../_services/listening.service";
import {GameService} from "../_services/game.service";
import {Game} from "../../_models/game.interface";
import {ButtonService} from "../_services/button.service";
import {ContinueGameView} from "../_views/continuegame.view";
import {QueueView} from "../_views/queue.view";
import {PlayerController} from "./player.controller";
import {QuestionService} from "../_services/question.service";

import * as settings from '../../settings.json';
import {QuestionController} from "./question.controller";
import {Question} from "../../_models/question.interface";
import {AnsweringView} from "../_views/answering.view";
import {VotingView} from "../_views/voting.view";
import {LoadingView} from "../_views/loading.view";

export class GameController {
    public time: number = 0;
    public listeningService: ListeningService;
    public readonly queueView: QueueView;
    public readonly gameService: GameService;
    public readonly questionController: QuestionController;
    public readonly playerController: PlayerController;
    public readonly loadingView: LoadingView;
    public readonly votingView: VotingView;

    private _buttonService: ButtonService;
    private _game: Game;

    constructor() {
        this.gameService = new GameService(this);
        this.listeningService = new ListeningService(this.gameService);
        this.playerController = new PlayerController(this);
        this.queueView = new QueueView(this.playerController);
        this.questionController = new QuestionController(this.listeningService, this);
        this.loadingView = new LoadingView(this);
        this.votingView = new VotingView(this);

        this._buttonService = new ButtonService(this);

        this.gameService.getCurrentGame().then(game => {
            if (game == null) {
                this.startNewGame();
            } else {
                this._game = game;
                ContinueGameView.showContinueCard(game);
            }
        });
    }

    public continueGame() {
        this.gameService.getCurrentGame().then(value => {
            this.startQueue(value);
        })
    }

    public startNewGame() {
        this.gameService.startNewGame().then(game => {
            this.startQueue(game);
        });
    }

    private startQueue(game: Game) {
        this.playerController.setPlayers(game.players);
        this.listeningService.listen(game.id);
        ContinueGameView.hideContinueCard();
        this._game = game;
        this.queueView.showQueueCard(game);
    }

    /**
     * This starts the game
     */
    public async startGame() {
        this.queueView.hideQueueCard();
        let questions: Question[];

        // Check if the game already has questions
        if (this._game.questions == null) {
            // Calculate the wanted amount of questions
            const a = this.playerController.players.length * (settings.settings.questions_per_player / settings.settings.answers_per_question)

            questions = QuestionService.getQuestions(a);
            await this.gameService.saveQuestions(questions);
        } else {
            // Get questions from the game
            questions = this._game.questions;
        }

        // Save questions to QuestionController
        this.questionController.setQuestions(questions);

        // Send out questions to players
        this.questionController.askQuestions(questions, this.playerController.players, settings.settings.questions_per_player, settings.settings.answers_per_question).then(r => {
            console.log("All questions are send");
            AnsweringView.showAnsweringCard(this.playerController.players, questions);
        });
    }

    /**
     * This updates the 'answering' card with how many cards each player has filled out
     * @param questions The array of questions
     */
    public updateAnsweringCard(questions) {
        AnsweringView.showAnsweringCard(this.playerController.players, questions);
    }

    /**
     * This starts the voting part of the game
     */
    public async startVoting() {
        this.loadingView.hideLoading();
        this.votingView.showVotingPreviewCard();

        await GameController.wait(3);

        this.votingView.hideVotingPreviewCard();

        if (!this.showNextVoteQuestion()) {
            this.endVotingPhase();
        }
    }

    /**
     * Shows the next question in the 'voting' phase
     * @private
     */
    private showNextVoteQuestion(): boolean {
        const q = this.questionController.getNextQuestionToVoteOn();

        if (q != null) {
            this.listeningService.broadcast({
                'destination': 'player',
                'type': 'voteOnAnswers',
                'question': q
            })

            this.showQuestionAnswers(q, false);

            return true
        }

        return false;
    }

    /**
     * Show the points and uses for all answers on the screen
     * @param question The question to show
     * @param showScores Whether to show the scores or not
     * @private
     */
    private showQuestionAnswers(question: Question, showScores: boolean) {
        this.votingView.updateVotingCard(question.answers, [{
            answer_id: question.answers[0].id,
            votes: 2,
            points: 1200
        }], showScores);

        this.votingView.showVotingCard();
    }

    static async wait(seconds: number = 3): Promise<void> {
        return new Promise((resolve) => {
            window.setTimeout(() => resolve(), seconds * 1000)
        });
    }

    /**
     * Ends the voting phase
     * @private
     */
    private endVotingPhase() {
        console.log("The voting phase has ended!");
    }
}
