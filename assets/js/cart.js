/* ═══════════════════════════════════════════════════════════════
   MELOJEY — CART & PRODUCT GALLERY MANAGER  (cart.js)
   localStorage key: "melojey_cart"
   Features:
   1. Real-time shopping cart CRUD & instant navbar badge updates
   2. Dedicated Modal Add-to-Cart controller with active stepper & toast
   3. Modal Image Gallery with Left & Right arrows, dots & angle counter
   4. Cross-page stepper synchronization
   5. WhatsApp multi-item order builder
═══════════════════════════════════════════════════════════════ */

const MELOJEY_CART_KEY = "melojey_cart";
const WA_LINE_1_CART = "2348033218845";
const WA_LINE_2_CART = "2348037768889";

/* ── Path Helpers ─────────────────────────────────────────── */
function getCartPageUrl() {
  if (typeof window === "undefined" || !window.location) return "pages/cart.html";
  const path = window.location.pathname.replace(/\\/g, "/");
  if (path.includes("/categories/")) return "../pages/cart.html";
  if (path.includes("/pages/")) return "cart.html";
  return "pages/cart.html";
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

/* ── Cart CRUD Operations ─────────────────────────────────── */
function cartGetAll() {
  try {
    return JSON.parse(localStorage.getItem(MELOJEY_CART_KEY) || "[]");
  } catch {
    return [];
  }
}

function cartSave(items) {
  localStorage.setItem(MELOJEY_CART_KEY, JSON.stringify(items));
  cartUpdateBadges();
}

function cartTotalQty() {
  return cartGetAll().reduce((sum, i) => sum + (Number(i.qty) || 1), 0);
}

/* ── Stock Checker Helper ─────────────────────────────────── */
function getProductStock(productId, fallbackProduct) {
  if (fallbackProduct && fallbackProduct.stock !== undefined && fallbackProduct.stock !== null) {
    return Number(fallbackProduct.stock);
  }
  if (typeof window !== "undefined" && window.MELOJEY_DATA && Array.isArray(window.MELOJEY_DATA.ALL_PRODUCTS)) {
    const found = window.MELOJEY_DATA.ALL_PRODUCTS.find(p => String(p.id) === String(productId));
    if (found && found.stock !== undefined && found.stock !== null) {
      return Number(found.stock);
    }
  }
  return null;
}

function cartAddItem(product, qty = 1) {
  if (!product || !product.id) return false;
  const stock = getProductStock(product.id, product);
  if (stock !== null && stock <= 0) {
    showCartToast(product, 0, "Sorry, this item is sold out!", true);
    return false;
  }

  let items = cartGetAll();
  const idx = items.findIndex(i => String(i.id) === String(product.id));
  const currentQty = idx > -1 ? (Number(items[idx].qty) || 0) : 0;
  let addQty = Math.max(1, Number(qty) || 1);

  if (stock !== null && currentQty + addQty > stock) {
    const allowed = Math.max(0, stock - currentQty);
    if (allowed === 0) {
      showCartToast(product, currentQty, `Only ${stock} piece(s) available in showroom!`, true);
      return false;
    }
    addQty = allowed;
    showCartToast(product, stock, `Only ${stock} piece(s) available in showroom!`, true);
  }

  if (idx > -1) {
    items[idx].qty = currentQty + addQty;
    if (stock !== null) items[idx].stock = stock;
  } else {
    items.push({
      id: product.id,
      name: product.name || "Luxury Furniture",
      category: product.category || "Furniture",
      price: Number(product.price) || 0,
      originalPrice: Number(product.originalPrice) || Math.round((Number(product.price) || 0) * 1.15),
      discountPct: Number(product.discountPct) || 15,
      image: product.image || "",
      stock: stock,
      qty: addQty
    });
  }
  cartSave(items);
  return true;
}

function cartSetQty(productId, qty) {
  let items = cartGetAll();
  const idx = items.findIndex(i => String(i.id) === String(productId));
  const newQty = Number(qty);
  const stock = getProductStock(productId, idx > -1 ? items[idx] : null);

  if (stock !== null && newQty > stock) {
    showCartToast(items[idx] || { name: "Item" }, stock, `Only ${stock} piece(s) available!`, true);
    if (idx > -1) {
      items[idx].qty = stock;
      cartSave(items);
    }
    return items;
  }

  if (idx > -1) {
    if (newQty <= 0) {
      items.splice(idx, 1);
    } else {
      items[idx].qty = newQty;
      if (stock !== null) items[idx].stock = stock;
    }
  }
  cartSave(items);
  return items;
}

function cartGetQty(productId) {
  const item = cartGetAll().find(i => String(i.id) === String(productId));
  return item ? (Number(item.qty) || 1) : 0;
}

function cartRemoveItem(productId) {
  cartSave(cartGetAll().filter(i => String(i.id) !== String(productId)));
}

function cartClear() {
  cartSave([]);
}

/* ── Badge Update ─────────────────────────────────────────── */
function cartUpdateBadges() {
  const total = cartTotalQty();
  document.querySelectorAll(".cart-badge").forEach(el => {
    el.textContent = total;
    el.style.display = total > 0 ? "flex" : "none";
    el.classList.remove("bump");
    // Trigger reflow to restart animation
    void el.offsetWidth;
    el.classList.add("bump");
    setTimeout(() => el.classList.remove("bump"), 350);
  });
}

/* ── Toast Notification ───────────────────────────────────── */
let toastTimeout = null;
function showCartToast(product, qty = 1, customMsg = null, isError = false) {
  if (!product) return;
  let toastEl = document.getElementById("cart-toast");
  if (!toastEl) {
    toastEl = document.createElement("div");
    toastEl.id = "cart-toast";
    toastEl.className = "cart-toast";
    document.body.appendChild(toastEl);
  }

  const name = product.name || "Item";
  const cartUrl = getCartPageUrl();
  const isSubfolder = window.location.pathname.includes("/pages/") || window.location.pathname.includes("/categories/");
  const faviconUrl = isSubfolder ? "../assets/images/favicon.png" : "assets/images/favicon.png";

  toastEl.innerHTML = `
    <div class="cart-toast-body">
      <img src="${faviconUrl}" alt="Melojey" class="cart-toast-icon" />
      <div class="cart-toast-info">
        <span class="cart-toast-title" style="${isError ? 'color:#C89850;' : ''}">${isError ? 'Inventory Limit' : 'Added to Cart'}</span>
        <span class="cart-toast-name" title="${name}">${customMsg || name}</span>
      </div>
      <a href="${cartUrl}" class="cart-toast-link">View Cart &rarr;</a>
    </div>
  `;

  toastEl.classList.add("show");
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toastEl.classList.remove("show");
  }, 3200);
}

/* ── WhatsApp Order Link ──────────────────────────────────── */
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

/* ═══════════════════════════════════════════════════════════════
   PRODUCT MULTI-ANGLE GALLERY
═══════════════════════════════════════════════════════════════ */

const PRODUCT_ANGLE_CATALOG = {
  // WARDROBES
  "WD01": [
    "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1558997519-83ea9252def8?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop"
  ],
  "WD02": [
    "https://images.unsplash.com/photo-1558997519-83ea9252def8?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop"
  ],
  "WD03": [
    "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1558997519-83ea9252def8?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&h=600&fit=crop"
  ],
  "WD04": [
    "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop"
  ],
  // SOFAS
  "SF01": [
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop"
  ],
  "SF02": [
    "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&h=600&fit=crop"
  ],
  "SF03": [
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&h=600&fit=crop"
  ],
  "SF04": [
    "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop"
  ],
  // BEDS
  "BD01": [
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&h=600&fit=crop"
  ],
  "BD02": [
    "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&h=600&fit=crop"
  ],
  "BD03": [
    "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?w=800&h=600&fit=crop"
  ],
  // DINING
  "DN01": [
    "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=800&h=600&fit=crop"
  ],
  "DN02": [
    "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1580481077195-c3a9f0a514d4?w=800&h=600&fit=crop"
  ],
  // OFFICE
  "OF01": [
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop"
  ],
  "OF02": [
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop"
  ]
};

const CATEGORY_FALLBACK_ANGLES = {
  WARDROBES: [
    "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1558997519-83ea9252def8?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop"
  ],
  SOFAS: [
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop"
  ],
  BEDS: [
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&h=600&fit=crop"
  ],
  DINING: [
    "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1580481077195-c3a9f0a514d4?w=800&h=600&fit=crop"
  ],
  OFFICE: [
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=800&h=600&fit=crop"
  ],
  BAR: [
    "https://images.unsplash.com/photo-1503602642458-232111445657?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&h=600&fit=crop"
  ],
  TABLES: [
    "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=600&fit=crop"
  ],
  RUGS: [
    "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop"
  ],
  DECOR: [
    "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=600&fit=crop"
  ],
  OTHERS: [
    "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&h=600&fit=crop"
  ]
};

function getProductAngles(product) {
  if (!product) return [];
  const isSubfolder = window.location.pathname.includes("/pages/") || window.location.pathname.includes("/categories/");
  const fixPath = url => {
    if (!url) return "";
    let clean = url.trim();
    if (isSubfolder && !clean.startsWith("http") && !clean.startsWith("../") && !clean.startsWith("/") && !clean.startsWith("data:")) {
      return "../" + clean;
    }
    return clean;
  };

  // If the product has multiple images defined (from Google Sheet or catalog), use them directly
  if (Array.isArray(product.images) && product.images.length > 1) {
    return product.images.map(fixPath).slice(0, 5);
  }

  const pId = String(product.id || "").toUpperCase();
  const catKey = String(product.category || "").toUpperCase();

  let list = [];
  if (PRODUCT_ANGLE_CATALOG[pId]) {
    list = [...PRODUCT_ANGLE_CATALOG[pId]];
  } else if (CATEGORY_FALLBACK_ANGLES[catKey]) {
    list = [...CATEGORY_FALLBACK_ANGLES[catKey]];
  } else {
    list = [...CATEGORY_FALLBACK_ANGLES.SOFAS];
  }

  // Ensure product's main image is at index 0
  if (product.image) {
    const cleanMain = fixPath(product.image);
    list = [cleanMain, ...list.map(fixPath).filter(url => url !== cleanMain && url !== product.image)];
  }

  return list.slice(0, 3);
}

// Active gallery state
let activeGalleryCleanup = null;

function setupModalGallery(modalContainer, product) {
  if (!modalContainer || !product) return;
  const imgCol = modalContainer.querySelector(".modal-img-col");
  if (!imgCol) return;

  const imgEl = imgCol.querySelector(".modal-img") || document.getElementById("modal-img");
  if (!imgEl) return;

  // Clean up previous listeners if any
  if (activeGalleryCleanup) {
    activeGalleryCleanup();
    activeGalleryCleanup = null;
  }

  // Ensure navigation arrows exist
  let prevBtn = imgCol.querySelector(".modal-prev-btn");
  if (!prevBtn) {
    prevBtn = document.createElement("button");
    prevBtn.className = "modal-gallery-arrow modal-prev-btn";
    prevBtn.id = "modal-prev-btn";
    prevBtn.type = "button";
    prevBtn.setAttribute("aria-label", "Previous angle");
    prevBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    `;
    imgCol.appendChild(prevBtn);
  }

  let nextBtn = imgCol.querySelector(".modal-next-btn");
  if (!nextBtn) {
    nextBtn = document.createElement("button");
    nextBtn.className = "modal-gallery-arrow modal-next-btn";
    nextBtn.id = "modal-next-btn";
    nextBtn.type = "button";
    nextBtn.setAttribute("aria-label", "Next angle");
    nextBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    `;
    imgCol.appendChild(nextBtn);
  }

  // Ensure angle counter badge exists
  let counterEl = imgCol.querySelector(".modal-gallery-counter");
  if (!counterEl) {
    counterEl = document.createElement("span");
    counterEl.className = "modal-gallery-counter";
    counterEl.id = "modal-gallery-counter";
    imgCol.appendChild(counterEl);
  }

  // Ensure dots container exists
  let dotsContainer = imgCol.querySelector(".modal-gallery-dots");
  if (!dotsContainer) {
    dotsContainer = document.createElement("div");
    dotsContainer.className = "modal-gallery-dots";
    dotsContainer.id = "modal-gallery-dots";
    imgCol.appendChild(dotsContainer);
  }

  const angles = getProductAngles(product);
  let currentIndex = 0;

  const hasMultiple = angles.length > 1;
  if (prevBtn) prevBtn.style.display = hasMultiple ? "flex" : "none";
  if (nextBtn) nextBtn.style.display = hasMultiple ? "flex" : "none";
  if (counterEl) counterEl.style.display = hasMultiple ? "block" : "none";
  if (dotsContainer) dotsContainer.style.display = hasMultiple ? "flex" : "none";

  // Build dots
  dotsContainer.innerHTML = angles.map((_, i) =>
    `<span class="modal-dot ${i === 0 ? "active" : ""}" data-idx="${i}" aria-label="Angle ${i + 1}"></span>`
  ).join("");

  function renderAngle(idx, animate = true) {
    if (angles.length === 0) return;
    currentIndex = (idx + angles.length) % angles.length;
    const targetUrl = angles[currentIndex];

    if (animate) {
      imgEl.classList.add("changing");
      setTimeout(() => {
        imgEl.src = targetUrl;
        imgEl.alt = `${product.name || "Product"} - View angle ${currentIndex + 1}`;
        imgEl.classList.remove("changing");
      }, 140);
    } else {
      imgEl.src = targetUrl;
      imgEl.alt = `${product.name || "Product"} - View angle ${currentIndex + 1}`;
      imgEl.classList.remove("changing");
    }

    // Update Counter
    counterEl.textContent = `${currentIndex + 1} / ${angles.length}`;

    // Update Dots
    dotsContainer.querySelectorAll(".modal-dot").forEach((d, i) => {
      d.classList.toggle("active", i === currentIndex);
    });
  }

  // Initial render
  renderAngle(0, false);

  // Click Handlers
  const handlePrev = e => {
    e.stopPropagation();
    renderAngle(currentIndex - 1, true);
  };
  const handleNext = e => {
    e.stopPropagation();
    renderAngle(currentIndex + 1, true);
  };
  prevBtn.onclick = handlePrev;
  nextBtn.onclick = handleNext;

  dotsContainer.querySelectorAll(".modal-dot").forEach(d => {
    d.onclick = e => {
      e.stopPropagation();
      const idx = Number(d.getAttribute("data-idx") || 0);
      renderAngle(idx, true);
    };
  });

  // Keyboard navigation
  const handleKeydown = e => {
    if (!modalContainer.classList.contains("open")) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      renderAngle(currentIndex - 1, true);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      renderAngle(currentIndex + 1, true);
    }
  };
  document.addEventListener("keydown", handleKeydown);

  // Touch Swipe for mobile
  let touchStartX = 0;
  let touchStartY = 0;
  const handleTouchStart = e => {
    if (e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }
  };
  const handleTouchEnd = e => {
    if (e.changedTouches.length === 1) {
      const deltaX = e.changedTouches[0].clientX - touchStartX;
      const deltaY = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
          renderAngle(currentIndex - 1, true); // Swiped right -> prev
        } else {
          renderAngle(currentIndex + 1, true); // Swiped left -> next
        }
      }
    }
  };
  imgCol.addEventListener("touchstart", handleTouchStart, { passive: true });
  imgCol.addEventListener("touchend", handleTouchEnd, { passive: true });

  activeGalleryCleanup = () => {
    document.removeEventListener("keydown", handleKeydown);
    imgCol.removeEventListener("touchstart", handleTouchStart);
    imgCol.removeEventListener("touchend", handleTouchEnd);
  };
}

/* ═══════════════════════════════════════════════════════════════
   DEDICATED MODAL ADD-TO-CART CONTROLLER
═══════════════════════════════════════════════════════════════ */

function setupModalCart(wrapEl, product) {
  if (!wrapEl || !product || !product.id) return;

  function renderModalCartState() {
    const qty = cartGetQty(product.id);
    const cartUrl = getCartPageUrl();

    const stock = getProductStock(product.id, product);

    if (qty <= 0) {
      if (stock !== null && stock <= 0) {
        wrapEl.innerHTML = `
          <button class="btn-add-cart modal-add-cart-btn btn-sold-out" disabled type="button">
            Sold Out
          </button>
        `;
        return;
      }

      wrapEl.innerHTML = `
        <button class="btn-add-cart modal-add-cart-btn" data-id="${product.id}" type="button">
          Add to Cart
        </button>
      `;
      const btn = wrapEl.querySelector(".btn-add-cart");
      if (btn) {
        btn.onclick = e => {
          e.stopPropagation();
          const added = cartAddItem(product, 1);
          if (added !== false) {
            showCartToast(product, 1);
            renderModalCartState();
            syncOtherSteppers(product.id, 1, product, wrapEl);
          }
        };
      }
    } else {
      wrapEl.innerHTML = `
        <div class="modal-cart-simple-stepper" data-id="${product.id}">
          <button class="modal-step-btn modal-step-minus" aria-label="Decrease quantity" type="button">−</button>
          <span class="modal-step-info">
            <span class="modal-step-num">${qty}</span> in Cart
          </span>
          <button class="modal-step-btn modal-step-plus" aria-label="Increase quantity" type="button">+</button>
        </div>
      `;

      const minusBtn = wrapEl.querySelector(".modal-step-minus");
      const plusBtn = wrapEl.querySelector(".modal-step-plus");

      if (plusBtn) {
        plusBtn.onclick = e => {
          e.stopPropagation();
          const current = cartGetQty(product.id);
          if (stock !== null && current >= stock) {
            showCartToast(product, stock, `Only ${stock} piece(s) available in showroom!`, true);
            return;
          }
          const nextQty = current + 1;
          cartSetQty(product.id, nextQty);
          renderModalCartState();
          syncOtherSteppers(product.id, nextQty, product, wrapEl);
        };
      }

      if (minusBtn) {
        minusBtn.onclick = e => {
          e.stopPropagation();
          const current = cartGetQty(product.id);
          const nextQty = current - 1;
          if (nextQty <= 0) {
            cartSetQty(product.id, 0);
            renderModalCartState();
            syncOtherSteppers(product.id, 0, product, wrapEl);
          } else {
            cartSetQty(product.id, nextQty);
            renderModalCartState();
            syncOtherSteppers(product.id, nextQty, product, wrapEl);
          }
        };
      }
    }
  }

  renderModalCartState();
}

/* ═══════════════════════════════════════════════════════════════
   GRID CARD STEPPER CONTROLLER
═══════════════════════════════════════════════════════════════ */

function initCartStepper(cardEl, product) {
  if (!cardEl || !product || !product.id) return;
  const footer = cardEl.querySelector(".card-footer") || cardEl;
  const existingBtn = footer.querySelector(".btn-add-cart");
  if (!existingBtn) return;

  const stock = getProductStock(product.id, product);
  if (stock !== null && stock <= 0) {
    existingBtn.disabled = true;
    existingBtn.textContent = "Sold Out";
    existingBtn.classList.add("btn-sold-out");
    return;
  }

  const currentQty = cartGetQty(product.id);

  if (currentQty > 0) {
    replaceBtnWithStepper(existingBtn, product, currentQty);
  } else {
    existingBtn.onclick = e => {
      e.stopPropagation();
      const added = cartAddItem(product, 1);
      if (added !== false) {
        showCartToast(product, 1);
        replaceBtnWithStepper(existingBtn, product, 1);
        syncOtherSteppers(product.id, 1, product, existingBtn);
      }
    };
  }
}

function syncOtherSteppers(productId, qty, product, sourceNode) {
  const pId = String(productId);

  // 1. Sync Modal Cart Action if open and matching
  const modalCartWrap = document.getElementById("modal-cart-action");
  if (modalCartWrap && (!sourceNode || !modalCartWrap.contains(sourceNode))) {
    const modalAddBtn = modalCartWrap.querySelector("[data-id]");
    const modalStepper = modalCartWrap.querySelector(".modal-cart-simple-stepper");
    const activeModalId = modalAddBtn?.getAttribute("data-id") || modalStepper?.getAttribute("data-id");
    if (activeModalId === pId && product) {
      setupModalCart(modalCartWrap, product);
    }
  }

  // 1b. If on cart page, trigger re-render of cart table live
  if (typeof window.renderCartPage === "function" && (!sourceNode || sourceNode.closest("#modal-overlay"))) {
    window.renderCartPage();
  }

  // 2. Sync Steppers on Grid Cards
  document.querySelectorAll(`.qty-stepper[data-id="${pId}"]`).forEach(stepper => {
    if (sourceNode && (stepper === sourceNode || stepper.contains(sourceNode))) return;
    if (qty <= 0) {
      const addBtn = document.createElement("button");
      addBtn.className = "btn-add-cart";
      addBtn.setAttribute("data-id", pId);
      addBtn.type = "button";
      addBtn.textContent = "Add to Cart";
      const container = stepper.closest(".product-card") || stepper.parentElement;
      stepper.replaceWith(addBtn);
      if (container && product) initCartStepper(container, product);
    } else {
      const numEl = stepper.querySelector(".qty-num");
      if (numEl) numEl.textContent = qty;
    }
  });

  // 3. Sync Add to Cart buttons on Grid Cards
  if (qty > 0) {
    document.querySelectorAll(`.btn-add-cart[data-id="${pId}"]`).forEach(btn => {
      if (btn.classList.contains("modal-add-cart-btn")) return;
      if (sourceNode && (btn === sourceNode || btn.contains(sourceNode))) return;
      if (product) replaceBtnWithStepper(btn, product, qty);
    });
  }
}

function replaceBtnWithStepper(btn, product, initialQty) {
  if (!btn) return;
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

  plusBtn.onclick = e => {
    e.stopPropagation();
    const stock = getProductStock(product.id, product);
    const current = cartGetQty(product.id);
    if (stock !== null && current >= stock) {
      showCartToast(product, stock, `Only ${stock} piece(s) available in showroom!`, true);
      return;
    }
    const newQty = current + 1;
    cartSetQty(product.id, newQty);
    numEl.textContent = newQty;
    syncOtherSteppers(product.id, newQty, product, stepper);
  };

  minusBtn.onclick = e => {
    e.stopPropagation();
    const newQty = cartGetQty(product.id) - 1;
    if (newQty <= 0) {
      cartSetQty(product.id, 0);
      const addBtn = document.createElement("button");
      addBtn.className = "btn-add-cart";
      addBtn.setAttribute("data-id", product.id);
      addBtn.type = "button";
      addBtn.textContent = "Add to Cart";
      const container = stepper.closest(".product-card") || stepper.parentElement;
      stepper.replaceWith(addBtn);
      if (container) initCartStepper(container, product);
      syncOtherSteppers(product.id, 0, product, addBtn);
    } else {
      cartSetQty(product.id, newQty);
      numEl.textContent = newQty;
      syncOtherSteppers(product.id, newQty, product, stepper);
    }
  };
}

/* ── Global API Exports ───────────────────────────────────── */
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
  setupModal: setupModalCart,
  showToast: showCartToast
};

window.MelojeyGallery = {
  getAngles: getProductAngles,
  setup: setupModalGallery
};

/* Init badges on load */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", cartUpdateBadges);
} else {
  cartUpdateBadges();
}
