/**
 * Celiol Dispenser - Blog & SEO Hub Logic
 * Handles Blog listing, category filtering, search, and Single Article rendering with dynamic SEO schema.
 * Styled with Preline UI Design System.
 */

document.addEventListener('DOMContentLoaded', function () {
  if (!window.CeliolData) return;

  if (document.getElementById('blogGridContainer')) {
    initBlogList();
  } else if (document.getElementById('articleDetailContainer')) {
    initArticleDetail();
  }

  if (window.initPrelineIcons) {
    window.initPrelineIcons();
  } else if (window.lucide) {
    lucide.createIcons();
  }
  if (window.HSStaticMethods) window.HSStaticMethods.autoInit();
});

// 1. Blog List Page (No Filter Topik, Live Search & Standard Card Format)
function initBlogList() {
  const articles = window.CeliolData.getArticles().filter(a => a.status === 'published');
  let searchQuery = '';

  const searchInput = document.getElementById('blogSearch');
  const countEl = document.getElementById('articleCount');

  const urlParams = new URLSearchParams(window.location.search);
  const qParam = urlParams.get('q') || urlParams.get('cat');
  if (qParam) {
    searchQuery = qParam;
    if (searchInput) searchInput.value = qParam;
  }

  function render() {
    let filtered = articles;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(a => 
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        (a.tags && a.tags.some(t => t.toLowerCase().includes(q))) ||
        (a.category && a.category.toLowerCase().includes(q))
      );
    }

    if (countEl) {
      countEl.textContent = filtered.length;
    }

    const container = document.getElementById('blogGridContainer');
    if (!container) return;

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-16 text-center bg-white rounded-2xl border border-dashed border-gray-300 p-8">
          <i data-lucide="newspaper" class="w-12 h-12 text-gray-300 mx-auto mb-3"></i>
          <h4 class="text-base font-bold text-gray-800 font-heading">Tidak ada artikel yang ditemukan</h4>
          <p class="text-xs text-gray-500 mt-1">Coba gunakan kata kunci pencarian lain.</p>
        </div>
      `;
      if (window.initPrelineIcons) {
        window.initPrelineIcons();
      } else if (window.lucide) {
        lucide.createIcons();
      }
      return;
    }

    container.innerHTML = filtered.map(a => `
      <article class="group flex flex-col bg-white border border-gray-200 hover:border-brand-600 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md">
        <!-- Thumbnail Aspect 16/10 -->
        <a href="article-detail.html?slug=${a.slug}" class="relative aspect-[16/10] overflow-hidden block bg-gray-100 border-b border-gray-100">
          <img src="${a.featuredImage}" alt="${a.featuredImageAlt || a.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
        </a>

        <!-- Content Body -->
        <div class="p-5 sm:p-6 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between text-xs mb-2.5">
              <span class="font-bold text-brand-600 uppercase tracking-wider text-[11px] font-heading">${a.category}</span>
              <span class="text-gray-400 font-medium">${a.readTimeMinutes} min baca</span>
            </div>
            <h3 class="text-base sm:text-lg font-bold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-2 mb-2.5 font-heading leading-snug">
              <a href="article-detail.html?slug=${a.slug}">${a.title}</a>
            </h3>
            <p class="text-xs sm:text-sm text-gray-500 line-clamp-3 mb-4 leading-relaxed font-normal">
              ${a.excerpt}
            </p>
          </div>

          <!-- Author Info & Read Action -->
          <div class="pt-4 border-t border-gray-100 flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <img src="${a.author.avatarUrl}" alt="${a.author.name}" class="w-7 h-7 rounded-full object-cover border border-gray-200">
              <div>
                <div class="text-xs font-semibold text-gray-800">${a.author.name}</div>
                <div class="text-[10px] text-gray-400">${a.publishedAt}</div>
              </div>
            </div>
            <a href="article-detail.html?slug=${a.slug}" class="py-1 px-2.5 text-xs font-semibold text-brand-600 hover:text-brand-700 hover:bg-brand-50 rounded-lg inline-flex items-center gap-1 transition-all">
              Baca <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
            </a>
          </div>
        </div>
      </article>
    `).join('');

    if (window.initPrelineIcons) {
      window.initPrelineIcons();
    } else if (window.lucide) {
      lucide.createIcons();
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      render();
    });
  }

  render();
}

// 2. Single Article Detail Page
function initArticleDetail() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  const articles = window.CeliolData.getArticles();
  const article = slug ? window.CeliolData.getArticleBySlug(slug) : articles[0];

  const container = document.getElementById('articleDetailContainer');
  if (!container) return;

  if (!article) {
    container.innerHTML = `
      <div class="py-20 text-center bg-white rounded-3xl border border-gray-200 p-8 shadow-xs max-w-xl mx-auto">
        <div class="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <i data-lucide="file-question" class="w-8 h-8"></i>
        </div>
        <h2 class="text-xl font-bold text-gray-900 font-heading">Artikel Tidak Ditemukan</h2>
        <p class="text-xs sm:text-sm text-gray-500 mt-2 mb-6 leading-relaxed">
          Artikel edukasi yang Anda cari mungkin telah diperbarui atau alamat tautan tidak valid.
        </p>
        <a href="blog.html" class="py-2.5 px-5 inline-flex items-center gap-2 text-xs font-semibold rounded-xl bg-brand-600 text-white hover:bg-brand-700 shadow-sm transition-all">
          <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i>
          <span>Kembali ke Blog & Edukasi</span>
        </a>
      </div>
    `;
    if (window.initPrelineIcons) window.initPrelineIcons();
    else if (window.lucide) lucide.createIcons();
    return;
  }

  document.title = `${article.seo?.metaTitle || article.title} | Celiol Commercial Dispenser`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', article.seo?.metaDescription || article.excerpt);

  // Inject Enhanced Multi-Schema JSON-LD (Article, BreadcrumbList, FAQPage for Rich Snippets)
  const currentUrl = window.location.href;
  const schemaObjects = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": currentUrl
      },
      "headline": article.seo?.metaTitle || article.title,
      "image": [article.featuredImage],
      "datePublished": article.publishedAt,
      "dateModified": article.publishedAt,
      "author": [{
        "@type": "Person",
        "name": article.author.name,
        "jobTitle": article.author.role
      }],
      "publisher": {
        "@type": "Organization",
        "name": "Celiol Commercial Water Dispenser",
        "url": "https://celiol.co.id",
        "logo": {
          "@type": "ImageObject",
          "url": "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=200&q=80"
        }
      },
      "description": article.seo?.metaDescription || article.excerpt
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Beranda",
          "item": "https://celiol.co.id/index.html"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog & Edukasi",
          "item": "https://celiol.co.id/blog.html"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": article.title,
          "item": currentUrl
        }
      ]
    }
  ];

  // If article has FAQs, inject FAQPage Schema for Google SERP Accordion Rich Snippets
  if (article.faqs && article.faqs.length > 0) {
    schemaObjects.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": article.faqs.map(f => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.answer
        }
      }))
    });
  }

  const schemaScript = document.createElement('script');
  schemaScript.type = 'application/ld+json';
  schemaScript.text = JSON.stringify(schemaObjects);
  document.head.appendChild(schemaScript);

  // Setup Reading Progress Bar Listener
  window.addEventListener('scroll', () => {
    const bar = document.getElementById('readingProgressBar');
    if (!bar) return;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    bar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  });

  // Process Headings & Generate Table of Contents (Daftar Isi Otomatis untuk SEO Jump Links)
  let rawContent = article.contentHtml || '';
  if (window.CeliolData && window.CeliolData.formatArticleHtml) {
    rawContent = window.CeliolData.formatArticleHtml(rawContent);
  }
  const headings = [];
  let hIdx = 0;
  const processedHtml = rawContent.replace(/<h2([^>]*)>(.*?)<\/h2>/gi, (match, attrs, text) => {
    const cleanText = text.replace(/<[^>]+>/g, '').trim();
    const hId = `topik-edukasi-${hIdx + 1}`;
    headings.push({ id: hId, title: cleanText });
    hIdx++;
    return `<h2 id="${hId}" class="scroll-mt-24 font-bold text-slate-900 mt-8 mb-4 text-xl sm:text-2xl font-heading"${attrs}>${text}</h2>`;
  });

  let tocHtml = '';
  if (headings.length >= 2) {
    tocHtml = `
      <div class="my-7 p-4 sm:p-5 rounded-2xl bg-gray-50/90 border border-gray-200 shadow-2xs">
        <div class="flex items-center justify-between mb-3 pb-2.5 border-b border-gray-200">
          <div class="text-xs font-bold uppercase tracking-wider text-gray-900 font-heading flex items-center gap-2">
            <i data-lucide="list-ordered" class="w-4 h-4 text-brand-600"></i>
            <span>Daftar Isi Artikel & Edukasi</span>
          </div>
          <span class="text-[10px] text-gray-500 font-mono">Navigasi Langsung</span>
        </div>
        <ol class="space-y-1.5 text-xs text-gray-700">
          ${headings.map((h, i) => `
            <li>
              <a href="#${h.id}" class="hover:text-brand-600 transition-colors flex items-center gap-2 group py-0.5">
                <span class="w-5 h-5 rounded-full bg-white border border-gray-200 text-gray-600 group-hover:border-brand-500 group-hover:text-brand-600 group-hover:bg-brand-50 flex items-center justify-center text-[10px] font-bold font-heading shrink-0">${i + 1}</span>
                <span class="font-medium group-hover:underline text-gray-800">${h.title}</span>
              </a>
            </li>
          `).join('')}
        </ol>
      </div>
    `;
  }

  // Get Other Articles for sidebar (excluding current article)
  const otherArticles = articles.filter(a => a.id !== article.id && a.status === 'published').slice(0, 3);

  // Get Related Products
  let relatedProducts = [];
  if (article.relatedProductIds && article.relatedProductIds.length > 0) {
    relatedProducts = article.relatedProductIds
      .map(id => window.CeliolData.getProductById(id))
      .filter(Boolean);
  }
  if (relatedProducts.length === 0) {
    relatedProducts = window.CeliolData.getProducts().slice(0, 2);
  }

  // Encode URLs for Social Share
  const encodedShareUrl = encodeURIComponent(currentUrl);
  const encodedShareTitle = encodeURIComponent(`${article.title} | Celiol Commercial Dispenser`);

  // FAQ Accordion HTML
  let faqsHtml = '';
  if (article.faqs && article.faqs.length > 0) {
    faqsHtml = `
      <div class="mt-10 pt-8 border-t border-gray-200">
        <div class="flex items-center gap-2 mb-2">
          <span class="w-1.5 h-4 bg-brand-600 rounded-full"></span>
          <span class="text-xs font-bold uppercase tracking-wider text-brand-600 font-heading">Tanya Jawab Edukasi</span>
        </div>
        <h3 class="text-lg sm:text-xl font-bold text-gray-900 font-heading mb-4">Pertanyaan Umum Seputar Topik Ini</h3>
        <div class="space-y-3">
          ${article.faqs.map(f => `
            <details class="group bg-white rounded-xl border border-gray-200 p-4 transition-all duration-200 hover:border-brand-300 open:border-brand-500 shadow-2xs">
              <summary class="flex justify-between items-center font-bold text-xs sm:text-sm text-gray-900 cursor-pointer list-none select-none font-heading">
                <span>${f.question}</span>
                <span class="transition-transform group-open:rotate-180 text-brand-600 shrink-0 ms-2">
                  <i data-lucide="chevron-down" class="w-4 h-4"></i>
                </span>
              </summary>
              <div class="text-xs text-gray-600 mt-3 pt-3 border-t border-gray-100 leading-relaxed font-sans">
                ${f.answer}
              </div>
            </details>
          `).join('')}
        </div>
      </div>
    `;
  }

  container.innerHTML = `
    <!-- Top Breadcrumb -->
    <nav aria-label="Breadcrumb" class="mb-6 sm:mb-8">
      <ol class="flex flex-wrap items-center gap-1.5 text-xs text-gray-500 font-medium">
        <li class="inline-flex items-center">
          <a href="index.html" class="inline-flex items-center gap-1 text-gray-500 hover:text-brand-600 focus:outline-none transition-colors">
            <i data-lucide="home" class="w-3.5 h-3.5 text-gray-400"></i>
            <span>Beranda</span>
          </a>
        </li>
        <li>
          <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-gray-400"></i>
        </li>
        <li class="inline-flex items-center">
          <a href="blog.html" class="text-gray-500 hover:text-brand-600 focus:outline-none transition-colors">
            Blog & Edukasi
          </a>
        </li>
        <li>
          <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-gray-400"></i>
        </li>
        <li class="inline-flex items-center text-gray-900 font-semibold truncate max-w-sm lg:max-w-md" aria-current="page">
          ${article.title}
        </li>
      </ol>
    </nav>

    <!-- 2-Column Responsive Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
      
      <!-- Main Content Column (8 cols) -->
      <div class="lg:col-span-8 space-y-8">
        
        <!-- Main Article Editorial Card -->
        <article class="bg-white rounded-2xl sm:rounded-3xl border border-gray-200 p-5 sm:p-8 lg:p-10 shadow-xs">
          
          <!-- Article Title (H1) -->
          <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 font-heading leading-tight tracking-tight mb-5">
            ${article.title}
          </h1>

          <!-- Author & Metadata Bar -->
          <div class="flex flex-wrap items-center justify-between gap-4 py-3.5 border-y border-gray-200 mb-8">
            <div class="flex items-center gap-3">
              <img src="${article.author.avatarUrl}" alt="${article.author.name}" class="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-xs">
              <div>
                <div class="text-xs sm:text-sm font-bold text-gray-900 font-heading leading-tight">${article.author.name}</div>
                <div class="text-[11px] text-gray-500 font-normal">${article.author.role}</div>
              </div>
            </div>
            <div class="flex items-center gap-3 sm:gap-4 text-xs text-gray-500 font-medium">
              <span class="inline-flex items-center gap-1.5">
                <i data-lucide="calendar" class="w-3.5 h-3.5 text-gray-400"></i>
                ${article.publishedAt}
              </span>
              <span class="inline-flex items-center gap-1.5">
                <i data-lucide="clock" class="w-3.5 h-3.5 text-gray-400"></i>
                ${article.readTimeMinutes} menit baca
              </span>
              <span class="inline-flex items-center gap-1.5">
                <i data-lucide="eye" class="w-3.5 h-3.5 text-gray-400"></i>
                ${article.viewCount} pembaca
              </span>
            </div>
          </div>

          <!-- Featured Image with Clean Caption -->
          <figure class="mb-8 rounded-2xl overflow-hidden border border-gray-200 shadow-xs">
            <img src="${article.featuredImage}" alt="${article.featuredImageAlt || article.title}" class="w-full h-auto aspect-[16/9] object-cover">
            <figcaption class="text-xs text-gray-500 italic py-2 px-3 border-t border-gray-100 flex items-center justify-between">
              <span>${article.featuredImageAlt || article.title}</span>
              <span class="text-[10px] text-gray-400 not-italic uppercase tracking-wider font-semibold">Celiol Editorial</span>
            </figcaption>
          </figure>

          <!-- Excerpt Lead Box (No Background Color) -->
          <div class="py-2.5 pl-4 sm:pl-5 border-l-4 border-brand-600 text-gray-700 font-medium text-sm sm:text-base leading-relaxed mb-6 italic">
            ${article.excerpt}
          </div>

          <!-- Auto-generated Table of Contents for SEO Jump Links -->
          ${tocHtml}

          <!-- Main Article HTML Body (Prose Styled) -->
          <div class="article-body prose prose-slate prose-lg max-w-none text-gray-700 leading-relaxed font-sans">
            ${processedHtml}
          </div>

          <!-- FAQ Rich Snippets Accordion Section -->
          ${faqsHtml}

          <!-- Tags & Social Share Bar -->
          <div class="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-xs font-bold text-gray-500 flex items-center gap-1.5 me-1">
                <i data-lucide="tag" class="w-3.5 h-3.5 text-gray-400"></i> Topik:
              </span>
              ${article.tags.map(t => `
                <a href="blog.html?q=${encodeURIComponent(t)}" class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium text-gray-600 hover:text-brand-600 border border-gray-300 hover:border-brand-500 transition-colors">
                  #${t}
                </a>
              `).join('')}
            </div>

            <!-- Social Share Buttons for SEO Social Signals -->
            <div class="flex items-center gap-2 text-xs">
              <span class="text-gray-400 text-[11px] font-semibold uppercase tracking-wider">Bagikan:</span>
              <a href="https://api.whatsapp.com/send?text=${encodedShareTitle}%20${encodedShareUrl}" target="_blank" rel="noopener noreferrer" class="p-2 rounded-lg border border-gray-200 text-gray-600 hover:text-emerald-600 hover:border-emerald-300 hover:bg-emerald-50 transition-colors" title="Bagikan ke WhatsApp">
                <i data-lucide="message-circle" class="w-4 h-4"></i>
              </a>
              <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodedShareUrl}" target="_blank" rel="noopener noreferrer" class="p-2 rounded-lg border border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-colors" title="Bagikan ke LinkedIn">
                <i data-lucide="share-2" class="w-4 h-4"></i>
              </a>
              <button onclick="navigator.clipboard.writeText(window.location.href); alert('Tautan artikel disalin ke clipboard!');" class="p-2 rounded-lg border border-gray-200 text-gray-600 hover:text-brand-600 hover:border-brand-300 hover:bg-brand-50 transition-colors" title="Salin Tautan">
                <i data-lucide="link" class="w-4 h-4"></i>
              </button>
            </div>
          </div>

          <!-- Author Bio Box (No Background Color) -->
          <div class="mt-8 p-5 sm:p-6 rounded-2xl border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <img src="${article.author.avatarUrl}" alt="${article.author.name}" class="w-14 h-14 rounded-full object-cover border border-gray-200 shadow-xs shrink-0">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <h4 class="text-sm font-bold text-gray-900 font-heading">${article.author.name}</h4>
                <span class="text-xs font-semibold text-brand-700 font-heading">· Spesialis Air Komersial</span>
              </div>
              <p class="text-xs text-gray-600 leading-relaxed">
                Spesialis solusi sistem air minum komersial PT Noto Water Envirotech. Berfokus pada implementasi teknologi Reverse Osmosis 5-tahap, sterilisasi UV-C, dan efisiensi operasional fasilitas perkantoran, perhotelan, dan fasilitas publik di Indonesia.
              </p>
            </div>
          </div>

          <!-- Bottom Action Buttons -->
          <div class="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <a href="blog.html" class="inline-flex items-center gap-2 text-xs font-semibold text-gray-700 hover:text-brand-600 transition-colors py-2.5 px-4 rounded-xl border border-gray-200 hover:bg-gray-50 w-full sm:w-auto justify-center">
              <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i>
              <span>Kembali ke Blog & Edukasi</span>
            </a>
            <a href="index.html#contactRfq" class="inline-flex items-center gap-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-sm transition-all py-2.5 px-5 rounded-xl w-full sm:w-auto justify-center">
              <span>Pesan Sekarang / Konsultasi</span>
              <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
            </a>
          </div>

        </article>

      </div>

      <!-- Right Sticky Sidebar Column (4 cols) -->
      <aside class="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
        
        <!-- Widget 1: Model Dispenser Terkait (Elegan Berbasis Divider, Zero Cards dalam Cards) -->
        <div class="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-6 shadow-xs">
          <div class="flex items-center justify-between pb-3.5 mb-2 border-b border-gray-100">
            <h4 class="text-xs font-bold uppercase tracking-wider text-gray-800 flex items-center gap-2 font-heading">
              <span class="w-1.5 h-4 bg-brand-600 rounded-full"></span>
              Dispenser Terkait
            </h4>
            <a href="catalog.html" class="text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors inline-flex items-center gap-1 group">
              <span>Semua Model</span>
              <i data-lucide="chevron-right" class="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"></i>
            </a>
          </div>

          <div class="divide-y divide-gray-100">
            ${relatedProducts.map(p => `
              <div class="group py-4 first:pt-2 last:pb-1">
                <div class="flex items-start gap-3.5">
                  <!-- Foto Produk: Stage Bersih Tanpa Border Ganda / Card Box -->
                  <a href="catalog.html?model=${encodeURIComponent(p.modelCode)}" class="shrink-0 w-16 h-24 bg-gray-50/80 rounded-xl flex items-center justify-center p-1.5 transition-colors group-hover:bg-brand-50/50">
                    <img src="${p.imageCover}" alt="${p.name}" class="h-full w-auto object-contain group-hover:scale-105 transition-transform duration-300">
                  </a>

                  <!-- Info Produk Tipografi Semantik -->
                  <div class="flex-1 min-w-0">
                    <div class="mb-1">
                      <span class="text-[11px] font-mono font-semibold text-brand-600 tracking-tight">
                        ${p.modelCode}
                      </span>
                    </div>

                    <h5 class="text-xs font-bold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-2 font-heading leading-snug">
                      <a href="catalog.html?model=${encodeURIComponent(p.modelCode)}">
                        ${p.name}
                      </a>
                    </h5>

                    <div class="text-[11px] text-gray-500 font-medium mt-1 flex items-center gap-1.5">
                      <i data-lucide="users" class="w-3.5 h-3.5 text-gray-400 shrink-0"></i>
                      <span>${p.recommendedPax}</span>
                    </div>

                    <div class="mt-2.5 flex items-center justify-between gap-2 flex-wrap">
                      <div class="text-xs sm:text-[13px] font-extrabold text-gray-900 font-heading">
                        Rp ${p.purchasePrice ? p.purchasePrice.toLocaleString('id-ID') : '-'}
                      </div>
                      <a href="catalog.html?model=${encodeURIComponent(p.modelCode)}" class="inline-flex items-center gap-1 py-1 px-2.5 text-[11px] font-semibold text-white bg-brand-600 hover:bg-brand-700 active:bg-brand-800 rounded-lg transition-colors shadow-xs font-heading">
                        <span>Pesan Sekarang</span>
                        <i data-lucide="chevron-right" class="w-3 h-3"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Widget 2: Artikel Edukasi Lainnya -->
        ${otherArticles.length > 0 ? `
          <div class="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs">
            <h4 class="text-xs font-bold uppercase tracking-wider text-gray-700 mb-3.5 flex items-center gap-2 font-heading">
              <i data-lucide="book-open" class="w-4 h-4 text-brand-600"></i>
              Artikel Edukasi Lainnya
            </h4>
            <div class="space-y-3">
              ${otherArticles.map(oa => `
                <a href="article-detail.html?slug=${oa.slug}" class="group flex items-start gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                  <img src="${oa.featuredImage}" alt="${oa.title}" class="w-16 h-12 object-cover rounded-lg shrink-0 border border-gray-100 group-hover:opacity-90">
                  <div class="flex-1 min-w-0">
                    <span class="text-[10px] font-bold text-brand-600 uppercase tracking-wider block mb-0.5">${oa.category}</span>
                    <h5 class="text-xs font-semibold text-gray-800 group-hover:text-brand-600 line-clamp-2 transition-colors font-heading leading-snug">
                      ${oa.title}
                    </h5>
                    <span class="text-[10px] text-gray-400 mt-0.5 block">${oa.readTimeMinutes} min baca</span>
                  </div>
                </a>
              `).join('')}
            </div>
            <div class="mt-4 pt-3 border-t border-gray-100 text-center">
              <a href="blog.html" class="text-xs font-semibold text-brand-600 hover:text-brand-700 inline-flex items-center gap-1">
                Lihat Semua Artikel Edukasi <i data-lucide="arrow-right" class="w-3 h-3"></i>
              </a>
            </div>
          </div>
        ` : ''}

        <!-- Widget 3: Konsultasi Fasilitas Celiol CTA -->
        <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h4 class="text-base font-bold mb-2 font-heading text-gray-900">Konsultasi Dispenser Gedung</h4>
          <p class="text-xs text-gray-600 mb-4 leading-relaxed font-normal">
            Hadirkan kenyamanan dan efisiensi air minum higienis di fasilitas kantor Anda. Tim spesialis Celiol siap membantu survei lokasi dan perencanaan sistem air gedung.
          </p>
          <div class="space-y-2">
            <a href="https://wa.me/6282120988201?text=Halo%20Celiol,%20saya%20ingin%20konsultasi%20kebutuhan%20dispenser%20komersial%20fasilitas%20kami." target="_blank" rel="noopener noreferrer" class="py-2.5 px-4 w-full inline-flex justify-center items-center gap-x-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all font-heading">
              <i data-lucide="message-circle" class="w-3.5 h-3.5"></i>
              <span>WhatsApp Sales Celiol</span>
            </a>
            <a href="catalog.html" class="py-2.5 px-4 w-full inline-flex justify-center items-center gap-x-2 text-xs font-semibold rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-brand-600 hover:border-brand-600 transition-colors font-heading">
              Jelajahi Semua Model Dispenser
            </a>
          </div>
        </div>

      </aside>

    </div>
  `;

  if (window.initPrelineIcons) {
    window.initPrelineIcons();
  } else if (window.lucide) {
    lucide.createIcons();
  }
  if (window.HSStaticMethods) window.HSStaticMethods.autoInit();
}
