// Product data
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

// ✅ Initialize sessionStorage cart with two preloaded items
function initializeCart() {
  let cart = JSON.parse(sessionStorage.getItem("cart"));
  if (!cart || !Array.isArray(cart)) {
    cart = [
      { id: 1, name: "Product 1", price: 10 },
      { id: 5, name: "Product 5", price: 50 },
    ];
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }
}

// ✅ Get cart
function getCart() {
  return JSON.parse(sessionStorage.getItem("cart")) || [];
}

// ✅ Save cart
function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// ✅ Render product list
function renderProducts() {
  productList.innerHTML = "";
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price}
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(li);
  });

  // Event listeners for add-to-cart buttons
  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      addToCart(id);
    });
  });
}

// ✅ Render cart items (keep it empty initially)
function renderCart() {
  const cart = getCart();
  cartList.innerHTML = "";
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// ✅ Add item to cart
function addToCart(id) {
  const cart = getCart();
  const product = products.find((p) => p.id === id);
  if (product) {
    cart.push(product);
    saveCart(cart);
    renderCart();
  }
}

// ✅ Clear cart
function clearCart() {
  sessionStorage.removeItem("cart");
  cartList.innerHTML = "";
}

// Event Listeners
clearCartBtn.addEventListener("click", clearCart);

// Initialize and render
initializeCart();
renderProducts();
renderCart();
