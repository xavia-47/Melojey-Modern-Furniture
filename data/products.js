/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * MELOJEY MODERN FURNITURE — CENTRAL DATA REPOSITORY (data/products.js)
 * ─────────────────────────────────────────────────────────────────────────────
 * Central data architecture providing structured models for:
 * 1. Showroom contact lines & locations
 * 2. Product categories metadata & routes
 * 3. Master product catalog with verified pricing & discount integrity
 * 4. Safe formatting & price calculation utilities
 * ═══════════════════════════════════════════════════════════════════════════════
 */

(function(window) {
  'use strict';

  // 1. Showroom Information
  const SHOWROOMS = {
    LINE_1: {
      id: 'line-1',
      name: 'Factory Road Showroom',
      phone: '0803 321 8845',
      whatsapp: '2348033218845',
      location: 'Plot 1 Factory Road (beside UBA, near Railway Road)'
    },
    LINE_2: {
      id: 'line-2',
      name: 'St Michael\'s Road Showroom',
      phone: '0803 776 8889',
      whatsapp: '2348037768889',
      location: '48 St Michael\'s Road'
    },
    SUPPORT: {
      phone: '0815 062 2838',
      email: 'melojey@yahoo.com'
    }
  };

  // 2. Product Categories Definition
  const CATEGORIES = [
    { key: 'HOME', label: 'HOME', slug: 'index.html', path: 'index.html' },
    { key: 'SOFAS', label: 'SOFAS', slug: 'sofas.html', path: 'categories/sofas.html', title: 'Sofas & Living Room' },
    { key: 'BEDS', label: 'BEDS', slug: 'beds.html', path: 'categories/beds.html', title: 'Beds & Bedroom Suites' },
    { key: 'DINING', label: 'DINING', slug: 'dining.html', path: 'categories/dining.html', title: 'Dining Sets & Marble Tables' },
    { key: 'OFFICE', label: 'OFFICE', slug: 'office.html', path: 'categories/office.html', title: 'Executive Office Chairs & Desks' },
    { key: 'WARDROBES', label: 'WARDROBES', slug: 'wardrobes.html', path: 'categories/wardrobes.html', title: 'Wardrobes & Storage Systems' },
    { key: 'BAR', label: 'BAR', slug: 'bar.html', path: 'categories/bar.html', title: 'Bar Stools & Wine Consoles' },
    { key: 'TABLES', label: 'TABLES', slug: 'tables.html', path: 'categories/tables.html', title: 'Coffee & Accent Tables' },
    { key: 'RUGS', label: 'RUGS', slug: 'rugs.html', path: 'categories/rugs.html', title: 'Turkish Rugs & Textiles' },
    { key: 'DECOR', label: 'DECOR', slug: 'decor.html', path: 'categories/decor.html', title: 'Chandeliers, Vases & Luxury Lighting' },
    { key: 'OTHERS', label: 'OTHERS', slug: 'others.html', path: 'categories/others.html', title: 'Fine Art, Sculptures & Accessories' }
  ];

  // 3. Master Product Catalog (Grouped by Category)
  const PRODUCTS = {
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
        description: "Modern cantilevered floating illusion bed frame with soft underbed ambient lighting and built-in nightstand surfaces.",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&h=450&fit=crop"
      },
      {
        id: "BD03",
        name: "Luxury Canopy Poster Bed",
        category: "Beds",
        price: 310000,
        originalPrice: 360000,
        discountPct: 14,
        description: "Dramatic four-poster architectural frame crafted from matte black powder-coated steel and warm walnut accents.",
        image: "https://images.unsplash.com/photo-1540518614846-7ede433c4550?w=600&h=450&fit=crop"
      },
      {
        id: "BD04",
        name: "Storage Platform Bed with Hydraulic Lift",
        category: "Beds",
        price: 275000,
        originalPrice: 320000,
        discountPct: 14,
        description: "Heavy-duty gas-lift hydraulic mechanism lifts the mattress smoothly to reveal cavernous dust-free underbed storage.",
        image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&h=450&fit=crop"
      },
      {
        id: "BD05",
        name: "Mid-Century Solid Teak Bed",
        category: "Beds",
        price: 240000,
        originalPrice: 280000,
        discountPct: 14,
        description: "Kiln-dried seasoned hardwood, rich natural stain, and robust joinery guaranteed for generations.",
        image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&h=450&fit=crop"
      }
    ],

    DINING: [
      {
        id: "DN01",
        name: "Carrara Marble Dining Set (6 Seater)",
        category: "Dining",
        price: 420000,
        originalPrice: 490000,
        discountPct: 14,
        description: "Natural polished white Carrara marble top with gold electroplated stainless-steel pedestal and 6 velvet chairs.",
        image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&h=450&fit=crop"
      },
      {
        id: "DN02",
        name: "Solid Oak 8-Seater Dining Suite",
        category: "Dining",
        price: 520000,
        originalPrice: 610000,
        discountPct: 15,
        description: "Expansive live-edge solid oak dining table paired with 8 high-back upholstered ergonomically contoured dining chairs.",
        image: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=600&h=450&fit=crop"
      },
      {
        id: "DN03",
        name: "Round Glass 4-Seater Breakfast Set",
        category: "Dining",
        price: 185000,
        originalPrice: 220000,
        discountPct: 16,
        description: "12mm tempered bevelled glass top with sculptural intertwined gold base. Ideal for compact dining corners.",
        image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=600&h=450&fit=crop"
      }
    ],

    OFFICE: [
      {
        id: "OF01",
        name: "Executive Leather Swivel Chair",
        category: "Office",
        price: 95000,
        originalPrice: 115000,
        discountPct: 17,
        description: "Full top-grain bonded leather, synchronized tilting mechanism, heavy-duty chrome base, and 360-degree silent castors.",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=450&fit=crop"
      },
      {
        id: "OF02",
        name: "L-Shaped Executive Managing Director Desk",
        category: "Office",
        price: 290000,
        originalPrice: 345000,
        discountPct: 16,
        description: "2.0-meter executive managerial desk with integrated locking drawers, cable organizer management grommets, and credenza.",
        image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&h=450&fit=crop"
      },
      {
        id: "OF03",
        name: "Ergonomic High-Back Breathable Mesh Chair",
        category: "Office",
        price: 78000,
        originalPrice: 92000,
        discountPct: 15,
        description: "Breathable Korean mesh backrest, 3D adjustable armrests, dynamic lumbar support pad, and certified Class-4 gas cylinder.",
        image: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=600&h=450&fit=crop"
      }
    ],

    WARDROBES: [
      {
        id: "WD01",
        name: "4-Door Mirrored Master Wardrobe",
        category: "Wardrobes",
        price: 340000,
        originalPrice: 395000,
        discountPct: 14,
        description: "Floor-to-ceiling mirrored wardrobe with silent sliding tracks, dual hanging rails, interior drawers, and tie-racks.",
        image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&h=450&fit=crop"
      },
      {
        id: "WD02",
        name: "Walk-In Open Modular Closet System",
        category: "Wardrobes",
        price: 460000,
        originalPrice: 540000,
        discountPct: 15,
        description: "Customizable luxury open wardrobe system with warm integrated LED strip lighting, jewellery drawer displays, and shoe shelving.",
        image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=600&h=450&fit=crop"
      }
    ],

    BAR: [
      {
        id: "BR01",
        name: "Adjustable Velvet Bar Stools (Pair)",
        category: "Bar",
        price: 85000,
        originalPrice: 100000,
        discountPct: 15,
        description: "Set of 2 swivel bar stools in royal velvet upholstery with pneumatic height-adjustment lever and brushed gold circular footrest.",
        image: "https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=600&h=450&fit=crop"
      },
      {
        id: "BR02",
        name: "Home Bar Wine & Glassware Cabinet",
        category: "Bar",
        price: 210000,
        originalPrice: 245000,
        discountPct: 14,
        description: "Solid wood wine console with 18-bottle horizontal lattice storage, stemmed glassware hanging rack, and cocktail preparation top.",
        image: "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=600&h=450&fit=crop"
      }
    ],

    TABLES: [
      {
        id: "TB01",
        name: "Dual Nesting Carrara Marble Coffee Tables",
        category: "Tables",
        price: 135000,
        originalPrice: 160000,
        discountPct: 16,
        description: "Set of two circular nesting tables featuring genuine polished marble tops and interlocking brushed champagne gold frames.",
        image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600&h=450&fit=crop"
      },
      {
        id: "TB02",
        name: "Sculptural Tempered Glass Coffee Table",
        category: "Tables",
        price: 115000,
        originalPrice: 135000,
        discountPct: 15,
        description: "12mm thick bevelled tempered glass top perched atop interlocking organic curved solid ash wood bases.",
        image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=600&h=450&fit=crop"
      }
    ],

    RUGS: [
      {
        id: "RG01",
        name: "Large Anatolian Vintage Pattern Rug (200x300cm)",
        category: "Rugs",
        price: 140000,
        originalPrice: 165000,
        discountPct: 15,
        description: "Premium high-density Turkish silk blend woven with distressed royal floral medallion patterns in gold, navy, and cream.",
        image: "https://images.unsplash.com/photo-1603204077779-bed963ea7d0e?w=600&h=450&fit=crop"
      },
      {
        id: "RG02",
        name: "Hand-Braided Organic Jute Area Rug",
        category: "Rugs",
        price: 75000,
        originalPrice: 88000,
        discountPct: 15,
        description: "Eco-friendly 100% natural braided jute fibers with thick artisan weave, textured warmth, and durable heavy pile.",
        image: "https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?w=600&h=450&fit=crop"
      }
    ],

    DECOR: [
      {
        id: "DC01",
        name: "K9 Crystal Waterfall Chandelier",
        category: "Decor",
        price: 230000,
        originalPrice: 270000,
        discountPct: 15,
        description: "Spectacular multi-tier hanging pendant light fixture adorned with precision-cut K9 crystal prisms reflecting warm golden light.",
        image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&h=450&fit=crop"
      },
      {
        id: "DC02",
        name: "Brushed Champagne Gold Ceramic Urn Vase",
        category: "Decor",
        price: 45000,
        originalPrice: 53000,
        discountPct: 15,
        description: "Sculptural metallic textured centerpiece vase designed for long-stem pampas grass, fresh floral displays, or mantelpiece decor.",
        image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=600&h=450&fit=crop"
      }
    ],

    OTHERS: [
      {
        id: "OT01",
        name: "Abstract Textured Gold Leaf Canvas Art",
        category: "Others",
        price: 95000,
        originalPrice: 112000,
        discountPct: 15,
        description: "Large 120x80cm hand-applied genuine gold foil textured impasto canvas in floating black aluminium shadow box frame.",
        image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&h=450&fit=crop"
      },
      {
        id: "OT02",
        name: "Weatherproof Outdoor Patio Wicker Lounge Set",
        category: "Others",
        price: 380000,
        originalPrice: 445000,
        discountPct: 15,
        description: "4-piece UV-resistant synthetic all-weather wicker conversation set with waterproof olefin cushions and tempered glass tea table.",
        image: "https://images.unsplash.com/photo-1519643381401-22c77e60520e?w=600&h=450&fit=crop"
      }
    ]
  };

  // 4. Utility Functions
  function formatCurrency(num) {
    return '₦' + Number(num).toLocaleString('en-NG');
  }

  function calculateOriginalPrice(sellingPrice, discountPct = 15) {
    // Strictly maintains 1% to 20% higher than selling price
    const pct = Math.min(20, Math.max(1, Number(discountPct) || 15));
    return Math.round(Number(sellingPrice) * (1 + pct / 100));
  }

  // Preserve initial defaults as fallback
  const DEFAULT_PRODUCTS = JSON.parse(JSON.stringify(PRODUCTS));

  // 5. Live Google Sheets Data Synchronizer
  const SHEET_URL = "https://docs.google.com/spreadsheets/d/1nto5s696VQBhEGbhDGLYqx_hSI-lBI9Lm18JXSOnUqo/edit?usp=sharing";
  const CACHE_KEY = "melojey_live_sheet_cache_v3";

  function getCsvUrl(url) {
    if (!url) return "";
    const idMatch = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
    if (idMatch) {
      return `https://docs.google.com/spreadsheets/d/${idMatch[1]}/export?format=csv`;
    }
    return url;
  }

  function formatImageUrl(url) {
    if (!url) return "";
    const driveMatch = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([a-zA-Z0-9_-]+)/);
    if (driveMatch) {
      return `https://lh3.googleusercontent.com/d/${driveMatch[1]}`;
    }
    return url.trim();
  }

  function splitCSVRow(row) {
    const cells = [];
    let cur = "";
    let inQuotes = false;
    for (let i = 0; i < row.length; i++) {
      const c = row[i];
      if (c === '"') {
        if (inQuotes && row[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (c === ',' && !inQuotes) {
        cells.push(cur.trim());
        cur = "";
      } else {
        cur += c;
      }
    }
    cells.push(cur.trim());
    return cells;
  }

  function mapCategory(rawCat) {
    if (!rawCat) return { key: "OTHERS", label: "Others" };
    const str = rawCat.toLowerCase().trim();
    if (str.includes("sofa") || str.includes("couch") || str.includes("living")) return { key: "SOFAS", label: "Sofas" };
    if (str.includes("bed") || str.includes("mattress")) return { key: "BEDS", label: "Beds" };
    if (str.includes("din")) return { key: "DINING", label: "Dining" };
    if (str.includes("office") || str.includes("desk")) return { key: "OFFICE", label: "Office" };
    if (str.includes("wardrobe") || str.includes("closet")) return { key: "WARDROBES", label: "Wardrobes" };
    if (str.includes("bar")) return { key: "BAR", label: "Bar" };
    if (str.includes("table")) return { key: "TABLES", label: "Tables" };
    if (str.includes("rug") || str.includes("carpet") || str.includes("textile")) return { key: "RUGS", label: "Rugs" };
    if (str.includes("decor") || str.includes("vase") || str.includes("chandelier") || str.includes("light")) return { key: "DECOR", label: "Decor" };
    return { key: "OTHERS", label: rawCat.trim() || "Others" };
  }

  function parseCSV(csv) {
    const rawLines = csv.trim().split(/\r?\n/).filter(l => l.trim().length > 0);
    if (rawLines.length === 0) return [];

    let headerIdx = rawLines.findIndex(l => /name/i.test(l) && (/price/i.test(l) || /category/i.test(l)));
    if (headerIdx === -1) headerIdx = 0;

    const headers = splitCSVRow(rawLines[headerIdx]).map(h => h.replace(/^"|"$/g, "").trim().toLowerCase());

    const items = [];
    let autoIndex = 1;

    for (let i = headerIdx + 1; i < rawLines.length; i++) {
      const vals = splitCSVRow(rawLines[i]);
      const obj = {};
      headers.forEach((h, idx) => {
        const val = (vals[idx] || "").replace(/^"|"$/g, "").trim();
        if (obj[h] === undefined || (obj[h] === "" && val !== "")) {
          obj[h] = val;
        }
      });

      const name = obj.name || obj["product name"] || "";
      if (!name || name.toLowerCase().includes("product name shown") || name.startsWith("✏️")) {
        continue;
      }

      const priceNum = Number((obj.price || "0").replace(/[^0-9.]/g, "")) || 0;
      const catInfo = mapCategory(obj.category);
      const id = obj.id || `P${String(autoIndex).padStart(3, "0")}`;
      autoIndex++;

      const discountPct = 15;
      const origPrice = calculateOriginalPrice(priceNum, discountPct);

      const rawStock = obj.quantity || obj.qty || obj.stock || obj["quantity available"] || obj["qty available"] || obj.available || obj["available stock"];
      let stock = null;
      if (rawStock !== undefined && rawStock !== null) {
        const clean = String(rawStock).trim();
        if (clean !== "") {
          if (/^(out of stock|sold out|none|unavailable|0)$/i.test(clean)) {
            stock = 0;
          } else {
            const parsed = parseInt(clean.replace(/[^0-9]/g, ""), 10);
            if (!isNaN(parsed)) {
              stock = Math.max(0, parsed);
            }
          }
        }
      }

      items.push({
        id: id,
        name: name,
        category: catInfo.label,
        categoryKey: catInfo.key,
        price: priceNum,
        originalPrice: origPrice,
        discountPct: discountPct,
        description: obj.description || "",
        image: formatImageUrl(obj.image_url || obj.image || "") || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=450&fit=crop",
        stock: stock
      });
    }
    return items;
  }

  function buildCatalogFromSheet(sheetItems) {
    const grouped = {
      SOFAS: [],
      BEDS: [],
      DINING: [],
      OFFICE: [],
      WARDROBES: [],
      BAR: [],
      TABLES: [],
      RUGS: [],
      DECOR: [],
      OTHERS: []
    };

    sheetItems.forEach(item => {
      const key = item.categoryKey || "OTHERS";
      if (grouped[key]) {
        grouped[key].push(item);
      } else {
        grouped.OTHERS.push(item);
      }
    });

    // For any category without items in the sheet yet, backfill with default products so the page isn't empty
    Object.keys(grouped).forEach(k => {
      if (grouped[k].length === 0 && DEFAULT_PRODUCTS[k]) {
        grouped[k] = DEFAULT_PRODUCTS[k];
      }
    });

    const flat = Object.values(grouped).flat();
    return { grouped, flat };
  }

  // Load from local storage cache if available for instantaneous first paint
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsedCache = JSON.parse(cached);
      if (parsedCache && parsedCache.grouped && parsedCache.flat && parsedCache.flat.length > 0) {
        Object.assign(PRODUCTS, parsedCache.grouped);
      }
    }
  } catch (e) {}

  const ALL_PRODUCTS_LIST = Object.values(PRODUCTS).flat();

  // Export to Global Object
  window.MELOJEY_DATA = {
    SHOWROOMS: SHOWROOMS,
    CATEGORIES: CATEGORIES,
    PRODUCTS: PRODUCTS,
    ALL_PRODUCTS: ALL_PRODUCTS_LIST,
    formatCurrency: formatCurrency,
    calculateOriginalPrice: calculateOriginalPrice,
    isLive: false,
    fetchLiveProducts: fetchLiveProducts
  };

  async function fetchLiveProducts() {
    const csvUrl = getCsvUrl(SHEET_URL);
    if (!csvUrl) return ALL_PRODUCTS_LIST;

    try {
      // Use no-cache query to guarantee fresh spreadsheet edits
      const cacheBusted = csvUrl + (csvUrl.includes("?") ? "&" : "?") + "_t=" + Date.now();
      const res = await fetch(cacheBusted, { cache: "no-store" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const csvText = await res.text();
      const sheetItems = parseCSV(csvText);

      if (sheetItems.length > 0) {
        const { grouped, flat } = buildCatalogFromSheet(sheetItems);
        window.MELOJEY_DATA.PRODUCTS = grouped;
        window.MELOJEY_DATA.ALL_PRODUCTS = flat;
        window.MELOJEY_DATA.isLive = true;

        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ grouped, flat, timestamp: Date.now() }));
        } catch (e) {}

        // Broadcast to all active page controllers
        window.dispatchEvent(new CustomEvent("melojey:products-updated", {
          detail: { products: flat, grouped: grouped, isLive: true }
        }));

        return flat;
      }
    } catch (err) {
      console.warn("Could not load live Google Sheet data, using backup catalogue:", err.message);
    }
    return ALL_PRODUCTS_LIST;
  }

  // Automatically start background fetch on load
  window.MELOJEY_DATA.readyPromise = fetchLiveProducts();

})(window);
