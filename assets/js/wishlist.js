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
    const discountPct = product.discountPct || (typeof window.getDiscountPct === "function" ? window.getDiscountPct(product) : 15);
    const originalPrice = product.originalPrice || (typeof window.getOriginalPrice === "function" ? window.getOriginalPrice(product.price, discountPct) : Math.round(Number(product.price) * 1.15));
    items.unshift({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      originalPrice: originalPrice,
      discountPct: discountPct,
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

/* ── Synchronize all star buttons for a product on the page ── */
function updateAllWishlistStars(productId, isWishlisted) {
  document.querySelectorAll(".card-wishlist-btn").forEach(btn => {
    const card = btn.closest("[data-id]");
    const id = btn.dataset.id || (card ? card.dataset.id : null);
    if (id && String(id) === String(productId)) {
      btn.innerHTML = isWishlisted ? "★" : "☆";
      btn.classList.toggle("wishlisted", isWishlisted);
      btn.classList.toggle("active", isWishlisted);
      btn.setAttribute("aria-label", isWishlisted ? "Remove from wishlist" : "Add to wishlist");
      btn.setAttribute("title", isWishlisted ? "Remove from wishlist" : "Add to wishlist");

      // Pop animation
      btn.classList.remove("pop");
      void btn.offsetWidth; // trigger reflow
      btn.classList.add("pop");
      setTimeout(() => btn.classList.remove("pop"), 400);

      // Blur to clear sticky touch hover/focus on mobile
      btn.blur();
    }
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
  starBtn.classList.toggle("active", isWishlisted);
  starBtn.setAttribute("aria-label", isWishlisted ? "Remove from wishlist" : "Add to wishlist");
  starBtn.setAttribute("title", isWishlisted ? "Remove from wishlist" : "Add to wishlist");

  if (starBtn.dataset.wishlistBound === "true") return;
  starBtn.dataset.wishlistBound = "true";

  starBtn.addEventListener("click", e => {
    e.preventDefault();
    e.stopPropagation();
    const added = wishlistToggle(product);
    updateAllWishlistStars(product.id, added);
    starBtn.blur();
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
