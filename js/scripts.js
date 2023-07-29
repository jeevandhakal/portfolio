const navBtn = document.getElementById("nav-menu-btn")
const mblMenu = document.getElementById("mbl-menu")

navBtn.addEventListener("click", () => {
    mblMenu.classList.toggle("hidden")
});

mblMenu.addEventListener("click", () => {
    mblMenu.classList.toggle("hidden")
});

