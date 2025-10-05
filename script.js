// Product Data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// ✅ Step 1: Initialize sessionStorage with [P1, P5]
function initializeCart() {
  const existingCart = sessionStorage.getItem("cart");
  if (!existingCart) {
    const initialCart = [
      { id: 1, name: "Product 1", price: 10 },
      { id: 5, name: "Product 5", price: 50 },
    ];
    sessionStorage.setItem("cart", JSON.stringify(initialCart));
  }
}

// ✅ Step 2: Get and Save Cart
function getCart() {
  return JSON.parse(sessionStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// ✅ Step 3: Render Product List (5 products)
function renderProducts() {
  products.forEach((p) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = "Add to Cart";
    button.addEventListener("click", () => addToCart(p.id));
    li.textContent = `${p.name} - $${p.price}`;
    li.appendChild(button);
    productList.appendChild(li);
  });
}

// ✅ Step 4: Render Cart (empty UL but not null)
function renderCart() {
  cartList.innerHTML = "";
  const cart = getCart();
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// ✅ Step 5: Add to Cart logic
function addToCart(id) {
  const cart = getCart();
  const product = products.find((p) => p.id === id);
  if (product) {
    cart.push(product);
    saveCart(cart);
    renderCart();
  }
}

// ✅ Step 6: Clear Cart
clearCartBtn.addEventListener("click", () => {
  sessionStorage.removeItem("cart");
  cartList.innerHTML = "";
});

// Initialize everything
initializeCart();
renderProducts();
renderCart();
