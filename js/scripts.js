const navBtn = document.getElementById("nav-menu-btn")
const mblMenu = document.getElementById("mbl-menu")
const nameInput = document.getElementById("name")
const emailInput = document.getElementById("email")
const messageInput = document.getElementById("message")
const msgContainer = document.getElementById("msg-container")
const message = document.getElementsByClassName("message")[0]
const msg = document.getElementById("msg")
const loader = document.getElementById("loader")
const messageIcon = document.getElementById("messageIcon")
const successIconClass = 'fa-circle-check'
const warningIcon = 'fa-circle-info'

navBtn.addEventListener("click", () => {
    mblMenu.classList.toggle("hidden")
});

mblMenu.addEventListener("click", () => {
    mblMenu.classList.toggle("hidden")
});

document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Validate form fields
    if (this.checkValidity()) {
      // Form is valid, proceed with send_email
      send_email(this);
    } else {
      // Show validation error messages
      this.reportValidity();
    }
  });


async function send_email(btn) {
    showSpinner();
    const data = {
        "name": nameInput.value,
        "email": emailInput.value,
        "message": messageInput.value,
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
        setSuccessIconClass();
        msg.innerText = result['message'];
        if (!response.ok) {
            throw new Error(result['message']);
        }
        emailInput.value = '';
        messageInput.value = '';
        nameInput.value = '';
        showAndHideMsg("message-success");
    } catch (error) {
        setWarningIconClass();
        if (msg.innerText == '') {
            msg.innerText = "Something went wrong. Please try again later.";
        }
        showAndHideMsg("message-warning");
    }
    hideSpinner();
};


setSuccessIconClass = () => {
    messageIcon.classList.add(successIconClass);
    messageIcon.classList.remove(warningIcon);
}

setWarningIconClass = () => {
    messageIcon.classList.add(warningIcon);
    messageIcon.classList.remove(successIconClass);
}


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


const slides = document.querySelectorAll('.overflow-hidden .absolute');
let currentIndex = 0;
let intervalId;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(${(i - index) * 100}%)`;
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
}

document.getElementById('next').addEventListener('click', () => {
    nextSlide();
    resetInterval();
});

document.getElementById('prev').addEventListener('click', () => {
    prevSlide();
    resetInterval();
});

function startAutoSlide() {
    intervalId = setInterval(nextSlide, 3000); // Change slide every 3 seconds
}

function resetInterval() {
    clearInterval(intervalId);
    startAutoSlide();
}

// Initialize the slider
showSlide(currentIndex);
startAutoSlide();


const currentYear = new Date().getFullYear();
document.getElementById("year").textContent = currentYear;
