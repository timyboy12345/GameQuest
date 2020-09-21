import {ListeningService} from "../_services/ListeningService";
import {GameService} from "../_services/GameService";
import {Game} from "../_models/game.interface";

export class GameController {
    get game(): Game {
        return this._game;
    }

    public time: number = 0;
    public listeningService;
    private readonly gameService: GameService;

    private _game: Game;

    constructor() {
        this.gameService = new GameService();
        this.listeningService = new ListeningService(this.gameService);
    }

    private continueGame() {
        this.gameService.getGame().then(value => {
            this._game = value;
        })
    }

    public start() {
        console.log("BOE");
        console.log(this.time);
    }
}
