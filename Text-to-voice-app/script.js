let speech = new SpeechSynthesisUtterance();
let voices = []; // Corrected the variable name

let voiceSelect = document.querySelector("select");

window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices(); // Use 'voices' here
  speech.voice = voices[0]; // Default to the first voice

  voiceSelect.innerHTML = ""; // Clear previous options
  voices.forEach((voice, i) => {
    let option = new Option(voice.name, i);
    voiceSelect.appendChild(option); // Populate dropdown
  });
};

voiceSelect.addEventListener("change", () => {
  speech.voice = voices[voiceSelect.value]; // Use 'voices' instead of 'voice'
});

document.querySelector("button").addEventListener("click", () => {
  speech.text = document.querySelector("textarea").value;
  window.speechSynthesis.speak(speech);
});
