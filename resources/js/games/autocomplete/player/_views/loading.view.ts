export class LoadingView {
    static showLoadingCard() {
        document.querySelector("#loadingCard").classList.remove("hidden");
    }

    static hideLoadingCard() {
        document.querySelector("#loadingCard").classList.add("hidden");
    }
}