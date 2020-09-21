import {ListeningService} from "../_services/listening.service";
import {GameService} from "../_services/game.service";
import {Game} from "../../_models/game.interface";
import {ButtonService} from "../_services/button.service";
import {ContinueGameView} from "../_views/continuegame.view";
import {QueueView} from "../_views/queue.view";
import {PlayerController} from "./player.controller";

export class GameController {
    public time: number = 0;
    public listeningService;
    public queueView: QueueView;

    private _buttonService: ButtonService;
    private _playerController: PlayerController;
    private readonly _gameService: GameService;
    private _game: Game;

    constructor() {
        this._gameService = new GameService(this);
        this.listeningService = new ListeningService(this._gameService);
        this._buttonService = new ButtonService(this);
        this._playerController = new PlayerController(this);

        this.queueView = new QueueView();

        this._gameService.getCurrentGame().then(game => {
            if (game == null) {
                this.startNewGame();
            } else {
                this._game = game;
                ContinueGameView.showContinueCard(game);
            }
        });
    }

    public continueGame() {
        ContinueGameView.hideContinueCard();

        this._gameService.getCurrentGame().then(value => {
            this._game = value;
            this.queueView.showQueueCard(value);
        })
    }

    public startNewGame() {
        ContinueGameView.hideContinueCard();

        this._gameService.startNewGame().then(game => {
            this.queueView.showQueueCard(game)
        });
    }
}
