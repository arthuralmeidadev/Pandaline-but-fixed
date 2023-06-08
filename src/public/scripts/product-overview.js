const sizeButtons = document.getElementsByName("size-choice");
sizeButtons[0].classList.add("checked");

function updateButtons(thisButton) {
  console.log(thisButton)
  sizeButtons.forEach(button => {
    button.classList.remove("checked");
  });
  thisButton.classList.add("checked");
};