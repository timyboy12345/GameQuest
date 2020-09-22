import {GameController} from "../_controllers/game.controller";

export class VotingView {
    constructor(private readonly gameController: GameController) {

    }

    static showVotingCard() {
        document.querySelector("#votingCard").classList.remove("hidden");
    }
}
