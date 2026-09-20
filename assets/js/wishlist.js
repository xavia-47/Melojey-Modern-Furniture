/* ═══════════════════════════════════════════════════════════════
   MELOJEY — WISHLIST MANAGER  (wishlist.js)
   localStorage key: "melojey_wishlist"
   Each item: { id, name, category, price, originalPrice, discountPct, image }
═══════════════════════════════════════════════════════════════ */

const MELOJEY_WISHLIST_KEY = "melojey_wishlist";

/* ── Helpers ─────────────────────────────────────────────── */
function wishlistGetAll() {
  try {
    return JSON.parse(localStorage.getItem(MELOJEY_WISHLIST_KEY) || "[]");
  } catch { return []; }
}

function wishlistSave(items) {
  localStorage.setItem(MELOJEY_WISHLIST_KEY, JSON.stringify(items));
  wishlistUpdateBadges();
}

function wishlistIsWishlisted(productId) {
  return wishlistGetAll().some(i => i.id === productId);
}

function wishlistAdd(product) {
  const items = wishlistGetAll();
  if (!items.find(i => i.id === product.id)) {
    items.unshift({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      originalPrice: product.originalPrice,
      discountPct: product.discountPct,
      image: product.image
    });
    wishlistSave(items);
  }
}

function wishlistRemove(productId) {
  wishlistSave(wishlistGetAll().filter(i => i.id !== productId));
}

function wishlistToggle(product) {
  if (wishlistIsWishlisted(product.id)) {
    wishlistRemove(product.id);
    return false; // removed
  } else {
    wishlistAdd(product);
    return true; // added
  }
}

/* ── Badge update ────────────────────────────────────────── */
function wishlistUpdateBadges() {
  const total = wishlistGetAll().length;
  document.querySelectorAll(".wishlist-badge").forEach(el => {
    el.textContent = total;
    el.style.display = total > 0 ? "flex" : "none";
    el.classList.add("bump");
    setTimeout(() => el.classList.remove("bump"), 300);
  });
}

/* ── Attach star button to a product card ───────────────── */
function initWishlistStar(cardEl, product) {
  const starBtn = cardEl.querySelector(".card-wishlist-btn");
  if (!starBtn) return;

  // Set initial state
  const isWishlisted = wishlistIsWishlisted(product.id);
  starBtn.innerHTML = isWishlisted ? "★" : "☆";
  starBtn.classList.toggle("wishlisted", isWishlisted);
  starBtn.setAttribute("aria-label", isWishlisted ? "Remove from wishlist" : "Add to wishlist");
  starBtn.setAttribute("title", isWishlisted ? "Remove from wishlist" : "Add to wishlist");

  starBtn.addEventListener("click", e => {
    e.stopPropagation();
    const added = wishlistToggle(product);
    starBtn.innerHTML = added ? "★" : "☆";
    starBtn.classList.toggle("wishlisted", added);
    starBtn.setAttribute("aria-label", added ? "Remove from wishlist" : "Add to wishlist");
    starBtn.setAttribute("title", added ? "Remove from wishlist" : "Add to wishlist");

    // Pop animation
    starBtn.classList.remove("pop");
    void starBtn.offsetWidth; // reflow
    starBtn.classList.add("pop");
    setTimeout(() => starBtn.classList.remove("pop"), 500);
  });
}

function wishlistClear() {
  wishlistSave([]);
}

/* Expose globally */
window.MelojeyWishlist = {
  getAll: wishlistGetAll,
  add: wishlistAdd,
  remove: wishlistRemove,
  toggle: wishlistToggle,
  isWishlisted: wishlistIsWishlisted,
  updateBadges: wishlistUpdateBadges,
  initStar: initWishlistStar,
  clear: wishlistClear,
};

/* Init badges on load */
document.addEventListener("DOMContentLoaded", wishlistUpdateBadges);
