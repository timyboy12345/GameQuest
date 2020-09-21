import {Game} from "../../_models/game.interface";

export class ContinueGameView {
    static showContinueCard(game: Game) {
        if (game) {
            this.updateContinueCard(game);
        }

        document.querySelector("#alreadyPlayingCard").classList.remove('hidden');
    }

    static hideContinueCard() {
        document.querySelector("#alreadyPlayingCard").classList.add('hidden');
    }

    static updateContinueCard(game: Game) {
        document.querySelector("#alreadyPlayingCard .data-name").innerHTML = game.data.name;
    }
}
