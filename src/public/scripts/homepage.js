const searchbar = document.querySelector("#search-bar");
const cart = document.querySelector("#cart-button");


window.addEventListener("scroll", () => {
  if (window.visualViewport.pageTop > 100) {
    searchbar.classList.add("didDarken");
    cart.classList.add("didDarken");
  } else {
    searchbar.classList.remove("didDarken");
    cart.classList.remove("didDarken");
  };
});

searchbar.addEventListener("keydown", event => {
  if (event.code == "Escape") {
    searchbar.blur();
  };
});