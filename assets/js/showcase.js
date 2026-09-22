/* ═════════════════════════════════════════════════════════════════════════════════
   MELOJEY MODERN FURNITURE — SHOWCASE & SEARCH CONTROLLER (showcase.js)
   ─────────────────────────────────────────────────────────────────────────────
   This file controls:
   1. The 8 Showcase Cards (Vendor Hub layout) styled in clean Light Theme
   2. The Recently Viewed horizontal cards with discount badges & prices
   3. The Center-Aligned Categories Navigation Bar (HOME to OTHERS)
   4. The Mobile Search Button (pure icon, no background circle) & live suggestions

   ═════════════════════════════════════════════════════════════════════════════
   BEGINNER EDITING GUIDE:
   • To edit the 8 cards (titles, photos, or labels):
     Find "SHOWCASE_CARDS_DATA" below. Each card is clearly commented.
   • To add/remove categories in the top bar: edit "CATEGORIES_LIST" below.
   ═════════════════════════════════════════════════════════════════════════════ */

/* ── 1. CATEGORIES LIST ──
   Center-aligned bar: Starts with HOME, ends with OTHERS */
const CATEGORIES_LIST = [
  "HOME",
  "SOFAS",
  "BEDS",
  "DINING",
  "OFFICE",
  "WARDROBES",
  "BAR",
  "TABLES",
  "RUGS",
  "DECOR",
  "OTHERS"
];

/* ── 2. THE 8 SHOWCASE CARDS DATA ──
   Alternates between:
   - "grid4": 4 small square tiles with images and labels underneath
   - "single": 1 large featured hero image
   You can change any image URL, title, or label right here! */
const SHOWCASE_CARDS_DATA = [
  // CARD 1 (4 Tiles): Living Room & Sofas
  {
    id: "card-sofas",
    title: 'Living Room & <span class="gold-accent">Sofas</span>',
    targetCategory: "SOFAS",
    type: "grid4",
    tiles: [
      {
        label: "Sectionals",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=450&h=450&fit=crop"
      },
      {
        label: "3-Seater Sofas",
        image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=450&h=450&fit=crop"
      },
      {
        label: "Recliners",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=450&h=450&fit=crop"
      },
      {
        label: "Accent Chairs",
        image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=450&h=450&fit=crop"
      }
    ]
  },

  // CARD 2 (1 Large Image): Master Bedroom Suites
  {
    id: "card-beds",
    title: 'Master Bedroom <span class="gold-accent">Suites</span>',
    targetCategory: "BEDS",
    type: "single",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=700&h=850&fit=crop",
    alt: "Luxury King Bed Frame with Upholstered Headboard"
  },

  // CARD 3 (4 Tiles): Dining & Bar Luxury
  {
    id: "card-dining",
    title: 'Dining & Bar <span class="gold-accent">Luxury</span>',
    targetCategory: "DINING",
    type: "grid4",
    tiles: [
      {
        label: "Marble Tables",
        image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=450&h=450&fit=crop"
      },
      {
        label: "Dining Chairs",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=450&h=450&fit=crop"
      },
      {
        label: "Bar Stools",
        image: "https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=450&h=450&fit=crop"
      },
      {
        label: "Wine Consoles",
        image: "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=450&h=450&fit=crop"
      }
    ]
  },

  // CARD 4 (1 Large Image): Executive Office Suites
  {
    id: "card-office",
    title: 'Executive Office <span class="gold-accent">Suites</span>',
    targetCategory: "OFFICE",
    type: "single",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=700&h=850&fit=crop",
    alt: "Executive Desk and Ergonomic Leather Suite"
  },

  // CARD 5 (4 Tiles): Wardrobes & Storage
  {
    id: "card-wardrobes",
    title: 'Wardrobes & <span class="gold-accent">Storage</span>',
    targetCategory: "WARDROBES",
    type: "grid4",
    tiles: [
      {
        label: "Sliding Doors",
        image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=450&h=450&fit=crop"
      },
      {
        label: "Walk-In Closets",
        image: "https://images.unsplash.com/photo-1558997519-83ea9252def8?w=450&h=450&fit=crop"
      },
      {
        label: "Shoe Consoles",
        image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=450&h=450&fit=crop"
      },
      {
        label: "TV Wall Units",
        image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=450&h=450&fit=crop"
      }
    ]
  },

  // CARD 6 (1 Large Image): Lighting & Chandeliers
  {
    id: "card-lighting",
    title: 'Lighting & <span class="gold-accent">Chandeliers</span>',
    targetCategory: "DECOR",
    type: "single",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=700&h=850&fit=crop",
    alt: "Modern Royal Crystal Chandelier and Accent Lighting"
  },

  // CARD 7 (4 Tiles): Rugs & Home Textiles
  {
    id: "card-rugs",
    title: 'Rugs & Home <span class="gold-accent">Textiles</span>',
    targetCategory: "RUGS",
    type: "grid4",
    tiles: [
      {
        label: "Turkish Rugs",
        image: "https://images.unsplash.com/photo-1603204077779-bed963ea7d0e?w=450&h=450&fit=crop"
      },
      {
        label: "Jute Runners",
        image: "https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?w=450&h=450&fit=crop"
      },
      {
        label: "Throw Cushions",
        image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=450&h=450&fit=crop"
      },
      {
        label: "Luxury Drapes",
        image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=450&h=450&fit=crop"
      }
    ]
  },

  // CARD 8 (1 Large Image): Decor & Art Collection (OTHERS)
  {
    id: "card-others",
    title: 'Explore <span class="gold-accent">Other Items</span>',
    targetCategory: "OTHERS",
    type: "single",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=700&h=850&fit=crop",
    alt: "Fine Gold Art, Sculptures and Vases Collection"
  }
];

/* No default fallback products — the section only appears after the user
   has actually viewed something. New users see nothing. */

/* Helper to safely retrieve current product list */
function getProductsList() {
  if (window.MELOJEY_DATA && window.MELOJEY_DATA.ALL_PRODUCTS && window.MELOJEY_DATA.ALL_PRODUCTS.length > 0) {
    return window.MELOJEY_DATA.ALL_PRODUCTS;
  }
  if (window.allProducts && window.allProducts.length > 0) {
    return window.allProducts;
  }
  if (typeof PLACEHOLDER_PRODUCTS !== "undefined" && PLACEHOLDER_PRODUCTS.length > 0) {
    return PLACEHOLDER_PRODUCTS;
  }
  return [];
}

/* Formats currency into ₦ NGN */
function formatCurrency(n) {
  return `₦${Number(n).toLocaleString("en-NG")}`;
}

/* Escapes HTML to prevent XSS in live search */
function escapeHtml(str) {
  return (str || "").replace(/[&<>"']/g, m => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[m]));
}

/* Highlights matched substring */
function highlightMatch(text, query) {
  if (!query) return escapeHtml(text);
  const escapedText = escapeHtml(text);
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return escapedText.replace(regex, '<mark class="match">$1</mark>');
}

/* ═══════════════════════════════════════════
   4. RENDERING THE 8 SHOWCASE CARDS
═══════════════════════════════════════════ */
function renderShowcaseCards() {
  const container = document.getElementById("showcase-grid");
  if (!container) return;

  container.innerHTML = SHOWCASE_CARDS_DATA.map(card => {
    let bodyContent = "";

    if (card.type === "grid4") {
      // 4 square tiles
      bodyContent = `
        <div class="tile-grid-4">
          ${card.tiles.map(tile => `
            <div class="tile-item" data-cat="${card.targetCategory}">
              <div class="tile-img-box">
                <img src="${tile.image}" alt="${escapeHtml(tile.label)}" loading="lazy" />
              </div>
              <span class="tile-label">${escapeHtml(tile.label)}</span>
            </div>
          `).join("")}
        </div>
      `;
    } else {
      // 1 large single image
      bodyContent = `
        <div class="tile-single" data-cat="${card.targetCategory}">
          <img src="${card.image}" alt="${escapeHtml(card.alt || card.title)}" loading="lazy" />
          <div class="tile-single-overlay"></div>
        </div>
      `;
    }

    return `
      <div class="showcase-card" id="${card.id}">
        <div class="showcase-card-header">
          <h3 class="showcase-card-title">${card.title}</h3>
        </div>
        <div class="showcase-card-body">
          ${bodyContent}
        </div>
        <div class="showcase-card-footer">
          <button class="showcase-explore-btn" data-cat="${card.targetCategory}" type="button">
            EXPLORE MORE <span>→</span>
          </button>
        </div>
      </div>
    `;
  }).join("");

  // Attach click listeners to cards and explore buttons
  container.querySelectorAll("[data-cat]").forEach(el => {
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      const targetCat = el.getAttribute("data-cat");
      if (targetCat) {
        selectCategoryTab(targetCat);
      }
    });
  });
}

/* Formats product titles with two-tone styling: first word gold, rest crisp white */
function formatTwoToneTitle(name) {
  if (!name) return "";
  const parts = name.trim().split(" ");
  if (parts.length === 1) {
    return `<span class="recent-highlight">${escapeHtml(parts[0])}</span>`;
  }
  const firstWord = escapeHtml(parts[0]);
  const rest = escapeHtml(parts.slice(1).join(" "));
  return `<span class="recent-highlight">${firstWord}</span> ${rest}`;
}

/* ═══════════════════════════════════════════
   5. RENDERING RECENTLY VIEWED CARDS
   Styled to match the Vendor Hub dark panel aesthetic:
   - Soft red discount pill at top-right of image
   - Two-tone highlighted titles (gold first word, white body)
   - Eagle Gold prices and slashed original prices (1-20% higher)
═══════════════════════════════════════════ */
function renderRecentlyViewed() {
  const container = document.getElementById("recent-grid");
  const panel = document.getElementById("recently-viewed-section");
  if (!container) return;

  let viewedItems = [];
  try {
    const raw = localStorage.getItem("melojey_recent_views");
    if (raw) viewedItems = JSON.parse(raw);
  } catch (e) {
    viewedItems = [];
  }

  // Only show items the user has actually viewed — strictly no fallback defaults
  const itemsToDisplay = viewedItems.slice(0, 5);

  // Hide the entire section for new users with no history
  if (panel) {
    panel.style.display = itemsToDisplay.length === 0 ? "none" : "";
  }
  if (itemsToDisplay.length === 0) {
    container.innerHTML = "";
    return;
  }

  container.innerHTML = itemsToDisplay.map(item => `
    <div class="recent-card product-card" data-id="${item.id}" tabindex="0" role="button" aria-label="View ${escapeHtml(item.name)}">
      <div class="card-img-wrap recent-img-wrap">
        <img class="card-img" src="${item.image}" alt="${escapeHtml(item.name)}" loading="lazy" onerror="this.onerror=null;this.src='assets/images/logo.png';" />
        <span class="recent-discount-badge">-${item.discountPct || 15}%</span>
        <button class="card-wishlist-btn" data-id="${item.id}" type="button" aria-label="Add to wishlist">☆</button>
      </div>
      <div class="card-body recent-info">
        <div class="card-cat">${escapeHtml(item.category || "Furniture")}</div>
        <div class="card-name recent-name" title="${escapeHtml(item.name)}">${formatTwoToneTitle(item.name)}</div>
        <div class="card-footer">
          <div class="card-price-group recent-price-group">
            <span class="card-price recent-price">${formatCurrency(item.price)}</span>
            <span class="card-price-original recent-original-price">${formatCurrency(item.originalPrice)}</span>
          </div>
          <button class="btn-add-cart" data-id="${item.id}" type="button">Add to Cart</button>
        </div>
      </div>
    </div>
  `).join("");

  // Attach card interactions: Wishlist star, Cart Stepper, Modal click
  container.querySelectorAll(".recent-card").forEach(card => {
    const id = card.getAttribute("data-id");
    const item = itemsToDisplay.find(x => x.id === id);
    if (!item) return;

    card.addEventListener("click", e => {
      if (
        e.target.closest(".card-wishlist-btn") ||
        e.target.closest(".btn-add-cart") ||
        e.target.closest(".qty-stepper")
      ) return;
      if (typeof window.openModal === "function") {
        window.openModal(id);
      }
    });

    card.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        if (typeof window.openModal === "function") {
          window.openModal(id);
        }
      }
    });

    if (window.MelojeyWishlist) {
      window.MelojeyWishlist.initStar(card, item);
    }
    if (window.MelojeyCart) {
      window.MelojeyCart.initStepper(card, item);
    }
  });
}

/* Saves viewed product to localStorage - Strictly caps at last 5 */
function trackProductView(product) {
  if (!product || !product.id) return;
  try {
    let recent = [];
    const raw = localStorage.getItem("melojey_recent_views");
    if (raw) recent = JSON.parse(raw);

    recent = recent.filter(x => x.id !== product.id);

    const discountPct = typeof window.getDiscountPct === "function" ? window.getDiscountPct(product) : 15;
    const originalPrice = product.originalPrice || (typeof window.getOriginalPrice === "function" ? window.getOriginalPrice(product.price, discountPct) : Math.round(product.price * 1.15));

    recent.unshift({
      id: product.id,
      name: product.name,
      category: product.category || "Furniture",
      price: product.price,
      originalPrice: originalPrice,
      discountPct: discountPct,
      image: product.image
    });

    // The user can only see their last 5
    recent = recent.slice(0, 5);
    localStorage.setItem("melojey_recent_views", JSON.stringify(recent));

    renderRecentlyViewed();
  } catch (e) {
    console.warn("Could not save recent view:", e);
  }
}

window.melojeyTrackRecent = trackProductView;

/* ── Category Page URLs Mapping (Now inside categories/ folder) ── */
const CATEGORY_PAGES = {
  HOME: "index.html",
  SOFAS: "categories/sofas.html",
  BEDS: "categories/beds.html",
  DINING: "categories/dining.html",
  OFFICE: "categories/office.html",
  WARDROBES: "categories/wardrobes.html",
  BAR: "categories/bar.html",
  TABLES: "categories/tables.html",
  RUGS: "categories/rugs.html",
  DECOR: "categories/decor.html",
  OTHERS: "categories/others.html"
};

/* ═══════════════════════════════════════════
   6. CATEGORIES NAVIGATION CONTROLLER
═══════════════════════════════════════════ */
function initCategoriesNav() {
  const tabs = document.querySelectorAll(".cat-tab");

  // On page load: scroll the active tab into view if it's not fully visible.
  // inline:'nearest' = minimum scroll only — no forced centering.
  const activeTab = document.querySelector(".cat-tab.active");
  if (activeTab) {
    requestAnimationFrame(() => {
      activeTab.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", (e) => {
      const category = (tab.getAttribute("data-category") || "HOME").toUpperCase();
      if (category === "HOME") {
        const catalogue = document.getElementById("catalogue");
        // Only prevent default if we are already on the homepage where #catalogue exists
        const isHomePage = window.location.pathname.endsWith("index.html") || 
                           window.location.pathname === "/" || 
                           window.location.pathname.endsWith("/");
        if (isHomePage && catalogue) {
          e.preventDefault();
          catalogue.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        // Otherwise, allow standard link navigation to index.html!
      }
      // For all other categories, let the browser follow href to dedicated page
    });
  });

  // "See All ›" link in Recently Viewed opens sofas category
  const seeAllLink = document.getElementById("recent-see-all-link");
  if (seeAllLink) {
    seeAllLink.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "categories/sofas.html";
    });
  }

  // Smoothly snap to #catalogue with full header clearance
  const catalogueLinks = document.querySelectorAll('a[href="#catalogue"], a[href$="index.html#catalogue"]');
  catalogueLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const isHomePage = window.location.pathname.endsWith("index.html") || 
                         window.location.pathname === "/" || 
                         window.location.pathname.endsWith("/");
      const catalogue = document.getElementById("catalogue");
      if (isHomePage && catalogue) {
        e.preventDefault();
        catalogue.scrollIntoView({ behavior: "smooth", block: "start" });
        if (history.pushState) {
          history.pushState(null, "", "#catalogue");
        }
      }
    });
  });

  // Smoothly snap to #about with full header clearance
  const aboutLinks = document.querySelectorAll('a[href="#about"], a[href$="index.html#about"]');
  aboutLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const isHomePage = window.location.pathname.endsWith("index.html") || 
                         window.location.pathname === "/" || 
                         window.location.pathname.endsWith("/");
      const about = document.getElementById("about");
      if (isHomePage && about) {
        e.preventDefault();
        about.scrollIntoView({ behavior: "smooth", block: "start" });
        if (history.pushState) {
          history.pushState(null, "", "#about");
        }
      }
    });
  });
}

function selectCategoryTab(catName) {
  const norm = (catName || "HOME").toUpperCase();
  const targetUrl = CATEGORY_PAGES[norm];

  if (targetUrl && norm !== "HOME") {
    window.location.href = targetUrl;
    return;
  }

  // If HOME, smooth scroll down to showcase
  const catalogue = document.getElementById("catalogue");
  if (catalogue) {
    catalogue.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/* ═══════════════════════════════════════════
   7. MOBILE SEARCH (PURE ICON) & LIVE SUGGESTIONS
═══════════════════════════════════════════ */
function initSearchSuggestions() {
  const searchInput = document.getElementById("search-input");
  const searchWrap = document.getElementById("nav-search-wrap");
  const searchToggle = document.getElementById("nav-search-toggle");
  const searchCloseMobile = document.getElementById("search-close-mobile");
  const searchBackdrop = document.getElementById("mobile-search-backdrop");
  const suggestionsBox = document.getElementById("nav-search-suggestions");
  const searchClear = document.getElementById("search-clear");

  if (!searchInput || !suggestionsBox) return;

  function openMobileSearch() {
    if (searchWrap) searchWrap.classList.add("open");
    if (searchBackdrop) searchBackdrop.classList.add("show");
    document.body.classList.add("mobile-search-active");
    setTimeout(() => {
      if (searchInput) searchInput.focus();
    }, 80);
  }

  function closeMobileSearch() {
    if (searchWrap) searchWrap.classList.remove("open");
    if (searchBackdrop) searchBackdrop.classList.remove("show");
    document.body.classList.remove("mobile-search-active");
    if (suggestionsBox) suggestionsBox.classList.remove("show");
  }

  // 1. Mobile toggle open (pure search icon click)
  if (searchToggle && searchWrap) {
    searchToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      openMobileSearch();
    });
  }

  // 2. Mobile close / Cancel button
  if (searchCloseMobile && searchWrap) {
    searchCloseMobile.addEventListener("click", (e) => {
      e.stopPropagation();
      closeMobileSearch();
    });
  }

  // 3. Mobile Backdrop click closes search
  if (searchBackdrop) {
    searchBackdrop.addEventListener("click", () => {
      closeMobileSearch();
    });
  }

  // 4. Clear button
  if (searchClear) {
    searchClear.addEventListener("click", (e) => {
      e.stopPropagation();
      searchInput.value = "";
      searchClear.classList.remove("show");
      suggestionsBox.classList.remove("show");
      suggestionsBox.innerHTML = "";
      searchInput.focus();
    });
  }

  // 5. Live suggestions on input
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    if (searchClear) searchClear.classList.toggle("show", query.length > 0);

    if (!query) {
      suggestionsBox.classList.remove("show");
      suggestionsBox.innerHTML = "";
      return;
    }

    const products = getProductsList();
    const matches = products.filter(p =>
      (p.name && p.name.toLowerCase().includes(query)) ||
      (p.category && p.category.toLowerCase().includes(query)) ||
      (p.description && p.description.toLowerCase().includes(query))
    );

    renderSuggestions(matches, query);
  });

  // 6. Focus opens suggestions if query exists
  searchInput.addEventListener("focus", () => {
    if (searchInput.value.trim().length > 0) {
      searchInput.dispatchEvent(new Event("input"));
    }
  });

  // 7. Close suggestions on click outside
  document.addEventListener("click", (e) => {
    if (!searchWrap.contains(e.target) && (!searchToggle || !searchToggle.contains(e.target))) {
      suggestionsBox.classList.remove("show");
    }
  });

  // 8. Escape key closes suggestions & mobile search
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      suggestionsBox.classList.remove("show");
      closeMobileSearch();
    }
  });

  function renderSuggestions(matches, query) {
    if (matches.length === 0) {
      suggestionsBox.innerHTML = `
        <div class="suggestion-empty">
          No furniture pieces found matching "<strong>${escapeHtml(query)}</strong>"
        </div>
      `;
      suggestionsBox.classList.add("show");
      return;
    }

    const topMatches = matches.slice(0, 5); // Display top 5 matches

    const itemsHtml = topMatches.map(p => {
      const discountPct = typeof window.getDiscountPct === "function" ? window.getDiscountPct(p) : 15;
      const originalPrice = p.originalPrice || (typeof window.getOriginalPrice === "function" ? window.getOriginalPrice(p.price, discountPct) : Math.round(p.price * 1.15));

      return `
        <div class="suggestion-item" data-id="${p.id}" tabindex="0" role="button">
          <img class="suggestion-img" src="${p.image || 'assets/images/logo.png'}" alt="${escapeHtml(p.name)}" onerror="this.onerror=null;this.src='assets/images/logo.png';" />
          <div class="suggestion-info">
            <div class="suggestion-name">${highlightMatch(p.name, query)}</div>
            <div class="suggestion-meta">
              <span class="suggestion-cat">${escapeHtml(p.category)}</span>
              <div class="suggestion-price-group">
                <span class="suggestion-price">${formatCurrency(p.price)}</span>
                <span class="suggestion-orig-price">${formatCurrency(originalPrice)}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join("");

    const footerHtml = `
      <div class="suggestion-footer" id="suggestion-view-all">
        View all ${matches.length} result${matches.length !== 1 ? 's' : ''} for "${escapeHtml(query)}" →
      </div>
    `;

    suggestionsBox.innerHTML = `
      <div class="suggestion-header">Suggestions (${matches.length})</div>
      ${itemsHtml}
      ${footerHtml}
    `;

    suggestionsBox.classList.add("show");

    // Click on suggestion item opens the product order modal!
    suggestionsBox.querySelectorAll(".suggestion-item").forEach(item => {
      item.addEventListener("click", () => {
        const id = item.getAttribute("data-id");
        if (typeof window.openModal === "function") {
          window.openModal(id);
        }
        suggestionsBox.classList.remove("show");
        closeMobileSearch();
      });
    });

    function getSearchUrl(term) {
      const path = window.location.pathname.toLowerCase();
      if (path.includes("/categories/")) {
        return `../pages/search.html?q=${encodeURIComponent(term)}`;
      } else if (path.includes("/pages/")) {
        return `search.html?q=${encodeURIComponent(term)}`;
      }
      return `pages/search.html?q=${encodeURIComponent(term)}`;
    }

    // Click on "View all results" navigates to search page
    const viewAllBtn = document.getElementById("suggestion-view-all");
    if (viewAllBtn) {
      viewAllBtn.addEventListener("click", () => {
        window.location.href = getSearchUrl(query);
      });
    }
  }

  // Handle Enter key and mobile search action on search input
  function performSearch() {
    const q = searchInput.value.trim();
    if (q) {
      const path = window.location.pathname.toLowerCase();
      let target = `pages/search.html?q=${encodeURIComponent(q)}`;
      if (path.includes("/categories/")) target = `../pages/search.html?q=${encodeURIComponent(q)}`;
      else if (path.includes("/pages/")) target = `search.html?q=${encodeURIComponent(q)}`;
      window.location.href = target;
    }
  }

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      e.preventDefault();
      performSearch();
    }
  });

  searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      e.preventDefault();
      performSearch();
    }
  });

  searchInput.addEventListener("search", () => {
    performSearch();
  });
}

/* ═══════════════════════════════════════════
   8. FLOATING WHATSAPP SHOWROOM SELECTOR
═══════════════════════════════════════════ */
function initFloatingWhatsApp() {
  const floatBtn = document.getElementById("wa-float-btn");
  const floatMenu = document.getElementById("wa-float-menu");
  const floatLine1 = document.getElementById("wa-float-line-1");
  const floatLine2 = document.getElementById("wa-float-line-2");

  if (!floatBtn || !floatMenu) return;

  const WA_LINE_1 = "2348033218845";
  const WA_LINE_2 = "2348037768889";
  const defaultEnquiry = encodeURIComponent("Hello Melojey Modern Furniture! I am browsing your showroom collection and would like to make an enquiry.");

  if (floatLine1) floatLine1.href = `https://wa.me/${WA_LINE_1}?text=${defaultEnquiry}`;
  if (floatLine2) floatLine2.href = `https://wa.me/${WA_LINE_2}?text=${defaultEnquiry}`;

  if (floatBtn.dataset.waBound === "true") return;
  floatBtn.dataset.waBound = "true";

  function setOpen(isOpen) {
    if (isOpen) {
      floatMenu.classList.add("open");
      floatMenu.setAttribute("aria-hidden", "false");
      floatBtn.setAttribute("aria-expanded", "true");
    } else {
      floatMenu.classList.remove("open");
      floatMenu.setAttribute("aria-hidden", "true");
      floatBtn.setAttribute("aria-expanded", "false");
    }
  }

  floatBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const willOpen = !floatMenu.classList.contains("open");
    setOpen(willOpen);
  });

  // Clicking a showroom line closes the menu smoothly
  if (floatLine1) {
    floatLine1.addEventListener("click", () => setOpen(false));
  }
  if (floatLine2) {
    floatLine2.addEventListener("click", () => setOpen(false));
  }

  document.addEventListener("click", (e) => {
    if (!floatMenu.contains(e.target) && !floatBtn.contains(e.target) && e.target !== floatBtn) {
      setOpen(false);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" || e.key === "Esc") {
      setOpen(false);
    }
  });
}

/* ═══════════════════════════════════════════
   DOM INITIALIZATION
═══════════════════════════════════════════ */
window.initFloatingWhatsApp = initFloatingWhatsApp;

function initShowcaseApp() {
  renderShowcaseCards();
  renderRecentlyViewed();
  initCategoriesNav();
  initSearchSuggestions();
  initFloatingWhatsApp();

  // If page was loaded with a hash (e.g. #about or #catalogue), snap smoothly after layout settles
  if (window.location.hash) {
    const hash = window.location.hash;
    const target = document.querySelector(hash);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    }
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initShowcaseApp);
} else {
  initShowcaseApp();
}

window.addEventListener("melojey:products-updated", () => {
  renderShowcaseCards();
});


