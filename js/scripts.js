const navBtn = document.getElementById("nav-menu-btn")
const mblMenu = document.getElementById("mbl-menu")
const nameInput = document.getElementById("name")
const emailInput = document.getElementById("email")
const messageInput = document.getElementById("message")
// const showMessage = document.getElementById("show-message")

navBtn.addEventListener("click", () => {
    mblMenu.classList.toggle("hidden")
});

mblMenu.addEventListener("click", () => {
    mblMenu.classList.toggle("hidden")
});

async function send_email(btn) {
    btn.innerText = "Sending...";
    const data = {
        "name": nameInput.value,
        "email": emailInput.value,
        "message": messageInput.value
    };
    try {
        const response = await fetch("https://jeevandhakal.pythonanywhere.com/tools/send_email/", {
            method: "POST",
            mode: "cors", // Use "cors" to enable cross-origin requests
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        btn.innerText = "Send Message";
        if (!response.ok) {
            throw new Error(result['message']);
        }
        // showMessage.classList.toggle("text-red-500");
        // showMessage.textContent = result['message']; // Use textContent instead of innerHTML
        // showMessage.classList.toggle("hidden");

        setTimeout(() => {
            // showMessage.classList.toggle("hidden");
            // showMessage.classList.toggle('text-red-500')

        }, 5000); // Delay of 5 seconds (5000 milliseconds)
    } catch (error) {
        // showMessage.classList.toggle('text-green-500');
        // showMessage.textContent = error; // Use textContent instead of innerHTML
        // showMessage.classList.toggle("hidden");
        setTimeout(() => {
            // showMessage.classList.toggle("hidden");
            // showMessage.classList.toggle('text-green-500')
        }, 5000);
    }
    nameInput.value = '';
    emailInput.value = '';
    messageInput.value = '';
}

