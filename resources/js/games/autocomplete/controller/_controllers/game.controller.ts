import {ListeningService} from "../_services/listening.service";
import {GameService} from "../_services/game.service";
import {Game} from "../../_models/game.interface";
import {ButtonService} from "../_services/button.service";
import {ContinueGameView} from "../_views/continuegame.view";
import {QueueView} from "../_views/queue.view";
import {PlayerController} from "./player.controller";

export class GameController {
    public time: number = 0;
    public listeningService: ListeningService;
    public readonly queueView: QueueView;
    public readonly gameService: GameService;
    public readonly playerController: PlayerController;

    private _buttonService: ButtonService;
    private _game: Game;

    constructor() {
        this.gameService = new GameService(this);
        this.listeningService = new ListeningService(this.gameService);
        this.playerController = new PlayerController(this);
        this.queueView = new QueueView(this.playerController);

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

    public startGame() {
        this.queueView.hideQueueCard();
    }
}
