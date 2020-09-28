import {User} from "../../_models/user.interface";
import {Question} from "../../_models/question.interface";

export class AnsweringView {
    static showAnsweringCard(players: User[], questions: Question[]) {
        if (players) {
            this.updateAnsweringCard(players, questions);
        }

        document.querySelector("#answersCard").classList.remove('hidden');
    }

    static hideAnsweringCard() {
        document.querySelector("#answersCard").classList.add('hidden');
    }

    static updateAnsweringCard(players: User[], questions: Question[]) {
        let cards = document.querySelectorAll('#answersCard #answersCardPlayers .playerCard');
        Array.from(cards).forEach((div) => div.remove());

        players.forEach(player => {
            let answeredQuestions = 0;
            questions.forEach(q => {
                q.answers.forEach(a => {
                    if (a.user_id == player.id) {
                        answeredQuestions++;
                    }
                })
            });

            const el = document.createElement("div");
            el.classList.add("playerCard", "w-1/2", "sm:w-1/3", "md:w-1/4", "lg:w-1/5", "text-center");
            el.title = player.id;

            const card = document.createElement("div");
            el.classList.add("shadow", "bg-white", "m-4", "rounded", "p-4");
            el.append(card);

            const bar = document.createElement("div");
            bar.classList.add("font-bold", "text-indigo-900");
            bar.innerHTML = player.name;
            card.append(bar);

            const name = document.createElement("div");
            name.classList.add("text-gray-600");
            name.innerHTML = `Vraag ${answeredQuestions}/${questions.length}`;
            card.append(name);

            document.querySelector("#answersCard #answersCardPlayers").append(el);
        });
    }
}
