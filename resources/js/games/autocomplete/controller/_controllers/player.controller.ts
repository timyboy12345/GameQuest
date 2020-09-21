import {User} from "../../_models/user.interface";
import {GameController} from "./game.controller";

export class PlayerController {
    private _players: User[];

    constructor(private gameController: GameController) {
        this._players = [];
        const c = this;

        window.addEventListener("playerJoined", ((evt: CustomEvent) => {
            let alreadyJoined = false;

            this.players.forEach(player => {
                if (player.id == evt.detail.user.id) {
                    alreadyJoined = true;
                }
            })

            if (!alreadyJoined) {
                this._players.push(evt.detail.user);
                c.gameController.queueView.updatePlayersFromArray(this._players);
            }
        }) as EventListener)
    }

    get players(): User[] {
        return this._players;
    }
}
