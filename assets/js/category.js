/* ═════════════════════════════════════════════════════════════════════════════════
   MELOJEY MODERN FURNITURE — DEDICATED CATEGORY CONTROLLER (category.js)
   ─────────────────────────────────────────────────────────────────────────────
   Shared controller for all dedicated category pages:
   - sofas.html, beds.html, dining.html, office.html, wardrobes.html,
   - bar.html, tables.html, rugs.html, decor.html, others.html
   
   HANDLES:
   1. Dynamic product rendering for the active category
   2. Live Search with autocomplete suggestions (Navbar)
   3. Mobile expandable search icon (no background circle)
   4. Dual-line WhatsApp Showroom Order Modal
   5. Floating WhatsApp Showroom Selector
═════════════════════════════════════════════════════════════════════════════════ */

const WA_LINE_1 = "2348033218845"; // Factory Road Showroom (+234 803 321 8845)
const WA_LINE_2 = "2348037768889"; // St Michael's Road Showroom (+234 803 776 8889)

function escapeHtml(str) {
  if (!str) return "";
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/* ── COMPREHENSIVE CURATED PRODUCTS REPOSITORY ── */
const CATEGORY_PRODUCTS = {
  SOFAS: [
    {
      id: "SF01",
      name: "Oslo 3-Seater Velvet Sofa",
      category: "Sofas",
      price: 285000,
      originalPrice: 335000,
      discountPct: 15,
      description: "Premium emerald velvet upholstery with deep-cushion comfort, high-density foam, and solid mahogany frame.",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=450&fit=crop"
    },
    {
      id: "SF02",
      name: "L-Shaped Sectional with Chaise",
      category: "Sofas",
      price: 395000,
      originalPrice: 465000,
      discountPct: 15,
      description: "Spacious L-shaped modular sectional with reversible chaise. Stain-resistant microfibre fabric in slate grey.",
      image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&h=450&fit=crop"
    },
    {
      id: "SF03",
      name: "Royal Chesterfield Tufted Sofa",
      category: "Sofas",
      price: 350000,
      originalPrice: 410000,
      discountPct: 15,
      description: "Deep button-tufted craftsmanship with rolled arms, burnished brass nailhead trim, and plush seating.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=450&fit=crop"
    },
    {
      id: "SF04",
      name: "Ergonomic Recliner Armchair",
      category: "Sofas",
      price: 145000,
      originalPrice: 170000,
      discountPct: 15,
      description: "Smooth multi-angle reclining mechanism with padded headrest, lumbar support, and genuine bonded leather.",
      image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=450&fit=crop"
    },
    {
      id: "SF05",
      name: "Scandinavian Accent Lounge Chair",
      category: "Sofas",
      price: 110000,
      originalPrice: 130000,
      discountPct: 15,
      description: "Curved minimalist oak wood silhouette with warm mustard upholstery. A timeless living room accent.",
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=450&fit=crop"
    },
    {
      id: "SF06",
      name: "Modular Corner Fabric Suite",
      category: "Sofas",
      price: 480000,
      originalPrice: 565000,
      discountPct: 15,
      description: "Expansive 5-piece sectional suite designed for large living rooms, family lounges, and executive residences.",
      image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=600&h=450&fit=crop"
    }
  ],

  BEDS: [
    {
      id: "BD01",
      name: "King Bed Frame & Upholstered Headboard",
      category: "Beds",
      price: 195000,
      originalPrice: 235000,
      discountPct: 17,
      description: "Solid mahogany king-size bed frame with charcoal grey channel-tufted headboard and heavy reinforced slats.",
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=450&fit=crop"
    },
    {
      id: "BD02",
      name: "Queen Floating Bed with LED Accent",
      category: "Beds",
      price: 220000,
      originalPrice: 260000,
      discountPct: 15,
      description: "Modern cantilever floating design with warm ambient LED underglow and integrated dual bedside nightstands.",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&h=450&fit=crop"
    },
    {
      id: "BD03",
      name: "Royal Velvet Tufted Bed Suite",
      category: "Beds",
      price: 310000,
      originalPrice: 365000,
      discountPct: 15,
      description: "Grand wingback headboard wrapped in royal champagne velvet with polished gold metallic corner caps.",
      image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&h=450&fit=crop"
    },
    {
      id: "BD04",
      name: "Solid Mahogany Master Bed Frame",
      category: "Beds",
      price: 260000,
      originalPrice: 305000,
      discountPct: 15,
      description: "Kiln-dried seasoned hardwood, rich natural stain, and robust joinery guaranteed for generations.",
      image: "https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?w=600&h=450&fit=crop"
    }
  ],

  DINING: [
    {
      id: "DN01",
      name: "Marble Top Dining Set (6 Seater)",
      category: "Dining",
      price: 420000,
      originalPrice: 490000,
      discountPct: 14,
      description: "Engineered heavy polished marble tabletop with 6 matching gold-framed padded dining chairs.",
      image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&h=450&fit=crop"
    },
    {
      id: "DN02",
      name: "Luxury 8-Seater Gold Accent Dining Table",
      category: "Dining",
      price: 550000,
      originalPrice: 650000,
      discountPct: 15,
      description: "Grand banquet-sized dining table with brushed eagle-gold pedestal legs and 8 high-back upholstered chairs.",
      image: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=600&h=450&fit=crop"
    },
    {
      id: "DN03",
      name: "Solid Teak Round Dining Table",
      category: "Dining",
      price: 280000,
      originalPrice: 330000,
      discountPct: 15,
      description: "Intimate 4-6 seater circular dining table in solid teakwood with smooth beveled edge and cross base.",
      image: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=600&h=450&fit=crop"
    },
    {
      id: "DN04",
      name: "Velvet Padded Dining Chairs (Set of 4)",
      category: "Dining",
      price: 160000,
      originalPrice: 190000,
      discountPct: 16,
      description: "Ergonomic curved backrests with stain-resistant velvet fabric and sturdy matte-black metal legs.",
      image: "https://images.unsplash.com/photo-1580481077195-c3a9f0a514d4?w=600&h=450&fit=crop"
    }
  ],

  OFFICE: [
    {
      id: "OF01",
      name: "Executive High-Back Leather Chair",
      category: "Office",
      price: 95000,
      originalPrice: 115000,
      discountPct: 17,
      description: "Executive leather chair with pneumatic height adjustment, tilt lock, adjustable lumbar, and cushioned armrests.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=450&fit=crop"
    },
    {
      id: "OF02",
      name: "Presidential Walnut Executive Desk",
      category: "Office",
      price: 320000,
      originalPrice: 375000,
      discountPct: 15,
      description: "Imposing 1.8m executive desk with leather blotter inset, dual locking drawer pedestals, and cable management ports.",
      image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&h=450&fit=crop"
    },
    {
      id: "OF03",
      name: "Modern Ergonomic Mesh Task Chair",
      category: "Office",
      price: 75000,
      originalPrice: 90000,
      discountPct: 17,
      description: "Breathable Korean mesh back with 3D armrests, dynamic lumbar support, and heavy-duty chrome caster base.",
      image: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=600&h=450&fit=crop"
    },
    {
      id: "OF04",
      name: "L-Shaped Executive Workstation",
      category: "Office",
      price: 290000,
      originalPrice: 340000,
      discountPct: 15,
      description: "Corner executive desk with integrated return credenza, modesty panel, and scratch-resistant melamine finish.",
      image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&h=450&fit=crop"
    }
  ],

  WARDROBES: [
    {
      id: "WD01",
      name: "4-Door Walnut Floor-to-Ceiling Wardrobe",
      category: "Wardrobes",
      price: 310000,
      originalPrice: 365000,
      discountPct: 15,
      description: "Engineered walnut wardrobe with internal shelving, dual hanging rails, lockable security drawers, and soft-close doors.",
      image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&h=450&fit=crop"
    },
    {
      id: "WD02",
      name: "Sliding Mirrored 3-Door Wardrobe",
      category: "Wardrobes",
      price: 280000,
      originalPrice: 330000,
      discountPct: 15,
      description: "Full-length mirrored sliding doors that maximize bedroom lighting, with silent aluminum roller tracks.",
      image: "https://images.unsplash.com/photo-1558997519-83ea9252def8?w=600&h=450&fit=crop"
    },
    {
      id: "WD03",
      name: "Custom Walk-in Closet System",
      category: "Wardrobes",
      price: 450000,
      originalPrice: 530000,
      discountPct: 15,
      description: "Modular walk-in closet shelving, garment hanging organizers, accessory tray drawers, and overhead suitcase storage.",
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=450&fit=crop"
    },
    {
      id: "WD04",
      name: "Floating TV & Storage Wall Unit",
      category: "Wardrobes",
      price: 210000,
      originalPrice: 245000,
      discountPct: 14,
      description: "Wall-mounted entertainment console with fluted wood cabinets, tempered glass shelves, and integrated cable conduits.",
      image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=600&h=450&fit=crop"
    }
  ],

  BAR: [
    {
      id: "BR01",
      name: "Velvet Swivel Bar Stools (Set of 2)",
      category: "Bar",
      price: 85000,
      originalPrice: 100000,
      discountPct: 15,
      description: "360-degree swivel bar stools with champagne gold footrest, hydraulic height lift, and ribbed velvet backrest.",
      image: "https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=600&h=450&fit=crop"
    },
    {
      id: "BR02",
      name: "Luxury Home Bar Counter with Footrest",
      category: "Bar",
      price: 270000,
      originalPrice: 320000,
      discountPct: 16,
      description: "Custom curved home bar with marble look serving top, interior stemware racks, lockable wine cabinet, and brass rail.",
      image: "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=600&h=450&fit=crop"
    },
    {
      id: "BR03",
      name: "Brass & Glass Wine Console Bar Cart",
      category: "Bar",
      price: 125000,
      originalPrice: 150000,
      discountPct: 17,
      description: "Mobile 2-tier service cart with mirror glass shelves, bottle holders, and smooth rolling lockable castor wheels.",
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&h=450&fit=crop"
    }
  ],

  TABLES: [
    {
      id: "TB01",
      name: "Glass Top Coffee Table with Gold Frame",
      category: "Tables",
      price: 78000,
      originalPrice: 92000,
      discountPct: 15,
      description: "Tempered shatterproof glass with brushed eagle-gold geometric base. Dimensions: 120cm x 60cm.",
      image: "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?w=600&h=450&fit=crop"
    },
    {
      id: "TB02",
      name: "Marble Nesting Coffee Tables (Set of 2)",
      category: "Tables",
      price: 115000,
      originalPrice: 135000,
      discountPct: 15,
      description: "Dual circular nesting tables with real white Carrara marble tops and matte black iron frames.",
      image: "https://images.unsplash.com/photo-1533090161767-e6ffed986b88?w=600&h=450&fit=crop"
    },
    {
      id: "TB03",
      name: "Solid Oak Console Entryway Table",
      category: "Tables",
      price: 95000,
      originalPrice: 112000,
      discountPct: 15,
      description: "Slim hallway console with dual pull-out drawers, brass knobs, and open bottom display shelf.",
      image: "https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?w=600&h=450&fit=crop"
    }
  ],

  RUGS: [
    {
      id: "RG01",
      name: "Boho Jute Geometric Area Rug (2x3m)",
      category: "Rugs",
      price: 55000,
      originalPrice: 65000,
      discountPct: 15,
      description: "Hand-braided natural jute fiber with neutral geometric motifs. Durable, eco-friendly, and easy to clean.",
      image: "https://images.unsplash.com/photo-1603204077779-bed963ea7d0e?w=600&h=450&fit=crop"
    },
    {
      id: "RG02",
      name: "Turkish Vintage Distressed Silk Rug (2.5x3.5m)",
      category: "Rugs",
      price: 135000,
      originalPrice: 160000,
      discountPct: 16,
      description: "Ultra-soft woven silk blend with heritage Anatolian floral medallion in faded gold and charcoal blue.",
      image: "https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?w=600&h=450&fit=crop"
    },
    {
      id: "RG03",
      name: "Soft Shag Living Room Rug (2x3m)",
      category: "Rugs",
      price: 72000,
      originalPrice: 85000,
      discountPct: 15,
      description: "High-density 40mm thick microfiber pile. Soft cloud feel underfoot, non-shedding and anti-skid backing.",
      image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&h=450&fit=crop"
    }
  ],

  DECOR: [
    {
      id: "DC01",
      name: "Ceramic Vase Set (3 Pieces)",
      category: "Decor",
      price: 18500,
      originalPrice: 22000,
      discountPct: 16,
      description: "Trio of textured matte ceramic vases in earthy terracotta, sand, and charcoal. Perfect table centerpieces.",
      image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600&h=450&fit=crop"
    },
    {
      id: "DC02",
      name: "Tall Brushed Gold Floor Vase (60cm)",
      category: "Decor",
      price: 24000,
      originalPrice: 28000,
      discountPct: 14,
      description: "Metallic electroplated aluminum urn vase. Ideal for pampas grass, faux florals, or corner aesthetics.",
      image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=600&h=450&fit=crop"
    },
    {
      id: "DC03",
      name: "Royal Crystal Chandelier Pendant Light",
      category: "Decor",
      price: 165000,
      originalPrice: 195000,
      discountPct: 15,
      description: "Tiered K9 crystal prisms with brushed brass framework. Produces warm dazzling illumination for dining or foyer.",
      image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&h=450&fit=crop"
    },
    {
      id: "DC04",
      name: "Sunburst Gold Accent Wall Mirror (80cm)",
      category: "Decor",
      price: 68000,
      originalPrice: 80000,
      discountPct: 15,
      description: "Sculptural metallic sunburst rays around a high-clarity bevel mirror. Instantly elevates living room walls.",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&h=450&fit=crop"
    }
  ],

  OTHERS: [
    {
      id: "OT01",
      name: "Abstract Gold Canvas Art (60x90cm)",
      category: "Others",
      price: 35000,
      originalPrice: 42000,
      discountPct: 17,
      description: "Hand-painted acrylic textured canvas featuring gold leaf, charcoal black, and ivory. Ready to hang.",
      image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&h=450&fit=crop"
    },
    {
      id: "OT02",
      name: "Outdoor Rattan 3-Piece Lounge Set",
      category: "Others",
      price: 230000,
      originalPrice: 270000,
      discountPct: 15,
      description: "Weatherproof all-weather PE wicker with two armchairs, tempered glass coffee table, and washable cushions.",
      image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&h=450&fit=crop"
    },
    {
      id: "OT03",
      name: "Bronze Majestic Eagle Desktop Sculpture",
      category: "Others",
      price: 45000,
      originalPrice: 53000,
      discountPct: 15,
      description: "Heavy cast bronze soaring eagle on polished black marble pedestal. Inspired by Melojey's regal insignia.",
      image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&h=450&fit=crop"
    }
  ]
};

/* Format currency */
const fmt = (n) => `₦${Number(n).toLocaleString("en-NG")}`;

/* All products flat list for search across pages */
const ALL_CAT_PRODUCTS = (window.MELOJEY_DATA && window.MELOJEY_DATA.ALL_PRODUCTS && window.MELOJEY_DATA.ALL_PRODUCTS.length > 0)
  ? window.MELOJEY_DATA.ALL_PRODUCTS
  : Object.values(CATEGORY_PRODUCTS).flat();

/* WhatsApp Order Link Generator */
function getCategoryWaLink(number, product) {
  const msg =
    `Hello! I'd like to order from Melojey Modern Furniture:\n\n` +
    `*${product.name}*\n` +
    `Category: ${product.category}\n` +
    `Price: ${fmt(product.price)} (Save ${product.discountPct}% off ${fmt(product.originalPrice)})\n` +
    `Ref: ${product.id}\n\n` +
    `Is this currently available in your showroom?`;
  return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
}

/* ═══════════════════════════════════════════
   RENDER PRODUCTS FOR THIS CATEGORY PAGE
═══════════════════════════════════════════ */
function renderCategoryGrid() {
  const pageCategoryKey = (document.body.getAttribute("data-page-category") || "SOFAS").toUpperCase();
  const products = (window.MELOJEY_DATA && window.MELOJEY_DATA.PRODUCTS && window.MELOJEY_DATA.PRODUCTS[pageCategoryKey])
    ? window.MELOJEY_DATA.PRODUCTS[pageCategoryKey]
    : (CATEGORY_PRODUCTS[pageCategoryKey] || []);
  const grid = document.getElementById("category-product-grid");
  const countEl = document.getElementById("category-product-count");

  if (!grid) return;

  if (countEl) {
    countEl.textContent = `${products.length} Item${products.length !== 1 ? 's' : ''}`;
  }

  if (products.length === 0) {
    grid.innerHTML = `<div class="state-box"><p>No items found for this category.</p></div>`;
    return;
  }

  grid.innerHTML = products.map(p => `
    <div class="product-card" data-id="${p.id}" tabindex="0" role="button" aria-label="View ${p.name}">
      <div class="card-img-wrap">
        <img class="card-img" src="${p.image}" alt="${p.name}" loading="lazy" />
        <span class="card-discount-badge">-${p.discountPct}%</span>
      </div>
      <div class="card-body">
        <div class="card-cat">${p.category}</div>
        <div class="card-name">${p.name}</div>
        <div class="card-desc">${p.description}</div>
        <div class="card-footer">
          <div class="card-price-group">
            <span class="card-price">${fmt(p.price)}</span>
            <span class="card-price-original">${fmt(p.originalPrice)}</span>
          </div>
          <button class="btn-order" data-id="${p.id}" type="button">Order</button>
        </div>
      </div>
    </div>
  `).join("");

  // Attach click listeners to cards and order buttons
  grid.querySelectorAll(".product-card").forEach(card => {
    card.addEventListener("click", e => {
      if (!e.target.closest(".btn-order")) openCategoryModal(card.dataset.id);
    });
    card.addEventListener("keydown", e => {
      if (e.key === "Enter") openCategoryModal(card.dataset.id);
    });
  });

  grid.querySelectorAll(".btn-order").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      openCategoryModal(btn.dataset.id);
    });
  });
}

/* ═══════════════════════════════════════════
   ORDER MODAL
═══════════════════════════════════════════ */
function openCategoryModal(id) {
  const p = ALL_CAT_PRODUCTS.find(x => x.id === id);
  if (!p) return;

  const modalOverlay = document.getElementById("modal-overlay");
  if (!modalOverlay) return;

  document.getElementById("modal-img").src = p.image || "";
  document.getElementById("modal-img").alt = p.name;
  document.getElementById("modal-cat").textContent = p.category;
  document.getElementById("modal-name").textContent = p.name;
  document.getElementById("modal-price").textContent = fmt(p.price);

  const origPriceEl = document.getElementById("modal-price-original");
  if (origPriceEl) origPriceEl.textContent = fmt(p.originalPrice);

  const discountTagEl = document.getElementById("modal-discount-tag");
  if (discountTagEl) discountTagEl.textContent = `-${p.discountPct}% OFF`;

  document.getElementById("modal-desc").textContent = p.description;

  const orderLine1 = document.getElementById("wa-order-1");
  const orderLine2 = document.getElementById("wa-order-2");
  if (orderLine1) orderLine1.href = getCategoryWaLink(WA_LINE_1, p);
  if (orderLine2) orderLine2.href = getCategoryWaLink(WA_LINE_2, p);

  modalOverlay.classList.add("open");
  document.body.style.overflow = "hidden";

  // Track to recently viewed (strictly capped at last 5)
  try {
    let recent = [];
    const raw = localStorage.getItem("melojey_recent_views");
    if (raw) recent = JSON.parse(raw);
    recent = recent.filter(x => x.id !== p.id);
    recent.unshift({
      id: p.id,
      name: p.name,
      price: p.price,
      originalPrice: p.originalPrice,
      discountPct: p.discountPct || 15,
      image: p.image
    });
    recent = recent.slice(0, 5);
    localStorage.setItem("melojey_recent_views", JSON.stringify(recent));
  } catch (e) {}
}

function closeCategoryModal() {
  const modalOverlay = document.getElementById("modal-overlay");
  if (modalOverlay) modalOverlay.classList.remove("open");
  document.body.style.overflow = "";
}

/* ═══════════════════════════════════════════
   FLOATING WHATSAPP BUTTON LOGIC
═══════════════════════════════════════════ */
function initFloatingWhatsApp() {
  const floatBtn = document.getElementById("wa-float-btn");
  const floatMenu = document.getElementById("wa-float-menu");
  const floatLine1 = document.getElementById("wa-float-line-1");
  const floatLine2 = document.getElementById("wa-float-line-2");

  const defaultMsg = encodeURIComponent("Hello Melojey Modern Furniture! I am browsing your showroom catalogue and would like to make an enquiry.");
  if (floatLine1) floatLine1.href = `https://wa.me/${WA_LINE_1}?text=${defaultMsg}`;
  if (floatLine2) floatLine2.href = `https://wa.me/${WA_LINE_2}?text=${defaultMsg}`;

  if (floatBtn && floatMenu) {
    floatBtn.addEventListener("click", e => {
      e.stopPropagation();
      floatMenu.classList.toggle("open");
    });

    document.addEventListener("click", e => {
      if (!floatMenu.contains(e.target) && e.target !== floatBtn) {
        floatMenu.classList.remove("open");
      }
    });
  }
}

/* ═══════════════════════════════════════════
   SEARCH & AUTOCOMPLETE SUGGESTIONS
═══════════════════════════════════════════ */
function initCategorySearch() {
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

  // Mobile toggle open (pure search icon)
  if (searchToggle && searchWrap) {
    searchToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      openMobileSearch();
    });
  }

  // Mobile close / Cancel button
  if (searchCloseMobile && searchWrap) {
    searchCloseMobile.addEventListener("click", (e) => {
      e.stopPropagation();
      closeMobileSearch();
    });
  }

  // Mobile backdrop click closes search
  if (searchBackdrop) {
    searchBackdrop.addEventListener("click", () => {
      closeMobileSearch();
    });
  }

  // Clear button
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

  // Input listener
  searchInput.addEventListener("input", () => {
    const q = searchInput.value.trim().toLowerCase();
    if (searchClear) searchClear.classList.toggle("show", q.length > 0);

    if (!q) {
      suggestionsBox.classList.remove("show");
      suggestionsBox.innerHTML = "";
      return;
    }

    const matches = ALL_CAT_PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );

    if (matches.length === 0) {
      suggestionsBox.innerHTML = `
        <div class="suggestion-empty">
          No furniture pieces found matching "<strong>${escapeHtml(q)}</strong>"
        </div>
      `;
      suggestionsBox.classList.add("show");
      return;
    }

    const topMatches = matches.slice(0, 5);

    suggestionsBox.innerHTML = `
      <div class="suggestion-header">Suggestions (${matches.length})</div>
      ${topMatches.map(p => `
        <div class="suggestion-item" data-id="${p.id}" tabindex="0" role="button">
          <img class="suggestion-img" src="${p.image || '../assets/images/logo.png'}" alt="${escapeHtml(p.name)}" onerror="this.onerror=null;this.src='../assets/images/logo.png';" />
          <div class="suggestion-info">
            <div class="suggestion-name">${escapeHtml(p.name)}</div>
            <div class="suggestion-meta">
              <span class="suggestion-cat">${escapeHtml(p.category)}</span>
              <div class="suggestion-price-group">
                <span class="suggestion-price">${fmt(p.price)}</span>
                <span class="suggestion-orig-price">${fmt(p.originalPrice)}</span>
              </div>
            </div>
          </div>
        </div>
      `).join("")}
    `;

    suggestionsBox.classList.add("show");

    suggestionsBox.querySelectorAll(".suggestion-item").forEach(item => {
      item.addEventListener("click", () => {
        openCategoryModal(item.dataset.id);
        suggestionsBox.classList.remove("show");
        closeMobileSearch();
      });
    });
  });

  // Close on outside click or Escape
  document.addEventListener("click", e => {
    if (!searchWrap.contains(e.target) && (!searchToggle || !searchToggle.contains(e.target))) {
      suggestionsBox.classList.remove("show");
    }
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      suggestionsBox.classList.remove("show");
      closeMobileSearch();
    }
  });
}

/* ═══════════════════════════════════════════
   INITIALIZATION
═══════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  renderCategoryGrid();
  initCategorySearch();
  initFloatingWhatsApp();

  const modalClose = document.getElementById("modal-close");
  if (modalClose) modalClose.addEventListener("click", closeCategoryModal);

  const modalOverlay = document.getElementById("modal-overlay");
  if (modalOverlay) {
    modalOverlay.addEventListener("click", e => {
      if (e.target === modalOverlay) closeCategoryModal();
    });
  }

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeCategoryModal();
  });
});
