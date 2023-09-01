const navBtn = document.getElementById("nav-menu-btn")
const mblMenu = document.getElementById("mbl-menu")
const nameInput = document.getElementById("name")
const emailInput = document.getElementById("email")
const messageInput = document.getElementById("message")
const msgContainer = document.getElementById("msg-container")
const message = document.getElementsByClassName("message")[0]
const msg = document.getElementById("msg")
const loader = document.getElementById("loader")

navBtn.addEventListener("click", () => {
    mblMenu.classList.toggle("hidden")
});

mblMenu.addEventListener("click", () => {
    mblMenu.classList.toggle("hidden")
});

async function send_email(btn) {
    showSpinner();
    const data = {
        "name": nameInput.value,
        "email": emailInput.value,
        "message": messageInput.value
    };
    try {
        const response = await fetch("https://jeevandhakal.pythonanywhere.com/tools/send_email/", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        msg.innerText = result['message'];
        if (!response.ok) {
            throw new Error(result['message']);
        }
        emailInput.value = '';
        messageInput.value = '';
        nameInput.value = '';
        showAndHideMsg("message-success");
    } catch (error) {
        showAndHideMsg("message-warning");
    }
    hideSpinner();
};


showSpinner = () => {
    loader.classList.remove("hidden");
    loader.classList.add("inline");

    // to stop loading after some time
    setTimeout(() => {
        hideSpinner();
    }, 5000);
};

hideSpinner = () => {
    loader.classList.add("hidden");
    loader.classList.remove("inline");
};

showAndHideMsg = (cls) => {
    msgContainer.classList.remove("hidden");
    message.classList.toggle(cls);

    // Delay of 5 seconds (5000 milliseconds)
    setTimeout(() => {
        msgContainer.classList.add("hidden");
        msgContainer.classList.remove(cls);
    }, 5000);
};
