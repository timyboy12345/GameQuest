import {GameController} from "./game.controller";

export class VotingController {
    constructor(private gameController: GameController) {
        window.addEventListener("voteOnAnswers", ((evt: CustomEvent) => {
            this.showVotingCard(evt.detail.question)
        }) as EventListener);
    }

    private showVotingCard(question: any) {
        console.log(question);
        this.gameController.showVotingCard(question);
    }
}
