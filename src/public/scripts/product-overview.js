const sizeButtons = document.getElementsByName("size-choice");
const colorButtons = document.getElementsByName("color-choice");
sizeButtons[0].classList.add("checked");
colorButtons[0].classList.add("color-selected");

function updateSizeButtons(thisButton) {
  sizeButtons.forEach(button => {
    button.classList.remove("checked");
  });
  thisButton.classList.add("checked");
};

function updateColorButtons(thisButton) {
  colorButtons.forEach(button => {
    button.classList.remove("color-selected");
  });
  thisButton.classList.add("color-selected");
};

function subtractQuantity() {
  const quantity = document.getElementById("quantity");
  quantity.innerText = eval(quantity.innerText) - 1;
  if (eval(quantity.innerText) < 1) {
    quantity.innerText = 1
  };
};

function addQuantity() {
  const quantity = document.getElementById("quantity");
  quantity.innerText = eval(quantity.innerText) + 1;
  if (eval(quantity.innerText) > 20) {
    quantity.innerText = 20
  };
};