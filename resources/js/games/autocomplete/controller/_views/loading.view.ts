import {GameController} from "../_controllers/game.controller";

export class LoadingView {
    constructor(private gameController: GameController) {
    }

    public hideLoading() {
        document.querySelector("#loadingCard").classList.add("hidden");
    }

    /**
     * Show the loading card
     * @param text Text to show, if null a default text will be shown
     */
    public showLoading(text: string = null) {
        if (text == null) {
            text = document.querySelector("#loadingCard h1").getAttribute("data-default");
        }

        document.querySelector("#loadingCard h1").innerHTML = text;
        document.querySelector("#loadingCard").classList.remove("hidden");
    }
}
