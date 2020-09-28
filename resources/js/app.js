require('./bootstrap');

// Make menu button interactive for mobile
window.addEventListener("load", ev => {
    document.querySelector("#expandMenuButton").addEventListener("click", evt => {
        document.querySelector("#expandableMenu").classList.toggle("hidden");
    })
});
