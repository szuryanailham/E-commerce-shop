// cart
let cartIcon = document.querySelector("#card-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

// Open Cart

cartIcon.onclick = () => {
  cart.classList.add("active");
};
// Close Cart

closeCart.onclick = () => {
  cart.classList.remove("active");
};

// Cart Working JS
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
// Making Function
function ready() {
  // Remove Items From Cart
  const removeCartButtons = document.getElementsByClassName("cart-remove");
  for (let i = 0; i < removeCartButtons.length; i++) {
    const button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }
  //   Quantity Changes
  const quantityInputs = document.getElementsByClassName("cart-quantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    const input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  //  Add To Cart
  const addCart = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCart.length; i++) {
    const button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
  // Buy button Work
  document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);
}
//  Buy Button
function buyButtonClicked() {
  alert("Your Order is placed");
  const cartContent = document.getElementsByClassName("cart-content")[0];
  console.log(cartContent.childNodes.length);
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  UpdateTotal();
}

// Remove Items From Cart
function removeCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  UpdateTotal();
}
// Quantity Changes
function quantityChanged(event) {
  const input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  UpdateTotal();
}
// add To Cart
function addCartClicked(event) {
  const button = event.target;
  const shopProducts = button.parentElement;
  console.log(shopProducts);
  const title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  const price = shopProducts.getElementsByClassName("price")[0].innerText;
  const productImg = shopProducts.getElementsByClassName("prodcut")[0].src;
  addProductToCart(title, price, productImg);
  UpdateTotal();
}
function addProductToCart(title, price, productImg) {
  const cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  const cartItems = document.getElementsByClassName("cart-content")[0];
  const cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
  for (let i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerHTML == title) {
      alert("you have already add this item to cart");
      return;
    }
  }
  const cartBoxContent = `
  <img src="${productImg}" alt="image" class="cart-img" />
  <div class="detail-box">
    <div class="cart-product-title">${title}</div>
    <div class="cart-price">${price}</div>
    <input type="number" value="1" class="cart-quantity" />
  </div>
  <!-- Remove cart -->
  <i class="bx bxs-trash-alt cart-remove"></i>`;
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
  cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);
}

// Update Total
function UpdateTotal() {
  const cartContent = document.getElementsByClassName("cart-content")[0];
  const cartBoxes = cartContent.getElementsByClassName("cart-box");
  let total = 0;
  for (let i = 0; i < cartBoxes.length; i++) {
    const cartBox = cartBoxes[i];
    console.log(cartBox);
    const priceElement = cartBox.getElementsByClassName("cart-price")[0];
    const quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    const price = parseFloat(priceElement.innerText.replace("$", ""));
    const quantity = quantityElement.value;
    total = total + price * quantity;
  }
  // if price contain sam Cents Value
  total = Math.round(total * 100) / 100;
  console.log;

  document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}
