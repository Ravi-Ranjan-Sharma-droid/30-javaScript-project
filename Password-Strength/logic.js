        const pass = document.getElementById("password");
        const msg = document.getElementById("message");
        const str = document.getElementById("strength");
        const show = document.getElementById("Show");

        function hasUpperCase(str) {
            return /[A-Z]/.test(str);
        }

        function hasSymbol(str) {
            return /[^A-Za-z0-9]/.test(str);
        }

        pass.addEventListener("input", () => {
            const val = pass.value;
            msg.style.display = val.length > 0 ? "block" : "none";

            const lengthOK = val.length >= 8;
            const upperOK = hasUpperCase(val);
            const symbolOK = hasSymbol(val);

            if (val.length < 4) {
                str.textContent = " Weak";
                str.className = "week";
            } else if (lengthOK && upperOK && symbolOK) {
                str.textContent = " Strong";
                str.className = "strong";
            } else {
                str.textContent = " Medium";
                str.className = "medium";
            }
        });

        show.addEventListener("click", () => {
            if (pass.type === "password") {
                pass.type = "text";
                show.textContent = "Hide Password";
            } 
            else {
                pass.type = "password";
                show.textContent = "Show Password";
            }
        });