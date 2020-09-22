import {User} from "../../_models/user.interface";
import {GameController} from "./game.controller";
import axios from 'axios';

export class PlayerController {
    private _players: User[];

    constructor(private gameController: GameController) {
        this._players = [];

        window.addEventListener("playerJoined", ((evt: CustomEvent) => {
            this.addPlayer(evt.detail.user)
        }) as EventListener)
    }

    public setPlayers(users: User[]) {
        this._players = users || [];
    }

    private addPlayer(user: User) {
        let alreadyJoined = false;

        this.players.forEach(player => {
            if (player.id == user.id) {
                alreadyJoined = true;
            }
        });

        if (!alreadyJoined) {
            const game_uuid = this.gameController.gameService.getGameUuid();
            axios.post(`/api/games/game/${game_uuid}/players`, {
                "user_id": user.id
            }).then(() => {
                this._players.push(user);
                this.gameController.queueView.updatePlayersFromArray(this._players);
            })
        }
    }

    get players(): User[] {
        return this._players;
    }
}
