// ===========================
// WVS & MTN — Cart Utility
// ===========================

function getCart() {
  return JSON.parse(localStorage.getItem('wvsmtn_cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('wvsmtn_cart', JSON.stringify(cart));
}

function clearCart() {
  localStorage.setItem('wvsmtn_cart', JSON.stringify([]));
  updateCartCount();
}

function addToCart(id, name, price) {
  const cart = getCart();
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, name, price, qty: 1 });
  }
  saveCart(cart);
  updateCartCount();
  showToast(`${name} added to cart!`);
}

function updateCartCount() {
  const el = document.getElementById('cartCount');
  if (!el) return;
  const cart = getCart();
  el.textContent = cart.reduce((a, b) => a + b.qty, 0);
}

function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// Init cart count on load
document.addEventListener('DOMContentLoaded', updateCartCount);
