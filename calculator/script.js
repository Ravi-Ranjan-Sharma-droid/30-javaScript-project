        let string = "";
        let memory = 0;
        const inputField = document.querySelector(".input");

        document.querySelectorAll(".button").forEach(button => {
            button.addEventListener("click", e => {
                const value = e.target.innerText;
                switch (value) {
                    case "=":
                        try {
                            string = eval(string).toString();
                        } catch (e) {
                            string = "Error";
                        }
                        break;
                    case "C":
                        string = "";
                        break;
                    case "M+":
                        memory = parseFloat(string || "0") + memory;
                        break;
                    case "M-":
                        memory = memory - parseFloat(string || "0");
                        break;
                    case "%":
                        try {
                            string = (parseFloat(string) / 100).toString();
                        } catch (e) {
                            string = "Error";
                        }
                        break;
                    default:
                        string += value;
                }
                inputField.value = string;
            });
        });