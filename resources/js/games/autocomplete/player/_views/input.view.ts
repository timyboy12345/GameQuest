import {GameController} from "../_controllers/game.controller";

export class InputView {
    constructor(private gameController: GameController) {
        document.querySelector("input#answer").addEventListener("keyup", (evt: KeyboardEvent) => {
            if (evt.keyCode == 13) {
                this.submitAnswer(evt);
            }
        })

        document.querySelector("#submit").addEventListener("click", evt => {
            this.submitAnswer(evt);
        })
    }

    public setQuestion(question: string) {
        document.querySelector("#queueCard").classList.add("hidden");
        document.querySelector("#answerCard").classList.remove("hidden");
        document.querySelector("#answerCard #question").innerHTML = question;
    }

    private submitAnswer(evt) {
        const answer = (<HTMLInputElement>document.querySelector("input#answer")).value;
        (<HTMLInputElement>document.querySelector("input#answer")).value = "";
        document.querySelector("#answerCard").classList.add("hidden");
        this.gameController.submitAnswer(answer);
    }
}
