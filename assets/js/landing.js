/**
 * Celiol Dispenser - Landing Page Scripts
 * Dynamic Featured Products, Latest Blog Posts, Lead Capture.
 * Styled with Preline UI Design System.
 */

// Force browser to always start at the very top on reload/refresh
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', function () {
  // If URL contains hash anchor on refresh, strip it so browser won't jump down
  if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname + window.location.search);
  }
  window.scrollTo(0, 0);

  renderFeaturedProducts();
  renderLatestArticles();
  initLeadForm();
  initSectorScrollControls();
  
  if (window.initPrelineIcons) {
    window.initPrelineIcons();
  } else if (window.lucide) {
    lucide.createIcons();
  }
  if (window.HSStaticMethods) {
    window.HSStaticMethods.autoInit();
  }
});

window.addEventListener('load', function () {
  window.scrollTo(0, 0);
  if (typeof initSectorScrollControls === 'function') {
    initSectorScrollControls();
  }
});

// 1. Render Featured Products (Clean Minimalist Format - Tipe, Model, & Biaya saja)
function renderFeaturedProducts() {
  const container = document.getElementById('featuredProductsGrid');
  if (!container || !window.CeliolData) return;

  const products = window.CeliolData.getProducts()
    .filter(p => p.status === 'active' && p.isFeatured)
    .slice(0, 4);

  if (products.length === 0) {
    container.innerHTML = '<p class="text-gray-500 col-span-full text-center py-8">Belum ada produk unggulan yang ditampilkan.</p>';
    return;
  }

  container.innerHTML = products.map(p => {
    // Biaya tanpa maintenance fee
    const formattedPrice = p.purchasePrice
      ? `Rp ${Number(p.purchasePrice).toLocaleString('id-ID')}`
      : (p.priceEstimate ? p.priceEstimate.split('/')[0].replace(/^Beli:\s*/i, '').trim() : 'Hubungi Sales');

    return `
    <div class="group flex flex-col bg-white border border-gray-200 rounded-xl hover:border-brand-600 transition-colors overflow-hidden">
      <!-- Image Stage -->
      <div class="relative h-60 bg-gray-50/70 flex items-center justify-center p-6 border-b border-gray-100">
        <img src="${p.imageCover}" alt="${p.name}" class="h-full object-contain group-hover:scale-105 transition-transform duration-500">
      </div>

      <!-- Info (Cukup Tipe, Model & Biaya) -->
      <div class="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div class="mb-1.5">
            <span class="text-gray-400 font-heading tracking-wider uppercase text-[11px] font-semibold">${p.modelCode}</span>
          </div>
          <h3 class="text-base font-bold text-gray-900 group-hover:text-brand-600 transition-colors font-heading leading-snug">
            ${p.name}
          </h3>
        </div>

        <div class="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
          <div>
            <div class="text-[10px] text-gray-400 uppercase font-medium">Biaya</div>
            <div class="text-sm font-bold text-gray-900">${formattedPrice}</div>
          </div>
          <a href="catalog.html?model=${encodeURIComponent(p.modelCode)}" class="py-2 px-3.5 inline-flex items-center gap-x-1.5 text-xs font-semibold rounded-lg border border-gray-300 text-gray-700 hover:border-brand-600 hover:text-brand-600 transition-all">
            Detail
            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </a>
        </div>
      </div>
    </div>
  `;
  }).join('');

  if (window.initPrelineIcons) window.initPrelineIcons();
}

// 2. Render Latest SEO Blog Articles (Open Editorial Format)
function renderLatestArticles() {
  const container = document.getElementById('latestArticlesGrid');
  if (!container || !window.CeliolData) return;

  const articles = window.CeliolData.getArticles()
    .filter(a => a.status === 'published')
    .slice(0, 3);

  if (articles.length === 0) {
    container.innerHTML = '<p class="text-gray-500 col-span-full text-center py-6">Belum ada artikel yang dipublikasikan.</p>';
    return;
  }

  container.innerHTML = articles.map(a => `
    <article class="group flex flex-col">
      <a href="article-detail.html?slug=${a.slug}" class="relative aspect-[16/10] rounded-xl overflow-hidden block bg-gray-100 mb-4 border border-gray-200">
        <img src="${a.featuredImage}" alt="${a.featuredImageAlt || a.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
      </a>
      <div class="flex-1 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between text-xs mb-2">
            <span class="font-bold text-brand-600 uppercase tracking-wider text-[11px]">${a.category}</span>
            <span class="text-gray-400">${a.readTimeMinutes} min baca</span>
          </div>
          <h3 class="text-base font-bold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-2 mb-2 font-heading">
            <a href="article-detail.html?slug=${a.slug}">${a.title}</a>
          </h3>
          <p class="text-xs sm:text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed font-normal">
            ${a.excerpt}
          </p>
        </div>
        <div class="flex items-center justify-between pt-3 border-t border-gray-100 text-xs">
          <div class="flex items-center gap-2">
            <img src="${a.author.avatarUrl}" alt="${a.author.name}" class="w-6 h-6 rounded-full object-cover">
            <span class="font-medium text-gray-700">${a.author.name}</span>
          </div>
          <a href="article-detail.html?slug=${a.slug}" class="text-brand-600 font-semibold hover:underline inline-flex items-center gap-1">
            Baca <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
          </a>
        </div>
      </div>
    </article>
  `).join('');

  if (window.initPrelineIcons) window.initPrelineIcons();
}

// 3. Lead Capture Form Submission
function initLeadForm() {
  const form = document.getElementById('rfqForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Mengirim Penawaran...';
    btn.disabled = true;

    const leadData = {
      fullName: document.getElementById('rfqName').value.trim(),
      companyName: document.getElementById('rfqCompany').value.trim(),
      phone: document.getElementById('rfqPhone').value.trim(),
      email: document.getElementById('rfqEmail').value.trim(),
      facilitySector: document.getElementById('rfqSector') ? document.getElementById('rfqSector').value : 'Perkantoran / Korporat',
      employeeCount: document.getElementById('rfqPax') ? document.getElementById('rfqPax').value : '50-80 Orang / hari',
      interestedModel: document.getElementById('rfqNeed') ? document.getElementById('rfqNeed').value : (document.getElementById('rfqModel') ? document.getElementById('rfqModel').value : 'Konsultasi Kebutuhan Dispenser'),
      acquisitionType: 'Beli + Maintenance Rutin',
      message: document.getElementById('rfqNotes').value.trim()
    };

    setTimeout(() => {
      window.CeliolData.saveLead(leadData);
      btn.innerHTML = originalText;
      btn.disabled = false;
      form.reset();

      const alertBox = document.getElementById('rfqSuccessAlert');
      if (alertBox) {
        alertBox.classList.remove('hidden');
        setTimeout(() => alertBox.classList.add('hidden'), 8000);
      } else {
        alert('Terima kasih! Permintaan penawaran harga Anda telah kami terima. Tim Konsultan Celiol akan menghubungi Anda dalam waktu 1x24 jam.');
      }
    }, 600);
  });
}

// 4. Sector Pills Scroll Navigation Controls & Touch/Wheel/Drag Support
function initSectorScrollControls() {
  const track = document.getElementById('sectorPillsTrack');
  const btnLeft = document.getElementById('sectorScrollLeft');
  const btnRight = document.getElementById('sectorScrollRight');
  const fadeLeft = document.getElementById('sectorFadeLeft');
  const fadeRight = document.getElementById('sectorFadeRight');

  if (!track || !btnLeft || !btnRight) return;

  // Avoid attaching duplicate event listeners if called multiple times
  if (track.dataset.scrollControlsInitialized === 'true') {
    updateSectorPillsAlignment();
    updateScrollIndicators();
    return;
  }
  track.dataset.scrollControlsInitialized = 'true';

  const pagination = track.querySelector('.hs-carousel-pagination');

  // Align strictly to 0 when overflowing so left-edge sectors (e.g. Perkantoran) are never clipped
  function updateSectorPillsAlignment() {
    if (!pagination) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll > 6) {
      pagination.style.marginLeft = '0px';
      pagination.style.marginRight = '0px';
    } else {
      pagination.style.marginLeft = 'auto';
      pagination.style.marginRight = 'auto';
    }
  }

  // Update left & right arrow visibility and gradient edge fades
  function updateScrollIndicators() {
    const maxScroll = track.scrollWidth - track.clientWidth;
    const currentScroll = track.scrollLeft;
    const hasOverflow = maxScroll > 6;

    if (!hasOverflow) {
      btnLeft.classList.add('opacity-0', 'pointer-events-none');
      btnRight.classList.add('opacity-0', 'pointer-events-none');
      if (fadeLeft) fadeLeft.classList.add('opacity-0');
      if (fadeRight) fadeRight.classList.add('opacity-0');
      return;
    }

    // Left indicator
    if (currentScroll > 12) {
      btnLeft.classList.remove('opacity-0', 'pointer-events-none');
      if (fadeLeft) fadeLeft.classList.remove('opacity-0');
    } else {
      btnLeft.classList.add('opacity-0', 'pointer-events-none');
      if (fadeLeft) fadeLeft.classList.add('opacity-0');
    }

    // Right indicator
    if (currentScroll < maxScroll - 12) {
      btnRight.classList.remove('opacity-0', 'pointer-events-none');
      if (fadeRight) fadeRight.classList.remove('opacity-0');
    } else {
      btnRight.classList.add('opacity-0', 'pointer-events-none');
      if (fadeRight) fadeRight.classList.add('opacity-0');
    }
  }

  // Arrow click scrolling
  btnLeft.addEventListener('click', (e) => {
    e.preventDefault();
    track.scrollBy({ left: -260, behavior: 'smooth' });
  });

  btnRight.addEventListener('click', (e) => {
    e.preventDefault();
    track.scrollBy({ left: 260, behavior: 'smooth' });
  });

  // Track scroll listener
  track.addEventListener('scroll', updateScrollIndicators, { passive: true });

  // Window resize listener
  window.addEventListener('resize', () => {
    updateSectorPillsAlignment();
    updateScrollIndicators();
  });

  // Mouse wheel horizontal scrolling over track
  track.addEventListener('wheel', (e) => {
    if (e.deltaY !== 0) {
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (maxScroll > 6) {
        e.preventDefault();
        track.scrollLeft += e.deltaY;
        updateScrollIndicators();
      }
    }
  }, { passive: false });

  // Mouse grab-and-drag scrolling for desktop
  let isDown = false;
  let startX = 0;
  let scrollLeftStart = 0;
  let hasDragged = false;

  track.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    isDown = true;
    hasDragged = false;
    startX = e.pageX;
    scrollLeftStart = track.scrollLeft;
  });

  window.addEventListener('mouseup', () => {
    if (isDown) {
      isDown = false;
      track.classList.remove('cursor-grabbing');
    }
  });

  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    const diff = e.pageX - startX;
    if (Math.abs(diff) > 4) {
      hasDragged = true;
      track.classList.add('cursor-grabbing');
      track.scrollLeft = scrollLeftStart - diff;
      updateScrollIndicators();
    }
  });

  track.addEventListener('click', (e) => {
    if (hasDragged) {
      e.preventDefault();
      e.stopPropagation();
      hasDragged = false;
    }
  }, true);

  // Auto-scroll active sector button into view inside track without moving browser window
  function syncActivePill(activePill) {
    if (!track || !activePill) return;
    const trackRect = track.getBoundingClientRect();
    const pillRect = activePill.getBoundingClientRect();
    const offset = (pillRect.left + pillRect.width / 2) - (trackRect.left + trackRect.width / 2);
    if (Math.abs(offset) > 10) {
      track.scrollBy({ left: offset, behavior: 'smooth' });
    }
  }

  if (pagination) {
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'attributes' && m.attributeName === 'class') {
          if (m.target.classList.contains('active')) {
            syncActivePill(m.target);
            break;
          }
        }
      }
    });

    observer.observe(pagination, {
      attributes: true,
      subtree: true,
      attributeFilter: ['class']
    });
  }

  // Initial calculation
  setTimeout(() => {
    updateSectorPillsAlignment();
    updateScrollIndicators();
    if (window.lucide) lucide.createIcons();
  }, 100);
}
