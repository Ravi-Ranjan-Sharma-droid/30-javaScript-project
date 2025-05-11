const fileInput = document.getElementById("fileInput");
const preview = document.getElementById("preview");
const colorThief = new ColorThief();

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = (e) => {
      preview.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

preview.addEventListener("load", () => {
  if (preview.complete && preview.naturalHeight !== 0) {
    try {
      const color = colorThief.getColor(preview);
      document.body.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    } catch (error) {
      console.error("Color extraction failed:", error);
    }
  }
});
