const tabs = document.querySelectorAll(".company-list li");
const contents = document.querySelectorAll(".experience-content");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {

        // Remove active class from all tabs and contents
        tabs.forEach(item => item.classList.remove("active"));
        tab.classList.add("active");

        //Hide All contents
        contents.forEach(content => content.classList.remove("active"));

        //show selected content
        const target = tab.getAttribute("data-target");
        document.getElementById(target).classList.add("active");
    });
});

const section = document.querySelector("#skills");
const bars = document.querySelectorAll(".bar span");
const percents = document.querySelectorAll(".percent");

let done = false;

function runAnimation() {
  if (done) return;

  percents.forEach((el, i) => {
    let target = +el.dataset.target;
    let count = 0;

    // animate number
    let counter = setInterval(() => {
      if (count >= target) {
        clearInterval(counter);
      } else {
        count++;
        el.textContent = count + "%";
      }
    }, 15);

    // animate bar
    bars[i].style.width = target + "%";
  });

  done = true;
}

window.addEventListener("scroll", () => {
  let pos = section.getBoundingClientRect().top;
  let screen = window.innerHeight;

  if (pos < screen - 100) {
    runAnimation();
  }
});

document.addEventListener("DOMContentLoaded", () => {

  const waBtn = document.querySelector(".wa-button");
  const waBox = document.querySelector(".wa-box");
  const waClose = document.querySelector(".wa-close");
  const waText = document.querySelector(".wa-text");

  if (!waBtn || !waBox || !waClose || !waText) {
    console.log("WhatsApp elements not found");
    return;
  }

  const message = "Hi 👋\nNeed a website or app?\nLet's build something great.";

  let index = 0;

  function typeText() {
    if (index < message.length) {
      waText.textContent += message.charAt(index);
      index++;
      setTimeout(typeText, 30);
    }
  }

  // Auto popup
  setTimeout(() => {
    waBox.style.display = "block";
    typeText();
  }, 3000);

  // Open on click
  waBtn.addEventListener("click", () => {
    waBox.style.display = "block";
  });

  // Close
  waClose.addEventListener("click", () => {
    waBox.style.display = "none";
  });

});

// Project Filtering Logic
const noProjectsMsg = document.getElementById("no-projects");

// Inside your filter loop...
let visibleCount = 0;
projectItems.forEach(item => {
    if (filterValue === "all" || item.dataset.category === filterValue) {
        item.style.display = "block";
        visibleCount++;
    } else {
        item.style.display = "none";
    }
});
noProjectsMsg.style.display = visibleCount === 0 ? "block" : "none";


const form = document.querySelector('.contact-form');
const button = form.querySelector('button');

form.onsubmit = async (e) => {
    e.preventDefault();
    button.disabled = true;
    button.innerHTML = 'Sending... <i class="fa fa-spinner fa-spin ms-2"></i>';

    const formData = new FormData(form);
    const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
        button.innerHTML = 'Sent Successfully! <i class="fa fa-check ms-2"></i>';
        button.style.backgroundColor = '#00ffcc'; // Feedback color
        button.style.color = '#036164';
        form.reset();
    } else {
        button.disabled = false;
        button.innerHTML = 'Error. Try Again.';
    }
};