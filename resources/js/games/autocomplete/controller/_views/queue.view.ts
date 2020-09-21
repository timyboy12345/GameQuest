import {Game} from "../../_models/game.interface";
import {User} from "../../_models/user.interface";
const QRCode = require('qrcode')

export class QueueView {
    public showQueueCard(game: Game) {
        document.querySelector("#queueCard .data-name").innerHTML = game.data.name;
        document.querySelector("#queueCard #data-id").innerHTML = game.code;

        const img = document.querySelector("#queueCard #queue-qr-canvas")
        const url = `${window.location.protocol}//${window.location.host}/join/${game.code}`;

        QRCode.toDataURL(url,
            {
                margin: 1,
            },
            function (error, url) {
                if (error) console.error(error)
                img.setAttribute("src", url);
            })

        document.querySelector("#queueCard").classList.remove("hidden");
    }

    public hideQueueCard() {
        document.querySelector("#queueCard").classList.add("hidden");
    }

    public updatePlayersFromGame(game: Game) {
        this.updatePlayersFromArray(game.data.participants);
    }

    public updatePlayersFromArray(users: User[]) {
        document.querySelector("#queueCard #playerList").innerHTML = "";

        users.forEach(player => {
            const el = document.createElement("div");
            el.classList.add("player", "rounded", "px-4", "py-2", "bg-indigo-800", "text-white", "m-2");
            el.innerHTML = player.name;
            el.title = player.id;

            document.querySelector("#queueCard #playerList").append(el);
        })
    }
}
