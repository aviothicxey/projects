window.onload = function () {
    // Alert message on load
    alert("Welcome to Aparna's Portfolio!");

    // Typewriter effect for h2
    function startTypewriter() {
        const element = document.querySelector(".typewriter");
        const text = "Hello!! I'm Aparna...";
        let index = 0;
        element.textContent = "";

        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, 100);
            }
        }

        type();
    }

    startTypewriter();

    // Button click animation
    const btn = document.querySelector(".btn");
    if (btn) {
        btn.addEventListener("click", () => {
            btn.innerText = "Loading Projects...";
            btn.disabled = true;
            setTimeout(() => {
                btn.innerText = "See My Work";
                btn.disabled = false;
            }, 2000);
        });
    }

    // Dark mode toggle in footer
    const footer = document.querySelector("footer");
    if (footer) {
        const toggleBtn = document.createElement("button");
        toggleBtn.innerText = "🌙 Toggle Dark Mode";
        toggleBtn.classList.add("btn", "btn-light", "mt-3");
        toggleBtn.style.borderRadius = "25px";

        toggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("bg-dark");
            document.body.classList.toggle("text-white");
        });

        footer.appendChild(toggleBtn);
    }
};
