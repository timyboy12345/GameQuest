import {Game} from "../../_models/game.interface";
import {User} from "../../_models/user.interface";
import {PlayerController} from "../_controllers/player.controller";

const QRCode = require('qrcode');

export class QueueView {
    constructor(private playerController: PlayerController) {
    }

    public showQueueCard(game: Game) {
        document.querySelector("#queueCard .data-name").innerHTML = game.data.name;
        document.querySelector("#queueCard #data-id").innerHTML = game.code;

        const img = document.querySelector("#queueCard #queue-qr-canvas");
        const url = `${window.location.protocol}//${window.location.host}/join/${game.code}`;

        QRCode.toDataURL(url,
            {
                margin: 1,
            },
            function (error, url) {
                if (error) console.error(error);
                img.setAttribute("src", url);
            });

        document.querySelector("#queueCard").classList.remove("hidden");

        this.playerController.players.forEach(p => this.addPlayer(p));
    }

    public hideQueueCard() {
        document.querySelector("#queueCard").classList.add("hidden");
    }

    public updatePlayersFromArray(users: User[]) {
        document.querySelector("#queueCard #playerList").innerHTML = "";

        users.forEach(player => {
            this.addPlayer(player);
        })
    }

    private addPlayer(player: User) {
        const el = document.createElement("div");
        el.classList.add("player", "rounded", "px-4", "py-2", "bg-indigo-800", "text-white", "m-2");
        el.innerHTML = player.name;
        el.title = player.id;

        document.querySelector("#queueCard #playerList").append(el);
    }
}
