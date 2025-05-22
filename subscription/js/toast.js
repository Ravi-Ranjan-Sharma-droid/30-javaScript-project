const toastBox = document.getElementById("toastBox");

function showToast(message, type = "success") {
  // Limit to 4 toasts
  if (toastBox.children.length >= 4) {
    toastBox.removeChild(toastBox.firstChild);
  }

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.setAttribute("role", "alert");

  const icons = {
    success: "fa-circle-check",
    error: "fa-circle-xmark",
    invalid: "fa-circle-exclamation",
    working: "fa-screwdriver-wrench",
  };

  toast.innerHTML = `
<i class="fa-solid ${icons[type] || icons.success}"></i>
<div class="msg">${message}</div>
<div class="close">&times;</div>
<div class="progress"></div>
`;

  // Manual close
  toast.querySelector(".close").onclick = () => toast.remove();

  toastBox.appendChild(toast);

  // Auto dismiss
  setTimeout(() => {
    toast.style.animation = "fadeOut 0.4s forwards";
    setTimeout(() => toast.remove(), 400);
  }, 2000);
}
