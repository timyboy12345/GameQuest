import {GameController} from "../_controllers/game.controller";
import {Question} from "../../_models/question.interface";

export class VotingView {
    constructor(private gameController: GameController) {

    }

    public showVotingCard() {
        document.querySelector("#votingCard").classList.remove("hidden");
    }

    public hideVotingCard() {
        document.querySelector("#votingCard").classList.add("hidden");
    }

    public showAnswerBlocks(question: Question) {
        this.hideVotingCard();
        console.log(question);

        let cards = document.querySelectorAll('#votingCard #votingCardAnswersCard .answer');
        Array.from(cards).forEach((div) => div.remove());

        document.querySelector("#votingCard #question").innerHTML = question.question;

        question.answers.forEach(a => {
            const card = document.createElement("div");
            card.classList.add("answer", "bg-indigo-800", "text-white", "rounded", "shadow", "py-2", "px-4", "cursor-pointer", "duration-100", "hover:bg-indigo-900", "hover:shadow-inner", "my-4")
            card.innerText = a.answer;
            card.setAttribute("data-answer-id", a.id);

            card.addEventListener("click", (e) => {
                console.log("CLICKED ON AN ANSWER!");
                console.log(a);
                console.log(e.target);
            })

            document.querySelector("#votingCard #votingCardAnswersCard").append(card);
        })

        this.showVotingCard();
    }
}
