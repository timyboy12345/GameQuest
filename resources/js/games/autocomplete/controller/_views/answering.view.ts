import {User} from "../../_models/user.interface";

export class AnsweringView {
    static showAnsweringCard(players: User[]) {
        if (players) {
            this.updateAnsweringCard(players);
        }

        document.querySelector("#answersCard").classList.remove('hidden');
    }

    static hideAnsweringCard() {
        document.querySelector("#answersCard").classList.add('hidden');
    }

    static updateAnsweringCard(players: User[]) {
        players.forEach(player => {
            const el = document.createElement("div");
            el.classList.add("w-1/12", "mx-4", "flex", "flex-col", "text-center", "justify-center");
            el.title = player.id;

            const bar = document.createElement("div");
            bar.classList.add("bg-indigo-800", "mx-auto", "rounded", "h-full");
            bar.style.width = '20px';
            el.append(bar);

            const name = document.createElement("div");
            name.classList.add("text-gray-800");
            name.innerHTML = player.name;
            el.append(name);

            document.querySelector("#answersCard #answersCardPlayers").append(el);
        });
    }
}
