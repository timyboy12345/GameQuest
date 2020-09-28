export class QueueView {
    static showQueueCard() {
        document.querySelector("#queueCard").classList.remove("hidden");
    }

    static hideQueueCard() {
        document.querySelector("#queueCard").classList.add("hidden");
    }
}