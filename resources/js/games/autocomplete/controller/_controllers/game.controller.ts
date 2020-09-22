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

export class GameController {
    public time: number = 0;
    public listeningService: ListeningService;
    public readonly queueView: QueueView;
    public readonly gameService: GameService;
    public readonly questionController: QuestionController;
    public readonly playerController: PlayerController;

    private _buttonService: ButtonService;
    private _game: Game;

    constructor() {
        this.gameService = new GameService(this);
        this.listeningService = new ListeningService(this.gameService);
        this.playerController = new PlayerController(this);
        this.queueView = new QueueView(this.playerController);
        this.questionController = new QuestionController(this.listeningService, this);

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

    public updateAnsweringCard(questions) {
        AnsweringView.showAnsweringCard(this.playerController.players, questions);
    }

    public startVoting() {
        AnsweringView.hideAnsweringCard();
        VotingView.showVotingCard();
    }
}
