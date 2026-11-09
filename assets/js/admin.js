/**
 * Celiol Dispenser - Admin Dashboard, Product CRUD, and Article SEO CMS Logic
 * Styled with Preline UI Design System.
 */

document.addEventListener('DOMContentLoaded', function () {
  if (!window.CeliolData) return;

  if (document.getElementById('adminOverviewStats')) {
    initDashboardOverview();
  } else if (document.getElementById('adminProductsTable')) {
    initProductCrud();
  } else if (document.getElementById('adminArticlesTable')) {
    initArticleCrud();
  }

  const resetBtn = document.getElementById('adminResetSeedBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Apakah Anda yakin ingin mereset seluruh database produk, artikel, dan leads ke pengaturan bawaan Celiol?')) {
        window.CeliolData.resetDefaults();
        window.location.reload();
      }
    });
  }

  const logoutBtn = document.getElementById('adminLogoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      if (confirm('Apakah Anda yakin ingin keluar dari Portal Admin?')) {
        sessionStorage.removeItem('celiol_admin_auth');
        localStorage.removeItem('celiol_admin_auth');
        window.location.replace('login.html');
      }
    });
  }

  // Handle modal backdrop click to close
  window.addEventListener('click', (e) => {
    ['leadDetailModal', 'productDetailModal', 'articleDetailModal', 'aiImportModal'].forEach(id => {
      const modal = document.getElementById(id);
      if (modal && e.target === modal) {
        modal.classList.add('hidden');
      }
    });
  });

  // Handle ESC key to close active modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      ['leadDetailModal', 'productDetailModal', 'articleDetailModal', 'productModal', 'articleModal', 'aiImportModal'].forEach(id => {
        const modal = document.getElementById(id);
        if (modal && !modal.classList.contains('hidden')) {
          modal.classList.add('hidden');
        }
      });
    }
  });

  if (window.initPrelineIcons) {
    window.initPrelineIcons();
  } else if (window.lucide) {
    lucide.createIcons();
  }
  if (window.HSStaticMethods) window.HSStaticMethods.autoInit();
});

// Toast Notification Helper (Preline Toast Component)
function showPrelineToast(message, type = 'success') {
  let toastContainer = document.getElementById('prelineToastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'prelineToastContainer';
    toastContainer.className = 'fixed bottom-5 end-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `p-4 rounded-2xl border shadow-lg text-xs font-semibold flex items-center gap-3 transition-all duration-300 transform translate-y-4 opacity-0 pointer-events-auto ${
    type === 'success' 
      ? 'bg-white border-emerald-200 text-emerald-800 shadow-emerald-500/10' 
      : 'bg-white border-rose-200 text-rose-800 shadow-rose-500/10'
  }`;

  const iconName = type === 'success' ? 'check-circle' : 'alert-circle';
  toast.innerHTML = `
    <i data-lucide="${iconName}" class="w-5 h-5 shrink-0 ${type === 'success' ? 'text-emerald-600' : 'text-rose-600'}"></i>
    <div class="flex-1">${message}</div>
    <button onclick="this.parentElement.remove()" class="text-gray-400 hover:text-gray-600 p-1">
      <i data-lucide="x" class="w-4 h-4"></i>
    </button>
  `;

  toastContainer.appendChild(toast);
  if (window.initPrelineIcons) {
    window.initPrelineIcons();
  } else if (window.lucide) {
    lucide.createIcons();
  }

  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
  });

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// ==========================================
// 1. ADMIN DASHBOARD OVERVIEW
// ==========================================
function initDashboardOverview() {
  const products = window.CeliolData.getProducts();
  const articles = window.CeliolData.getArticles();
  const leads = window.CeliolData.getLeads();

  const activeProducts = products.filter(p => p.status === 'active').length;
  const publishedArticles = articles.filter(a => a.status === 'published').length;
  const newLeads = leads.filter(l => l.status === 'new').length;

  const statTotalProductsEl = document.getElementById('statTotalProducts');
  if (statTotalProductsEl) statTotalProductsEl.textContent = products.length;
  const statActiveProductsEl = document.getElementById('statActiveProducts');
  if (statActiveProductsEl) statActiveProductsEl.textContent = `${activeProducts} Model Aktif di Katalog`;

  const statTotalArticlesEl = document.getElementById('statTotalArticles');
  if (statTotalArticlesEl) statTotalArticlesEl.textContent = articles.length;
  const statPublishedArticlesEl = document.getElementById('statPublishedArticles');
  if (statPublishedArticlesEl) statPublishedArticlesEl.textContent = `${publishedArticles} Live di Google`;

  const statTotalLeadsEl = document.getElementById('statTotalLeads');
  if (statTotalLeadsEl) statTotalLeadsEl.textContent = leads.length;
  const statNewLeadsEl = document.getElementById('statNewLeads');
  if (statNewLeadsEl) statNewLeadsEl.textContent = `${newLeads} Prospek Perlu Dihubungi`;

  renderRecentLeadsTable(leads);
  renderRecentArticlesTable(articles);

  if (window.initPrelineIcons) {
    window.initPrelineIcons();
  } else if (window.lucide) {
    lucide.createIcons();
  }
}

function renderRecentLeadsTable(leads) {
  const leadsTbody = document.getElementById('recentLeadsTbody');
  if (!leadsTbody) return;

  if (leads.length === 0) {
    leadsTbody.innerHTML = `<tr><td colspan="6" class="px-6 py-8 text-center text-xs text-gray-400">Belum ada permintaan penawaran harga masuk dari website.</td></tr>`;
    return;
  }

  leadsTbody.innerHTML = leads.map(l => {
    const cleanPhone = (l.phone || '').replace(/[^0-9]/g, '');
    const waPhone = cleanPhone.startsWith('0') ? '62' + cleanPhone.substring(1) : cleanPhone;
    const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(`Halo Bapak/Ibu ${l.fullName}, kami dari Celiol Dispenser menindaklanjuti permintaan konsultasi dispenser untuk ${l.companyName}.`)}`;

    return `
      <tr class="hover:bg-gray-50/80 transition-colors">
        <td class="px-6 py-4">
          <div class="font-bold text-gray-900 font-heading text-xs">${l.fullName}</div>
          <div class="text-[11px] text-gray-500">${l.companyName}</div>
          <div class="text-[10px] text-gray-400 mt-0.5">${l.email} · ${l.phone}</div>
        </td>
        <td class="px-6 py-4 text-xs text-gray-700">
          <div class="font-semibold text-brand-700">${l.interestedModel || 'Konsultasi Rekomendasi'}</div>
          ${l.message ? `<div class="text-[11px] text-gray-500 line-clamp-1 italic mt-0.5">"${l.message}"</div>` : ''}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-600 font-medium">
          ${l.employeeCount || '50-80 Orang'}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
          ${l.submittedAt}
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <button onclick="toggleLeadStatus('${l.id}')" class="inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-[11px] font-semibold ${l.status === 'new' ? 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100' : 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'} transition-colors" title="Klik untuk ubah status">
            <span class="w-1.5 h-1.5 rounded-full ${l.status === 'new' ? 'bg-amber-500' : 'bg-emerald-500'}"></span>
            ${l.status === 'new' ? 'Baru Masuk' : 'Sudah Dihubungi'}
          </button>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-end text-xs">
          <div class="flex items-center justify-end gap-1.5">
            <button onclick="openLeadDetailModal('${l.id}')" class="py-1.5 px-2.5 inline-flex items-center gap-x-1 text-xs font-semibold rounded-lg border border-gray-200 bg-white text-gray-700 shadow-2xs hover:bg-gray-50 hover:text-brand-600 hover:border-brand-300 transition-colors font-heading" title="Lihat Rincian Lengkap Prospek">
              <i data-lucide="eye" class="w-3.5 h-3.5"></i>
              Detail
            </button>
            <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-xs transition-all font-heading">
              <i data-lucide="message-circle" class="w-3.5 h-3.5"></i>
              <span>WhatsApp</span>
            </a>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function toggleLeadStatus(id) {
  const leads = window.CeliolData.getLeads();
  const lead = leads.find(l => l.id === id);
  if (!lead) return;

  lead.status = lead.status === 'new' ? 'contacted' : 'new';
  localStorage.setItem('celiol_leads_db', JSON.stringify(leads));

  renderRecentLeadsTable(leads);
  const newLeads = leads.filter(l => l.status === 'new').length;
  const statNewLeadsEl = document.getElementById('statNewLeads');
  if (statNewLeadsEl) statNewLeadsEl.textContent = `${newLeads} Prospek Perlu Dihubungi`;

  showPrelineToast(`Status prospek ${lead.fullName} diperbarui.`, 'success');
  if (window.initPrelineIcons) window.initPrelineIcons();
}

function renderRecentArticlesTable(articles) {
  const artTbody = document.getElementById('recentArticlesTbody');
  if (!artTbody) return;

  artTbody.innerHTML = articles.slice(0, 5).map(a => `
    <tr class="hover:bg-gray-50/80 transition-colors">
      <td class="px-6 py-4 text-xs font-semibold text-gray-900 max-w-xs">
        <a href="../article-detail.html?slug=${a.slug}" target="_blank" class="hover:text-brand-600 transition-colors line-clamp-1 font-heading">
          ${a.title}
        </a>
        <div class="text-[11px] text-gray-400 font-mono mt-0.5">/${a.slug}</div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-600">
        <span class="text-xs font-medium text-gray-700">${a.category}</span>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-500">${a.publishedAt}</td>
      <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-700 font-semibold">${a.viewCount} pembaca</td>
      <td class="px-6 py-4 whitespace-nowrap">
        <span class="inline-flex items-center gap-1.5 py-0.5 px-2.5 rounded-full text-[11px] font-medium ${a.status === 'published' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-700 border border-gray-200'}">
          <span class="w-1.5 h-1.5 rounded-full ${a.status === 'published' ? 'bg-emerald-500' : 'bg-gray-400'}"></span>
          ${a.status === 'published' ? 'Terbit' : 'Draft'}
        </span>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-end text-xs">
        <div class="flex items-center justify-end gap-1.5">
          <button onclick="openArticleDetailModal('${a.id}')" class="py-1.5 px-2.5 inline-flex items-center gap-x-1 text-xs font-semibold rounded-lg border border-gray-200 bg-white text-gray-700 shadow-2xs hover:bg-gray-50 hover:text-brand-600 hover:border-brand-300 transition-colors font-heading" title="Lihat Rincian Artikel & SEO">
            <i data-lucide="eye" class="w-3.5 h-3.5"></i>
            Detail
          </button>
          <a href="../article-detail.html?slug=${a.slug}" target="_blank" class="py-1.5 px-2.5 inline-flex items-center gap-x-1 text-xs font-semibold rounded-lg border border-gray-200 bg-white text-gray-700 shadow-2xs hover:bg-gray-50 hover:text-brand-600 hover:border-brand-300 transition-colors font-heading" title="Buka Live di Tab Baru">
            <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
          </a>
        </div>
      </td>
    </tr>
  `).join('');
}

// ==========================================
// 2. PRODUCT MANAGEMENT (CRUD)
// ==========================================
let editingProductId = null;

function initProductCrud() {
  renderProductsTable();

  const searchEl = document.getElementById('adminProductSearch');
  if (searchEl) {
    searchEl.addEventListener('input', () => renderProductsTable());
  }

  const seriesEl = document.getElementById('adminProductFilterSeries');
  if (seriesEl) {
    seriesEl.addEventListener('change', () => renderProductsTable());
  }

  const statusEl = document.getElementById('adminProductFilterStatus');
  if (statusEl) {
    statusEl.addEventListener('change', () => renderProductsTable());
  }

  const form = document.getElementById('productForm');
  if (form) {
    form.addEventListener('submit', handleProductFormSubmit);
  }

  // Image Upload and Preview handlers
  const imgInput = document.getElementById('prodImage');
  const imgFileInput = document.getElementById('prodImageFile');
  const imgPreviewWrap = document.getElementById('prodImagePreviewWrap');
  const imgPreview = document.getElementById('prodImagePreview');
  const fileStatus = document.getElementById('prodImageFileStatus');

  function updateImgPreview(src) {
    if (src && imgPreviewWrap && imgPreview) {
      imgPreview.src = src;
      imgPreviewWrap.classList.remove('hidden');
    } else if (imgPreviewWrap) {
      imgPreviewWrap.classList.add('hidden');
    }
  }

  if (imgInput) {
    imgInput.addEventListener('input', (e) => updateImgPreview(e.target.value.trim()));
  }

  if (imgFileInput) {
    imgFileInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          alert('Ukuran file foto maksimal 5 MB.');
          return;
        }
        if (fileStatus) fileStatus.textContent = file.name;
        const reader = new FileReader();
        reader.onload = function(evt) {
          const dataUrl = evt.target.result;
          if (imgInput) imgInput.value = dataUrl;
          updateImgPreview(dataUrl);
        };
        reader.readAsDataURL(file);
      }
    });
  }
}

function renderProductsTable() {
  const tbody = document.getElementById('adminProductsTableBody');
  if (!tbody) return;

  const products = window.CeliolData.getProducts();
  const searchQ = (document.getElementById('adminProductSearch')?.value || '').toLowerCase().trim();
  const seriesFilter = document.getElementById('adminProductFilterSeries')?.value || 'all';
  const statusFilter = document.getElementById('adminProductFilterStatus')?.value || 'all';

  let filtered = products;

  if (seriesFilter !== 'all') {
    filtered = filtered.filter(p => (p.series || '').includes(seriesFilter));
  }

  if (statusFilter !== 'all') {
    filtered = filtered.filter(p => p.status === statusFilter);
  }

  if (searchQ) {
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchQ) ||
      p.modelCode.toLowerCase().includes(searchQ) ||
      (p.color && p.color.toLowerCase().includes(searchQ))
    );
  }

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="px-6 py-12 text-center text-xs text-gray-400">Tidak ada produk yang cocok dengan kriteria pencarian.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(p => {
    const formattedPrice = p.purchasePrice ? `Rp ${p.purchasePrice.toLocaleString('id-ID')}` : '-';
    const maintenancePrice = p.monthlyMaintenancePrice ? `Rp ${p.monthlyMaintenancePrice.toLocaleString('id-ID')}/bln` : 'Rp 500.000/bln';

    return `
    <tr class="hover:bg-gray-50/80 transition-colors border-b border-gray-200">
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="flex items-center gap-3.5">
          <img src="${p.imageCover}" alt="${p.name}" class="w-12 h-14 object-contain rounded-xl border border-gray-200 bg-white p-1">
          <div>
            <div class="text-xs font-bold text-gray-900 font-heading">${p.name}</div>
            <span class="inline-block text-[11px] font-mono font-semibold text-brand-700 bg-brand-50 border border-brand-200/60 px-2 py-0.5 rounded-md mt-0.5">
              ${p.modelCode}
            </span>
          </div>
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-700">
        <div class="font-semibold text-gray-900 font-heading">${p.series === 'Ultimate Facility Water Dispenser' ? 'Ultimate Facility' : 'Deluxe Facility'}</div>
        <div class="text-[11px] text-gray-500">${p.bodyMaterial || 'Stainless Steel'} · ${p.color || 'Black'}</div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-700">
        <div class="font-medium">${p.spouts || '2-3 Kran'}</div>
        <span class="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-1.5 py-0.5 rounded font-medium mt-0.5 inline-block">
          Bisa Custom Suhu
        </span>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-700">
        ${p.recommendedPax || '50 - 80 Orang / hari'}
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-xs">
        <div class="font-extrabold text-gray-900 font-heading">${formattedPrice}</div>
        <div class="text-[11px] text-gray-500 font-medium">Maint: ${maintenancePrice}</div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-xs">
        <button onclick="toggleProductActiveStatus('${p.id}')" class="inline-flex items-center gap-1.5 py-0.5 px-2.5 rounded-full text-[11px] font-medium ${p.status === 'active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100' : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'} transition-colors font-heading" title="Klik untuk ubah visibilitas katalog">
          <span class="w-1.5 h-1.5 rounded-full ${p.status === 'active' ? 'bg-emerald-500' : 'bg-gray-400'}"></span>
          ${p.status === 'active' ? 'Aktif' : 'Draft'}
        </button>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-end text-xs">
        <div class="flex items-center justify-end gap-1.5">
          <button onclick="openProductDetailModal('${p.id}')" class="py-1.5 px-2.5 inline-flex items-center gap-x-1 text-xs font-semibold rounded-lg border border-gray-200 bg-white text-gray-700 shadow-2xs hover:bg-gray-50 hover:text-brand-600 hover:border-brand-300 transition-colors font-heading" title="Lihat Rincian & Spesifikasi Lengkap">
            <i data-lucide="eye" class="w-3.5 h-3.5"></i>
            Detail
          </button>
          <button onclick="openEditProductModal('${p.id}')" class="py-1.5 px-2.5 inline-flex items-center gap-x-1 text-xs font-semibold rounded-lg border border-gray-200 bg-white text-gray-700 shadow-2xs hover:bg-gray-50 hover:text-brand-600 hover:border-brand-300 transition-colors font-heading" title="Edit Data Spesifikasi">
            <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
            Edit
          </button>
          <button onclick="deleteProductById('${p.id}', '${p.name.replace(/'/g, "\\'")}')" class="py-1.5 px-2.5 inline-flex items-center gap-x-1 text-xs font-semibold rounded-lg border border-gray-200 bg-white text-rose-600 shadow-2xs hover:bg-rose-50 hover:border-rose-200 transition-colors font-heading" title="Hapus Produk">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </td>
    </tr>
  `;
  }).join('');

  if (window.initPrelineIcons) {
    window.initPrelineIcons();
  } else if (window.lucide) {
    lucide.createIcons();
  }
}

function openAddProductModal() {
  editingProductId = null;
  const form = document.getElementById('productForm');
  if (form) form.reset();

  const imgPreviewWrap = document.getElementById('prodImagePreviewWrap');
  if (imgPreviewWrap) imgPreviewWrap.classList.add('hidden');
  const fileStatus = document.getElementById('prodImageFileStatus');
  if (fileStatus) fileStatus.textContent = 'Format PNG transparan / WebP didukung';

  document.getElementById('productModalTitle').textContent = 'Tambah Model Dispenser Baru';
  document.getElementById('prodPurchasePrice').value = 33999000;
  document.getElementById('prodMaintenancePrice').value = 500000;
  document.getElementById('prodPax').value = '50 - 80 Orang / hari';
  document.getElementById('prodDimensions').value = '560 x 430 x 1520 mm';
  document.getElementById('prodHeatingWatt').value = 2000;
  document.getElementById('prodCoolingWatt').value = 120;
  document.getElementById('prodVoltage').value = '220-240V ~ 50-60 Hz';

  document.getElementById('productModal').classList.remove('hidden');
  if (window.initPrelineIcons) window.initPrelineIcons();
  else if (window.lucide) lucide.createIcons();
}

function openEditProductModal(id) {
  const p = window.CeliolData.getProductById(id);
  if (!p) return;

  editingProductId = id;
  document.getElementById('productModalTitle').textContent = `Edit Model: ${p.modelCode}`;

  document.getElementById('prodName').value = p.name || '';
  document.getElementById('prodModelCode').value = p.modelCode || '';
  document.getElementById('prodSeries').value = p.series || 'Deluxe Facility Water Dispenser';
  document.getElementById('prodBodyMaterial').value = p.bodyMaterial || 'Stainless Steel';
  document.getElementById('prodColor').value = p.color || 'Black';
  document.getElementById('prodSpouts').value = p.spouts || '2 Kran (Bisa Custom Suhu)';
  document.getElementById('prodDispenseText').value = p.dispenseType === 'push-button' ? 'Tombol Kran Presisi (Push-Button Dispense)' : (p.dispenseType || 'Tombol Kran Presisi');
  document.getElementById('prodPax').value = p.recommendedPax || '50 - 80 Orang / hari';
  document.getElementById('prodDimensions').value = p.dimensions || '560 x 430 x 1520 mm';
  document.getElementById('prodHeatingWatt').value = p.powerWatt?.heating || 2000;
  document.getElementById('prodCoolingWatt').value = p.powerWatt?.cooling || 120;
  document.getElementById('prodVoltage').value = p.voltage || '220-240V ~ 50-60 Hz';
  document.getElementById('prodIdealFor').value = p.idealFor || '';
  document.getElementById('prodPurchasePrice').value = p.purchasePrice || 33999000;
  document.getElementById('prodMaintenancePrice').value = p.monthlyMaintenancePrice || 500000;
  document.getElementById('prodImage').value = p.imageCover || '';
  document.getElementById('prodIsFeatured').checked = Boolean(p.isFeatured);
  document.getElementById('prodStatus').value = p.status || 'active';
  document.getElementById('prodFeatures').value = (p.keyFeatures || []).join('\n');

  const imgPreviewWrap = document.getElementById('prodImagePreviewWrap');
  const imgPreview = document.getElementById('prodImagePreview');
  if (p.imageCover && imgPreviewWrap && imgPreview) {
    imgPreview.src = p.imageCover;
    imgPreviewWrap.classList.remove('hidden');
  } else if (imgPreviewWrap) {
    imgPreviewWrap.classList.add('hidden');
  }

  ['hot', 'cold', 'ambient'].forEach(t => {
    const cb = document.querySelector(`input[name="prodTemp"][value="${t}"]`);
    if (cb) cb.checked = (p.temperatures || []).includes(t);
  });

  document.getElementById('productModal').classList.remove('hidden');
  if (window.initPrelineIcons) window.initPrelineIcons();
  else if (window.lucide) lucide.createIcons();
}

function closeProductModal() {
  document.getElementById('productModal').classList.add('hidden');
}

function handleProductFormSubmit(e) {
  e.preventDefault();

  const temps = [];
  document.querySelectorAll('input[name="prodTemp"]:checked').forEach(cb => temps.push(cb.value));

  const featuresText = document.getElementById('prodFeatures').value;
  const keyFeatures = featuresText.split('\n').map(s => s.trim()).filter(Boolean);

  const purchasePriceVal = parseInt(document.getElementById('prodPurchasePrice').value, 10) || 33999000;
  const maintenancePriceVal = parseInt(document.getElementById('prodMaintenancePrice').value, 10) || 500000;
  const formattedPurchasePrice = `Rp ${purchasePriceVal.toLocaleString('id-ID')}`;
  const priceEstimateString = `Beli: ${formattedPurchasePrice} / Maintenance: Rp ${maintenancePriceVal.toLocaleString('id-ID')}/bln`;

  const existingProduct = editingProductId ? window.CeliolData.getProductById(editingProductId) : null;

  const productObj = {
    id: editingProductId,
    name: document.getElementById('prodName').value.trim(),
    modelCode: document.getElementById('prodModelCode').value.trim(),
    series: document.getElementById('prodSeries').value,
    color: document.getElementById('prodColor').value.trim() || 'Black',
    slug: document.getElementById('prodName').value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    formFactor: 'floor-standing',
    temperatures: temps.length > 0 ? temps : ['ambient', 'hot', 'cold'],
    spouts: document.getElementById('prodSpouts').value,
    recommendedPax: document.getElementById('prodPax').value.trim() || '50 - 80 Orang / hari',
    filtrationType: 'RO',
    dispenseType: 'push-button',
    coolingCapacityLph: parseFloat(document.getElementById('prodCoolingWatt').value) > 0 ? 15 : 0,
    heatingCapacityLph: parseFloat(document.getElementById('prodHeatingWatt').value) > 0 ? 25 : 0,
    normalWaterYieldLph: 80,
    tankCapacity: existingProduct?.tankCapacity || {
      cold: 5,
      hot: 25,
      ambient: 80
    },
    dimensions: document.getElementById('prodDimensions').value.trim() || '560 x 430 x 1520 mm',
    bodyMaterial: document.getElementById('prodBodyMaterial').value,
    powerWatt: {
      heating: parseInt(document.getElementById('prodHeatingWatt').value, 10) || 2000,
      cooling: parseInt(document.getElementById('prodCoolingWatt').value, 10) || 120
    },
    voltage: document.getElementById('prodVoltage').value.trim() || '220-240V ~ 50-60 Hz',
    keyFeatures: keyFeatures.length > 0 ? keyFeatures : [
      "Bisa Custom Suhu: Bebas pilih kombinasi suhu air",
      "Filtrasi 5-Tahap Reverse Osmosis (RO) Presisi 0.0001 Mikron",
      "Material BPA-Free Bebas Zat Kimia Beracun & Tangki SUS 304",
      "Paket Maintenance Rutin Berkala Rp 500k/bln"
    ],
    imageCover: document.getElementById('prodImage').value.trim() || 'assets/img/products/cswds-2n-1h1-black.png',
    pdfDatasheetUrl: existingProduct?.pdfDatasheetUrl || "Catalogue Product/(Education Edition) Pitch Deck PT Noto Water Envirotech.pdf",
    isFeatured: document.getElementById('prodIsFeatured').checked,
    status: document.getElementById('prodStatus').value,
    purchasePrice: purchasePriceVal,
    monthlyMaintenancePrice: maintenancePriceVal,
    priceEstimate: priceEstimateString,
    idealFor: document.getElementById('prodIdealFor').value.trim() || "Ruang Pantry, Ruang Kerja Kantor, Fasilitas Publik",
    standardSop: "Permenkes No. 2 Tahun 2023"
  };

  window.CeliolData.saveProduct(productObj);
  closeProductModal();
  renderProductsTable();
  showPrelineToast(`Model "${productObj.name}" berhasil disimpan!`, 'success');
}

function deleteProductById(id, name) {
  if (confirm(`Apakah Anda yakin ingin menghapus model "${name}" dari katalog?`)) {
    window.CeliolData.deleteProduct(id);
    renderProductsTable();
    showPrelineToast(`Model "${name}" telah dihapus.`, 'success');
  }
}

function toggleProductActiveStatus(id) {
  const newStatus = window.CeliolData.toggleProductStatus(id);
  renderProductsTable();
  showPrelineToast(`Status model diubah menjadi ${newStatus === 'active' ? 'Aktif' : 'Draft'}.`, 'success');
}

// ==========================================
// 3. ARTICLE / BLOG MANAGEMENT (SEO CMS)
// ==========================================
let editingArticleId = null;

function initArticleCrud() {
  renderArticlesTable();

  const searchEl = document.getElementById('adminArticleSearch');
  if (searchEl) {
    searchEl.addEventListener('input', () => renderArticlesTable());
  }

  setupSeoLivePreview();

  const form = document.getElementById('articleForm');
  if (form) {
    form.addEventListener('submit', handleArticleFormSubmit);
  }
}

function renderArticlesTable() {
  const tbody = document.getElementById('adminArticlesTableBody');
  if (!tbody) return;

  const articles = window.CeliolData.getArticles();
  const searchQ = (document.getElementById('adminArticleSearch')?.value || '').toLowerCase().trim();

  let filtered = articles;
  if (searchQ) {
    filtered = filtered.filter(a => 
      a.title.toLowerCase().includes(searchQ) ||
      a.category.toLowerCase().includes(searchQ) ||
      a.tags.some(t => t.toLowerCase().includes(searchQ))
    );
  }

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="px-6 py-12 text-center text-xs text-gray-400">Tidak ada artikel ditemukan.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(a => `
    <tr class="hover:bg-gray-50/80 transition-colors border-b border-gray-200">
      <td class="px-6 py-4">
        <div class="flex items-center gap-3">
          <img src="${a.featuredImage}" alt="${a.title}" class="w-12 h-12 object-cover rounded-xl border border-gray-200 shadow-2xs">
          <div class="max-w-md">
            <a href="../article-detail.html?slug=${a.slug}" target="_blank" class="text-xs font-bold text-gray-900 hover:text-brand-600 line-clamp-1 font-heading">
              ${a.title}
            </a>
            <div class="text-[11px] text-gray-400 font-mono mt-0.5">/${a.slug}</div>
          </div>
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-600">
        <span class="text-xs text-brand-700 font-semibold font-heading">${a.category}</span>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-600">
        <div class="flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full ${a.seo?.focusKeyword ? 'bg-emerald-500' : 'bg-amber-400'}"></span>
          <span class="text-gray-700 font-medium">${a.seo?.focusKeyword || 'Belum diatur'}</span>
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
        ${a.publishedAt}
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-xs">
        <span class="inline-flex items-center gap-1.5 py-0.5 px-2.5 rounded-full text-[11px] font-medium ${a.status === 'published' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-700 border border-gray-200'}">
          <span class="w-1.5 h-1.5 rounded-full ${a.status === 'published' ? 'bg-emerald-500' : 'bg-gray-400'}"></span>
          ${a.status === 'published' ? 'Terbit' : 'Draft'}
        </span>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-end text-xs">
        <div class="flex items-center justify-end gap-1.5">
          <button onclick="openArticleDetailModal('${a.id}')" class="py-1.5 px-2.5 inline-flex items-center gap-x-1 text-xs font-semibold rounded-lg border border-gray-200 bg-white text-gray-700 shadow-2xs hover:bg-gray-50 hover:text-brand-600 hover:border-brand-300 transition-colors font-heading" title="Lihat Rincian Artikel & SEO">
            <i data-lucide="eye" class="w-3.5 h-3.5"></i>
            Detail
          </button>
          <a href="../article-detail.html?slug=${a.slug}" target="_blank" class="py-1.5 px-2.5 inline-flex items-center gap-x-1 text-xs font-semibold rounded-lg border border-gray-200 bg-white text-gray-700 shadow-2xs hover:bg-gray-50 hover:text-brand-600 hover:border-brand-300 transition-colors font-heading" title="Lihat Artikel Live">
            <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
          </a>
          <button onclick="openEditArticleModal('${a.id}')" class="py-1.5 px-2.5 inline-flex items-center gap-x-1 text-xs font-semibold rounded-lg border border-gray-200 bg-white text-gray-700 shadow-2xs hover:bg-gray-50 hover:text-brand-600 hover:border-brand-300 transition-colors font-heading" title="Edit Artikel">
            <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
            Edit
          </button>
          <button onclick="deleteArticleById('${a.id}', '${a.title.replace(/'/g, "\\'")}')" class="py-1.5 px-2.5 inline-flex items-center gap-x-1 text-xs font-semibold rounded-lg border border-gray-200 bg-white text-rose-600 shadow-2xs hover:bg-rose-50 hover:border-rose-200 transition-colors font-heading" title="Hapus Artikel">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');

  if (window.initPrelineIcons) {
    window.initPrelineIcons();
  } else if (window.lucide) {
    lucide.createIcons();
  }
}

function setupSeoLivePreview() {
  const titleInput = document.getElementById('artMetaTitle');
  const descInput = document.getElementById('artMetaDesc');
  const slugInput = document.getElementById('artSlug');
  const mainTitleInput = document.getElementById('artTitle');
  const keywordInput = document.getElementById('artFocusKeyword');
  const contentInput = document.getElementById('artContent');
  const faqsInput = document.getElementById('artFaqs');

  const titleCount = document.getElementById('seoTitleCount');
  const descCount = document.getElementById('seoDescCount');
  const previewTitle = document.getElementById('googlePreviewTitle');
  const previewUrl = document.getElementById('googlePreviewUrl');
  const previewDesc = document.getElementById('googlePreviewDesc');

  function update() {
    const rawTitle = (titleInput?.value || '').trim() || (mainTitleInput?.value || '').trim() || 'Judul Artikel SEO Anda';
    const rawDesc = (descInput?.value || '').trim() || 'Deskripsi meta ringkas artikel Anda yang akan menarik calon klien mengklik tautan di mesin pencari Google.';
    const slug = (slugInput?.value || '').trim() || 'judul-artikel-baru';

    if (previewTitle) previewTitle.textContent = `${rawTitle} | Celiol Commercial Dispenser`;
    if (previewUrl) previewUrl.textContent = `https://celiol.cloud/blog/${slug}`;
    if (previewDesc) previewDesc.textContent = rawDesc;

    if (titleCount) {
      const len = rawTitle.length;
      titleCount.textContent = `${len}/60 karakter`;
      titleCount.className = `text-[11px] font-mono ${len >= 45 && len <= 65 ? 'text-emerald-600 font-bold' : len > 65 ? 'text-rose-500 font-bold' : 'text-gray-400'}`;
    }

    if (descCount) {
      const len = rawDesc.length;
      descCount.textContent = `${len}/160 karakter`;
      descCount.className = `text-[11px] font-mono ${len >= 120 && len <= 160 ? 'text-emerald-600 font-bold' : len > 160 ? 'text-rose-500 font-bold' : 'text-gray-400'}`;
    }

    updateSeoAuditScorecard();
  }

  if (titleInput) titleInput.addEventListener('input', update);
  if (descInput) descInput.addEventListener('input', update);
  if (slugInput) slugInput.addEventListener('input', update);
  if (keywordInput) keywordInput.addEventListener('input', update);
  if (contentInput) contentInput.addEventListener('input', update);
  if (faqsInput) faqsInput.addEventListener('input', update);

  if (mainTitleInput) {
    mainTitleInput.addEventListener('input', () => {
      if (!editingArticleId && slugInput) {
        slugInput.value = mainTitleInput.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
      update();
    });
  }
}

// Live Device Preview Switcher (Desktop vs Mobile Google SERP)
function setSerpDevice(device) {
  const container = document.getElementById('serpPreviewContainer');
  const desktopBtn = document.getElementById('serpPreviewDesktopBtn');
  const mobileBtn = document.getElementById('serpPreviewMobileBtn');
  if (!container) return;

  if (device === 'mobile') {
    container.className = 'p-3.5 bg-white rounded-2xl border-2 border-brand-300 max-w-sm mx-auto shadow-sm transition-all';
    if (desktopBtn) desktopBtn.className = 'py-1 px-2.5 rounded-md hover:text-gray-900 transition-colors font-heading';
    if (mobileBtn) mobileBtn.className = 'py-1 px-2.5 rounded-md bg-white text-gray-900 shadow-2xs font-heading';
  } else {
    container.className = 'p-3 bg-white rounded-lg border border-gray-100 transition-all';
    if (desktopBtn) desktopBtn.className = 'py-1 px-2.5 rounded-md bg-white text-gray-900 shadow-2xs font-heading';
    if (mobileBtn) mobileBtn.className = 'py-1 px-2.5 rounded-md hover:text-gray-900 transition-colors font-heading';
  }
}

// Live Real-Time SEO & Educational Hook Audit Scorecard
function updateSeoAuditScorecard() {
  const title = (document.getElementById('artTitle')?.value || '').trim();
  const metaTitle = (document.getElementById('artMetaTitle')?.value || '').trim();
  const slug = (document.getElementById('artSlug')?.value || '').trim();
  const metaDesc = (document.getElementById('artMetaDesc')?.value || '').trim();
  const keyword = (document.getElementById('artFocusKeyword')?.value || '').trim().toLowerCase();
  const content = (document.getElementById('artContent')?.value || '').trim();
  const faqsText = (document.getElementById('artFaqs')?.value || '').trim();

  let score = 0;

  // 1. Keyword di Title H1 (20 pts)
  const hasKwInTitle = Boolean(keyword && (title.toLowerCase().includes(keyword) || metaTitle.toLowerCase().includes(keyword)));
  updateAuditItem('auditKeywordTitle', hasKwInTitle, 'Keyword ada di Judul');
  if (hasKwInTitle) score += 20;

  // 2. Keyword di Slug (15 pts)
  const kwSlugPart = keyword ? keyword.replace(/[^a-z0-9]+/g, '-') : '';
  const hasKwInSlug = Boolean(keyword && slug.toLowerCase().includes(kwSlugPart.slice(0, 8)));
  updateAuditItem('auditKeywordSlug', hasKwInSlug, 'Keyword ada di Permalink Slug');
  if (hasKwInSlug) score += 15;

  // 3. Keyword di Meta Description (15 pts)
  const hasKwInDesc = Boolean(keyword && metaDesc.toLowerCase().includes(keyword));
  updateAuditItem('auditKeywordDesc', hasKwInDesc, 'Keyword ada di Meta Deskripsi');
  if (hasKwInDesc) score += 15;

  // 4. Panjang Meta Description Ideal 120-160 char (15 pts)
  const isDescLenIdeal = metaDesc.length >= 115 && metaDesc.length <= 165;
  updateAuditItem('auditDescLength', isDescLenIdeal, 'Panjang Meta Desc Ideal (120-160 char)');
  if (isDescLenIdeal) score += 15;
  else if (metaDesc.length >= 70) score += 8;

  // 5. Struktur Heading Sub-judul <h2> (15 pts)
  const hasH2 = /<h2[^>]*>/i.test(content) || /##\s+/i.test(content);
  updateAuditItem('auditHeadings', hasH2, 'Struktur Heading Sub-judul (<h2>) Ada');
  if (hasH2) score += 15;

  // 6. Format Edukasi (Tabel / List Bullet) (20 pts)
  const hasEduFormat = /<table|<ul|<ol|<tr>/i.test(content) || /- \w+/i.test(content);
  updateAuditItem('auditEducationFormat', hasEduFormat, 'Format Edukasi: List / Tabel / Bullet Terdeteksi');
  if (hasEduFormat) score += 20;

  score = Math.min(100, Math.max(10, score));

  // Update Score UI
  const badgeEl = document.getElementById('seoOverallScoreBadge');
  const barEl = document.getElementById('seoScoreBar');

  if (barEl) {
    barEl.style.width = `${score}%`;
    if (score >= 80) {
      barEl.className = 'bg-emerald-500 h-1.5 rounded-full transition-all duration-300';
    } else if (score >= 50) {
      barEl.className = 'bg-amber-500 h-1.5 rounded-full transition-all duration-300';
    } else {
      barEl.className = 'bg-rose-500 h-1.5 rounded-full transition-all duration-300';
    }
  }

  if (badgeEl) {
    if (score >= 80) {
      badgeEl.textContent = `${score}/100 · Sangat Optimal (Ranking #1 Siap)`;
      badgeEl.className = 'inline-block py-1 px-2.5 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 font-heading';
    } else if (score >= 50) {
      badgeEl.textContent = `${score}/100 · Cukup Baik (Perlu Sedikit Optimasi)`;
      badgeEl.className = 'inline-block py-1 px-2.5 rounded-full text-xs font-extrabold bg-amber-100 text-amber-800 font-heading';
    } else {
      badgeEl.textContent = `${score}/100 · Perlu Perbaikan Hook & Keyword`;
      badgeEl.className = 'inline-block py-1 px-2.5 rounded-full text-xs font-extrabold bg-rose-100 text-rose-800 font-heading';
    }
  }
}

function updateAuditItem(elemId, isSuccess, labelText) {
  const el = document.getElementById(elemId);
  if (!el) return;
  if (isSuccess) {
    el.innerHTML = `<i data-lucide="check" class="w-3.5 h-3.5 text-emerald-600 shrink-0"></i><span class="text-gray-900 font-semibold">${labelText}</span>`;
  } else {
    el.innerHTML = `<i data-lucide="minus" class="w-3.5 h-3.5 text-gray-400 shrink-0"></i><span class="text-gray-500">${labelText}</span>`;
  }
  if (window.lucide) lucide.createIcons();
}

function openAddArticleModal() {
  editingArticleId = null;
  const form = document.getElementById('articleForm');
  if (form) form.reset();
  const faqsInput = document.getElementById('artFaqs');
  if (faqsInput) faqsInput.value = '';

  document.getElementById('articleModalTitle').textContent = 'Buat Artikel Baru untuk Optimasi SEO';
  populateRelatedProductsCheckboxes([]);
  document.getElementById('articleModal').classList.remove('hidden');
  document.getElementById('artMetaTitle').dispatchEvent(new Event('input'));
  if (window.initPrelineIcons) window.initPrelineIcons();
  else if (window.lucide) lucide.createIcons();
}

function openEditArticleModal(id) {
  const a = window.CeliolData.getArticleById(id);
  if (!a) return;

  editingArticleId = id;
  document.getElementById('articleModalTitle').textContent = `Edit Artikel: ${a.title}`;

  document.getElementById('artTitle').value = a.title;
  document.getElementById('artSlug').value = a.slug;
  document.getElementById('artCategory').value = a.category;
  document.getElementById('artExcerpt').value = a.excerpt;
  document.getElementById('artContent').value = a.contentHtml;
  document.getElementById('artImage').value = a.featuredImage;
  document.getElementById('artImageAlt').value = a.featuredImageAlt || '';
  document.getElementById('artAuthorName').value = a.author?.name || 'Albert Adi Nugraha';
  document.getElementById('artAuthorRole').value = a.author?.role || 'Commercial Water Solution Specialist';
  document.getElementById('artReadTime').value = a.readTimeMinutes || 5;
  document.getElementById('artStatus').value = a.status;
  document.getElementById('artTags').value = (a.tags || []).join(', ');

  document.getElementById('artFocusKeyword').value = a.seo?.focusKeyword || '';
  document.getElementById('artMetaTitle').value = a.seo?.metaTitle || '';
  document.getElementById('artMetaDesc').value = a.seo?.metaDescription || '';

  const faqsInput = document.getElementById('artFaqs');
  if (faqsInput) {
    if (Array.isArray(a.faqs) && a.faqs.length > 0) {
      faqsInput.value = a.faqs.map(f => `${f.question} | ${f.answer}`).join('\n');
    } else {
      faqsInput.value = '';
    }
  }

  populateRelatedProductsCheckboxes(a.relatedProductIds || []);

  document.getElementById('articleModal').classList.remove('hidden');
  document.getElementById('artMetaTitle').dispatchEvent(new Event('input'));
  if (window.initPrelineIcons) window.initPrelineIcons();
  else if (window.lucide) lucide.createIcons();
}

function populateRelatedProductsCheckboxes(selectedIds) {
  const container = document.getElementById('artRelatedProductsContainer');
  if (!container) return;

  const products = window.CeliolData.getProducts();
  container.innerHTML = products.map(p => `
    <label class="flex items-center gap-2 p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer text-xs">
      <input type="checkbox" name="artRelProd" value="${p.id}" ${selectedIds.includes(p.id) ? 'checked' : ''} class="shrink-0 border-gray-300 rounded text-brand-600 focus:ring-brand-500">
      <span class="font-medium text-gray-800">[${p.modelCode}] ${p.name}</span>
    </label>
  `).join('');
}

function closeArticleModal() {
  document.getElementById('articleModal').classList.add('hidden');
}

function handleArticleFormSubmit(e) {
  e.preventDefault();

  const relProds = [];
  document.querySelectorAll('input[name="artRelProd"]:checked').forEach(cb => relProds.push(cb.value));

  const tagsRaw = document.getElementById('artTags').value;
  const tags = tagsRaw.split(',').map(t => t.trim()).filter(Boolean);

  const title = document.getElementById('artTitle').value.trim();
  const slug = document.getElementById('artSlug').value.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  const faqsText = document.getElementById('artFaqs')?.value || '';
  const parsedFaqs = [];
  if (faqsText.trim()) {
    faqsText.split('\n').forEach(line => {
      const parts = line.split('|');
      if (parts.length >= 2 && parts[0].trim()) {
        parsedFaqs.push({
          question: parts[0].trim(),
          answer: parts.slice(1).join('|').trim()
        });
      }
    });
  }

  const articleObj = {
    id: editingArticleId,
    title: title,
    slug: slug,
    category: document.getElementById('artCategory').value,
    excerpt: document.getElementById('artExcerpt').value.trim(),
    contentHtml: document.getElementById('artContent').value.trim(),
    featuredImage: document.getElementById('artImage').value.trim() || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    featuredImageAlt: document.getElementById('artImageAlt').value.trim() || title,
    author: {
      name: document.getElementById('artAuthorName').value.trim() || 'Albert Adi Nugraha',
      role: document.getElementById('artAuthorRole').value.trim() || 'Commercial Water Solution Specialist',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80'
    },
    readTimeMinutes: parseInt(document.getElementById('artReadTime').value, 10) || 5,
    status: document.getElementById('artStatus').value,
    tags: tags.length > 0 ? tags : ["dispenser komersial", "kualitas air"],
    relatedProductIds: relProds,
    faqs: parsedFaqs,
    seo: {
      focusKeyword: document.getElementById('artFocusKeyword').value.trim(),
      metaTitle: document.getElementById('artMetaTitle').value.trim() || title,
      metaDescription: document.getElementById('artMetaDesc').value.trim() || document.getElementById('artExcerpt').value.trim()
    }
  };

  window.CeliolData.saveArticle(articleObj);
  closeArticleModal();
  renderArticlesTable();
  showPrelineToast(`Artikel "${articleObj.title}" berhasil dipublikasikan!`, 'success');
}

function deleteArticleById(id, title) {
  if (confirm(`Apakah Anda yakin ingin menghapus artikel "${title}"?`)) {
    window.CeliolData.deleteArticle(id);
    renderArticlesTable();
    showPrelineToast(`Artikel "${title}" telah dihapus.`, 'success');
  }
}

// ==========================================
// 4. DETAIL MODALS LOGIC (NO TRUNCATED CONTENT)
// ==========================================

function openLeadDetailModal(id) {
  const modal = document.getElementById('leadDetailModal');
  if (!modal) return;

  const leads = window.CeliolData.getLeads();
  const lead = leads.find(l => l.id === id);
  if (!lead) return;

  const titleEl = document.getElementById('leadDetailTitle');
  if (titleEl) titleEl.textContent = `Prospek: ${lead.fullName}`;

  const contentEl = document.getElementById('leadDetailContent');
  if (contentEl) {
    contentEl.innerHTML = `
      <div class="bg-gray-50/80 rounded-2xl p-4 border border-gray-200">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <span class="text-[10px] uppercase font-bold text-gray-400 font-heading">Nama Lengkap PIC</span>
            <p class="text-sm font-bold text-gray-900 font-heading mt-0.5">${lead.fullName}</p>
          </div>
          <div>
            <span class="text-[10px] uppercase font-bold text-gray-400 font-heading">Perusahaan / Institusi</span>
            <p class="text-sm font-semibold text-gray-800 font-heading mt-0.5">${lead.companyName}</p>
          </div>
          <div>
            <span class="text-[10px] uppercase font-bold text-gray-400 font-heading">Email Resmi</span>
            <p class="text-xs font-mono text-gray-700 mt-0.5">${lead.email || '-'}</p>
          </div>
          <div>
            <span class="text-[10px] uppercase font-bold text-gray-400 font-heading">Nomor Telepon / WhatsApp</span>
            <p class="text-xs font-mono font-bold text-emerald-700 mt-0.5">${lead.phone || '-'}</p>
          </div>
          <div>
            <span class="text-[10px] uppercase font-bold text-gray-400 font-heading">Waktu Pengiriman</span>
            <p class="text-xs text-gray-600 mt-0.5">${lead.submittedAt}</p>
          </div>
          <div>
            <span class="text-[10px] uppercase font-bold text-gray-400 font-heading">Status Prospek</span>
            <div class="mt-0.5">
              <span class="inline-flex items-center gap-1.5 py-0.5 px-2.5 rounded-full text-[11px] font-semibold ${lead.status === 'new' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}">
                <span class="w-1.5 h-1.5 rounded-full ${lead.status === 'new' ? 'bg-amber-500' : 'bg-emerald-500'}"></span>
                ${lead.status === 'new' ? 'Baru Masuk (Belum Dihubungi)' : 'Sudah Dihubungi & Ditindaklanjuti'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div class="p-3.5 rounded-xl border border-gray-200 bg-white shadow-2xs">
          <span class="text-[10px] uppercase font-bold text-gray-400 font-heading">Model yang Diminati</span>
          <p class="text-xs font-bold text-brand-700 mt-0.5">${lead.interestedModel || 'Konsultasi Rekomendasi'}</p>
        </div>
        <div class="p-3.5 rounded-xl border border-gray-200 bg-white shadow-2xs">
          <span class="text-[10px] uppercase font-bold text-gray-400 font-heading">Estimasi Karyawan / Pengguna</span>
          <p class="text-xs font-semibold text-gray-800 mt-0.5">${lead.employeeCount || '50-80 Orang'}</p>
        </div>
      </div>

      <div class="p-4 rounded-xl border border-gray-200 bg-white shadow-2xs">
        <span class="text-[10px] uppercase font-bold text-gray-400 font-heading block mb-1.5">Catatan Pesan & Kebutuhan Spesifik:</span>
        <div class="p-3.5 bg-gray-50 rounded-xl text-xs text-gray-800 leading-relaxed whitespace-pre-wrap font-sans border border-gray-100">
          ${lead.message || '<em class="text-gray-400">Tidak ada catatan pesan tambahan dari calon klien.</em>'}
        </div>
      </div>
    `;
  }

  const cleanPhone = (lead.phone || '').replace(/[^0-9]/g, '');
  const waPhone = cleanPhone.startsWith('0') ? '62' + cleanPhone.substring(1) : cleanPhone;
  const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(`Halo Bapak/Ibu ${lead.fullName}, kami dari Celiol Dispenser menindaklanjuti permintaan konsultasi dispenser untuk ${lead.companyName}.`)}`;

  const leftActionEl = document.getElementById('leadDetailActionLeft');
  if (leftActionEl) {
    leftActionEl.innerHTML = `
      <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="py-2 px-4 inline-flex items-center gap-1.5 text-xs font-semibold font-heading rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all">
        <i data-lucide="message-circle" class="w-4 h-4"></i>
        <span>Hubungi via WhatsApp</span>
      </a>
      <button type="button" onclick="toggleLeadStatus('${lead.id}'); openLeadDetailModal('${lead.id}')" class="py-2 px-3 inline-flex items-center gap-1.5 text-xs font-semibold font-heading rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
        <i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i>
        <span>Ubah Status: ${lead.status === 'new' ? 'Tandai Sudah Dihubungi' : 'Tandai Baru'}</span>
      </button>
    `;
  }

  modal.classList.remove('hidden');
  if (window.initPrelineIcons) window.initPrelineIcons();
  else if (window.lucide) lucide.createIcons();
}

function closeLeadDetailModal() {
  const modal = document.getElementById('leadDetailModal');
  if (modal) modal.classList.add('hidden');
}

function openProductDetailModal(id) {
  const modal = document.getElementById('productDetailModal');
  if (!modal) return;

  const p = window.CeliolData.getProductById(id);
  if (!p) return;

  const titleEl = document.getElementById('productDetailModalTitle');
  if (titleEl) titleEl.textContent = `${p.name} (${p.modelCode})`;

  const editBtn = document.getElementById('productDetailEditBtn');
  if (editBtn) {
    editBtn.onclick = () => {
      closeProductDetailModal();
      openEditProductModal(p.id);
    };
  }

  const contentEl = document.getElementById('productDetailContent');
  if (contentEl) {
    const formattedPrice = p.purchasePrice ? `Rp ${p.purchasePrice.toLocaleString('id-ID')}` : '-';
    const maintenancePrice = p.monthlyMaintenancePrice ? `Rp ${p.monthlyMaintenancePrice.toLocaleString('id-ID')}/bln` : 'Rp 500.000/bln';

    contentEl.innerHTML = `
      <div class="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-gray-50/80 border border-gray-200">
        <img src="${p.imageCover}" alt="${p.name}" class="w-24 h-32 object-contain rounded-xl bg-white p-2 border border-gray-200 shadow-2xs shrink-0">
        <div class="flex-1 text-center sm:text-left">
          <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
            <span class="text-[11px] font-mono font-bold text-brand-700 bg-brand-50 border border-brand-200 px-2 py-0.5 rounded-md">${p.modelCode}</span>
            <span class="inline-flex items-center gap-1 py-0.5 px-2 rounded-full text-[10px] font-bold ${p.status === 'active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-600 border border-gray-200'}">
              <span class="w-1.5 h-1.5 rounded-full ${p.status === 'active' ? 'bg-emerald-500' : 'bg-gray-400'}"></span>
              ${p.status === 'active' ? 'Katalog Aktif' : 'Draft'}
            </span>
            ${p.isFeatured ? '<span class="text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full">★ Model Unggulan Beranda</span>' : ''}
          </div>
          <h4 class="text-base font-bold text-gray-900 font-heading">${p.name}</h4>
          <p class="text-xs text-gray-500 mt-0.5">${p.series} · Warna: ${p.color || 'Black'} · Material: ${p.bodyMaterial || 'Stainless Steel'}</p>
          <div class="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-semibold">
            <div>
              <span class="text-[10px] text-gray-400 block font-normal uppercase font-heading">Harga Pembelian Unit</span>
              <span class="text-sm font-extrabold text-gray-900 font-heading">${formattedPrice}</span>
            </div>
            <div class="h-6 w-px bg-gray-300 hidden sm:block"></div>
            <div>
              <span class="text-[10px] text-gray-400 block font-normal uppercase font-heading">Paket Maintenance</span>
              <span class="text-sm font-bold text-brand-600 font-heading">${maintenancePrice}</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h5 class="text-[11px] font-bold uppercase tracking-wider text-gray-500 font-heading mb-2">Spesifikasi Teknis & Kapasitas</h5>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div class="p-3 rounded-xl border border-gray-200 bg-white shadow-2xs">
            <span class="text-[10px] uppercase text-gray-400 font-heading block">Rekomendasi Pengguna</span>
            <span class="text-xs font-semibold text-gray-800">${p.recommendedPax || '50 - 80 Orang / hari'}</span>
          </div>
          <div class="p-3 rounded-xl border border-gray-200 bg-white shadow-2xs">
            <span class="text-[10px] uppercase text-gray-400 font-heading block">Kran & Suhu</span>
            <span class="text-xs font-semibold text-gray-800">${p.spouts || '2-3 Kran (Bisa Custom Suhu)'}</span>
          </div>
          <div class="p-3 rounded-xl border border-gray-200 bg-white shadow-2xs">
            <span class="text-[10px] uppercase text-gray-400 font-heading block">Teknologi Filtrasi</span>
            <span class="text-xs font-semibold text-gray-800">5-Tahap RO 0.0001 µm</span>
          </div>
          <div class="p-3 rounded-xl border border-gray-200 bg-white shadow-2xs">
            <span class="text-[10px] uppercase text-gray-400 font-heading block">Dimensi Unit (P×L×T)</span>
            <span class="text-xs font-mono font-medium text-gray-800">${p.dimensions || '560 x 430 x 1520 mm'}</span>
          </div>
          <div class="p-3 rounded-xl border border-gray-200 bg-white shadow-2xs">
            <span class="text-[10px] uppercase text-gray-400 font-heading block">Konsumsi Daya Listrik</span>
            <span class="text-xs font-semibold text-gray-800">Panas ${p.powerWatt?.heating || 2000}W · Dingin ${p.powerWatt?.cooling || 120}W</span>
          </div>
          <div class="p-3 rounded-xl border border-gray-200 bg-white shadow-2xs">
            <span class="text-[10px] uppercase text-gray-400 font-heading block">Tegangan Listrik</span>
            <span class="text-xs font-mono font-medium text-gray-800">${p.voltage || '220-240V ~ 50-60 Hz'}</span>
          </div>
        </div>
      </div>

      <div>
        <h5 class="text-[11px] font-bold uppercase tracking-wider text-gray-500 font-heading mb-2">Penempatan Fasilitas & Standar Kepatuhan</h5>
        <div class="p-3.5 rounded-xl border border-gray-200 bg-white shadow-2xs space-y-2">
          <div class="flex items-start gap-2.5">
            <i data-lucide="map-pin" class="w-4 h-4 text-brand-600 shrink-0 mt-0.5"></i>
            <span class="text-xs text-gray-700"><strong>Penempatan Area:</strong> ${p.idealFor || 'Ruang Kerja Kantor, Area Pantri, Fasilitas Publik, Koridor Gedung'}</span>
          </div>
          <div class="flex items-start gap-2.5">
            <i data-lucide="shield-check" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"></i>
            <span class="text-xs text-gray-700"><strong>Standar Kepatuhan Air Minum:</strong> ${p.standardSop || 'Permenkes No. 2 Tahun 2023'}</span>
          </div>
          ${p.pdfDatasheetUrl ? `
            <div class="flex items-start gap-2.5 pt-1 border-t border-gray-100">
              <i data-lucide="file-text" class="w-4 h-4 text-brand-600 shrink-0 mt-0.5"></i>
              <a href="../${p.pdfDatasheetUrl}" target="_blank" class="text-xs font-semibold text-brand-600 hover:underline flex items-center gap-1 font-heading">
                Unduh PDF Brosur & Katalog Resmi
                <i data-lucide="download" class="w-3.5 h-3.5"></i>
              </a>
            </div>
          ` : ''}
        </div>
      </div>

      <div>
        <h5 class="text-[11px] font-bold uppercase tracking-wider text-gray-500 font-heading mb-2">Seluruh Fitur Unggulan Model</h5>
        <ul class="space-y-1.5 bg-gray-50/80 p-3.5 rounded-xl border border-gray-200">
          ${(p.keyFeatures || []).map(f => `
            <li class="flex items-start gap-2 text-xs text-gray-700">
              <i data-lucide="check" class="w-3.5 h-3.5 text-brand-600 shrink-0 mt-0.5"></i>
              <span>${f}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  }

  modal.classList.remove('hidden');
  if (window.initPrelineIcons) window.initPrelineIcons();
  else if (window.lucide) lucide.createIcons();
}

function closeProductDetailModal() {
  const modal = document.getElementById('productDetailModal');
  if (modal) modal.classList.add('hidden');
}

function openArticleDetailModal(id) {
  const modal = document.getElementById('articleDetailModal');
  if (!modal) return;

  const a = window.CeliolData.getArticleById(id);
  if (!a) return;

  const titleEl = document.getElementById('articleDetailModalTitle');
  if (titleEl) titleEl.textContent = a.title;

  const editBtn = document.getElementById('articleDetailEditBtn');
  if (editBtn) {
    editBtn.onclick = () => {
      closeArticleDetailModal();
      if (typeof openEditArticleModal === 'function') {
        openEditArticleModal(a.id);
      } else {
        window.location.href = `articles.html`;
      }
    };
  }

  const contentEl = document.getElementById('articleDetailContent');
  if (contentEl) {
    const allProducts = window.CeliolData.getProducts();
    const relProducts = allProducts.filter(p => (a.relatedProductIds || []).includes(p.id));

    let relProductsHtml = '';
    if (relProducts.length > 0) {
      relProductsHtml = `
        <div>
          <span class="text-[11px] font-bold text-gray-400 uppercase font-heading block mb-2">Model Dispenser Tertaut di Sidebar:</span>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            ${relProducts.map(rp => `
              <div class="flex items-center gap-2.5 p-2 rounded-xl border border-gray-200 bg-white text-xs">
                <img src="${rp.imageCover}" alt="${rp.name}" class="w-8 h-10 object-contain rounded bg-gray-50 p-0.5 border border-gray-200 shrink-0">
                <div class="min-w-0">
                  <div class="font-bold text-gray-900 truncate font-heading">${rp.name}</div>
                  <div class="text-[10px] text-brand-700 font-mono">${rp.modelCode}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    contentEl.innerHTML = `
      <div class="flex flex-col sm:flex-row items-start gap-4 p-4 rounded-2xl bg-gray-50/80 border border-gray-200">
        <img src="${a.featuredImage}" alt="${a.title}" class="w-full sm:w-36 h-24 object-cover rounded-xl border border-gray-200 shadow-2xs shrink-0">
        <div class="flex-1">
          <div class="flex flex-wrap items-center gap-2 mb-1.5">
            <span class="text-xs font-bold text-brand-700 font-heading">${a.category}</span>
            <span class="text-gray-300">·</span>
            <span class="text-xs text-gray-500">${a.publishedAt}</span>
            <span class="text-gray-300">·</span>
            <span class="text-xs text-gray-500">${a.readTimeMinutes} min baca</span>
            <span class="text-gray-300">·</span>
            <span class="text-xs text-gray-700 font-semibold">${a.viewCount} views</span>
            <span class="inline-flex items-center gap-1 py-0.5 px-2 rounded-full text-[10px] font-bold ${a.status === 'published' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-600 border border-gray-200'}">
              <span class="w-1.5 h-1.5 rounded-full ${a.status === 'published' ? 'bg-emerald-500' : 'bg-gray-400'}"></span>
              ${a.status === 'published' ? 'Live di Google' : 'Draft'}
            </span>
          </div>
          <h4 class="text-base font-bold text-gray-900 font-heading leading-snug">${a.title}</h4>
          <div class="mt-2 flex items-center gap-2 text-xs text-gray-500 font-mono">
            <span class="text-gray-400">URL:</span>
            <a href="../article-detail.html?slug=${a.slug}" target="_blank" class="text-brand-600 hover:underline flex items-center gap-1 font-mono">
              /blog/${a.slug}
              <i data-lucide="external-link" class="w-3 h-3"></i>
            </a>
          </div>
          <div class="text-[11px] text-gray-500 mt-1">
            Penulis: <strong class="text-gray-700 font-heading">${a.author?.name || 'Albert Adi Nugraha'}</strong> (${a.author?.role || 'Commercial Water Solution Specialist'})
          </div>
        </div>
      </div>

      <div class="p-4 rounded-xl border border-gray-200 bg-white shadow-2xs">
        <span class="text-[10px] uppercase font-bold text-gray-400 font-heading block mb-1.5">Ringkasan Intisari (Excerpt Lengkap):</span>
        <p class="text-xs text-gray-700 leading-relaxed italic bg-gray-50 p-3 rounded-lg border border-gray-100">
          "${a.excerpt || 'Tidak ada ringkasan.'}"
        </p>
      </div>

      <div class="p-4 rounded-xl border border-gray-200 bg-white shadow-2xs space-y-3">
        <div class="text-[11px] font-bold uppercase tracking-wider text-brand-700 font-heading flex items-center gap-1.5">
          <i data-lucide="globe" class="w-3.5 h-3.5"></i>
          Parameter Optimasi Mesin Pencari (Google SERP & SEO)
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div class="bg-gray-50 p-3 rounded-lg border border-gray-100">
            <span class="text-[10px] uppercase font-bold text-gray-400 block mb-0.5">Focus Keyword</span>
            <span class="font-bold text-gray-800">${a.seo?.focusKeyword || 'Belum ditentukan'}</span>
          </div>
          <div class="bg-gray-50 p-3 rounded-lg border border-gray-100">
            <span class="text-[10px] uppercase font-bold text-gray-400 block mb-0.5">SEO Meta Title (${(a.seo?.metaTitle || '').length} karakter)</span>
            <span class="font-medium text-gray-800">${a.seo?.metaTitle || a.title}</span>
          </div>
        </div>
        <div class="bg-gray-50 p-3 rounded-lg border border-gray-100 text-xs">
          <span class="text-[10px] uppercase font-bold text-gray-400 block mb-0.5">SEO Meta Description (${(a.seo?.metaDescription || '').length} karakter)</span>
          <p class="text-gray-700 leading-relaxed">${a.seo?.metaDescription || a.excerpt || '-'}</p>
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <span class="text-[11px] font-bold text-gray-400 uppercase font-heading">Tags Terkait:</span>
        ${(a.tags || []).map(t => `<span class="bg-gray-100 text-gray-700 border border-gray-200 px-2.5 py-0.5 rounded-md text-[11px] font-medium">#${t}</span>`).join('')}
      </div>

      ${relProductsHtml}
    `;
  }

  modal.classList.remove('hidden');
  if (window.initPrelineIcons) window.initPrelineIcons();
  else if (window.lucide) lucide.createIcons();
}

function closeArticleDetailModal() {
  const modal = document.getElementById('articleDetailModal');
  if (modal) modal.classList.add('hidden');
}

window.openLeadDetailModal = openLeadDetailModal;
window.closeLeadDetailModal = closeLeadDetailModal;
window.openProductDetailModal = openProductDetailModal;
window.closeProductDetailModal = closeProductDetailModal;
window.openArticleDetailModal = openArticleDetailModal;
window.closeArticleDetailModal = closeArticleDetailModal;

// ==========================================
// 5. GOOGLE AI PRO (GEMINI) 1-CLICK IMPORT & MASTER PROMPT LOGIC
// ==========================================

let selectedQuickTopic = '';

function applyQuickTopic(topicText) {
  selectedQuickTopic = topicText || '';
  if (topicText) {
    showPrelineToast(`Topik "${topicText.slice(0, 35)}..." terpasang ke Master Prompt!`, 'success');
  }
}

const CELIOL_MASTER_PROMPT_TEMPLATE = `Anda adalah Senior Water Quality Educator, Environmental Health Specialist, & Technical SEO Content Strategist untuk Celiol Dispenser (PT Noto Water Envirotech - https://celiol.cloud).

Tugas Anda: Menulis artikel edukatif, berbobot ilmiah, berbasis rujukan media berita kredibel dan riset kesehatan terkini, dengan gaya penulisan informatif yang memiliki SEO HOOK kuat untuk merajai Halaman 1 Google SERP.

ATURAN UTAMA & LARANGAN KERAS:
1. JANGAN PERNAH MEMBAHAS UANG, BIAYA, ROI, ATAU BEP:
   - DILARANG menggunakan kata atau konsep finansial seperti: ROI (Return on Investment), BEP (Break Even Point), Biaya, Harga, Penghematan Anggaran, Rupiah, Investasi Finansial, Biaya Per Galon, dsb.
   - Konten WAJIB 100% murni EDUKASI tentang kualitas air minum secara umum, kesehatan hidrasi, sains pemurnian air, mikrobiologi/kimia air, standar baku mutu kesehatan, dan proteksi lingkungan.
2. WAJIB MERUJUK SUMBER MEDIA BERITA KREDIBEL & SUMBER ILMIAH TERUPDATE:
   - Setiap artikel wajib mencantumkan fakta, data, atau temuan yang bersumber dari media berita nasional/internasional kredibel (seperti Kompas, Detik Health, Tempo, BBC News Indonesia, CNN Indonesia, Antara News) atau institusi ilmiah/kesehatan terpercaya (seperti Permenkes No. 2 Tahun 2023, Kementerian Kesehatan RI, World Health Organization (WHO), riset universitas tentang mikroplastik dan kualitas air).
   - Sebutkan konteks rujukan secara alami di dalam paragraf (Contoh: "Berdasarkan laporan riset kualitas air minum yang dirilis media nasional...", "Mengacu pada pedoman baku mutu WHO...", "Sesuai regulasi Permenkes No. 2 Tahun 2023...").
3. LARANGAN KATA LAIN:
   - JANGAN PERNAH gunakan kata "Sewa" atau "Rental".
   - HINDARI kata singkatan "B2B" (Gunakan: "Fasilitas Perkantoran & Industri", "Gedung Komersial", "Instansi & Korporasi").
   - HINDARI klaim berlebihan (overclaim) seperti "steril 100% instan".

PANDUAN FORMULA HOOK & STRUKTUR EDUKASI (WAJIB DITERAPKAN):
1. JUDUL EDUKASI BER-HOOK TINGGI (CTR BOOSTER):
   - Gunakan format judul yang memancing rasa ingin tahu ilmiah di Google: gunakan angka riset, fakta mengejutkan, bahaya mikroplastik/biofilm, atau regulasi kesehatan (Contoh: "5 Fakta Mikroplastik dalam Air Minum Menurut Riset...", "Standar Baku Mutu Permenkes No. 2/2023: Mengapa Kualitas Air Gedung Harus Diuji?", "Bahaya Tersembunyi Biofilm pada Kran Air Minum...").
2. PARAGRAF PEMBUKA (PAS FRAMEWORK):
   - Buka dengan Problem & Agitation: Paparkan fakta riset / berita tentang risiko kualitas air minum yang sering luput dari perhatian (seperti mikropartikel plastik, kontaminasi leher kran, bakteri oportunistik, atau sisa klorin/logam berat).
   - Tawarkan Solution: Solusi pemurnian direct-pipe dengan sistem filtrasi 5-Tahap Reverse Osmosis (RO) berpresisi 0.0001 mikron.
3. TABEL KOMPARASI EDUKATIF (DI DALAM CONTENTHTML - TANPA PARAMETER UANG):
   - Sertakan 1 tabel perbandingan parameter kualitas dan higienitas antara "Sistem Direct-Pipe RO Celiol" vs "Air Minum Galon Konvensional".
   - Parameter perbandingan: Presisi Filtrasi Molekuler, Residu Mikroplastik, Proteksi Biofilm di Jalur Distribusi, Kepatuhan Standar Permenkes No. 2/2023, dan Kualitas Material Tangki Simpan (SUS 304 Food-Grade vs Wadah Plastik Polikarbonat). DILARANG memasukkan baris biaya/harga/rupiah!
4. FAQ RICH SNIPPET (UNTUK TAMPIL DI GOOGLE SEARCH ACCORDION):
   - Sertakan 3-4 pertanyaan kunci (FAQ) edukatif yang sering diketik publik di Google beserta jawaban lugas berbasis sains.
5. STANDAR TEKNIS & KEPATUHAN CELIOL:
   - Dispenser Direct-Pipe terkoneksi langsung ke jalur air gedung tanpa galon.
   - Seri: "Deluxe Facility" (Stainless Steel SUS 304) & "Ultimate Facility" (Lacquered Tempered Glass SUS 304).
   - Fitur "Bisa Custom Suhu": 2 atau 3 kran (panas, dingin, normal/ambient).
   - Filtrasi 5-Tahap RO 0.0001 Mikron menyaring mikroplastik, bakteri, virus, klorin, dan logam berat.
   - Standar Permenkes No. 2 Tahun 2023, Food-Grade Stainless Steel SUS 304, BPA-Free.
6. STRUKTUR FORMAT HTML KONTEN (PENTING AGAR TIDAK MENUMPUK):
   - Setiap paragraf WAJIB dibungkus tag <p class="mb-5 leading-relaxed"> dan dipisahkan jeda baris ganda (\\n\\n).
   - Setiap sub-judul topik WAJIB menggunakan tag <h2> dengan jeda baris jelas sebelum dan sesudahnya.
   - Setiap poin bernomor WAJIB menggunakan tag <ol class="list-decimal pl-6 my-4 space-y-2.5"><li><strong>Nama Poin:</strong> Penjelasan mendalam...</li></ol>.
   - DILARANG KERAS menempelkan judul ke kalimat berikutnya atau menggabungkan poin tanpa jeda baris.

FORMAT KELUARAN (WAJIB KELUARKAN DALAM BLOK JSON MURNI TANPA TEKS LAIN SEBELUM ATAU SESUDAHNYA):
{
  "title": "Judul artikel edukatif ber-hook tajam dan ramah SEO (maksimal 70 karakter)",
  "slug": "url-permalink-ramah-seo-huruf-kecil-dipisah-tanda-hubung",
  "category": "Pilih salah satu: Sanitasi & Higienitas | Teknologi Filtrasi | Kualitas Air & Regulasi | Studi Kasus Fasilitas",
  "excerpt": "Ringkasan intisari artikel 2-3 kalimat berbasis fakta ilmiah/berita yang memikat pembaca (maksimal 200 karakter).",
  "contentHtml": "<p class=\\"mb-5 leading-relaxed\\">Paragraf pembuka ber-hook kuat dengan rujukan berita/riset terkini...</p>\\n\\n<h2>Sub-judul Bahaya Kualitas Air & Fakta Riset</h2>\\n\\n<p class=\\"mb-5 leading-relaxed\\">Penjelasan mendalam mengutip rujukan media berita atau jurnal ilmiah...</p>\\n\\n<ol class=\\"list-decimal pl-6 my-4 space-y-2.5\\">\\n  <li><strong>Fakta Kualitas 1:</strong> Uraian parameter...</li>\\n  <li><strong>Fakta Kualitas 2:</strong> Uraian parameter...</li>\\n</ol>\\n\\n<div class=\\"overflow-x-auto my-6\\"><table class=\\"min-w-full border text-xs sm:text-sm\\"><thead><tr class=\\"bg-slate-100\\"><th class=\\"p-3 text-left\\">Parameter Kualitas Air</th><th class=\\"p-3 text-left\\">Air Minum Galon Biasa</th><th class=\\"p-3 text-left text-brand-700\\">Dispenser RO Celiol</th></tr></thead><tbody><tr><td class=\\"p-3 font-semibold\\">Presisi Filtrasi Molekuler</td><td class=\\"p-3\\">Bervariasi (Risiko Partikel Terlarut)</td><td class=\\"p-3 font-bold text-emerald-700\\">RO 0.0001 Mikron (Penyaringan Molekuler)</td></tr><tr><td class=\\"p-3 font-semibold\\">Residu Mikroplastik</td><td class=\\"p-3\\">Rentan Partikel Mikroplastik Kemasan</td><td class=\\"p-3 font-bold text-emerald-700\\">Bebas Mikroplastik (Tersaring 99.99%)</td></tr><tr><td class=\\"p-3 font-semibold\\">Standar Higienitas Wadah</td><td class=\\"p-3\\">Plastik Berulang Rentan Biofilm</td><td class=\\"p-3 font-bold text-emerald-700\\">Tangki SUS 304 Food-Grade BPA-Free</td></tr><tr><td class=\\"p-3 font-semibold\\">Kepatuhan Permenkes No. 2/2023</td><td class=\\"p-3\\">Tergantung Penanganan Distribusi Fisik</td><td class=\\"p-3 font-bold text-emerald-700\\">Terpenuhi Konsisten di Titik Kran</td></tr></tbody></table></div>\\n\\n<h2>Sub-judul Solusi Reverse Osmosis 0.0001 Mikron & Standar Kesehatan</h2>\\n\\n<p class=\\"mb-5 leading-relaxed\\">Penjelasan sistem filtrasi Reverse Osmosis berpresisi 0.0001 mikron dan kepatuhan baku mutu Permenkes No. 2 Tahun 2023...</p>\\n\\n<h2>Kesimpulan & Rekomendasi Solusi Celiol</h2>\\n\\n<p class=\\"mb-5 leading-relaxed\\">Rekomendasi implementasi sistem pemurnian air direct-pipe Celiol untuk menjamin kesehatan pengguna fasilitas secara berkelanjutan...</p>",
  "featuredImage": "assets/img/additional/Celiol Dispenser - 01.png",
  "featuredImageAlt": "Dispenser air minum tanpa galon direct-pipe berstandar higienis Permenkes",
  "readTimeMinutes": 5,
  "tags": ["kualitas air", "mikroplastik", "reverse osmosis", "permenkes 2023", "higienitas"],
  "relatedProductIds": ["prod-cswds-2n1h1", "prod-cswds-3n1h1c1"],
  "faqs": [
    {
      "question": "Apakah membran Reverse Osmosis (RO) 0.0001 mikron efektif menyaring mikroplastik?",
      "answer": "Berdasarkan studi ilmiah, membran RO dengan kerapatan pori 0.0001 mikron sangat efektif mengeliminasi partikel mikroplastik dan nanoplastik, logam berat terlarut, serta bakteri patogen hingga 99.99%."
    },
    {
      "question": "Bagaimana cara mencegah pembentukan biofilm pada kran dispenser air minum?",
      "answer": "Gunakan dispenser tertutup direct-pipe dengan tangki Stainless Steel SUS 304 food-grade serta pembersihan berkala terencana untuk mencegah mikroorganisme dan debu luar membentuk lapisan lendir (biofilm)."
    },
    {
      "question": "Apa saja parameter kelayakan air minum menurut Permenkes No. 2 Tahun 2023?",
      "answer": "Regulasi Permenkes No. 2/2023 menetapkan standar ketat mencakup nol bakteri patogen (E. coli), batasan aman TDS, ketiadaan logam berat berbahaya, serta parameter fisik seperti kejernihan, tidak berbau, dan tidak berasa."
    }
  ],
  "seo": {
    "focusKeyword": "kata kunci target edukasi 2-4 kata",
    "metaTitle": "Judul SEO Informatif untuk Hasil Pencarian Google (50-60 karakter)",
    "metaDescription": "Deskripsi edukatif persuasif untuk cuplikan Google SERP (130-155 karakter)"
  }
}

TOPIK ARTIKEL YANG SAYA INGINKAN:
{{TOPIC_PLACEHOLDER}}`;

function copyMasterPrompt() {
  const selectEl = document.getElementById('quickTopicSelect');
  const chosenTopic = selectEl?.value || selectedQuickTopic || '[TULISKAN TOPIK, PERTANYAAN, ATAU KASUS YANG INGIN DIBAHAS DI SINI]';
  const promptText = CELIOL_MASTER_PROMPT_TEMPLATE.replace('{{TOPIC_PLACEHOLDER}}', chosenTopic);

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(promptText).then(() => {
      handlePromptCopiedSuccess();
    }).catch(() => {
      fallbackCopyPrompt(promptText);
    });
  } else {
    fallbackCopyPrompt(promptText);
  }
}

function fallbackCopyPrompt(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.left = '-9999px';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    handlePromptCopiedSuccess();
  } catch (err) {
    showPrelineToast('Gagal menyalin otomatis. Silakan salin manual dari panduan.', 'error');
  }
  document.body.removeChild(ta);
}

function handlePromptCopiedSuccess() {
  const btn = document.getElementById('copyPromptBtn');
  if (btn) {
    const originalHtml = btn.innerHTML;
    btn.innerHTML = `<i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i><span>Tersalin ke Clipboard!</span>`;
    if (window.lucide) lucide.createIcons();
    setTimeout(() => {
      btn.innerHTML = originalHtml;
      if (window.lucide) lucide.createIcons();
    }, 2500);
  }
  showPrelineToast('Master Prompt Google AI Pro ber-Hook SEO berhasil disalin!', 'success');
}

function openAiImportModal() {
  const modal = document.getElementById('aiImportModal');
  if (!modal) return;
  const input = document.getElementById('aiImportInput');
  if (input) input.value = '';
  const errEl = document.getElementById('aiImportErrorMsg');
  if (errEl) errEl.classList.add('hidden');
  modal.classList.remove('hidden');
  if (window.initPrelineIcons) window.initPrelineIcons();
  else if (window.lucide) lucide.createIcons();
}

function closeAiImportModal() {
  const modal = document.getElementById('aiImportModal');
  if (modal) modal.classList.add('hidden');
}

function parseAiContent(rawText) {
  if (!rawText || !rawText.trim()) return null;
  const text = rawText.trim();

  // 1. Coba parse format JSON (baik dalam ```json ... ``` atau kurung kurawal {...})
  let jsonString = text;
  const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (jsonMatch && jsonMatch[1]) {
    jsonString = jsonMatch[1].trim();
  } else {
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      jsonString = text.substring(firstBrace, lastBrace + 1);
    }
  }

  try {
    const parsed = JSON.parse(jsonString);
    if (parsed.title) {
      const rawContent = parsed.contentHtml || parsed.content || `<p>${parsed.excerpt || ''}</p>`;
      const formattedHtml = window.CeliolData && window.CeliolData.formatArticleHtml
        ? window.CeliolData.formatArticleHtml(rawContent)
        : rawContent;

      return {
        title: parsed.title,
        slug: parsed.slug || parsed.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        category: parsed.category || 'Efisiensi Biaya',
        excerpt: parsed.excerpt || '',
        contentHtml: formattedHtml,
        featuredImage: parsed.featuredImage || 'assets/img/additional/Celiol Dispenser - 01.png',
        featuredImageAlt: parsed.featuredImageAlt || parsed.title,
        author: parsed.author || {
          name: 'Albert Adi Nugraha',
          role: 'Commercial Water Solution Specialist',
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80'
        },
        readTimeMinutes: parseInt(parsed.readTimeMinutes, 10) || 5,
        status: parsed.status || 'published',
        tags: Array.isArray(parsed.tags) ? parsed.tags : (typeof parsed.tags === 'string' ? parsed.tags.split(',').map(s => s.trim()) : ['dispenser komersial', 'efisiensi fasilitas', 'reverse osmosis']),
        relatedProductIds: Array.isArray(parsed.relatedProductIds) ? parsed.relatedProductIds : ['prod-cswds-2n1h1', 'prod-cswds-3n1h1c1'],
        faqs: Array.isArray(parsed.faqs) ? parsed.faqs : [],
        seo: {
          focusKeyword: parsed.seo?.focusKeyword || '',
          metaTitle: parsed.seo?.metaTitle || parsed.title,
          metaDescription: parsed.seo?.metaDescription || parsed.excerpt || ''
        }
      };
    }
  } catch (e) {
    // JSON parse error, lanjutkan ke fallback text parser
  }

  // 2. Fallback: Parse format teks berlabel baris demi baris
  const extractField = (pattern) => {
    const match = text.match(pattern);
    return match && match[1] ? match[1].trim() : '';
  };

  let title = extractField(/(?:Judul|Title)\s*:\s*([^\n\r]+)/i);
  let category = extractField(/(?:Kategori|Category)\s*:\s*([^\n\r]+)/i) || 'Efisiensi Biaya';
  let slug = extractField(/(?:Slug|Permalink)\s*:\s*([^\n\r]+)/i);
  let excerpt = extractField(/(?:Excerpt|Ringkasan|Intisari)\s*:\s*([^\n\r]+)/i);
  let focusKeyword = extractField(/(?:Focus Keyword|Kata Kunci)\s*:\s*([^\n\r]+)/i);
  let metaTitle = extractField(/(?:Meta Title|SEO Title)\s*:\s*([^\n\r]+)/i);
  let metaDescription = extractField(/(?:Meta Description|SEO Description)\s*:\s*([^\n\r]+)/i);
  const tagsStr = extractField(/(?:Tags|Tag)\s*:\s*([^\n\r]+)/i);
  const tags = tagsStr ? tagsStr.split(',').map(s => s.trim()).filter(Boolean) : ['dispenser komersial', 'efisiensi fasilitas', 'reverse osmosis'];

  let contentHtml = '';
  const contentIdx = text.search(/(?:Konten|Isi Artikel|Content)\s*:\s*/i);

  if (contentIdx !== -1) {
    const rawContent = text.substring(contentIdx).replace(/(?:Konten|Isi Artikel|Content)\s*:\s*/i, '').trim();
    contentHtml = window.CeliolData && window.CeliolData.formatArticleHtml
      ? window.CeliolData.formatArticleHtml(rawContent)
      : rawContent;
  } else if (!title) {
    // 3. Fallback Cerdas: Pengguna menempelkan teks mentah artikel langsung tanpa label "Judul:"
    // Deteksi judul dari heading markdown (#), pola topik terdaftar, atau kalimat pertama
    const headingMatch = text.match(/^#+\s*(.+)$/m);
    if (headingMatch && headingMatch[1]) {
      title = headingMatch[1].trim();
    } else {
      const topicPatterns = [
        { regex: /mikroplastik/i, title: 'Fakta Ilmiah Bahaya Mikroplastik pada Air Minum & Solusi RO 0.0001 Mikron' },
        { regex: /permenkes/i, title: 'Standar Kualitas Air Minum Permenkes No. 2 Tahun 2023 pada Fasilitas Komersial' },
        { regex: /biofilm|bakteri/i, title: 'Bahaya Biofilm pada Keran Dispenser & Keunggulan Tangki SUS 304' },
        { regex: /who|standar baku|sains/i, title: 'Kajian Ilmiah Pemurnian Air Reverse Osmosis menurut Panduan WHO' },
        { regex: /hidrasi|kesehatan/i, title: 'Pentingnya Kualitas Hidrasi untuk Kesehatan di Fasilitas Kerja' },
        { regex: /rantai pasok|galon/i, title: 'Tantangan Higienitas Sistem Galon & Solusi Direct-Pipe RO 0.0001 Mikron' }
      ];
      const matchedTopic = topicPatterns.find(tp => tp.regex.test(text));
      if (matchedTopic) {
        title = matchedTopic.title;
      } else {
        const firstSentence = text.split(/[\.\n]/)[0] || '';
        title = firstSentence.length > 60 ? firstSentence.slice(0, 57) + '...' : firstSentence;
      }
    }
    if (!title || title.length < 5) {
      title = "Tantangan Rantai Pasok Air Minum Kantor & Solusi Direct-Pipe";
    }

    contentHtml = window.CeliolData && window.CeliolData.formatArticleHtml
      ? window.CeliolData.formatArticleHtml(text)
      : text;

    const plainFirstP = text.split(/\n\n+/)[0] || text.slice(0, 180);
    excerpt = plainFirstP.length > 200 ? plainFirstP.slice(0, 197) + '...' : plainFirstP;
  } else {
    contentHtml = window.CeliolData && window.CeliolData.formatArticleHtml
      ? window.CeliolData.formatArticleHtml(text)
      : `<p>${excerpt || title}</p>`;
  }

  if (!slug) {
    slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
  if (!metaTitle) metaTitle = title;
  if (!metaDescription) metaDescription = excerpt || title;
  if (!excerpt) excerpt = title;

  return {
    title,
    slug,
    category,
    excerpt,
    contentHtml,
    featuredImage: 'assets/img/additional/Celiol Dispenser - 01.png',
    featuredImageAlt: title,
    author: {
      name: 'Albert Adi Nugraha',
      role: 'Commercial Water Solution Specialist',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80'
    },
    readTimeMinutes: 5,
    status: 'published',
    tags,
    relatedProductIds: ['prod-cswds-2n1h1', 'prod-cswds-3n1h1c1'],
    faqs: [],
    seo: {
      focusKeyword: focusKeyword || title.toLowerCase().split(' ').slice(0, 4).join(' '),
      metaTitle,
      metaDescription
    }
  };
}

function processAiImport(saveDirectly = false) {
  const inputEl = document.getElementById('aiImportInput');
  const errEl = document.getElementById('aiImportErrorMsg');
  const errText = document.getElementById('aiImportErrorText');

  if (!inputEl || !inputEl.value.trim()) {
    if (errEl) {
      errText.textContent = 'Harap tempelkan teks hasil dari Google AI Pro terlebih dahulu.';
      errEl.classList.remove('hidden');
    }
    return;
  }

  const parsed = parseAiContent(inputEl.value);
  if (!parsed || !parsed.title) {
    if (errEl) {
      errText.textContent = 'Format teks belum sesuai. Pastikan Anda menyalin seluruh jawaban yang diberikan oleh Gemini.';
      errEl.classList.remove('hidden');
    }
    return;
  }

  if (errEl) errEl.classList.add('hidden');

  if (saveDirectly) {
    const newId = `art-ai-${Date.now()}`;
    const newArticle = {
      ...parsed,
      id: newId,
      publishedAt: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
      viewCount: 0
    };
    window.CeliolData.saveArticle(newArticle);
    closeAiImportModal();
    renderArticlesTable();
    showPrelineToast(`Artikel "${newArticle.title}" berhasil di-import dan diterbitkan langsung!`, 'success');
  } else {
    closeAiImportModal();
    editingArticleId = null;

    document.getElementById('articleModalTitle').textContent = 'Review & Edit Artikel Hasil AI Pro';
    document.getElementById('artTitle').value = parsed.title;
    document.getElementById('artSlug').value = parsed.slug;
    document.getElementById('artCategory').value = parsed.category;
    document.getElementById('artExcerpt').value = parsed.excerpt;
    document.getElementById('artContent').value = parsed.contentHtml;
    document.getElementById('artImage').value = parsed.featuredImage;
    document.getElementById('artImageAlt').value = parsed.featuredImageAlt;
    document.getElementById('artAuthorName').value = parsed.author.name;
    document.getElementById('artAuthorRole').value = parsed.author.role;
    document.getElementById('artReadTime').value = parsed.readTimeMinutes;
    document.getElementById('artStatus').value = parsed.status;
    document.getElementById('artTags').value = parsed.tags.join(', ');

    document.getElementById('artFocusKeyword').value = parsed.seo.focusKeyword;
    document.getElementById('artMetaTitle').value = parsed.seo.metaTitle;
    document.getElementById('artMetaDesc').value = parsed.seo.metaDescription;

    const faqsInput = document.getElementById('artFaqs');
    if (faqsInput) {
      if (Array.isArray(parsed.faqs) && parsed.faqs.length > 0) {
        faqsInput.value = parsed.faqs.map(f => `${f.question} | ${f.answer}`).join('\n');
      } else {
        faqsInput.value = '';
      }
    }

    populateRelatedProductsCheckboxes(parsed.relatedProductIds);

    document.getElementById('articleModal').classList.remove('hidden');
    document.getElementById('artMetaTitle').dispatchEvent(new Event('input'));
    if (window.initPrelineIcons) window.initPrelineIcons();
    else if (window.lucide) lucide.createIcons();

    showPrelineToast('Artikel berhasil dimuat ke editor. Silakan tinjau sebelum klik Publikasikan.', 'success');
  }
}

function autoFormatArticleContent() {
  const contentInput = document.getElementById('artContent');
  if (!contentInput || !contentInput.value.trim()) {
    showPrelineToast('Kolom konten artikel masih kosong. Tempelkan teks terlebih dahulu.', 'error');
    return;
  }
  if (window.CeliolData && window.CeliolData.formatArticleHtml) {
    const formatted = window.CeliolData.formatArticleHtml(contentInput.value);
    contentInput.value = formatted;
    contentInput.dispatchEvent(new Event('input'));
    showPrelineToast('Konten berhasil dirapikan otomatis dengan jeda, sub-judul, dan nomor list yang rapi!', 'success');
  }
}

window.openAiImportModal = openAiImportModal;
window.closeAiImportModal = closeAiImportModal;
window.copyMasterPrompt = copyMasterPrompt;
window.processAiImport = processAiImport;
window.setSerpDevice = setSerpDevice;
window.applyQuickTopic = applyQuickTopic;
window.updateSeoAuditScorecard = updateSeoAuditScorecard;
window.autoFormatArticleContent = autoFormatArticleContent;
