/* ── SHOWROOM CONTACT NUMBERS for ordering & inquiries (Line 1 & Line 2) ── */
  const WA_LINE_1 = "2348033218845"; // Factory Road Showroom (+234 803 321 8845)
  const WA_LINE_2 = "2348037768889"; // St Michael's Road Showroom (+234 803 776 8889)

  /* ── GOOGLE SHEET CSV URL
     Your live Google Spreadsheet link. The script automatically converts
     this to the direct CSV export URL.
     NOTE: Make sure General Access in Google Sheets is set to
     'Anyone with the link' (Viewer), or File > Share > Publish to web. ── */
  const SHEET_URL = "https://docs.google.com/spreadsheets/d/1nto5s696VQBhEGbhDGLYqx_hSI-lBI9Lm18JXSOnUqo/edit?usp=sharing";

  /* ── PLACEHOLDER PRODUCTS
     These show on the site until SHEET_URL is filled in.
     Add / remove / edit items here as needed.
     Fields: id, name, category, price (number, NGN), description, image (URL)
  ── */
  const PLACEHOLDER_PRODUCTS = [
    {
      id: "P001",
      name: "Oslo 3-Seater Sofa",
      category: "Sofas",
      price: 285000,
      description: "Premium fabric upholstery with deep-cushion comfort. Available in grey, beige, and navy. Solid hardwood frame.",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=450&fit=crop"
    },
    {
      id: "P002",
      name: "King Bed Frame & Headboard",
      category: "Beds",
      price: 195000,
      description: "Solid mahogany king-size bed frame with upholstered headboard. Timeless design for the modern bedroom.",
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=450&fit=crop"
    },
    {
      id: "P003",
      name: "Marble Top Dining Set (6 Seater)",
      category: "Dining",
      price: 420000,
      description: "Engineered marble table with six matching padded dining chairs. Statement centrepiece for the family dining room.",
      image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&h=450&fit=crop"
    },
    {
      id: "P004",
      name: "Executive Office Chair",
      category: "Office",
      price: 95000,
      description: "High-back leather executive chair with lumbar support, adjustable height and tilt. Work in comfort.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=450&fit=crop"
    },
    {
      id: "P005",
      name: "4-Door Walnut Wardrobe",
      category: "Wardrobes",
      price: 310000,
      description: "Floor-to-ceiling walnut-finish wardrobe with internal shelving, hanging rail, and soft-close doors.",
      image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&h=450&fit=crop"
    },
    {
      id: "P006",
      name: "Abstract Gold Canvas Art",
      category: "Paintings",
      price: 35000,
      description: "Hand-painted 60x90cm abstract canvas in gold, black and ivory. Arrives ready to hang. Limited pieces.",
      image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&h=450&fit=crop"
    },
    {
      id: "P007",
      name: "Boho Jute Area Rug (2x3m)",
      category: "Rugs",
      price: 55000,
      description: "Natural jute weave rug with geometric pattern. Softens hardwood and tiled floors with warmth and texture.",
      image: "https://images.unsplash.com/photo-1603204077779-bed963ea7d0e?w=600&h=450&fit=crop"
    },
    {
      id: "P008",
      name: "Ceramic Vase Set (3 pieces)",
      category: "Decor",
      price: 18500,
      description: "Set of 3 matte ceramic vases in earthy tones — small, medium, and tall. Perfect shelf or table accent.",
      image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600&h=450&fit=crop"
    },
    {
      id: "P009",
      name: "L-Shaped Corner Sofa",
      category: "Sofas",
      price: 395000,
      description: "Spacious L-shaped sectional sofa with chaise. Microfibre fabric in grey and chocolate brown.",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=450&fit=crop"
    },
    {
      id: "P010",
      name: "Glass Top Coffee Table",
      category: "Tables",
      price: 78000,
      description: "Tempered glass top with brushed gold frame. 120x60cm. Elevates any living room arrangement.",
      image: "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?w=600&h=450&fit=crop"
    },
    {
      id: "P011",
      name: "Flower Vase — Tall Gold",
      category: "Decor",
      price: 12000,
      description: "60cm brushed gold metallic floor vase. Makes an elegant statement in corners, entrances and living rooms.",
      image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600&h=450&fit=crop"
    },
    {
      id: "P012",
      name: "Outdoor Rattan Lounge Set",
      category: "Outdoor",
      price: 230000,
      description: "Weather-resistant rattan 2-seater with coffee table. Removable and washable cushion covers.",
      image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&h=450&fit=crop"
    }
  ];

  /* ═══ INTERNAL LOGIC — no need to edit below this line ═══ */

  let allProducts = [];
  let activeCategory = "All";
  let searchQuery = "";

  /* Combines the active category chip + search text, re-renders the grid */
  function applyFilters() {
    let filtered = allProducts;
    if (activeCategory === "All") {
      filtered = allProducts;
    } else if (activeCategory.toLowerCase() === "others") {
      // Main predefined categories to exclude
      const mainCats = ["sofas", "beds", "dining", "office", "wardrobes", "bar", "tables", "rugs"];
      filtered = allProducts.filter(p => !mainCats.includes((p.category || "").toLowerCase()));
      // If none match, fallback to decor and paintings
      if (filtered.length === 0) {
        filtered = allProducts.filter(p => ["decor", "paintings", "outdoor"].includes((p.category || "").toLowerCase()));
      }
    } else {
      filtered = allProducts.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }
    renderProducts(filtered);
  }

  /* Expose category selection globally so the categories bar & showcase cards can trigger filtering */
  window.selectMelojeyCategory = function(catName) {
    if (!catName || catName.toUpperCase() === "HOME" || catName.toUpperCase() === "ALL") {
      activeCategory = "All";
    } else if (catName.toUpperCase() === "OTHERS") {
      activeCategory = "Others";
    } else {
      const match = allProducts.find(p => p.category.toLowerCase() === catName.toLowerCase());
      activeCategory = match ? match.category : catName;
    }

    // Synchronize the category filter chips below
    const wrap = document.getElementById("chips");
    if (wrap) {
      wrap.querySelectorAll(".chip").forEach(c => {
        const chipCat = c.dataset.cat || "";
        if (activeCategory === "All" && chipCat === "All") {
          c.classList.add("active");
        } else if (chipCat.toLowerCase() === activeCategory.toLowerCase()) {
          c.classList.add("active");
        } else {
          c.classList.remove("active");
        }
      });
    }

    applyFilters();
  };

  const fmt = (n) => `NGN ${Number(n).toLocaleString("en-NG")}`.replace("NGN ", "\u20A6");

  // Deterministic discount percentage between 6% and 19% (strictly 1% - 20% range)
  function getDiscountPct(p) {
    if (p.discount && p.discount > 0 && p.discount <= 20) return Math.round(p.discount);
    const charSum = (p.id || "P001").split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const presets = [10, 15, 12, 18, 14, 8, 16, 20, 11, 13, 17, 9];
    return presets[charSum % presets.length];
  }

  // Original price is cancelled/strikethrough and strictly 1% - 20% higher than selling price
  function getOriginalPrice(price, discountPct) {
    const raw = price * (1 + discountPct / 100);
    return Math.round(raw / 1000) * 1000;
  }

  function waLink(number, product) {
    const discountPct = getDiscountPct(product);
    const originalPrice = product.originalPrice || getOriginalPrice(product.price, discountPct);
    const cleanImg = product.image ? (product.image.startsWith("http") ? product.image : (window.location.origin && !window.location.origin.startsWith("file") ? `${window.location.origin}/${product.image.replace(/^(\.\.\/)+/, "").replace(/^\//, "")}` : product.image)) : "";
    const msg =
      `Hello! I'd like to order from Melojey Modern Furniture:\n\n` +
      `*${product.name}*\n` +
      `• Category: ${product.category || "Furniture"}\n` +
      `• Discounted Price: ${fmt(product.price)} (Save ${discountPct}% off ${fmt(originalPrice)})\n` +
      `• Item Code: ${product.id}\n` +
      `• 📷 Photo: ${cleanImg}\n\n` +
      `Is this available in your showroom?`;
    return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
  }

  function formatTwoToneTitle(name) {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length === 1) {
      return `<span class="recent-highlight">${parts[0]}</span>`;
    }
    const firstWord = parts[0];
    const rest = parts.slice(1).join(" ");
    return `<span class="recent-highlight">${firstWord}</span> ${rest}`;
  }

  function renderProducts(products) {
    const grid  = document.getElementById("product-grid");
    const count = document.getElementById("product-count");

    if (!grid) return;

    if (!products.length) {
      grid.innerHTML = `<div class="state-box"><div class="icon">🪑</div><p>No products in this category yet.</p></div>`;
      if (count) count.textContent = "0 products";
      return;
    }

    if (count) count.textContent = `${products.length} item${products.length !== 1 ? "s" : ""}`;

    grid.innerHTML = products.map(p => {
      const discountPct = getDiscountPct(p);
      const originalPrice = p.originalPrice || getOriginalPrice(p.price, discountPct);

      return `
      <div class="product-card" data-id="${p.id}" tabindex="0" role="button" aria-label="View ${p.name}">
        <button class="card-wishlist-btn" aria-label="Add to wishlist" title="Add to wishlist" type="button">☆</button>
        <div class="card-img-wrap">
          <img class="card-img"
               src="${p.image || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop'}"
               alt="${p.name}" loading="lazy" width="300" height="225"
               onerror="this.src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop'" />
          <span class="card-discount-badge">-${discountPct}%</span>
        </div>
        <div class="card-body">
          <div class="card-cat">${p.category}</div>
          <div class="card-name">${formatTwoToneTitle(p.name)}</div>
          <div class="card-desc">${p.description}</div>
          <div class="card-footer">
            <div class="card-price-group">
              <span class="card-price">${fmt(p.price)}</span>
              <span class="card-price-original">${fmt(originalPrice)}</span>
            </div>
            <button class="btn-add-cart" data-id="${p.id}" type="button">Add to Cart</button>
          </div>
        </div>
      </div>
    `;}).join("");

    grid.querySelectorAll(".product-card").forEach(card => {
      const p = allProducts.find(x => x.id === card.dataset.id);
      if (!p) return;

      card.addEventListener("click", e => {
        if (
          e.target.closest(".card-wishlist-btn") ||
          e.target.closest(".btn-add-cart") ||
          e.target.closest(".qty-stepper")
        ) return;
        openModal(card.dataset.id);
      });

      card.addEventListener("keydown", e => {
        if (e.key === "Enter") openModal(card.dataset.id);
      });

      if (window.MelojeyWishlist) {
        window.MelojeyWishlist.initStar(card, p);
      }
      if (window.MelojeyCart) {
        window.MelojeyCart.initStepper(card, p);
      }
    });
  }

  function openModal(id) {
    const p = allProducts.find(x => x.id === id);
    if (!p) return;

    // Track recently viewed product for the "RECENTLY VIEWED" section
    if (typeof window.melojeyTrackRecent === "function") {
      window.melojeyTrackRecent(p);
    }

    const discountPct = getDiscountPct(p);
    const originalPrice = p.originalPrice || getOriginalPrice(p.price, discountPct);

    const imgEl = document.getElementById("modal-img");
    if (imgEl) {
      imgEl.src = p.image || "";
      imgEl.alt = p.name;
    }
    const catEl = document.getElementById("modal-cat");
    if (catEl) catEl.textContent = p.category;

    const nameEl = document.getElementById("modal-name");
    if (nameEl) nameEl.textContent = p.name;

    const priceEl = document.getElementById("modal-price");
    if (priceEl) priceEl.textContent = fmt(p.price);

    const modalOrigEl = document.getElementById("modal-price-original");
    if (modalOrigEl) modalOrigEl.textContent = fmt(originalPrice);

    const modalDiscountEl = document.getElementById("modal-discount-tag");
    if (modalDiscountEl) modalDiscountEl.textContent = `-${discountPct}% OFF`;

    const descEl = document.getElementById("modal-desc");
    if (descEl) descEl.textContent = p.description;

    const orderLine1 = document.getElementById("wa-order-1");
    const orderLine2 = document.getElementById("wa-order-2");
    if (orderLine1) orderLine1.href = waLink(WA_LINE_1, p);
    if (orderLine2) orderLine2.href = waLink(WA_LINE_2, p);

    const overlay = document.getElementById("modal-overlay");

    // Initialize Gallery (Left/Right arrows, angle counter & dots)
    if (window.MelojeyGallery && window.MelojeyGallery.setup && overlay) {
      window.MelojeyGallery.setup(overlay, p);
    }

    // Initialize Add to Cart button / Active Stepper in modal
    const modalCartWrap = document.getElementById("modal-cart-action");
    if (modalCartWrap) {
      if (window.MelojeyCart && window.MelojeyCart.setupModal) {
        window.MelojeyCart.setupModal(modalCartWrap, p);
      } else if (window.MelojeyCart && window.MelojeyCart.initStepper) {
        modalCartWrap.innerHTML = `<button class="btn-add-cart modal-add-cart-btn" data-id="${p.id}" type="button">Add to Cart</button>`;
        window.MelojeyCart.initStepper(modalCartWrap, p);
      }
    }

    const waMenu = document.getElementById("wa-float-menu");
    if (waMenu) waMenu.classList.remove("open");
    if (overlay) overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    const overlay = document.getElementById("modal-overlay");
    if (overlay) overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  const modalCloseBtn = document.getElementById("modal-close");
  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);

  const modalOverlayEl = document.getElementById("modal-overlay");
  if (modalOverlayEl) {
    modalOverlayEl.addEventListener("click", e => {
      if (e.target === modalOverlayEl) closeModal();
    });
  }
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

  // Expose key helpers to window for showcase.js
  window.openModal = openModal;
  window.getDiscountPct = getDiscountPct;
  window.getOriginalPrice = getOriginalPrice;
  window.fmt = fmt;

  /* ── Floating WhatsApp Showroom Selector ── */
  // Initialization is handled by showcase.js (initFloatingWhatsApp) to prevent duplicate bindings.
  if (typeof window.initFloatingWhatsApp === "function") {
    window.initFloatingWhatsApp();
  }

  function buildChips(products) {
    const wrap = document.getElementById("chips");
    if (!wrap) return;
    const cats = ["All", ...new Set(products.map(p => p.category))];
    wrap.innerHTML = cats.map(c =>
      `<button class="chip${c === activeCategory ? " active" : ""}" data-cat="${c}">${c}</button>`
    ).join("");
    wrap.querySelectorAll(".chip").forEach(chip => {
      chip.addEventListener("click", () => {
        wrap.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        activeCategory = chip.dataset.cat;
        applyFilters();
      });
    });
  }

  /* Search input wiring — live filters from the navbar as the user types (no scrolling) */
  const searchInput = document.getElementById("search-input");
  const searchClear = document.getElementById("search-clear");

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      searchQuery = searchInput.value;
      if (searchClear) searchClear.classList.toggle("show", searchQuery.length > 0);
      applyFilters();
    });
  }

  if (searchClear && searchInput) {
    searchClear.addEventListener("click", () => {
      searchInput.value = "";
      searchQuery = "";
      searchClear.classList.remove("show");
      searchInput.focus();
      window.hasScrolledForSearch = false;
      applyFilters();
    });
  }

  function formatImageUrl(url) {
    if (!url) return "";
    const driveMatch = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([a-zA-Z0-9_-]+)/);
    if (driveMatch) {
      return `https://lh3.googleusercontent.com/d/${driveMatch[1]}`;
    }
    return url;
  }

  function parseCSV(csv) {
    const rawLines = csv.trim().split(/\r?\n/).filter(l => l.trim().length > 0);
    if (rawLines.length === 0) return [];

    // Locate the header row (contains 'name' and ('price' or 'category'))
    let headerIdx = rawLines.findIndex(l => /name/i.test(l) && (/price/i.test(l) || /category/i.test(l)));
    if (headerIdx === -1) headerIdx = 0;

    const headers = rawLines[headerIdx].split(",").map(h => h.trim().replace(/^"|"$/g, "").toLowerCase());

    return rawLines.slice(headerIdx + 1).map(line => {
      const vals = line.match(/(".*?"|[^,]+)(?=,|$)/g) || [];
      const obj = {};
      headers.forEach((h, i) => {
        obj[h] = (vals[i] || "").replace(/^"|"$/g, "").trim();
      });

      const name = obj.name || obj["product name"] || "";
      // Ignore template instruction rows or blank rows
      if (!name || name.toLowerCase().includes("product name shown") || name.startsWith("✏️")) {
        return null;
      }

      return {
        id:          obj.id || `P${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
        name:        name,
        category:    obj.category || "Uncategorised",
        price:       Number((obj.price || "0").replace(/[^0-9.]/g, "")),
        description: obj.description || "",
        image:       formatImageUrl(obj.image_url || obj.image || "")
      };
    }).filter(p => p && p.name);
  }

  function getCsvUrl(url) {
    if (!url) return "";
    const idMatch = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
    if (idMatch) {
      return `https://docs.google.com/spreadsheets/d/${idMatch[1]}/export?format=csv`;
    }
    return url;
  }

  async function loadProducts() {
    const csvUrl = getCsvUrl(SHEET_URL);
    if (!csvUrl) {
      allProducts = PLACEHOLDER_PRODUCTS;
      buildChips(allProducts);
      renderProducts(allProducts);
      const countEl = document.getElementById("product-count");
      if (countEl) countEl.textContent = `${allProducts.length} items (sample)`;
      return;
    }

    try {
      const res = await fetch(csvUrl);
      if (!res.ok) throw new Error(`Google Sheet returned HTTP ${res.status}`);
      const text = await res.text();
      const parsed = parseCSV(text);
      if (parsed.length === 0) throw new Error("No products found in sheet");
      allProducts = parsed;
      buildChips(allProducts);
      renderProducts(allProducts);
      const countEl = document.getElementById("product-count");
      if (countEl) countEl.textContent = `${allProducts.length} items`;
    } catch (err) {
      console.warn("Could not load Google Sheet live data yet:", err.message);
      console.info("Serving sample placeholder products. (To enable live sheet data: in your Google Sheet, click Share > set General access to 'Anyone with the link' or File > Share > Publish to web > CSV).");
      allProducts = PLACEHOLDER_PRODUCTS;
      buildChips(allProducts);
      renderProducts(allProducts);
      const countEl = document.getElementById("product-count");
      if (countEl) countEl.textContent = `${allProducts.length} items (sample)`;
    }
  }

  loadProducts();