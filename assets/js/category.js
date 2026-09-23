/* ═════════════════════════════════════════════════════════════════════════════════
   MELOJEY MODERN FURNITURE — CATEGORY PAGE CONTROLLER v2 (category.js)
   ─────────────────────────────────────────────────────────────────────────────
   Handles all dedicated category pages: sofas / beds / dining / office /
   wardrobes / bar / tables / rugs / decor / others

   FEATURES:
   1. Dynamic product grid per category (sort + filter)
   2. Filter/sort toolbar (item count · grid/list view · sort by)
   3. Category sidebar with subcategory filter + count
   4. ★ Wishlist star icon on every card
   5. "Add to Cart" → morphs into −1+ stepper
   6. Live search with autocomplete suggestions
   7. Mobile expandable search icon
   8. Dual-line WhatsApp order modal (on card click)
   9. Floating WhatsApp showroom selector
═════════════════════════════════════════════════════════════════════════════════ */

const WA_LINE_1 = "2348033218845"; // Factory Road Showroom
const WA_LINE_2 = "2348037768889"; // St Michael's Road Showroom

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
window.escapeHtml = escapeHtml;

/* Format currency */
const fmt = n => `₦${Number(n).toLocaleString("en-NG")}`;

/* ── COMPREHENSIVE CURATED PRODUCTS REPOSITORY ── */
const CATEGORY_PRODUCTS = {
  SOFAS: [
    {
      id: "SF01", name: "Oslo 3-Seater Velvet Sofa", category: "Sofas",
      price: 285000, originalPrice: 335000, discountPct: 15,
      description: "Premium emerald velvet upholstery with deep-cushion comfort, high-density foam, and solid mahogany frame.",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=450&fit=crop",
      sub: "Luxury Sofas", isNew: false
    },
    {
      id: "SF02", name: "L-Shaped Sectional with Chaise", category: "Sofas",
      price: 395000, originalPrice: 465000, discountPct: 15,
      description: "Spacious L-shaped modular sectional with reversible chaise. Stain-resistant microfibre fabric in slate grey.",
      image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&h=450&fit=crop",
      sub: "Sectionals", isNew: false
    },
    {
      id: "SF03", name: "Royal Chesterfield Tufted Sofa", category: "Sofas",
      price: 350000, originalPrice: 410000, discountPct: 15,
      description: "Deep button-tufted craftsmanship with rolled arms, burnished brass nailhead trim, and plush seating.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=450&fit=crop",
      sub: "Classic Sofas", isNew: true
    },
    {
      id: "SF04", name: "Ergonomic Recliner Armchair", category: "Sofas",
      price: 145000, originalPrice: 170000, discountPct: 15,
      description: "Smooth multi-angle reclining mechanism with padded headrest, lumbar support, and genuine bonded leather.",
      image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=450&fit=crop",
      sub: "Recliners", isNew: false
    },
    {
      id: "SF05", name: "Scandinavian Accent Lounge Chair", category: "Sofas",
      price: 110000, originalPrice: 130000, discountPct: 15,
      description: "Curved minimalist oak wood silhouette with warm mustard upholstery. A timeless living room accent.",
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=450&fit=crop",
      sub: "Accent Chairs", isNew: true
    },
    {
      id: "SF06", name: "Modular Corner Fabric Suite", category: "Sofas",
      price: 480000, originalPrice: 565000, discountPct: 15,
      description: "Expansive 5-piece sectional suite designed for large living rooms, family lounges, and executive residences.",
      image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=600&h=450&fit=crop",
      sub: "Sectionals", isNew: false
    }
  ],

  BEDS: [
    {
      id: "BD01", name: "King Bed Frame & Upholstered Headboard", category: "Beds",
      price: 195000, originalPrice: 235000, discountPct: 17,
      description: "Solid mahogany king-size bed frame with charcoal grey channel-tufted headboard and heavy reinforced slats.",
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=450&fit=crop",
      sub: "Classic Beds", isNew: false
    },
    {
      id: "BD02", name: "Queen Floating Bed with LED Accent", category: "Beds",
      price: 220000, originalPrice: 260000, discountPct: 15,
      description: "Modern cantilever floating design with warm ambient LED underglow and integrated dual bedside nightstands.",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&h=450&fit=crop",
      sub: "Modern Beds", isNew: true
    },
    {
      id: "BD03", name: "Royal Velvet Tufted Bed Suite", category: "Beds",
      price: 310000, originalPrice: 365000, discountPct: 15,
      description: "Grand wingback headboard wrapped in royal champagne velvet with polished gold metallic corner caps.",
      image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&h=450&fit=crop",
      sub: "Luxury Beds", isNew: false
    },
    {
      id: "BD04", name: "Solid Mahogany Master Bed Frame", category: "Beds",
      price: 260000, originalPrice: 305000, discountPct: 15,
      description: "Kiln-dried seasoned hardwood, rich natural stain, and robust joinery guaranteed for generations.",
      image: "https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?w=600&h=450&fit=crop",
      sub: "Classic Beds", isNew: false
    }
  ],

  DINING: [
    {
      id: "DN01", name: "Marble Top Dining Set (6 Seater)", category: "Dining",
      price: 420000, originalPrice: 490000, discountPct: 14,
      description: "Engineered heavy polished marble tabletop with 6 matching gold-framed padded dining chairs.",
      image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&h=450&fit=crop",
      sub: "Luxury Dining", isNew: false
    },
    {
      id: "DN02", name: "Luxury 8-Seater Gold Accent Dining Table", category: "Dining",
      price: 550000, originalPrice: 650000, discountPct: 15,
      description: "Grand banquet-sized dining table with brushed eagle-gold pedestal legs and 8 high-back upholstered chairs.",
      image: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=600&h=450&fit=crop",
      sub: "Luxury Dining", isNew: false
    },
    {
      id: "DN03", name: "Solid Teak Round Dining Table", category: "Dining",
      price: 280000, originalPrice: 330000, discountPct: 15,
      description: "Intimate 4-6 seater circular dining table in solid teakwood with smooth beveled edge and cross base.",
      image: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=600&h=450&fit=crop",
      sub: "Classic Dining", isNew: true
    },
    {
      id: "DN04", name: "Velvet Padded Dining Chairs (Set of 4)", category: "Dining",
      price: 160000, originalPrice: 190000, discountPct: 16,
      description: "Ergonomic curved backrests with stain-resistant velvet fabric and sturdy matte-black metal legs.",
      image: "https://images.unsplash.com/photo-1580481077195-c3a9f0a514d4?w=600&h=450&fit=crop",
      sub: "Dining Chairs", isNew: false
    }
  ],

  OFFICE: [
    {
      id: "OF01", name: "Executive High-Back Leather Chair", category: "Office",
      price: 95000, originalPrice: 115000, discountPct: 17,
      description: "Executive leather chair with pneumatic height adjustment, tilt lock, adjustable lumbar, and cushioned armrests.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=450&fit=crop",
      sub: "Office Chairs", isNew: false
    },
    {
      id: "OF02", name: "Presidential Walnut Executive Desk", category: "Office",
      price: 320000, originalPrice: 375000, discountPct: 15,
      description: "Imposing 1.8m executive desk with leather blotter inset, dual locking drawer pedestals, and cable management ports.",
      image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&h=450&fit=crop",
      sub: "Executive Desks", isNew: false
    },
    {
      id: "OF03", name: "Modern Ergonomic Mesh Task Chair", category: "Office",
      price: 75000, originalPrice: 90000, discountPct: 17,
      description: "Breathable Korean mesh back with 3D armrests, dynamic lumbar support, and heavy-duty chrome caster base.",
      image: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=600&h=450&fit=crop",
      sub: "Office Chairs", isNew: true
    },
    {
      id: "OF04", name: "L-Shaped Executive Workstation", category: "Office",
      price: 290000, originalPrice: 340000, discountPct: 15,
      description: "Corner executive desk with integrated return credenza, modesty panel, and scratch-resistant melamine finish.",
      image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&h=450&fit=crop",
      sub: "Executive Desks", isNew: false
    }
  ],

  WARDROBES: [
    {
      id: "WD01", name: "4-Door Walnut Floor-to-Ceiling Wardrobe", category: "Wardrobes",
      price: 310000, originalPrice: 365000, discountPct: 15,
      description: "Engineered walnut wardrobe with internal shelving, dual hanging rails, lockable security drawers, and soft-close doors.",
      image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&h=450&fit=crop",
      sub: "Classic Wardrobes", isNew: false
    },
    {
      id: "WD02", name: "Sliding Mirrored 3-Door Wardrobe", category: "Wardrobes",
      price: 280000, originalPrice: 330000, discountPct: 15,
      description: "Full-length mirrored sliding doors that maximize bedroom lighting, with silent aluminum roller tracks.",
      image: "https://images.unsplash.com/photo-1558997519-83ea9252def8?w=600&h=450&fit=crop",
      sub: "Modern Wardrobes", isNew: false
    },
    {
      id: "WD03", name: "Custom Walk-in Closet System", category: "Wardrobes",
      price: 450000, originalPrice: 530000, discountPct: 15,
      description: "Modular walk-in closet shelving, garment hanging organizers, accessory tray drawers, and overhead suitcase storage.",
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=450&fit=crop",
      sub: "Luxury Wardrobes", isNew: true
    },
    {
      id: "WD04", name: "Floating TV & Storage Wall Unit", category: "Wardrobes",
      price: 210000, originalPrice: 245000, discountPct: 14,
      description: "Wall-mounted entertainment console with fluted wood cabinets, tempered glass shelves, and integrated cable conduits.",
      image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=600&h=450&fit=crop",
      sub: "TV Units", isNew: false
    }
  ],

  BAR: [
    {
      id: "BR01", name: "Velvet Swivel Bar Stools (Set of 2)", category: "Bar",
      price: 85000, originalPrice: 100000, discountPct: 15,
      description: "360-degree swivel bar stools with champagne gold footrest, hydraulic height lift, and ribbed velvet backrest.",
      image: "https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=600&h=450&fit=crop",
      sub: "Bar Stools", isNew: false
    },
    {
      id: "BR02", name: "Luxury Home Bar Counter with Footrest", category: "Bar",
      price: 270000, originalPrice: 320000, discountPct: 16,
      description: "Custom curved home bar with marble look serving top, interior stemware racks, lockable wine cabinet, and brass rail.",
      image: "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=600&h=450&fit=crop",
      sub: "Bar Counters", isNew: false
    },
    {
      id: "BR03", name: "Brass & Glass Wine Console Bar Cart", category: "Bar",
      price: 125000, originalPrice: 150000, discountPct: 17,
      description: "Mobile 2-tier service cart with mirror glass shelves, bottle holders, and smooth rolling lockable castor wheels.",
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&h=450&fit=crop",
      sub: "Bar Carts", isNew: true
    }
  ],

  TABLES: [
    {
      id: "TB01", name: "Glass Top Coffee Table with Gold Frame", category: "Tables",
      price: 78000, originalPrice: 92000, discountPct: 15,
      description: "Tempered shatterproof glass with brushed eagle-gold geometric base. Dimensions: 120cm x 60cm.",
      image: "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?w=600&h=450&fit=crop",
      sub: "Coffee Tables", isNew: false
    },
    {
      id: "TB02", name: "Marble Nesting Coffee Tables (Set of 2)", category: "Tables",
      price: 115000, originalPrice: 135000, discountPct: 15,
      description: "Dual circular nesting tables with real white Carrara marble tops and matte black iron frames.",
      image: "https://images.unsplash.com/photo-1533090161767-e6ffed986b88?w=600&h=450&fit=crop",
      sub: "Coffee Tables", isNew: true
    },
    {
      id: "TB03", name: "Solid Oak Console Entryway Table", category: "Tables",
      price: 95000, originalPrice: 112000, discountPct: 15,
      description: "Slim hallway console with dual pull-out drawers, brass knobs, and open bottom display shelf.",
      image: "https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?w=600&h=450&fit=crop",
      sub: "Console Tables", isNew: false
    }
  ],

  RUGS: [
    {
      id: "RG01", name: "Boho Jute Geometric Area Rug (2x3m)", category: "Rugs",
      price: 55000, originalPrice: 65000, discountPct: 15,
      description: "Hand-braided natural jute fiber with neutral geometric motifs. Durable, eco-friendly, and easy to clean.",
      image: "https://images.unsplash.com/photo-1603204077779-bed963ea7d0e?w=600&h=450&fit=crop",
      sub: "Jute Rugs", isNew: false
    },
    {
      id: "RG02", name: "Turkish Vintage Distressed Silk Rug (2.5x3.5m)", category: "Rugs",
      price: 135000, originalPrice: 160000, discountPct: 16,
      description: "Ultra-soft woven silk blend with heritage Anatolian floral medallion in faded gold and charcoal blue.",
      image: "https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?w=600&h=450&fit=crop",
      sub: "Luxury Rugs", isNew: false
    },
    {
      id: "RG03", name: "Soft Shag Living Room Rug (2x3m)", category: "Rugs",
      price: 72000, originalPrice: 85000, discountPct: 15,
      description: "High-density 40mm thick microfiber pile. Soft cloud feel underfoot, non-shedding and anti-skid backing.",
      image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&h=450&fit=crop",
      sub: "Shag Rugs", isNew: true
    }
  ],

  DECOR: [
    {
      id: "DC01", name: "Ceramic Vase Set (3 Pieces)", category: "Decor",
      price: 18500, originalPrice: 22000, discountPct: 16,
      description: "Trio of textured matte ceramic vases in earthy terracotta, sand, and charcoal. Perfect table centerpieces.",
      image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600&h=450&fit=crop",
      sub: "Vases & Sculptures", isNew: false
    },
    {
      id: "DC02", name: "Tall Brushed Gold Floor Vase (60cm)", category: "Decor",
      price: 24000, originalPrice: 28000, discountPct: 14,
      description: "Metallic electroplated aluminum urn vase. Ideal for pampas grass, faux florals, or corner aesthetics.",
      image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=600&h=450&fit=crop",
      sub: "Vases & Sculptures", isNew: false
    },
    {
      id: "DC03", name: "Royal Crystal Chandelier Pendant Light", category: "Decor",
      price: 165000, originalPrice: 195000, discountPct: 15,
      description: "Tiered K9 crystal prisms with brushed brass framework. Produces warm dazzling illumination for dining or foyer.",
      image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&h=450&fit=crop",
      sub: "Lighting", isNew: true
    },
    {
      id: "DC04", name: "Sunburst Gold Accent Wall Mirror (80cm)", category: "Decor",
      price: 68000, originalPrice: 80000, discountPct: 15,
      description: "Sculptural metallic sunburst rays around a high-clarity bevel mirror. Instantly elevates living room walls.",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&h=450&fit=crop",
      sub: "Mirrors", isNew: false
    }
  ],

  OTHERS: [
    {
      id: "OT01", name: "Abstract Gold Canvas Art (60x90cm)", category: "Others",
      price: 35000, originalPrice: 42000, discountPct: 17,
      description: "Hand-painted acrylic textured canvas featuring gold leaf, charcoal black, and ivory. Ready to hang.",
      image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&h=450&fit=crop",
      sub: "Wall Art", isNew: false
    },
    {
      id: "OT02", name: "Outdoor Rattan 3-Piece Lounge Set", category: "Others",
      price: 230000, originalPrice: 270000, discountPct: 15,
      description: "Weatherproof all-weather PE wicker with two armchairs, tempered glass coffee table, and washable cushions.",
      image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&h=450&fit=crop",
      sub: "Outdoor", isNew: false
    },
    {
      id: "OT03", name: "Bronze Majestic Eagle Desktop Sculpture", category: "Others",
      price: 45000, originalPrice: 53000, discountPct: 15,
      description: "Heavy cast bronze soaring eagle on polished black marble pedestal. Inspired by Melojey's regal insignia.",
      image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&h=450&fit=crop",
      sub: "Sculptures", isNew: true
    }
  ]
};

/* All products flat list */
const ALL_CAT_PRODUCTS = Object.values(CATEGORY_PRODUCTS).flat();

/* Active filter state */
let activeFilter = "ALL";       // "ALL" | "NEW" | "DEALS" | sub-name
let activePriceFilter = "ALL";  // "ALL" | "under-150k" | "150k-350k" | "above-350k" | "custom"
let minPrice = null;            // numeric min bound
let maxPrice = null;            // numeric max bound
let activeSort   = "featured"; // featured | price-asc | price-desc | name-az | newest

/* Two-tone title formatter matching recently viewed cards */
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

/* ── Sort function ─────────────────────────────────────── */
function sortProducts(products) {
  const arr = [...products];
  switch (activeSort) {
    case "price-asc":  return arr.sort((a, b) => a.price - b.price);
    case "price-desc": return arr.sort((a, b) => b.price - a.price);
    case "name-az":    return arr.sort((a, b) => a.name.localeCompare(b.name));
    case "newest":     return arr.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    default:           return arr; // featured = original order
  }
}

/* ── Filter function ───────────────────────────────────── */
function filterProducts(products) {
  let list = products;
  if (activeFilter === "NEW") {
    list = list.filter(p => p.isNew);
  } else if (activeFilter === "DEALS") {
    list = list.filter(p => (p.discountPct || 0) >= 15);
  } else if (activeFilter !== "ALL") {
    list = list.filter(p => p.sub === activeFilter);
  }

  if (minPrice !== null && !isNaN(minPrice)) {
    list = list.filter(p => p.price >= minPrice);
  }
  if (maxPrice !== null && !isNaN(maxPrice)) {
    list = list.filter(p => p.price <= maxPrice);
  }
  return list;
}

/* WhatsApp Order Link with Photo URL */
function getCategoryWaLink(number, product) {
  const cleanImg = product.image ? (product.image.startsWith("http") ? product.image : (window.location.origin && !window.location.origin.startsWith("file") ? `${window.location.origin}/${product.image.replace(/^(\.\.\/)+/, "").replace(/^\//, "")}` : product.image)) : "";
  const msg =
    `Hello! I'd like to order from Melojey Modern Furniture:\n\n` +
    `*${product.name}*\n` +
    `• Category: ${product.category}\n` +
    `• Price: ${fmt(product.price)} (Save ${product.discountPct}% off ${fmt(product.originalPrice)})\n` +
    `• Item Code: ${product.id}\n` +
    `• 📷 Photo: ${cleanImg}\n\n` +
    `Is this currently available in your showroom?`;
  return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
}

/* ── BUILD ONE PRODUCT CARD HTML (Replicates Recently Viewed Card Design) ── */
function buildCardHtml(p) {
  const discountPct = p.discountPct || 15;
  const orig = p.originalPrice || Math.round(p.price * 1.15);
  const isSoldOut = p.stock !== null && p.stock !== undefined && Number(p.stock) <= 0;
  const isLowStock = !isSoldOut && p.stock !== null && p.stock !== undefined && Number(p.stock) > 0 && Number(p.stock) <= 10;

  return `
    <div class="product-card${isSoldOut ? ' card-sold-out' : ''}" data-id="${p.id}" tabindex="0" role="button" aria-label="View ${escapeHtml(p.name)}">
      <div class="card-img-wrap">
        <img class="card-img" src="${p.image}" alt="${escapeHtml(p.name)}" loading="lazy" onerror="this.onerror=null;this.src='../assets/images/logo.png';" />
        ${!isSoldOut ? `<span class="card-discount-badge">-${discountPct}%</span>` : ''}
        <button class="card-wishlist-btn" data-id="${p.id}" type="button" aria-label="Add to wishlist">☆</button>
      </div>
      <div class="card-body">
        <div class="card-cat">${escapeHtml(p.category)}</div>
        <div class="card-name" title="${escapeHtml(p.name)}">${formatTwoToneTitle(p.name)}</div>
        <div class="card-desc">${escapeHtml(p.description || "")}</div>
        ${isLowStock ? `<div class="card-stock-hint"><span class="stock-dot"></span> Only ${p.stock} available</div>` : ''}
        <div class="card-footer">
          <div class="card-price-group">
            <span class="card-price">${fmt(p.price)}</span>
            <span class="card-price-original">${fmt(orig)}</span>
          </div>
          <button class="btn-add-cart${isSoldOut ? ' btn-sold-out' : ''}" data-id="${p.id}" type="button"${isSoldOut ? ' disabled' : ''}>
            ${isSoldOut ? 'Sold Out' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  `;
}

/* ── ATTACH CARD INTERACTIONS ──────────────────────────── */
function attachCardInteractions(cardEl, product) {
  // Click card body → open modal
  cardEl.addEventListener("click", e => {
    if (
      e.target.closest(".card-wishlist-btn") ||
      e.target.closest(".btn-add-cart") ||
      e.target.closest(".qty-stepper")
    ) return;
    openCategoryModal(product.id);
  });

  cardEl.addEventListener("keydown", e => {
    if (e.key === "Enter") openCategoryModal(product.id);
  });

  // Wishlist star
  if (window.MelojeyWishlist) {
    window.MelojeyWishlist.initStar(cardEl, product);
  }

  // Add to Cart → stepper
  if (window.MelojeyCart) {
    window.MelojeyCart.initStepper(cardEl, product);
  }
}

/* ── RENDER PRODUCT GRID ───────────────────────────────── */
function getPageProducts() {
  const key = (document.body.getAttribute("data-page-category") || "SOFAS").toUpperCase();
  return (window.MELOJEY_DATA && window.MELOJEY_DATA.PRODUCTS && window.MELOJEY_DATA.PRODUCTS[key])
    ? window.MELOJEY_DATA.PRODUCTS[key]
    : (CATEGORY_PRODUCTS[key] || []);
}

function renderCategoryGrid() {
  const rawProducts = getPageProducts();
  const filtered = filterProducts(rawProducts);
  const sorted = sortProducts(filtered);

  const grid = document.getElementById("category-product-grid");
  const countEl = document.getElementById("category-product-count");
  const toolbarCount = document.getElementById("toolbar-count");

  if (!grid) return;

  const total = rawProducts.length;
  const showing = sorted.length;

  if (countEl) countEl.textContent = `${total} Item${total !== 1 ? "s" : ""}`;
  if (toolbarCount) {
    toolbarCount.textContent = showing === total
      ? `${total} item${total !== 1 ? "s" : ""}`
      : `${showing} of ${total} item${total !== 1 ? "s" : ""}`;
  }

  if (sorted.length === 0) {
    grid.innerHTML = `<div class="state-box" style="grid-column:1/-1"><p>No items match this filter.</p></div>`;
    return;
  }

  grid.innerHTML = sorted.map(buildCardHtml).join("");

  // Build a unified lookup that merges live data + static fallback
  // so cards always find their product regardless of which data source rendered them
  const liveAll = (window.MELOJEY_DATA && Array.isArray(window.MELOJEY_DATA.ALL_PRODUCTS) && window.MELOJEY_DATA.ALL_PRODUCTS.length > 0)
    ? window.MELOJEY_DATA.ALL_PRODUCTS
    : [];
  const lookupList = liveAll.length > 0 ? liveAll : ALL_CAT_PRODUCTS;

  grid.querySelectorAll(".product-card").forEach(card => {
    const id = card.dataset.id;
    // Search live data first, then fall back to static list
    const product = lookupList.find(p => String(p.id) === String(id))
                 || ALL_CAT_PRODUCTS.find(p => String(p.id) === String(id));
    if (product) attachCardInteractions(card, product);
  });
}

/* ── GROUPED SIDEBAR ───────────────────────────────────── */
const ALL_DEPARTMENTS = [
  { key: "SOFAS", name: "Living Room & Sofas", url: "sofas.html" },
  { key: "BEDS", name: "Bedroom Suites & Beds", url: "beds.html" },
  { key: "DINING", name: "Dining & Bar Luxury", url: "dining.html" },
  { key: "OFFICE", name: "Office & Executive Desks", url: "office.html" },
  { key: "WARDROBES", name: "Wardrobes & Storage", url: "wardrobes.html" },
  { key: "BAR", name: "Bar Stools & Wine Bars", url: "bar.html" },
  { key: "TABLES", name: "Coffee & Console Tables", url: "tables.html" },
  { key: "RUGS", name: "Luxury Carpets & Rugs", url: "rugs.html" },
  { key: "DECOR", name: "Mirrors, Lighting & Decor", url: "decor.html" },
  { key: "OTHERS", name: "Artwork, Patio & Statues", url: "others.html" }
];

function buildSidebar(products) {
  const sidebarEl = document.getElementById("shop-sidebar");
  if (!sidebarEl) return;

  const currentCat = (document.body.getAttribute("data-page-category") || "SOFAS").toUpperCase();

  // Subcategory counts
  const subCounts = {};
  products.forEach(p => {
    if (p.sub) subCounts[p.sub] = (subCounts[p.sub] || 0) + 1;
  });

  const newCount = products.filter(p => p.isNew).length;
  const dealsCount = products.filter(p => (p.discountPct || 0) >= 15).length;
  const subs = Object.entries(subCounts);

  // Price bucket counts
  const under150Count = products.filter(p => p.price < 150000).length;
  const midCount = products.filter(p => p.price >= 150000 && p.price <= 350000).length;
  const highCount = products.filter(p => p.price > 350000).length;

  sidebarEl.innerHTML = `
    <div class="sidebar-title">Filters &amp; Categories</div>

    <!-- GROUP 1: QUICK FILTERS -->
    <div class="sidebar-section">
      <div class="sidebar-section-title">Quick Filters</div>
      <div class="sidebar-item ${activeFilter === "ALL" ? "active" : ""}" data-filter="ALL">
        <span class="sidebar-item-name">All Collection</span>
        <span class="sidebar-item-count">${products.length}</span>
      </div>
      ${newCount > 0 ? `
      <div class="sidebar-item ${activeFilter === "NEW" ? "active" : ""}" data-filter="NEW">
        <span class="sidebar-item-name">✨ New Arrivals</span>
        <span class="sidebar-item-count">${newCount}</span>
      </div>
      ` : ""}
      <div class="sidebar-item ${activeFilter === "DEALS" ? "active" : ""}" data-filter="DEALS">
        <span class="sidebar-item-name">🔥 Hot Deals (15%+ Off)</span>
        <span class="sidebar-item-count">${dealsCount}</span>
      </div>
    </div>

    <!-- GROUP 2: SUBCATEGORIES -->
    ${subs.length > 0 ? `
    <div class="sidebar-divider"></div>
    <div class="sidebar-section">
      <div class="sidebar-section-title">Styles &amp; Types</div>
      ${subs.map(([sub, count]) => `
      <div class="sidebar-item ${activeFilter === sub ? "active" : ""}" data-filter="${escapeHtml(sub)}">
        <span class="sidebar-item-name">${escapeHtml(sub)}</span>
        <span class="sidebar-item-count">${count}</span>
      </div>
      `).join("")}
    </div>
    ` : ""}

    <!-- GROUP 3: DUAL MIN/MAX PRICE RANGE CONTROLS -->
    <div class="sidebar-divider"></div>
    <div class="sidebar-section">
      <div class="sidebar-section-title">Price Range</div>

      <div class="price-slider-box">
        <div class="price-slider-header">
          <span class="price-slider-title">Filter by Budget:</span>
          <span class="price-slider-val" id="cat-price-slider-val">
            ${minPrice !== null || maxPrice !== null ? `${fmt(minPrice || 10000)} – ${fmt(maxPrice || 600000)}` : "All Prices"}
          </span>
        </div>

        <div class="price-input-row">
          <div class="price-input-field">
            <span class="price-input-prefix">₦</span>
            <input type="number" class="price-num-input" id="cat-min-input" min="10000" max="1000000" step="5000" value="${minPrice !== null ? minPrice : ""}" placeholder="Min" />
          </div>
          <span class="price-input-sep">—</span>
          <div class="price-input-field">
            <span class="price-input-prefix">₦</span>
            <input type="number" class="price-num-input" id="cat-max-input" min="10000" max="1000000" step="5000" value="${maxPrice !== null ? maxPrice : ""}" placeholder="Max" />
          </div>
        </div>

        <div class="dual-range-wrap">
          <div class="dual-range-track"></div>
          <div class="dual-range-highlight" id="cat-dual-highlight"></div>
          <input type="range" class="dual-range-slider" id="cat-min-slider" min="10000" max="600000" step="5000" value="${minPrice || 10000}">
          <input type="range" class="dual-range-slider" id="cat-max-slider" min="10000" max="600000" step="5000" value="${maxPrice || 600000}">
        </div>

        <div class="price-slider-ticks">
          <span>₦10k</span>
          <span id="cat-tick-summary">${minPrice !== null || maxPrice !== null ? `${fmt(minPrice || 10000)} – ${fmt(maxPrice || 600000)}` : "All Prices"}</span>
          <span>₦600k+</span>
        </div>
      </div>

      <div class="sidebar-item ${activePriceFilter === "ALL" ? "active" : ""}" data-price="ALL">
        <span class="sidebar-item-name">All Prices</span>
        <span class="sidebar-item-count">${products.length}</span>
      </div>
      <div class="sidebar-item ${activePriceFilter === "under-150k" ? "active" : ""}" data-price="under-150k">
        <span class="sidebar-item-name">Under ₦150,000</span>
        <span class="sidebar-item-count">${under150Count}</span>
      </div>
      <div class="sidebar-item ${activePriceFilter === "150k-350k" ? "active" : ""}" data-price="150k-350k">
        <span class="sidebar-item-name">₦150,000 – ₦350,000</span>
        <span class="sidebar-item-count">${midCount}</span>
      </div>
      <div class="sidebar-item ${activePriceFilter === "above-350k" ? "active" : ""}" data-price="above-350k">
        <span class="sidebar-item-name">Above ₦350,000</span>
        <span class="sidebar-item-count">${highCount}</span>
      </div>
    </div>

    <!-- GROUP 4: ALL DEPARTMENTS -->
    <div class="sidebar-divider"></div>
    <div class="sidebar-section">
      <div class="sidebar-section-title">Other Departments</div>
      <div class="sidebar-dept-list">
        ${ALL_DEPARTMENTS.map(d => `
          <a href="${d.url}" class="sidebar-dept-link ${currentCat === d.key ? "active" : ""}">
            ${escapeHtml(d.name)}
          </a>
        `).join("")}
      </div>
    </div>
  `;

  // Dual Price Slider & Typed Inputs sync
  const minSlider = sidebarEl.querySelector("#cat-min-slider");
  const maxSlider = sidebarEl.querySelector("#cat-max-slider");
  const minInput = sidebarEl.querySelector("#cat-min-input");
  const maxInput = sidebarEl.querySelector("#cat-max-input");
  const highlight = sidebarEl.querySelector("#cat-dual-highlight");
  const headerVal = sidebarEl.querySelector("#cat-price-slider-val");
  const summaryVal = sidebarEl.querySelector("#cat-tick-summary");

  function updateDualHighlight() {
    if (!minSlider || !maxSlider || !highlight) return;
    const minVal = Number(minSlider.value);
    const maxVal = Number(maxSlider.value);
    const minBound = Number(minSlider.min) || 10000;
    const maxBound = Number(minSlider.max) || 600000;
    const pctMin = Math.max(0, Math.min(100, ((minVal - minBound) / (maxBound - minBound)) * 100));
    const pctMax = Math.max(0, Math.min(100, ((maxVal - minBound) / (maxBound - minBound)) * 100));
    highlight.style.left = pctMin + "%";
    highlight.style.width = (pctMax - pctMin) + "%";

    const label = (minVal > minBound || maxVal < maxBound) ? `${fmt(minVal)} – ${fmt(maxVal)}` : "All Prices";
    if (headerVal) headerVal.textContent = label;
    if (summaryVal) summaryVal.textContent = label;
  }

  function applyDualPrice(fromMin, fromMax) {
    minPrice = fromMin > 10000 ? fromMin : null;
    maxPrice = fromMax < 600000 ? fromMax : null;
    activePriceFilter = (minPrice === null && maxPrice === null) ? "ALL" : "custom";
    renderCategoryGrid();
    sidebarEl.querySelectorAll("[data-price]").forEach(el => {
      el.classList.toggle("active", el.getAttribute("data-price") === activePriceFilter);
    });
  }

  if (minSlider && maxSlider) {
    updateDualHighlight();

    minSlider.addEventListener("input", () => {
      let val1 = Number(minSlider.value);
      let val2 = Number(maxSlider.value);
      if (val1 > val2 - 10000) {
        val1 = val2 - 10000;
        minSlider.value = val1;
      }
      if (minInput) minInput.value = val1 > 10000 ? val1 : "";
      updateDualHighlight();
      applyDualPrice(val1, val2);
    });

    maxSlider.addEventListener("input", () => {
      let val1 = Number(minSlider.value);
      let val2 = Number(maxSlider.value);
      if (val2 < val1 + 10000) {
        val2 = val1 + 10000;
        maxSlider.value = val2;
      }
      if (maxInput) maxInput.value = val2 < 600000 ? val2 : "";
      updateDualHighlight();
      applyDualPrice(val1, val2);
    });
  }

  if (minInput) {
    minInput.addEventListener("input", () => {
      const val = minInput.value ? Number(minInput.value) : 10000;
      if (minSlider) {
        minSlider.value = Math.min(val, Number(maxSlider.value) - 5000);
      }
      updateDualHighlight();
      applyDualPrice(Number(minSlider.value), Number(maxSlider.value));
    });
  }

  if (maxInput) {
    maxInput.addEventListener("input", () => {
      const val = maxInput.value ? Number(maxInput.value) : 600000;
      if (maxSlider) {
        maxSlider.value = Math.max(val, Number(minSlider.value) + 5000);
      }
      updateDualHighlight();
      applyDualPrice(Number(minSlider.value), Number(maxSlider.value));
    });
  }

  // Filter click handlers
  sidebarEl.querySelectorAll("[data-filter]").forEach(el => {
    el.addEventListener("click", () => {
      activeFilter = el.getAttribute("data-filter");
      renderCategoryGrid();
      buildSidebar(products); // re-highlight active
      sidebarEl.classList.remove("mobile-open");
      document.getElementById("sidebar-overlay")?.classList.remove("open");
    });
  });

  // Price filter click handlers
  sidebarEl.querySelectorAll("[data-price]").forEach(el => {
    el.addEventListener("click", () => {
      const priceKey = el.getAttribute("data-price");
      activePriceFilter = priceKey;
      if (priceKey === "ALL") {
        minPrice = null;
        maxPrice = null;
        if (minSlider) minSlider.value = 10000;
        if (maxSlider) maxSlider.value = 600000;
        if (minInput) minInput.value = "";
        if (maxInput) maxInput.value = "";
      } else if (priceKey === "under-150k") {
        minPrice = null;
        maxPrice = 150000;
        if (minSlider) minSlider.value = 10000;
        if (maxSlider) maxSlider.value = 150000;
        if (minInput) minInput.value = "";
        if (maxInput) maxInput.value = "150000";
      } else if (priceKey === "150k-350k") {
        minPrice = 150000;
        maxPrice = 350000;
        if (minSlider) minSlider.value = 150000;
        if (maxSlider) maxSlider.value = 350000;
        if (minInput) minInput.value = "150000";
        if (maxInput) maxInput.value = "350000";
      } else if (priceKey === "above-350k") {
        minPrice = 350000;
        maxPrice = null;
        if (minSlider) minSlider.value = 350000;
        if (maxSlider) maxSlider.value = 600000;
        if (minInput) minInput.value = "350000";
        if (maxInput) maxInput.value = "";
      }
      updateDualHighlight();
      renderCategoryGrid();
      sidebarEl.querySelectorAll("[data-price]").forEach(p => {
        p.classList.toggle("active", p.getAttribute("data-price") === activePriceFilter);
      });
      sidebarEl.classList.remove("mobile-open");
      document.getElementById("sidebar-overlay")?.classList.remove("open");
    });
  });
}

/* ── TOOLBAR ───────────────────────────────────────────── */
function initToolbar() {
  const sortSelect = document.getElementById("sort-select");
  const gridViewBtn = document.getElementById("view-grid");
  const listViewBtn = document.getElementById("view-list");
  const grid = document.getElementById("category-product-grid");
  const mobileFilterBtn = document.getElementById("mobile-filter-btn");
  const sidebarOverlay = document.getElementById("sidebar-overlay");
  const sidebar = document.getElementById("shop-sidebar");

  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      activeSort = sortSelect.value;
      renderCategoryGrid();
    });
  }

  if (gridViewBtn && listViewBtn && grid) {
    gridViewBtn.addEventListener("click", () => {
      grid.classList.remove("list-view");
      gridViewBtn.classList.add("active");
      listViewBtn.classList.remove("active");
    });

    listViewBtn.addEventListener("click", () => {
      grid.classList.add("list-view");
      listViewBtn.classList.add("active");
      gridViewBtn.classList.remove("active");
    });
  }

  if (mobileFilterBtn && sidebar) {
    mobileFilterBtn.addEventListener("click", () => {
      sidebar.classList.add("mobile-open");
      sidebarOverlay?.classList.add("open");
    });
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", () => {
      sidebar?.classList.remove("mobile-open");
      sidebarOverlay.classList.remove("open");
    });
  }
}

/* ── MODAL ─────────────────────────────────────────────── */
function openCategoryModal(id) {
  const allList = (window.MELOJEY_DATA && Array.isArray(window.MELOJEY_DATA.ALL_PRODUCTS) && window.MELOJEY_DATA.ALL_PRODUCTS.length > 0)
    ? window.MELOJEY_DATA.ALL_PRODUCTS
    : ALL_CAT_PRODUCTS;
  const p = allList.find(x => String(x.id) === String(id));
  if (!p) return;

  const modalOverlay = document.getElementById("modal-overlay");
  if (!modalOverlay) return;

  document.getElementById("modal-img").src = p.image || "";
  document.getElementById("modal-img").alt = p.name;
  document.getElementById("modal-cat").textContent = p.category;
  document.getElementById("modal-name").textContent = p.name;
  document.getElementById("modal-price").textContent = fmt(p.price);

  const origEl = document.getElementById("modal-price-original");
  if (origEl) origEl.textContent = fmt(p.originalPrice);

  const isSoldOut = p.stock !== null && p.stock !== undefined && Number(p.stock) <= 0;
  const discEl = document.getElementById("modal-discount-tag");
  if (discEl) {
    if (isSoldOut) {
      discEl.textContent = "SOLD OUT";
      discEl.style.background = "#3A3A3C";
      discEl.style.borderColor = "#48484A";
      discEl.style.color = "#A0A0A5";
    } else {
      discEl.textContent = `-${p.discountPct || 15}% OFF`;
      discEl.style.background = "";
      discEl.style.borderColor = "";
      discEl.style.color = "";
    }
  }

  document.getElementById("modal-desc").textContent = p.description;

  const orderLine1 = document.getElementById("wa-order-1");
  const orderLine2 = document.getElementById("wa-order-2");
  if (orderLine1) orderLine1.href = getCategoryWaLink(WA_LINE_1, p);
  if (orderLine2) orderLine2.href = getCategoryWaLink(WA_LINE_2, p);

  // Initialize Gallery (Left/Right arrows, angle counter & dots)
  if (window.MelojeyGallery && window.MelojeyGallery.setup) {
    window.MelojeyGallery.setup(modalOverlay, p);
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

  modalOverlay.classList.add("open");
  document.body.style.overflow = "hidden";

  // Track recently viewed (max 5)
  try {
    let recent = JSON.parse(localStorage.getItem("melojey_recent_views") || "[]");
    recent = recent.filter(x => x.id !== p.id);
    recent.unshift({ id: p.id, name: p.name, price: p.price, originalPrice: p.originalPrice, discountPct: p.discountPct || 15, image: p.image });
    recent = recent.slice(0, 5);
    localStorage.setItem("melojey_recent_views", JSON.stringify(recent));
  } catch (e) {}
}

function closeCategoryModal() {
  const modalOverlay = document.getElementById("modal-overlay");
  if (modalOverlay) modalOverlay.classList.remove("open");
  document.body.style.overflow = "";
}

/* ── FLOATING WHATSAPP ─────────────────────────────────── */
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

/* ── SEARCH ────────────────────────────────────────────── */
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
    searchWrap?.classList.add("open");
    searchBackdrop?.classList.add("show");
    document.body.classList.add("mobile-search-active");
    setTimeout(() => searchInput?.focus(), 80);
  }

  function closeMobileSearch() {
    searchWrap?.classList.remove("open");
    searchBackdrop?.classList.remove("show");
    document.body.classList.remove("mobile-search-active");
    suggestionsBox?.classList.remove("show");
  }

  searchToggle?.addEventListener("click", e => { e.stopPropagation(); openMobileSearch(); });
  searchCloseMobile?.addEventListener("click", e => { e.stopPropagation(); closeMobileSearch(); });
  searchBackdrop?.addEventListener("click", closeMobileSearch);

  searchClear?.addEventListener("click", e => {
    e.stopPropagation();
    searchInput.value = "";
    searchClear.classList.remove("show");
    suggestionsBox.classList.remove("show");
    suggestionsBox.innerHTML = "";
    searchInput.focus();
  });

  searchInput.addEventListener("input", () => {
    const q = searchInput.value.trim().toLowerCase();
    searchClear?.classList.toggle("show", q.length > 0);

    if (!q) { suggestionsBox.classList.remove("show"); suggestionsBox.innerHTML = ""; return; }

    const matches = ALL_CAT_PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );

    if (matches.length === 0) {
      suggestionsBox.innerHTML = `<div class="suggestion-empty">No furniture found matching "<strong>${escapeHtml(q)}</strong>"</div>`;
      suggestionsBox.classList.add("show");
      return;
    }

    const top = matches.slice(0, 5);
    suggestionsBox.innerHTML = `
      <div class="suggestion-header">Suggestions (${matches.length})</div>
      ${top.map(p => `
        <div class="suggestion-item" data-id="${p.id}" tabindex="0" role="button">
          <img class="suggestion-img" src="${p.image || "../assets/images/logo.png"}" alt="${escapeHtml(p.name)}" onerror="this.onerror=null;this.src='../assets/images/logo.png';" />
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
      <div class="suggestion-footer" id="suggestion-view-all">
        View all ${matches.length} result${matches.length !== 1 ? "s" : ""} for "${escapeHtml(q)}" →
      </div>
    `;

    suggestionsBox.classList.add("show");

    suggestionsBox.querySelectorAll(".suggestion-item").forEach(item => {
      item.addEventListener("click", () => {
        openCategoryModal(item.dataset.id);
        suggestionsBox.classList.remove("show");
        closeMobileSearch();
      });
    });

    const viewAllBtn = document.getElementById("suggestion-view-all");
    if (viewAllBtn) {
      viewAllBtn.addEventListener("click", () => {
        const base = window.location.pathname.includes("/categories/") ? "../pages/" : "pages/";
        window.location.href = `${base}search.html?q=${encodeURIComponent(q)}`;
      });
    }
  });

  searchInput.addEventListener("focus", () => {
    if (searchInput.value.trim().length > 0) searchInput.dispatchEvent(new Event("input"));
  });

  document.addEventListener("click", e => {
    if (!searchWrap?.contains(e.target) && !searchToggle?.contains(e.target)) {
      suggestionsBox.classList.remove("show");
    }
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") { suggestionsBox.classList.remove("show"); closeMobileSearch(); }
  });

  function performCategorySearch() {
    const q = searchInput.value.trim();
    if (q) {
      const base = window.location.pathname.includes("/categories/") ? "../pages/" : "pages/";
      window.location.href = `${base}search.html?q=${encodeURIComponent(q)}`;
    }
  }

  searchInput.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.keyCode === 13) {
      e.preventDefault();
      performCategorySearch();
    }
  });

  searchInput.addEventListener("keyup", e => {
    if (e.key === "Enter" || e.keyCode === 13) {
      e.preventDefault();
      performCategorySearch();
    }
  });

  searchInput.addEventListener("search", () => {
    performCategorySearch();
  });
}

/* ── INITIALIZATION ────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  const products = getPageProducts();

  renderCategoryGrid();
  buildSidebar(products);
  initToolbar();
  initCategorySearch();
  initFloatingWhatsApp();

  // ── Scroll active category tab into view on mobile ──
  // Uses inline:'nearest' so it only scrolls the minimum needed to reveal
  // the tab — never forces centering if it's already visible.
  const activeTab = document.querySelector(".cat-tab.active");
  if (activeTab) {
    requestAnimationFrame(() => {
      activeTab.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
    });
  }


  const modalClose = document.getElementById("modal-close");
  modalClose?.addEventListener("click", closeCategoryModal);

  const modalOverlay = document.getElementById("modal-overlay");
  modalOverlay?.addEventListener("click", e => {
    if (e.target === modalOverlay) closeCategoryModal();
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeCategoryModal();
  });

  // Re-render when live Google Sheets products are fetched / updated
  window.addEventListener("melojey:products-updated", () => {
    const updatedProducts = getPageProducts();
    renderCategoryGrid();
    buildSidebar(updatedProducts);
  });
});

/* Expose for search page */
window.MELOJEY_ALL_PRODUCTS = ALL_CAT_PRODUCTS;
