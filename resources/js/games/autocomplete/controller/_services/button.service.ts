import {GameController} from "../_controllers/game.controller";

export class ButtonService {
    constructor(public gameController: GameController) {
        this.registerButtons();
    }

    private registerButtons() {
        const c = this.gameController;

        document.querySelector("#newGameButton").addEventListener("click", function () {
            c.startNewGame();
        });

        document.querySelector("#continueGameButton").addEventListener("click", function () {
            c.continueGame();
        });
    }
}
