/**
 * Celiol Dispenser - Product Catalogue Logic
 * Faceted filter, live search, Preline tabbed spec drawer, datasheet modal, RFQ modal.
 * Fully styled with Preline UI Design System.
 */

let allProducts = [];
let currentFilter = {
  search: '',
  series: [],
  sortBy: 'featured'
};

document.addEventListener('DOMContentLoaded', function () {
  if (!window.CeliolData) return;
  allProducts = window.CeliolData.getProducts();

  const params = new URLSearchParams(window.location.search);
  const modelParam = params.get('model');
  const seriesParam = params.get('series');

  if (modelParam) {
    currentFilter.search = modelParam;
    const searchInput = document.getElementById('catalogSearch');
    if (searchInput) searchInput.value = modelParam;
  }
  if (seriesParam) {
    currentFilter.series.push(seriesParam);
    const cb = document.querySelector(`input[name="filterSeries"][value="${seriesParam}"]`);
    if (cb) cb.checked = true;
  }

  setupEventListeners();
  applyFiltersAndRender();

  if (modelParam) {
    const target = allProducts.find(p => p.modelCode.toLowerCase() === modelParam.toLowerCase());
    if (target) {
      setTimeout(() => openProductDetail(target.id), 300);
    }
  }

  if (window.initPrelineIcons) window.initPrelineIcons();
  if (window.HSStaticMethods) window.HSStaticMethods.autoInit();
});

function setupEventListeners() {
  const searchInput = document.getElementById('catalogSearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentFilter.search = e.target.value.trim().toLowerCase();
      applyFiltersAndRender();
    });
  }

  const setupCheckboxGroup = (name, targetArray) => {
    document.querySelectorAll(`input[name="${name}"]`).forEach(cb => {
      cb.addEventListener('change', () => {
        targetArray.length = 0;
        document.querySelectorAll(`input[name="${name}"]:checked`).forEach(c => {
          targetArray.push(c.value);
        });
        updateSeriesPillStyles();
        applyFiltersAndRender();
      });
    });
  };

  setupCheckboxGroup('filterSeries', currentFilter.series);

  const sortSelect = document.getElementById('catalogSort');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentFilter.sortBy = e.target.value;
      applyFiltersAndRender();
    });
  }

  const resetBtn = document.getElementById('resetFiltersBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      document.querySelectorAll('input[type="checkbox"]').forEach(c => c.checked = false);
      if (searchInput) searchInput.value = '';
      currentFilter.search = '';
      currentFilter.series = [];
      updateSeriesPillStyles();
      applyFiltersAndRender();
    });
  }

  // Backdrop click listeners for modals
  const prodModal = document.getElementById('productDetailModal');
  if (prodModal) {
    prodModal.addEventListener('click', (e) => {
      if (e.target === prodModal) closeProductDetail();
    });
  }

  const rfqModal = document.getElementById('catalogRfqModal');
  if (rfqModal) {
    rfqModal.addEventListener('click', (e) => {
      if (e.target === rfqModal) closeCatalogRfqModal();
    });
  }

  // Escape key closes open modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProductDetail();
      closeCatalogRfqModal();
    }
  });
}

function setSeriesPillFilter(seriesValue) {
  const cbDeluxe = document.querySelector('input[name="filterSeries"][value="Deluxe"]');
  const cbUltimate = document.querySelector('input[name="filterSeries"][value="Ultimate"]');

  if (seriesValue === 'all') {
    currentFilter.series = [];
    if (cbDeluxe) cbDeluxe.checked = false;
    if (cbUltimate) cbUltimate.checked = false;
  } else if (seriesValue === 'Deluxe') {
    currentFilter.series = ['Deluxe'];
    if (cbDeluxe) cbDeluxe.checked = true;
    if (cbUltimate) cbUltimate.checked = false;
  } else if (seriesValue === 'Ultimate') {
    currentFilter.series = ['Ultimate'];
    if (cbDeluxe) cbDeluxe.checked = false;
    if (cbUltimate) cbUltimate.checked = true;
  }

  updateSeriesPillStyles();
  applyFiltersAndRender();
}
window.setSeriesPillFilter = setSeriesPillFilter;

function updateSeriesPillStyles() {
  const pills = document.querySelectorAll('.series-pill');
  const isDeluxe = currentFilter.series.length === 1 && currentFilter.series[0] === 'Deluxe';
  const isUltimate = currentFilter.series.length === 1 && currentFilter.series[0] === 'Ultimate';
  const isAll = currentFilter.series.length === 0 || currentFilter.series.length > 1;

  pills.forEach(pill => {
    const val = pill.getAttribute('data-series-pill');
    let isActive = false;
    if (val === 'all' && isAll) isActive = true;
    if (val === 'Deluxe' && isDeluxe) isActive = true;
    if (val === 'Ultimate' && isUltimate) isActive = true;

    if (isActive) {
      pill.className = 'series-pill active py-2 px-3.5 rounded-xl text-xs font-bold transition-all shrink-0 bg-brand-600 text-white shadow-sm font-heading whitespace-nowrap';
    } else {
      pill.className = 'series-pill py-2 px-3.5 rounded-xl text-xs font-medium transition-all shrink-0 bg-white border border-gray-200 text-gray-700 hover:border-brand-600 hover:text-brand-600 font-heading whitespace-nowrap';
    }
  });
}

function applyFiltersAndRender() {
  let filtered = allProducts.filter(p => p.status === 'active');

  if (currentFilter.search) {
    const q = currentFilter.search.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.modelCode.toLowerCase().includes(q) ||
      (p.series && p.series.toLowerCase().includes(q)) ||
      (p.spouts && p.spouts.toLowerCase().includes(q)) ||
      (p.bodyMaterial && p.bodyMaterial.toLowerCase().includes(q)) ||
      (p.idealFor && p.idealFor.toLowerCase().includes(q)) ||
      (p.keyFeatures && p.keyFeatures.some(f => f.toLowerCase().includes(q)))
    );
  }

  // Filter Seri Produk
  if (currentFilter.series.length > 0) {
    filtered = filtered.filter(p => 
      currentFilter.series.some(s => 
        (p.series && p.series.toLowerCase().includes(s.toLowerCase())) || 
        p.name.toLowerCase().includes(s.toLowerCase()) ||
        p.modelCode.toLowerCase().includes(s.toLowerCase())
      )
    );
  }

  // Pengurutan (Sorting)
  if (currentFilter.sortBy === 'capacity-high') {
    filtered.sort((a, b) => (b.coolingCapacityLph || 0) - (a.coolingCapacityLph || 0));
  } else if (currentFilter.sortBy === 'price-asc') {
    filtered.sort((a, b) => (a.purchasePrice || 0) - (b.purchasePrice || 0));
  } else if (currentFilter.sortBy === 'price-desc') {
    filtered.sort((a, b) => (b.purchasePrice || 0) - (a.purchasePrice || 0));
  } else if (currentFilter.sortBy === 'name-asc') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
  }

  // Update Active Filter Badge
  const badgeEl = document.getElementById('activeFilterBadge');
  if (badgeEl) {
    if (currentFilter.series.length > 0 || currentFilter.search.length > 0) {
      badgeEl.classList.remove('hidden');
    } else {
      badgeEl.classList.add('hidden');
    }
  }

  updateSeriesPillStyles();
  renderProductGrid(filtered);
}

function renderProductGrid(products) {
  const container = document.getElementById('catalogProductsGrid');
  if (!container) return;

  if (products.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 sm:py-16 text-center bg-white rounded-2xl border border-dashed border-gray-300 p-6 sm:p-8">
        <div class="w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
          <i data-lucide="package-search" class="w-7 h-7 sm:w-8 sm:h-8"></i>
        </div>
        <h4 class="text-base font-bold text-gray-800 mb-1 font-heading">Tidak ada dispenser yang sesuai kriteria</h4>
        <p class="text-xs text-gray-500 max-w-sm mx-auto mb-4">Coba sesuaikan kata kunci pencarian atau bersihkan filter spesifikasi.</p>
        <button onclick="document.getElementById('resetFiltersBtn').click()" class="py-2.5 px-4 inline-flex items-center text-xs font-semibold rounded-xl bg-brand-600 text-white hover:bg-brand-700 font-heading">
          Reset Semua Filter
        </button>
      </div>
    `;
    if (window.initPrelineIcons) window.initPrelineIcons();
    return;
  }

  container.innerHTML = products.map(p => {
    const formattedPrice = p.purchasePrice
      ? `Rp ${Number(p.purchasePrice).toLocaleString('id-ID')}`
      : (p.priceEstimate ? p.priceEstimate.split('/')[0].replace(/^Beli:\s*/i, '').trim() : 'Hubungi Sales');

    const spoutLabel = p.spouts ? p.spouts.split('(')[0].trim() : 'Push Button';

    return `
    <div class="group flex flex-col bg-white border border-gray-200 rounded-2xl hover:border-brand-600 hover:shadow-md transition-all duration-300 overflow-hidden justify-between">
      <!-- Image area -->
      <div class="relative h-52 sm:h-60 bg-gray-50/70 p-4 sm:p-6 flex items-center justify-center overflow-hidden border-b border-gray-100">
        <img src="${p.imageCover}" alt="${p.name}" class="h-full object-contain group-hover:scale-105 transition-transform duration-500" loading="lazy">
      </div>

      <!-- Content (Tampilan Ringkas Tanpa Keterangan Berlebih) -->
      <div class="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div class="mb-1">
            <span class="text-gray-400 font-heading tracking-wider uppercase text-[11px] font-semibold">${p.modelCode}</span>
          </div>
          <h3 class="text-sm sm:text-base font-bold text-gray-900 group-hover:text-brand-600 transition-colors mb-2 font-heading leading-snug">
            ${p.name}
          </h3>

          <!-- Spek Kran & Penanda Custom Suhu -->
          <div class="flex items-center flex-wrap gap-x-2.5 gap-y-1 text-xs text-gray-600 mb-3.5">
            <span class="inline-flex items-center gap-1.5 text-gray-700 font-medium">
              <i data-lucide="droplet" class="w-3.5 h-3.5 text-brand-600 shrink-0"></i>
              ${spoutLabel}
            </span>
            <span class="text-gray-300">•</span>
            <span class="inline-flex items-center gap-1.5 text-brand-700 font-medium">
              <i data-lucide="sliders" class="w-3.5 h-3.5 text-brand-600 shrink-0"></i>
              Bisa Custom Suhu
            </span>
          </div>
        </div>

        <!-- Card Footer -->
        <div class="pt-3.5 border-t border-gray-100">
          <div class="mb-3">
            <span class="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-0.5 font-heading">Estimasi Pembelian Unit</span>
            <div class="text-base sm:text-xl font-extrabold text-gray-900 font-heading tracking-tight leading-none">${formattedPrice}</div>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <button onclick="openProductDetail('${p.id}')" class="py-2.5 px-2 sm:px-3 inline-flex items-center justify-center gap-x-1.5 text-xs font-semibold rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-brand-600 hover:border-brand-600 transition-colors font-heading">
              <i data-lucide="eye" class="w-3.5 h-3.5 shrink-0"></i>
              <span class="truncate">Spesifikasi</span>
            </button>
            <button onclick="openCatalogRfqModal('${p.modelCode}', '${p.name.replace(/'/g, "\\'")}')" class="py-2.5 px-2 sm:px-3 inline-flex items-center justify-center gap-x-1.5 text-xs font-semibold rounded-xl border border-transparent bg-brand-600 hover:bg-brand-700 text-white shadow-sm transition-colors font-heading">
              <i data-lucide="shopping-bag" class="w-3.5 h-3.5 shrink-0"></i>
              <span class="truncate">Pesan Sekarang</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  }).join('');

  if (window.initPrelineIcons) window.initPrelineIcons();
}

// 4. Modal Detail Spesifikasi Produk: 100% Table-Driven, Bebas Cards
function openProductDetail(productId) {
  const product = window.CeliolData.getProductById(productId);
  if (!product) return;

  const modalEl = document.getElementById('productDetailModal');
  const contentEl = document.getElementById('productDetailContent');
  if (!modalEl || !contentEl) return;

  // Reset scroll position to top
  const modalInner = modalEl.querySelector('div');
  if (modalInner) modalInner.scrollTop = 0;
  modalEl.scrollTop = 0;

  const formattedPrice = product.purchasePrice
    ? `Rp ${Number(product.purchasePrice).toLocaleString('id-ID')}`
    : (product.priceEstimate ? product.priceEstimate.split('/')[0].replace(/^Beli:\s*/i, '').trim() : 'Hubungi Sales');

  // Pre-generate official print datasheet for this product
  const printContainer = document.getElementById('officialPrintDatasheet');
  if (printContainer) {
    printContainer.innerHTML = generateDatasheetHtml(product);
  }

  const powerWatt = product.powerWatt || { heating: 2000, cooling: 0, total: 2000 };
  const totalWatt = powerWatt.total || (Number(powerWatt.heating || 0) + Number(powerWatt.cooling || 0));
  const powerDesc = powerWatt.cooling > 0
    ? `${totalWatt} Watt (Pemanas ${powerWatt.heating}W + Pendingin ${powerWatt.cooling}W & Sistem RO)`
    : `${totalWatt} Watt (Pemanas ${powerWatt.heating || 2000}W & Sistem RO)`;

  const hotYieldDesc = (typeof product.heatingCapacityLph === 'string') ? `${product.heatingCapacityLph} L/h` : `${product.heatingCapacityLph} L/h`;
  const coldYieldDesc = (product.coolingCapacityLph && product.coolingCapacityLph !== 0)
    ? (typeof product.coolingCapacityLph === 'string' ? `${product.coolingCapacityLph} L/h` : `${product.coolingCapacityLph} L/h`)
    : 'Disesuaikan saat opsi custom dingin diaktifkan';
  const normalYieldDesc = `${product.normalWaterYieldLph || 80} L/h`;

  contentEl.innerHTML = `
    <div id="specDrawerContent" class="space-y-5 sm:space-y-6">
      <!-- Top Overview Header: Tanpa Cards Sama Sekali -->
      <div class="flex flex-col md:flex-row gap-4 sm:gap-6 items-center md:items-start pb-5 sm:pb-6 border-b border-gray-200">
        <!-- Foto Produk (Clean Image Container Tanpa Card Border Tebal) -->
        <div class="w-full md:w-1/3 flex items-center justify-center p-2 shrink-0">
          <img src="${product.imageCover}" alt="${product.name}" class="max-h-52 sm:max-h-64 object-contain">
        </div>

        <!-- Info Produk: Dipisah Jelas Tanpa Kotak-Kotak Cards -->
        <div class="w-full md:w-2/3 flex flex-col justify-between space-y-3.5 sm:space-y-4">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="text-xs font-bold text-brand-700 uppercase tracking-wider font-heading">${product.series}</span>
              <span class="text-xs text-gray-300">•</span>
              <span class="text-xs font-semibold text-gray-500 uppercase tracking-wide font-heading">${product.modelCode}</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-1 font-heading tracking-tight leading-snug">${product.name}</h2>
            <p class="text-xs text-gray-500 leading-relaxed">${product.idealFor}</p>
          </div>

          <!-- Bagian Estimasi Beli & Maintenance (Terpisah, Tanpa Cards) -->
          <div class="pt-3 border-t border-gray-100 space-y-1">
            <span class="text-[11px] font-semibold text-gray-500 uppercase tracking-wider font-heading">Estimasi Biaya Pengadaan:</span>
            <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span class="text-xl sm:text-2xl font-extrabold text-gray-900 font-heading tracking-tight">${formattedPrice}</span>
              <span class="text-xs text-gray-400 font-normal">/ unit (Beli Resmi)</span>
            </div>
            <p class="text-xs text-gray-500 italic">
              * Biaya belum termasuk Pajak (PPN), Ongkos Kirim dan Pemasangan di luar instalasi pipa standar gedung.
            </p>
            <p class="text-xs text-gray-600 pt-0.5">
              Biaya Pemeliharaan Rutin: <strong class="text-gray-900 font-heading">Rp 500.000 / bulan / unit</strong>
              <span class="text-gray-500">(Termasuk pemeliharaan bulanan, ganti filter berkala, perbaikan jika ada kerusakan & 24/7 CS)</span>
            </p>
          </div>

          <!-- Bagian Rekomendasi Kapasitas (Terpisah, Tanpa Cards) -->
          <div class="pt-3 border-t border-gray-100 space-y-1">
            <span class="text-[11px] font-semibold text-gray-500 uppercase tracking-wider font-heading">Rekomendasi Kapasitas Layanan:</span>
            <div class="flex items-center gap-2 text-xs text-gray-800">
              <i data-lucide="users" class="w-4 h-4 text-brand-600 shrink-0"></i>
              <span class="font-bold text-gray-900 font-heading text-sm">${product.recommendedPax}</span>
              <span class="text-gray-500">(Standar kapasitas harian optimal fasilitas)</span>
            </div>
          </div>

          <!-- Action Buttons (Responsive: Full-width on mobile, auto on desktop) -->
          <div class="flex flex-col sm:flex-row flex-wrap gap-2.5 pt-1.5 no-print">
            <button onclick="openCatalogRfqModal('${product.modelCode}', '${product.name.replace(/'/g, "\\'")}')" class="w-full sm:w-auto py-2.5 px-4 inline-flex justify-center items-center gap-x-2 text-xs font-bold rounded-xl border border-transparent bg-brand-600 hover:bg-brand-700 text-white shadow-sm transition-all font-heading">
              <i data-lucide="shopping-bag" class="w-4 h-4"></i>
              Pesan Sekarang
            </button>
            <button onclick="printProductDatasheet('${product.id}')" class="w-full sm:w-auto py-2.5 px-4 inline-flex justify-center items-center gap-x-2 text-xs font-semibold rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-brand-600 hover:border-brand-600 transition-all font-heading">
              <i data-lucide="printer" class="w-4 h-4 text-gray-600"></i>
              Cetak Spesifikasi (PDF)
            </button>
          </div>
        </div>
      </div>

      <!-- Preline Segmented Navigation Tabs: 100% Berbasis Tabel, Tanpa Cards -->
      <div>
        <nav class="flex p-1 space-x-1 bg-gray-100 rounded-xl border border-gray-200 mb-4 sm:mb-5 overflow-x-auto no-scrollbar scroll-smooth" aria-label="SpecTabs" role="tablist">
          <button type="button" class="hs-tab-active:bg-white hs-tab-active:text-gray-900 hs-tab-active:shadow-sm py-2 px-3 sm:px-4 inline-flex items-center gap-x-1.5 sm:gap-x-2 bg-transparent text-xs font-semibold rounded-lg text-gray-600 hover:text-brand-600 focus:outline-none whitespace-nowrap shrink-0 font-heading active" id="spec-tab-1-btn" data-hs-tab="#spec-tab-1" aria-controls="spec-tab-1" role="tab">
            <i data-lucide="table" class="w-3.5 h-3.5 shrink-0"></i> <span>Spesifikasi Teknis Lengkap</span>
          </button>
          <button type="button" class="hs-tab-active:bg-white hs-tab-active:text-gray-900 hs-tab-active:shadow-sm py-2 px-3 sm:px-4 inline-flex items-center gap-x-1.5 sm:gap-x-2 bg-transparent text-xs font-semibold rounded-lg text-gray-600 hover:text-brand-600 focus:outline-none whitespace-nowrap shrink-0 font-heading" id="spec-tab-2-btn" data-hs-tab="#spec-tab-2" aria-controls="spec-tab-2" role="tab">
            <i data-lucide="check-circle" class="w-3.5 h-3.5 shrink-0"></i> <span>Fitur &amp; Keunggulan</span>
          </button>
          <button type="button" class="hs-tab-active:bg-white hs-tab-active:text-gray-900 hs-tab-active:shadow-sm py-2 px-3 sm:px-4 inline-flex items-center gap-x-1.5 sm:gap-x-2 bg-transparent text-xs font-semibold rounded-lg text-gray-600 hover:text-brand-600 focus:outline-none whitespace-nowrap shrink-0 font-heading" id="spec-tab-3-btn" data-hs-tab="#spec-tab-3" aria-controls="spec-tab-3" role="tab">
            <i data-lucide="shield-check" class="w-3.5 h-3.5 shrink-0"></i> <span>Paket Layanan Maintenance</span>
          </button>
        </nav>

        <!-- Tab 1: Tabel Spesifikasi Teknis -->
        <div id="spec-tab-1" role="tabpanel" aria-labelledby="spec-tab-1-btn">
          <div class="overflow-x-auto border border-gray-200 rounded-xl">
            <table class="min-w-full divide-y divide-gray-200 text-xs">
              <thead class="bg-white border-b-2 border-brand-600">
                <tr>
                  <th scope="col" class="px-3.5 sm:px-4 py-2.5 sm:py-3 text-left font-bold text-gray-700 font-heading w-2/5 sm:w-1/3">Parameter Teknis</th>
                  <th scope="col" class="px-3.5 sm:px-4 py-2.5 sm:py-3 text-left font-bold text-gray-700 font-heading w-3/5 sm:w-2/3">Spesifikasi Detail Unit Celiol</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr class="hover:bg-gray-50/50">
                  <td class="px-3.5 sm:px-4 py-2 sm:py-2.5 font-medium text-gray-600 font-heading">Model / SKU Resmi</td>
                  <td class="px-3.5 sm:px-4 py-2 sm:py-2.5 font-bold text-gray-900 font-heading">${product.modelCode}</td>
                </tr>
                <tr class="hover:bg-gray-50/50">
                  <td class="px-3.5 sm:px-4 py-2 sm:py-2.5 font-medium text-gray-600 font-heading">Seri Produk & Pilihan Warna</td>
                  <td class="px-3.5 sm:px-4 py-2 sm:py-2.5 text-gray-800">${product.series} (${product.color})</td>
                </tr>
                <tr class="hover:bg-gray-50/50">
                  <td class="px-3.5 sm:px-4 py-2 sm:py-2.5 font-medium text-gray-600 font-heading">Material Eksterior Bodi</td>
                  <td class="px-3.5 sm:px-4 py-2 sm:py-2.5 text-gray-800">${product.bodyMaterial}</td>
                </tr>
                <tr class="hover:bg-gray-50/50">
                  <td class="px-3.5 sm:px-4 py-2 sm:py-2.5 font-medium text-gray-600 font-heading">Material Tangki Internal</td>
                  <td class="px-3.5 sm:px-4 py-2 sm:py-2.5 text-gray-800">Stainless Steel SUS 304 Food Grade (Higienis & Anti-Bakteri, Bebas BPA)</td>
                </tr>
                <tr class="hover:bg-gray-50/50">
                  <td class="px-3.5 sm:px-4 py-2 sm:py-2.5 font-medium text-gray-600 font-heading">Dimensi Mesin (P x L x T)</td>
                  <td class="px-3.5 sm:px-4 py-2 sm:py-2.5 text-gray-800 font-mono">${product.dimensions}</td>
                </tr>
                <tr class="hover:bg-gray-50/50">
                  <td class="px-3.5 sm:px-4 py-2 sm:py-2.5 font-medium text-gray-600 font-heading">Konfigurasi Keran (Water Spout)</td>
                  <td class="px-3.5 sm:px-4 py-2 sm:py-2.5 text-gray-900 font-semibold">${product.spouts}</td>
                </tr>
                <tr class="hover:bg-gray-50/50">
                  <td class="px-3.5 sm:px-4 py-2 sm:py-2.5 font-medium text-gray-600 font-heading">Kustomisasi Suhu Air</td>
                  <td class="px-3.5 sm:px-4 py-2 sm:py-2.5 text-brand-700 font-semibold">Bisa Custom Suhu (Kombinasi Air Panas, Dingin, Suhu Ruang / Normal Sesuai Kebutuhan)</td>
                </tr>
                <tr class="hover:bg-gray-50/50">
                  <td class="px-3.5 sm:px-4 py-2 sm:py-2.5 font-medium text-gray-600 font-heading">Rekomendasi Kapasitas Harian</td>
                  <td class="px-3.5 sm:px-4 py-2 sm:py-2.5 text-gray-900 font-semibold">${product.recommendedPax}</td>
                </tr>
                <tr class="hover:bg-gray-50/50">
                  <td class="px-3.5 sm:px-4 py-2 sm:py-2.5 font-medium text-gray-600 font-heading">Debit Air Panas (Hot Water Yield)</td>
                  <td class="px-3.5 sm:px-4 py-2 sm:py-2.5 text-gray-800">${hotYieldDesc}</td>
                </tr>
                <tr class="hover:bg-gray-50/50">
                  <td class="px-3.5 sm:px-4 py-2 sm:py-2.5 font-medium text-gray-600 font-heading">Debit Air Dingin (Cold Water Yield)</td>
                  <td class="px-3.5 sm:px-4 py-2 sm:py-2.5 text-gray-800">${coldYieldDesc}</td>
                </tr>
                <tr class="hover:bg-gray-50/50">
                  <td class="px-3.5 sm:px-4 py-2 sm:py-2.5 font-medium text-gray-600 font-heading">Debit Air Normal (Normal Water Yield)</td>
                  <td class="px-3.5 sm:px-4 py-2 sm:py-2.5 text-gray-800">${normalYieldDesc}</td>
                </tr>
                <tr class="hover:bg-gray-50/50">
                  <td class="px-3.5 sm:px-4 py-2 sm:py-2.5 font-medium text-gray-600 font-heading">Total Daya Listrik (Power)</td>
                  <td class="px-3.5 sm:px-4 py-2 sm:py-2.5 text-gray-800">${powerDesc}</td>
                </tr>
                <tr class="hover:bg-gray-50/50">
                  <td class="px-3.5 sm:px-4 py-2 sm:py-2.5 font-medium text-gray-600 font-heading">Tegangan Operasional (Voltage)</td>
                  <td class="px-3.5 sm:px-4 py-2 sm:py-2.5 text-gray-800">${product.voltage || '220-240V ~ 50-60 Hz'}</td>
                </tr>
                <tr class="hover:bg-gray-50/50">
                  <td class="px-3.5 sm:px-4 py-2 sm:py-2.5 font-medium text-gray-600 font-heading">Teknologi Filtrasi</td>
                  <td class="px-3.5 sm:px-4 py-2 sm:py-2.5 text-gray-900 font-semibold">5-Tahap Reverse Osmosis (RO) Presisi 0.0001 Mikron</td>
                </tr>
                <tr class="hover:bg-gray-50/50">
                  <td class="px-3.5 sm:px-4 py-2 sm:py-2.5 font-medium text-gray-600 font-heading">Kemurnian & Sterilisasi</td>
                  <td class="px-3.5 sm:px-4 py-2 sm:py-2.5 text-gray-800">99.9% Kemurnian Air, Teruji Bebas Mikroplastik & Logam Berat, Sterilisasi UV-C LED</td>
                </tr>
                <tr class="hover:bg-gray-50/50">
                  <td class="px-3.5 sm:px-4 py-2 sm:py-2.5 font-medium text-gray-600 font-heading">Mekanisme Pengeluaran Air</td>
                  <td class="px-3.5 sm:px-4 py-2 sm:py-2.5 text-gray-800">Tombol Kran Presisi (Push-Button Dispense) Berdaya Tahan Komersial Tinggi</td>
                </tr>
                <tr class="hover:bg-gray-50/50">
                  <td class="px-3.5 sm:px-4 py-2 sm:py-2.5 font-medium text-gray-600 font-heading">Standar Baku Mutu Air</td>
                  <td class="px-3.5 sm:px-4 py-2 sm:py-2.5 text-gray-800">Memenuhi Standar Baku Mutu Air Minum Permenkes RI No. 2 Tahun 2023</td>
                </tr>
                <tr class="hover:bg-gray-50/50">
                  <td class="px-3.5 sm:px-4 py-2 sm:py-2.5 font-medium text-gray-600 font-heading">Skema Pengadaan Resmi</td>
                  <td class="px-3.5 sm:px-4 py-2 sm:py-2.5 text-gray-900 font-semibold">Sistem Beli Unit + Maintenance Rutin Rp 500.000 / bln</td>
                </tr>
                <tr class="hover:bg-gray-50/50">
                  <td class="px-3.5 sm:px-4 py-2 sm:py-2.5 font-medium text-gray-600 font-heading">Ketentuan Biaya Pengadaan</td>
                  <td class="px-3.5 sm:px-4 py-2 sm:py-2.5 text-gray-600 italic">Biaya belum termasuk Pajak (PPN), Ongkos Kirim dan Pemasangan di luar instalasi pipa standar gedung</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Tab 2: Tabel Fitur & Keunggulan -->
        <div id="spec-tab-2" class="hidden" role="tabpanel" aria-labelledby="spec-tab-2-btn">
          <div class="overflow-x-auto border border-gray-200 rounded-xl">
            <table class="min-w-full divide-y divide-gray-200 text-xs">
              <thead class="bg-white border-b-2 border-brand-600">
                <tr>
                  <th scope="col" class="px-2.5 sm:px-4 py-2.5 text-center font-bold text-gray-700 font-heading w-10 sm:w-12">No</th>
                  <th scope="col" class="px-3 sm:px-4 py-2.5 text-left font-bold text-gray-700 font-heading w-2/5 sm:w-1/3">Fitur Rekayasa Produk</th>
                  <th scope="col" class="px-3 sm:px-4 py-2.5 text-left font-bold text-gray-700 font-heading">Deskripsi Keunggulan Teknis &amp; Higienitas</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                ${product.keyFeatures.map((kf, idx) => {
                  const parts = kf.includes(':')
                    ? [kf.substring(0, kf.indexOf(':')).trim(), kf.substring(kf.indexOf(':') + 1).trim()]
                    : [kf, ''];
                  return `
                    <tr class="hover:bg-gray-50/50">
                      <td class="px-2.5 sm:px-4 py-2 sm:py-2.5 text-center font-bold text-brand-700 font-heading">${String(idx + 1).padStart(2, '0')}</td>
                      <td class="px-3 sm:px-4 py-2 sm:py-2.5 font-bold text-gray-900 font-heading">${parts[0]}</td>
                      <td class="px-3 sm:px-4 py-2 sm:py-2.5 text-gray-700">${parts[1] || parts[0]}</td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Tab 3: Layanan Maintenance & SLA -->
        <div id="spec-tab-3" class="hidden" role="tabpanel" aria-labelledby="spec-tab-3-btn">
          <div class="sm:hidden flex items-center gap-1.5 text-[11px] text-gray-500 mb-2 font-heading">
            <i data-lucide="move-horizontal" class="w-3.5 h-3.5 text-brand-600 shrink-0"></i>
            <span>Geser tabel ke samping untuk melihat seluruh detail kolom</span>
          </div>
          <div class="overflow-x-auto border border-gray-200 rounded-xl">
            <table class="min-w-[580px] sm:min-w-full divide-y divide-gray-200 text-xs">
              <thead class="bg-white border-b-2 border-brand-600">
                <tr>
                  <th scope="col" class="px-3 sm:px-4 py-2.5 text-left font-bold text-gray-700 font-heading w-1/4">Komponen Layanan</th>
                  <th scope="col" class="px-3 sm:px-4 py-2.5 text-left font-bold text-gray-700 font-heading w-1/5">Frekuensi Kerja</th>
                  <th scope="col" class="px-3 sm:px-4 py-2.5 text-left font-bold text-gray-700 font-heading">Cakupan Kerja &amp; Standar Higienitas (${product.modelCode})</th>
                  <th scope="col" class="px-3 sm:px-4 py-2.5 text-left font-bold text-gray-700 font-heading w-1/6">Biaya Layanan</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr class="hover:bg-gray-50/50">
                  <td class="px-3 sm:px-4 py-2.5 sm:py-3 font-semibold text-gray-900 font-heading align-top">Pemeliharaan Rutin Bulanan</td>
                  <td class="px-3 sm:px-4 py-2.5 sm:py-3 text-brand-700 font-medium align-top">Setiap Bulan (1 Bulan Sekali)</td>
                  <td class="px-3 sm:px-4 py-2.5 sm:py-3 text-gray-700 align-top">Pemeriksaan fungsi operasional unit ${product.name} (${product.modelCode}), inspeksi kelistrikan (${totalWatt}W), kalibrasi suhu kran (${product.spouts}), sanitasi tangki internal SUS 304, pembilasan (flushing) pipa internal, dan uji kualitas air TDS on-site.</td>
                  <td class="px-3 sm:px-4 py-2.5 sm:py-3 font-semibold text-gray-900 align-top">Termasuk Paket Rp ${Number(product.monthlyMaintenancePrice || 500000).toLocaleString('id-ID')}/bln</td>
                </tr>
                <tr class="hover:bg-gray-50/50">
                  <td class="px-3 sm:px-4 py-2.5 sm:py-3 font-semibold text-gray-900 font-heading align-top">Pergantian Filter Terjadwal</td>
                  <td class="px-3 sm:px-4 py-2.5 sm:py-3 text-brand-700 font-medium align-top">Bulanan &amp; Semesteran (6 Bulan Sekali)</td>
                  <td class="px-3 sm:px-4 py-2.5 sm:py-3 text-gray-700 align-top">Penggantian rutin cartridge Sedimen PP setiap bulan, serta penggantian media Granular Activated Carbon, Blok Karbon, dan Membran Reverse Osmosis (RO) 0.0001 µm resmi unit ${product.modelCode} setiap 6 bulan secara konsisten.</td>
                  <td class="px-3 sm:px-4 py-2.5 sm:py-3 font-semibold text-gray-900 align-top">Termasuk Paket Rp ${Number(product.monthlyMaintenancePrice || 500000).toLocaleString('id-ID')}/bln</td>
                </tr>
                <tr class="hover:bg-gray-50/50">
                  <td class="px-3 sm:px-4 py-2.5 sm:py-3 font-semibold text-gray-900 font-heading align-top">Perbaikan Jika Ada Kerusakan</td>
                  <td class="px-3 sm:px-4 py-2.5 sm:py-3 text-brand-700 font-medium align-top">Sesuai Kebutuhan (Kapan Pun Diperlukan)</td>
                  <td class="px-3 sm:px-4 py-2.5 sm:py-3 text-gray-700 align-top">Garansi perbaikan darurat respons cepat teknisi dan penggantian suku cadang orisinal Celiol ${product.series} tanpa biaya tambahan jika terjadi kendala teknis atau aus komponen pada unit ${product.modelCode}.</td>
                  <td class="px-3 sm:px-4 py-2.5 sm:py-3 font-semibold text-gray-900 align-top">Termasuk Paket Rp ${Number(product.monthlyMaintenancePrice || 500000).toLocaleString('id-ID')}/bln</td>
                </tr>
                <tr class="hover:bg-gray-50/50">
                  <td class="px-3 sm:px-4 py-2.5 sm:py-3 font-semibold text-gray-900 font-heading align-top">24/7 Layanan Pelanggan Teknis</td>
                  <td class="px-3 sm:px-4 py-2.5 sm:py-3 text-brand-700 font-medium align-top">24 Jam / 7 Hari (Respons Cepat)</td>
                  <td class="px-3 sm:px-4 py-2.5 sm:py-3 text-gray-700 align-top">Dukungan hotline prioritas tim teknis PT Noto Water Envirotech via WhatsApp dan surel resmi sales@noto.asia guna memastikan kelancaran operasional pasokan air minum fasilitas kantor.</td>
                  <td class="px-3 sm:px-4 py-2.5 sm:py-3 font-semibold text-gray-900 align-top">Termasuk Paket Rp ${Number(product.monthlyMaintenancePrice || 500000).toLocaleString('id-ID')}/bln</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;

  modalEl.classList.remove('hidden');
  if (window.initPrelineIcons) window.initPrelineIcons();
  if (window.HSStaticMethods) window.HSStaticMethods.autoInit();
}

// 4.1 Generator Dokumen Lembar Spesifikasi Teknis Resmi (A4 Format - Standar Tipografi SOP: Inter, Plus Jakarta Sans, JetBrains Mono)
function generateDatasheetHtml(product) {
  const formattedPrice = product.purchasePrice
    ? `Rp ${Number(product.purchasePrice).toLocaleString('id-ID')}`
    : (product.priceEstimate ? product.priceEstimate.split('/')[0].replace(/^Beli:\s*/i, '').trim() : 'Hubungi Sales');

  const formattedMaintenancePrice = product.monthlyMaintenancePrice
    ? `Rp ${Number(product.monthlyMaintenancePrice).toLocaleString('id-ID')}`
    : 'Rp 500.000';

  const printDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const powerWatt = product.powerWatt || { heating: 2000, cooling: 0, total: 2000 };
  const totalWatt = powerWatt.total || (Number(powerWatt.heating || 0) + Number(powerWatt.cooling || 0));
  const powerDescId = (powerWatt.cooling > 0)
    ? `Pemanas ${powerWatt.heating}W + Pendingin ${powerWatt.cooling}W & Sistem Pompa RO`
    : `Pemanas ${powerWatt.heating || 2000}W & Sistem Pompa RO`;

  const hotYieldDesc = (typeof product.heatingCapacityLph === 'string') ? `${product.heatingCapacityLph} L/jam` : `${product.heatingCapacityLph || '20 - 30'} L/jam`;
  const coldYieldDesc = (product.coolingCapacityLph && product.coolingCapacityLph !== 0)
    ? (typeof product.coolingCapacityLph === 'string' ? `${product.coolingCapacityLph} L/jam` : `${product.coolingCapacityLph} L/jam`)
    : 'Disesuaikan saat opsi kustom dingin diaktifkan';
  const normalYieldDesc = `${product.normalWaterYieldLph || 80} L/jam`;

  const cleanRecommendedPax = (product.recommendedPax || '30 - 50 Orang / hari')
    .replace(/\s*\(Optimal hingga 80 orang\)/gi, '')
    .trim();

  // Olah Fitur dan Keunggulan Produk untuk Tabel 2
  const keyFeaturesList = (product.keyFeatures && product.keyFeatures.length > 0)
    ? product.keyFeatures
    : [];

  const featuresRowsHtml = keyFeaturesList.map((kf, idx) => {
    let title = `Fitur ${idx + 1}`;
    let desc = kf;
    if (kf.includes(':')) {
      const parts = kf.split(':');
      title = parts[0].trim();
      desc = parts.slice(1).join(':').trim();
    }
    const no = String(idx + 1).padStart(2, '0');
    return `
      <tr style="background: #ffffff;">
        <td style="text-align: center; font-family: 'JetBrains Mono', monospace; font-weight: 700; color: #1e293b; background: #ffffff; padding: 2.8px 6px;">${no}</td>
        <td style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; color: #1e293b; background: #ffffff; padding: 2.8px 6px;">${title}</td>
        <td style="color: #334155; background: #ffffff; padding: 2.8px 6px;">${desc}</td>
      </tr>
    `;
  }).join('');

  return `
    <div style="font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #ffffff; color: #1e293b; line-height: 1.45;">
      
      <!-- ========================================================= -->
      <!-- HALAMAN 1: LEMBAR SPESIFIKASI TEKNIS & KATALOG PRODUK     -->
      <!-- STANDAR SOP: INTER (BODY), PLUS JAKARTA SANS (HEADING),  -->
      <!-- JETBRAINS MONO (KODE/ANGKA TEKNIS), WARNA HITAM & ABU     -->
      <!-- ========================================================= -->
      <div class="poster-page print-avoid-break" style="min-height: 272mm; display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 0; background: #ffffff;">
        <div>
          <!-- Garis Aksen Atas Minimalis -->
          <div style="height: 2.5px; background: #1e293b; width: 100%;"></div>

          <!-- Header Dokumen: Logo CELIOL & Identitas Resmi PT Noto Water Envirotech -->
          <div style="padding: 10px 0 8px 0; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: flex-start; background: #ffffff;">
            <div>
              <div style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 20pt; font-weight: 900; letter-spacing: -0.03em; color: #1e293b; line-height: 1;">CELIOL</div>
              <div style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 7pt; font-weight: 700; color: #475569; letter-spacing: 0.06em; text-transform: uppercase; margin-top: 3px;">
                Commercial Water Dispenser <span style="color: #cbd5e1; font-weight: normal;">|</span> <span style="font-family: 'Inter', sans-serif; color: #64748b; font-style: italic; font-weight: normal; text-transform: none;">Energi Sepanjang Hari, Bekerja Lebih Produktif.</span>
              </div>
            </div>
            <div style="text-align: right; font-size: 7.5pt; line-height: 1.35; color: #64748b; font-family: 'Inter', sans-serif;">
              <div style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 8.5pt; color: #1e293b; text-transform: uppercase;">PT NOTO WATER ENVIROTECH</div>
              <div>Jl. H. R. Rasuna Said Kav. 1, Jakarta Selatan 12980</div>
              <div>Surel: <strong style="color: #1e293b;">sales@noto.asia</strong> &bull; Situs: <strong style="color: #1e293b;">noto.asia</strong> &bull; WA: <strong style="color: #1e293b;">+62 821-2098-8201</strong></div>
            </div>
          </div>

          <!-- Judul Dokumen (Lugas Sesuai Revisi: LEMBAR SPESIFIKASI TEKNIS) -->
          <div style="padding: 10px 0 9px 0; border-bottom: 1px solid #e2e8f0; background: #ffffff;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12pt; font-weight: 800; text-transform: uppercase; color: #1e293b; letter-spacing: -0.01em; line-height: 1.2;">
                  LEMBAR SPESIFIKASI TEKNIS
                </div>
              </div>
              <div style="text-align: right; font-size: 7pt; color: #64748b; line-height: 1.4; font-family: 'Inter', sans-serif;">
                <div>Nomor Dokumen: <span style="font-family: 'JetBrains Mono', monospace; font-weight: 700; color: #1e293b;">NOTO/CELIOL-DS/${product.modelCode.replace(/\s+/g, '-')}/2026</span></div>
                <div>Tanggal Revisi: <strong style="color: #1e293b;">${printDate}</strong></div>
              </div>
            </div>
          </div>

          <!-- Hero Katalog Produk (Spotlight Foto Bersih Tanpa Teks Tag Dibawah & Tanpa Area Penempatan) -->
          <div style="display: flex; gap: 26px; align-items: center; padding: 12px 0 10px 0; border-bottom: 1px solid #e2e8f0; background: #ffffff;">
            <!-- Kiri (38%): Foto Dispenser Menonjol Tanpa Teks Label Mengganggu Dibawahnya -->
            <div style="width: 38%; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative;">
              <img src="${product.imageCover}" alt="${product.name}" style="max-height: 220px; max-width: 175px; object-fit: contain; filter: drop-shadow(0 14px 18px rgba(15, 23, 42, 0.12));">
              <!-- Bayangan Kontak Lantai Halus -->
              <div style="width: 72%; height: 6px; background: radial-gradient(ellipse at center, rgba(30, 41, 59, 0.14) 0%, rgba(30, 41, 59, 0) 70%); margin: 2px auto 0 auto; border-radius: 50%;"></div>
            </div>

            <!-- Kanan (62%): Informasi Produk & Pengadaan Tipografi Semantik -->
            <div style="width: 62%; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                  <span style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 7.5pt; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 0.05em;">${product.series} &bull; ${product.color}</span>
                  <span style="color: #cbd5e1;">&bull;</span>
                  <span style="font-family: 'JetBrains Mono', monospace; font-size: 7.5pt; font-weight: 700; color: #64748b;">${product.modelCode}</span>
                </div>
                <div style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15pt; font-weight: 900; color: #1e293b; letter-spacing: -0.02em; line-height: 1.18;">
                  ${product.name}
                </div>
              </div>

              <!-- Baris Informasi Pengadaan & Biaya (Tipografi Hitam & Abu-Abu) -->
              <div style="margin-top: 10px; margin-bottom: 4px; padding-top: 8px; border-top: 1px solid #e2e8f0;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 5px;">
                  <span style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 7pt; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.03em;">Estimasi Biaya Pengadaan:</span>
                  <div style="text-align: right;">
                    <span style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13.5pt; font-weight: 900; color: #1e293b; line-height: 1;">${formattedPrice}</span>
                    <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #64748b; margin-left: 2px;">/ unit (Pembelian Unit Resmi)</span>
                  </div>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 7px; padding-bottom: 7px; border-bottom: 1px solid #f1f5f9;">
                  <span style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 7pt; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.03em;">Paket Pemeliharaan Rutin:</span>
                  <div style="text-align: right;">
                    <span style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 11.5pt; font-weight: 900; color: #1e293b; line-height: 1;">${formattedMaintenancePrice}</span>
                    <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #64748b; margin-left: 2px;">/ bulan / unit (Layanan Penuh Termasuk Ganti Filter &amp; Servis)</span>
                  </div>
                </div>

                <!-- Parameter Operasional Harian (Hanya Rekomendasi Kapasitas & Kustomisasi Suhu) -->
                <div style="font-size: 7pt; line-height: 1.5; font-family: 'Inter', sans-serif;">
                  <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #f1f5f9; padding-bottom: 3px; margin-bottom: 3px;">
                    <span style="color: #64748b; font-weight: 600;">Rekomendasi Kapasitas:</span>
                    <span style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; color: #1e293b;">${cleanRecommendedPax}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: baseline;">
                    <span style="color: #64748b; font-weight: 600;">Kustomisasi Suhu Air:</span>
                    <span style="font-weight: 700; color: #1e293b;">Bebas Atur Kombinasi Panas, Dingin &amp; Suhu Ruang</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Tabel 1: Spesifikasi Teknis Lengkap (Diambil dari Parameter Spesifikasi Teknis Lengkap) -->
          <div style="margin-top: 6px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 3px;">
              <span style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 7.5pt; font-weight: 800; color: #1e293b; text-transform: uppercase; letter-spacing: 0.05em;">
                TABEL 1: SPESIFIKASI TEKNIS LENGKAP &bull; PARAMETER RESMI (${product.modelCode})
              </span>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #64748b; font-style: italic;">
                *Lembar Data Spesifikasi Teknis Resmi PT Noto Water Envirotech
              </span>
            </div>

            <table class="exec-table" style="background: #ffffff; width: 100%;">
              <thead>
                <tr style="background: #ffffff;">
                  <th style="width: 34%; text-align: left; background: #ffffff; color: #1e293b; border-bottom: 2px solid #1e293b; font-family: 'Plus Jakarta Sans', sans-serif; padding: 3px 6px; font-size: 6.8pt;">Parameter Teknis</th>
                  <th style="width: 66%; text-align: left; background: #ffffff; color: #1e293b; border-bottom: 2px solid #1e293b; font-family: 'Plus Jakarta Sans', sans-serif; padding: 3px 6px; font-size: 6.8pt;">Spesifikasi Detail (${product.modelCode})</th>
                </tr>
              </thead>
              <tbody style="font-family: 'Inter', sans-serif; font-size: 6.5pt;">
                <tr style="background: #ffffff;">
                  <td style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; color: #475569; background: #ffffff; padding: 2.2px 6px;">Model / SKU Resmi</td>
                  <td style="font-family: 'JetBrains Mono', monospace; font-weight: 700; color: #0f172a; background: #ffffff; padding: 2.2px 6px;">${product.modelCode}</td>
                </tr>
                <tr style="background: #ffffff;">
                  <td style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; color: #475569; background: #ffffff; padding: 2.2px 6px;">Seri Produk &amp; Pilihan Warna</td>
                  <td style="color: #1e293b; background: #ffffff; padding: 2.2px 6px;">${product.series} (${product.color})</td>
                </tr>
                <tr style="background: #ffffff;">
                  <td style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; color: #475569; background: #ffffff; padding: 2.2px 6px;">Material Eksterior Bodi</td>
                  <td style="color: #1e293b; background: #ffffff; padding: 2.2px 6px;">${product.bodyMaterial}</td>
                </tr>
                <tr style="background: #ffffff;">
                  <td style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; color: #475569; background: #ffffff; padding: 2.2px 6px;">Material Tangki Air Internal</td>
                  <td style="color: #1e293b; background: #ffffff; padding: 2.2px 6px;">Baja Tahan Karat SUS 304 Standar Pangan (Bebas BPA, Higienis &amp; Anti-Bakteri)</td>
                </tr>
                <tr style="background: #ffffff;">
                  <td style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; color: #475569; background: #ffffff; padding: 2.2px 6px;">Dimensi Mesin (P x L x T)</td>
                  <td style="font-family: 'JetBrains Mono', monospace; font-weight: 700; color: #0f172a; background: #ffffff; padding: 2.2px 6px;">${product.dimensions}</td>
                </tr>
                <tr style="background: #ffffff;">
                  <td style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; color: #475569; background: #ffffff; padding: 2.2px 6px;">Konfigurasi Keran Air (Water Spout)</td>
                  <td style="font-weight: 600; color: #1e293b; background: #ffffff; padding: 2.2px 6px;">${product.spouts}</td>
                </tr>
                <tr style="background: #ffffff;">
                  <td style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; color: #475569; background: #ffffff; padding: 2.2px 6px;">Kustomisasi Suhu Air</td>
                  <td style="color: #1e293b; background: #ffffff; padding: 2.2px 6px;">Bisa Custom Suhu (Kombinasi Air Panas, Dingin, Suhu Ruang / Normal Sesuai Kebutuhan)</td>
                </tr>
                <tr style="background: #ffffff;">
                  <td style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; color: #475569; background: #ffffff; padding: 2.2px 6px;">Rekomendasi Kapasitas Harian</td>
                  <td style="font-weight: 700; color: #1e293b; background: #ffffff; padding: 2.2px 6px;">${cleanRecommendedPax}</td>
                </tr>
                <tr style="background: #ffffff;">
                  <td style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; color: #475569; background: #ffffff; padding: 2.2px 6px;">Debit Air Panas (Hot Water)</td>
                  <td style="font-family: 'JetBrains Mono', monospace; color: #0f172a; background: #ffffff; padding: 2.2px 6px;">${hotYieldDesc}</td>
                </tr>
                <tr style="background: #ffffff;">
                  <td style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; color: #475569; background: #ffffff; padding: 2.2px 6px;">Debit Air Dingin (Cold Water)</td>
                  <td style="font-family: 'JetBrains Mono', monospace; color: #0f172a; background: #ffffff; padding: 2.2px 6px;">${coldYieldDesc}</td>
                </tr>
                <tr style="background: #ffffff;">
                  <td style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; color: #475569; background: #ffffff; padding: 2.2px 6px;">Debit Air Normal (Ambient)</td>
                  <td style="font-family: 'JetBrains Mono', monospace; color: #0f172a; background: #ffffff; padding: 2.2px 6px;">${normalYieldDesc}</td>
                </tr>
                <tr style="background: #ffffff;">
                  <td style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; color: #475569; background: #ffffff; padding: 2.2px 6px;">Total Daya Listrik (Power)</td>
                  <td style="font-family: 'JetBrains Mono', monospace; color: #0f172a; background: #ffffff; padding: 2.2px 6px;">${totalWatt} Watt (${powerDescId})</td>
                </tr>
                <tr style="background: #ffffff;">
                  <td style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; color: #475569; background: #ffffff; padding: 2.2px 6px;">Tegangan Operasional Listrik</td>
                  <td style="font-family: 'JetBrains Mono', monospace; color: #0f172a; background: #ffffff; padding: 2.2px 6px;">${product.voltage || '220-240V ~ 50-60 Hz'}</td>
                </tr>
                <tr style="background: #ffffff;">
                  <td style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; color: #475569; background: #ffffff; padding: 2.2px 6px;">Teknologi Filtrasi Inti</td>
                  <td style="font-weight: 700; color: #1e293b; background: #ffffff; padding: 2.2px 6px;">5-Tahap Reverse Osmosis (RO) Presisi 0.0001 Mikron</td>
                </tr>
                <tr style="background: #ffffff;">
                  <td style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; color: #475569; background: #ffffff; padding: 2.2px 6px;">Sistem Sterilisasi &amp; Kemurnian</td>
                  <td style="color: #1e293b; background: #ffffff; padding: 2.2px 6px;">99.9% Bebas Logam Berat &amp; Mikroplastik &bull; Sterilisasi UV-C LED</td>
                </tr>
                <tr style="background: #ffffff;">
                  <td style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; color: #475569; background: #ffffff; padding: 2.2px 6px;">Mekanisme Pengeluaran Air</td>
                  <td style="color: #1e293b; background: #ffffff; padding: 2.2px 6px;">Tombol Kran Presisi (Push-Button Dispense) Berdaya Tahan Komersial Tinggi</td>
                </tr>
                <tr style="background: #ffffff;">
                  <td style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; color: #475569; background: #ffffff; padding: 2.2px 6px;">Standar Baku Mutu Air Minum</td>
                  <td style="color: #1e293b; background: #ffffff; padding: 2.2px 6px;">Memenuhi Standar Baku Mutu Air Minum Permenkes RI No. 2 Tahun 2023</td>
                </tr>
                <tr style="background: #ffffff;">
                  <td style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; color: #475569; background: #ffffff; padding: 2.2px 6px;">Skema Pengadaan Resmi</td>
                  <td style="font-weight: 700; color: #1e293b; background: #ffffff; padding: 2.2px 6px;">Pembelian Unit Resmi + Paket Pemeliharaan Rutin ${formattedMaintenancePrice} / bulan</td>
                </tr>
                <tr style="background: #ffffff;">
                  <td style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; color: #475569; background: #ffffff; padding: 2.2px 6px;">Ketentuan Biaya Pengadaan</td>
                  <td style="color: #64748b; font-style: italic; background: #ffffff; padding: 2.2px 6px;">Biaya belum termasuk PPN 11%, Ongkos Kirim dan Pemasangan di luar instalasi pipa standar gedung</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Footer Halaman 1 -->
        <div style="border-top: 1px solid #e2e8f0; padding-top: 5px; display: flex; justify-content: space-between; font-size: 6.5pt; color: #94a3af; margin-top: 6px; background: #ffffff; font-family: 'Inter', sans-serif;">
          <div>PT Noto Water Envirotech &bull; Lembar Spesifikasi Teknis Celiol &bull; Dokumen Resmi &amp; Hak Cipta Dilindungi</div>
          <div>Halaman 1 dari 2</div>
        </div>
      </div>

      <!-- ========================================================= -->
      <!-- HALAMAN 2: FITUR REKAYASA & PAKET LAYANAN PEMELIHARAAN    -->
      <!-- STANDAR SOP: INTER (BODY), PLUS JAKARTA SANS (HEADING)    -->
      <!-- ========================================================= -->
      <div class="exec-page-break"></div>

      <div class="poster-page print-avoid-break" style="min-height: 272mm; display: flex; flex-direction: column; justify-content: space-between; margin-top: 0; background: #ffffff;">
        <div>
          <!-- Garis Aksen Atas Minimalis -->
          <div style="height: 2.5px; background: #1e293b; width: 100%;"></div>

          <!-- Sub-Header: Identitas CELIOL Commercial Water Dispenser -->
          <div style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: baseline; background: #ffffff;">
            <div style="display: flex; align-items: baseline; gap: 8px;">
              <span style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13pt; font-weight: 900; color: #1e293b; letter-spacing: -0.02em;">CELIOL</span>
              <span style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 7.5pt; font-weight: 700; color: #475569; text-transform: uppercase;">Commercial Water Dispenser</span>
              <span style="color: #cbd5e1;">&bull;</span>
              <span style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 7.5pt; font-weight: 700; color: #1e293b;">${product.name}</span>
              <span style="font-family: 'JetBrains Mono', monospace; font-size: 7pt; color: #64748b;">(${product.modelCode})</span>
            </div>
            <div style="text-align: right; font-size: 7pt; color: #64748b; font-family: 'Inter', sans-serif;">
              <strong style="color: #1e293b; font-family: 'Plus Jakarta Sans', sans-serif;">PT NOTO WATER ENVIROTECH</strong> &bull; sales@noto.asia
            </div>
          </div>

          <!-- Tabel 2: Fitur & Keunggulan Model (Disesuaikan dengan Fitur Masing-Masing Produk) -->
          <div style="margin-top: 6px; margin-bottom: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px;">
              <span style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 7.5pt; font-weight: 800; color: #1e293b; text-transform: uppercase; letter-spacing: 0.04em;">
                TABEL 2: FITUR &amp; KEUNGGULAN MODEL (${product.name} &bull; ${product.modelCode})
              </span>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #64748b; font-style: italic;">
                *Standar Keandalan &amp; Rekayasa Fasilitas Modern
              </span>
            </div>

            <table class="exec-table" style="background: #ffffff; width: 100%;">
              <thead>
                <tr style="background: #ffffff;">
                  <th style="width: 7%; text-align: center; background: #ffffff; color: #1e293b; border-bottom: 2px solid #1e293b; font-family: 'Plus Jakarta Sans', sans-serif; padding: 3px 6px; font-size: 6.8pt;">No</th>
                  <th style="width: 33%; text-align: left; background: #ffffff; color: #1e293b; border-bottom: 2px solid #1e293b; font-family: 'Plus Jakarta Sans', sans-serif; padding: 3px 6px; font-size: 6.8pt;">Fitur Rekayasa Produk</th>
                  <th style="width: 60%; text-align: left; background: #ffffff; color: #1e293b; border-bottom: 2px solid #1e293b; font-family: 'Plus Jakarta Sans', sans-serif; padding: 3px 6px; font-size: 6.8pt;">Deskripsi Keunggulan Teknis &amp; Higienitas</th>
                </tr>
              </thead>
              <tbody style="font-family: 'Inter', sans-serif; font-size: 6.5pt;">
                ${featuresRowsHtml}
              </tbody>
            </table>
          </div>

          <!-- Tabel 3: Paket Layanan Pemeliharaan (Disesuaikan dengan Spesifikasi Masing-Masing Produk) -->
          <div style="margin-top: 6px; margin-bottom: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px;">
              <span style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 7.5pt; font-weight: 800; color: #1e293b; text-transform: uppercase; letter-spacing: 0.04em;">
                TABEL 3: PAKET LAYANAN PEMELIHARAAN &amp; JAMINAN LAYANAN (${product.modelCode})
              </span>
              <span style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 6.5pt; font-weight: 700; color: #475569;">
                PAKET PEMELIHARAAN RUTIN ${formattedMaintenancePrice} / BULAN / UNIT
              </span>
            </div>

            <table class="exec-table" style="background: #ffffff; width: 100%;">
              <thead>
                <tr style="background: #ffffff;">
                  <th style="width: 24%; text-align: left; background: #ffffff; color: #1e293b; border-bottom: 2px solid #1e293b; font-family: 'Plus Jakarta Sans', sans-serif; padding: 3px 6px; font-size: 6.8pt;">Komponen Layanan</th>
                  <th style="width: 18%; text-align: left; background: #ffffff; color: #1e293b; border-bottom: 2px solid #1e293b; font-family: 'Plus Jakarta Sans', sans-serif; padding: 3px 6px; font-size: 6.8pt;">Frekuensi Kerja</th>
                  <th style="width: 43%; text-align: left; background: #ffffff; color: #1e293b; border-bottom: 2px solid #1e293b; font-family: 'Plus Jakarta Sans', sans-serif; padding: 3px 6px; font-size: 6.8pt;">Cakupan Kerja &amp; Standar Higienitas (${product.modelCode})</th>
                  <th style="width: 15%; text-align: left; background: #ffffff; color: #1e293b; border-bottom: 2px solid #1e293b; font-family: 'Plus Jakarta Sans', sans-serif; padding: 3px 6px; font-size: 6.8pt;">Biaya Layanan</th>
                </tr>
              </thead>
              <tbody style="font-family: 'Inter', sans-serif; font-size: 6.5pt;">
                <tr style="background: #ffffff;">
                  <td style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; color: #1e293b; background: #ffffff; padding: 3px 6px;">Pemeliharaan Rutin Bulanan</td>
                  <td style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; color: #475569; background: #ffffff; padding: 3px 6px;">Setiap Bulan<br><span style="font-family: 'Inter', sans-serif; font-size: 5.8pt; color: #64748b; font-weight: normal;">(1 Bulan Sekali)</span></td>
                  <td style="color: #334155; background: #ffffff; padding: 3px 6px;">Pemeriksaan menyeluruh fungsi operasional unit ${product.name} (${product.modelCode}), inspeksi kelistrikan (${totalWatt}W), kalibrasi suhu kran (${product.spouts}), sanitasi tangki internal SUS 304, pembilasan pipa internal, dan uji kualitas air TDS on-site.</td>
                  <td style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; color: #1e293b; background: #ffffff; padding: 3px 6px;">Termasuk Paket</td>
                </tr>
                <tr style="background: #ffffff;">
                  <td style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; color: #1e293b; background: #ffffff; padding: 3px 6px;">Pergantian Filter Terjadwal</td>
                  <td style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; color: #475569; background: #ffffff; padding: 3px 6px;">Bulanan &amp; Semesteran<br><span style="font-family: 'Inter', sans-serif; font-size: 5.8pt; color: #64748b; font-weight: normal;">(6 Bulan Sekali)</span></td>
                  <td style="color: #334155; background: #ffffff; padding: 3px 6px;">Penggantian rutin cartridge Sedimen PP setiap bulan, serta penggantian media Granular Activated Carbon, Blok Karbon, dan Membran Reverse Osmosis (RO) 0.0001 µm resmi unit ${product.modelCode} setiap 6 bulan secara konsisten.</td>
                  <td style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; color: #1e293b; background: #ffffff; padding: 3px 6px;">Termasuk Paket</td>
                </tr>
                <tr style="background: #ffffff;">
                  <td style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; color: #1e293b; background: #ffffff; padding: 3px 6px;">Perbaikan Jika Ada Kerusakan</td>
                  <td style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; color: #475569; background: #ffffff; padding: 3px 6px;">Sesuai Kebutuhan<br><span style="font-family: 'Inter', sans-serif; font-size: 5.8pt; color: #64748b; font-weight: normal;">(Kapan Pun Diperlukan)</span></td>
                  <td style="color: #334155; background: #ffffff; padding: 3px 6px;">Garansi perbaikan darurat respons cepat teknisi dan penggantian suku cadang orisinal Celiol ${product.series} tanpa biaya tambahan jika terjadi kendala teknis atau aus komponen pada unit ${product.modelCode}.</td>
                  <td style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; color: #1e293b; background: #ffffff; padding: 3px 6px;">Termasuk Paket</td>
                </tr>
                <tr style="background: #ffffff;">
                  <td style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; color: #1e293b; background: #ffffff; padding: 3px 6px;">24/7 Layanan Pelanggan Teknis</td>
                  <td style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; color: #475569; background: #ffffff; padding: 3px 6px;">24 Jam / 7 Hari<br><span style="font-family: 'Inter', sans-serif; font-size: 5.8pt; color: #64748b; font-weight: normal;">(Respons Cepat)</span></td>
                  <td style="color: #334155; background: #ffffff; padding: 3px 6px;">Dukungan hotline prioritas tim teknis PT Noto Water Envirotech via WhatsApp dan surel resmi sales@noto.asia guna menjamin ketersediaan air minum fasilitas secara berkelanjutan.</td>
                  <td style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; color: #1e293b; background: #ffffff; padding: 3px 6px;">Termasuk Paket</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Ketentuan Pengadaan & Standar Mutu -->
          <div style="font-size: 6.5pt; color: #475569; padding: 6px 0; border-top: 1px solid #e2e8f0; margin-top: 6px; margin-bottom: 8px; line-height: 1.45; font-family: 'Inter', sans-serif;">
            <div style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; color: #1e293b; text-transform: uppercase; margin-bottom: 2px;">Ketentuan Pengadaan &amp; Standar Mutu:</div>
            <div>
              &bull; Biaya pengadaan unit belum termasuk Pajak Pertambahan Nilai (PPN 11%), Ongkos Kirim ke luar wilayah Jabodetabek, dan pemasangan di luar instalasi pipa standar gedung.<br>
              &bull; Kualitas air minum hasil filtrasi teruji klinis dan memenuhi Baku Mutu Air Minum Permenkes RI No. 2 Tahun 2023.<br>
              &bull; Unit didukung pasokan suku cadang resmi dan teknisi profesional PT Noto Water Envirotech secara berkelanjutan.
            </div>
          </div>
        </div>

        <!-- Footer Halaman 2 -->
        <div style="border-top: 1px solid #e2e8f0; padding-top: 5px; display: flex; justify-content: space-between; font-size: 6.5pt; color: #94a3af; margin-top: 6px; background: #ffffff; font-family: 'Inter', sans-serif;">
          <div>PT Noto Water Envirotech &bull; Jl. H. R. Rasuna Said Kav. 1, Jakarta Selatan &bull; noto.asia</div>
          <div>Halaman 2 dari 2</div>
        </div>
      </div>

    </div>
  `;
}

// 4.2 Fungsi Eksekusi Cetak Spesifikasi (PDF)
function printProductDatasheet(productId) {
  const product = window.CeliolData.getProductById(productId);
  if (!product) return;

  const printContainer = document.getElementById('officialPrintDatasheet');
  if (printContainer) {
    printContainer.innerHTML = generateDatasheetHtml(product);
  }

  // Trigger browser print dialog (Save as PDF / Print)
  window.print();
}
window.printProductDatasheet = printProductDatasheet;

function closeProductDetail() {
  const modalEl = document.getElementById('productDetailModal');
  if (modalEl) modalEl.classList.add('hidden');
}

// 5. RFQ Modal on Catalog
function openCatalogRfqModal(modelCode, productName) {
  const modal = document.getElementById('catalogRfqModal');
  const inputModel = document.getElementById('catRfqModel');
  if (inputModel) inputModel.value = `[${modelCode}] ${productName}`;
  if (modal) modal.classList.remove('hidden');
}

function closeCatalogRfqModal() {
  const modal = document.getElementById('catalogRfqModal');
  if (modal) modal.classList.add('hidden');
}
