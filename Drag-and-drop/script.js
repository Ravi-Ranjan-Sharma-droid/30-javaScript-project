let lists = document.getElementsByClassName("list");
let rightBox = document.getElementById("right");
let leftBox = document.getElementById("left");

let selected = null;

// Add dragstart to each draggable item
for (let list of lists) {
  list.addEventListener("dragstart", function (e) {
    selected = e.target;
  });
}

// Allow drop on right box
rightBox.addEventListener("dragover", function (e) {
  e.preventDefault();
});
rightBox.addEventListener("drop", function (e) {
  if (selected) {
    rightBox.appendChild(selected);
    selected = null;
  }
});

// Allow drop on left box
leftBox.addEventListener("dragover", function (e) {
  e.preventDefault();
});
leftBox.addEventListener("drop", function (e) {
  if (selected) {
    leftBox.appendChild(selected);
    selected = null;
  }
});
