/* ═══════════════════════════════════════════════════════════════
   MELOJEY — CART MANAGER  (cart.js)
   localStorage key: "melojey_cart"
   Each item: { id, name, category, price, originalPrice, discountPct, image, qty }
═══════════════════════════════════════════════════════════════ */

const MELOJEY_CART_KEY = "melojey_cart";
const WA_LINE_1_CART = "2348033218845";
const WA_LINE_2_CART = "2348037768889";

/* ── Helpers ─────────────────────────────────────────────── */
function cartGetAll() {
  try {
    return JSON.parse(localStorage.getItem(MELOJEY_CART_KEY) || "[]");
  } catch { return []; }
}

function cartSave(items) {
  localStorage.setItem(MELOJEY_CART_KEY, JSON.stringify(items));
  cartUpdateBadges();
}

function cartTotalQty() {
  return cartGetAll().reduce((sum, i) => sum + (i.qty || 1), 0);
}

/* ── CRUD ────────────────────────────────────────────────── */
function cartAddItem(product, qty = 1) {
  let items = cartGetAll();
  const idx = items.findIndex(i => i.id === product.id);
  if (idx > -1) {
    items[idx].qty = (items[idx].qty || 1) + qty;
  } else {
    items.push({ ...product, qty });
  }
  cartSave(items);
}

function cartSetQty(productId, qty) {
  let items = cartGetAll();
  const idx = items.findIndex(i => i.id === productId);
  if (idx > -1) {
    if (qty <= 0) {
      items.splice(idx, 1);
    } else {
      items[idx].qty = qty;
    }
  }
  cartSave(items);
  return items;
}

function cartGetQty(productId) {
  const item = cartGetAll().find(i => i.id === productId);
  return item ? (item.qty || 1) : 0;
}

function cartRemoveItem(productId) {
  cartSave(cartGetAll().filter(i => i.id !== productId));
}

function cartClear() {
  cartSave([]);
}

/* ── Badge update ────────────────────────────────────────── */
function cartUpdateBadges() {
  const total = cartTotalQty();
  document.querySelectorAll(".cart-badge").forEach(el => {
    el.textContent = total;
    el.style.display = total > 0 ? "flex" : "none";
    el.classList.add("bump");
    setTimeout(() => el.classList.remove("bump"), 300);
  });
}

function resolveImageUrl(img) {
  if (!img) return "";
  if (img.startsWith("http://") || img.startsWith("https://")) return img;
  if (typeof window !== "undefined" && window.location && window.location.origin && !window.location.origin.startsWith("file")) {
    const clean = img.replace(/^(\.\.\/)+/, "").replace(/^\//, "");
    return `${window.location.origin}/${clean}`;
  }
  return img;
}

/* ── WhatsApp order link from cart ──────────────────────── */
function buildCartWaLink(number) {
  const items = cartGetAll();
  if (items.length === 0) return `https://wa.me/${number}`;
  const fmt = n => `₦${Number(n).toLocaleString("en-NG")}`;
  const lines = items.map((i, idx) =>
    `${idx + 1}. *${i.name}* (Qty: ${i.qty || 1}) — ${fmt(i.price * (i.qty || 1))}\n   📷 Photo: ${resolveImageUrl(i.image)}`
  ).join("\n\n");
  const total = fmt(items.reduce((s, i) => s + i.price * (i.qty || 1), 0));
  const count = items.reduce((s, i) => s + (i.qty || 1), 0);
  const msg =
    `Hello Melojey Modern Furniture! I'd like to place an order (${count} item${count !== 1 ? "s" : ""}):\n\n` +
    `${lines}\n\n` +
    `*Order Total: ${total}*\n\n` +
    `Please confirm showroom availability and delivery details. Thank you!`;
  return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
}

/* ── Init stepper on a product card ─────────────────────── */
function initCartStepper(cardEl, product) {
  const footer = cardEl.querySelector(".card-footer");
  if (!footer) return;

  const existingBtn = footer.querySelector(".btn-add-cart");
  if (!existingBtn) return;

  const currentQty = cartGetQty(product.id);

  if (currentQty > 0) {
    replaceBtnWithStepper(existingBtn, product, currentQty);
  } else {
    existingBtn.addEventListener("click", e => {
      e.stopPropagation();
      cartAddItem(product, 1);
      replaceBtnWithStepper(existingBtn, product, 1);
    });
  }
}

function replaceBtnWithStepper(btn, product, initialQty) {
  const stepper = document.createElement("div");
  stepper.className = "qty-stepper";
  stepper.setAttribute("data-id", product.id);
  stepper.innerHTML = `
    <button class="qty-btn qty-minus" aria-label="Decrease quantity" type="button">−</button>
    <span class="qty-num">${initialQty}</span>
    <button class="qty-btn qty-plus" aria-label="Increase quantity" type="button">+</button>
  `;

  btn.replaceWith(stepper);

  const numEl = stepper.querySelector(".qty-num");
  const minusBtn = stepper.querySelector(".qty-minus");
  const plusBtn = stepper.querySelector(".qty-plus");

  plusBtn.addEventListener("click", e => {
    e.stopPropagation();
    const items = cartSetQty(product.id, cartGetQty(product.id) + 1);
    numEl.textContent = cartGetQty(product.id);
  });

  minusBtn.addEventListener("click", e => {
    e.stopPropagation();
    const newQty = cartGetQty(product.id) - 1;
    if (newQty <= 0) {
      // Remove from cart, restore button
      cartSetQty(product.id, 0);
      const addBtn = document.createElement("button");
      addBtn.className = "btn-add-cart";
      addBtn.type = "button";
      addBtn.textContent = "Add to Cart";
      stepper.replaceWith(addBtn);
      initCartStepper(addBtn.closest(".product-card"), product);
    } else {
      cartSetQty(product.id, newQty);
      numEl.textContent = newQty;
    }
  });
}

/* Expose globally */
window.MelojeyCart = {
  getAll: cartGetAll,
  add: cartAddItem,
  setQty: cartSetQty,
  getQty: cartGetQty,
  remove: cartRemoveItem,
  clear: cartClear,
  totalQty: cartTotalQty,
  buildWaLink: buildCartWaLink,
  updateBadges: cartUpdateBadges,
  initStepper: initCartStepper,
};

/* Init badges on load */
document.addEventListener("DOMContentLoaded", cartUpdateBadges);
