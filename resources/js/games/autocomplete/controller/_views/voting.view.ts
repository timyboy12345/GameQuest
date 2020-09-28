import {GameController} from "../_controllers/game.controller";
import {Question} from "../../_models/question.interface";
import {PlayerController} from "../_controllers/player.controller";
import {Answer} from "../../_models/answer.interface";

export class VotingView {
    constructor(private readonly gameController: GameController) {

    }

    public showVotingPreviewCard() {
        document.querySelector("#votingPreviewCard").classList.remove("hidden");
    }

    public hideVotingPreviewCard() {
        document.querySelector("#votingPreviewCard").classList.add("hidden");
    }

    public showVotingCard(): Promise<void> {
        return new Promise(async (res) => {
            document.querySelector("#votingCard").classList.remove("hidden");
            await GameController.wait(0.1);
            document.querySelector("#votingCard").classList.remove("opacity-0");
            GameController.wait(1).then(() => res());
        })
    }

    public updateVotingCard(answers: Answer[], votes: { answer_id: string, votes: number, points: number }[], showScore: boolean) {
        // Remove all existing answers
        let cards = document.querySelectorAll('#votingCard .votingCardAnswerList .votingCardAnswer');
        Array.from(cards).forEach((div) => div.remove());

        answers.forEach(a => {
            const card = document.createElement("div");
            card.classList.add("card", "w-1/3", "mx-4", "text-black", "relative");

            const score = votes.find(v => v.answer_id == a.id);

            const body = document.createElement("div");
            body.classList.add("card-body");
            body.innerText = a.answer;
            card.append(body);

            if (score && showScore) {
                const dot = document.createElement("div");
                dot.classList.add("absolute", "bg-blue-900", "shadow-lg", "text-white", "rounded-full", "right-0", "top-0", "pt-3", "scoreDot", "opacity-0", "duration-75");
                dot.style.height = "50px";
                dot.style.width = "50px";
                dot.style.right = "-25px";
                dot.style.top = "-25px";
                dot.innerText = `${score.points}`;
                card.append(dot);

                const user = this.gameController.playerController.findPlayer(a.user_id);
                if (user) {
                    const footer = document.createElement("div");
                    footer.classList.add("card-footer");
                    footer.innerText = user.name;
                    card.append(footer);
                }

                window.setTimeout(() => {
                    dot.classList.remove('opacity-0');
                }, 500);
            }

            document.querySelector("#votingCard .votingCardAnswerList").append(card);
        })
    }

    public hideVotingCard() {
        document.querySelector("#votingCard").classList.add("hidden");
    }
}
