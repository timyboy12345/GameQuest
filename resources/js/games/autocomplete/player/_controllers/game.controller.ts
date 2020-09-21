import {UserService} from "../../controller/_services/user.service";
import {ListeningService} from "../_services/listening.service";
import {GameService} from "../_services/game.service";

export class GameController {
    private userService: UserService;
    private gameService: GameService;

    constructor() {
        this.userService = new UserService();
        this.gameService = new GameService(this);

        this.gameService.getCurrentGame().then(game => {
            console.log(game);

            this.userService.getPlayerInfo().then(user => {
                console.log(user);

                const listeningService = new ListeningService();
                listeningService.announceJoinedGame(user, game);
            })
        });
    }
}
