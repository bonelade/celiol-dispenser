/**
 * Celiol Dispenser - Central Data Layer
 * Handles LocalStorage persistence, seed products, seed articles, and lead inquiries.
 */

const SEED_PRODUCTS = [
  {
    id: "prod-cswds-2n1h1",
    modelCode: "CSWDS 2N 1H1",
    name: "Deluxe Facility Dispenser (2-Spout Black)",
    series: "Deluxe Facility Water Dispenser",
    color: "Black",
    slug: "deluxe-facility-water-dispenser-cswds-2n-1h1",
    formFactor: "floor-standing",
    temperatures: ["ambient", "hot", "cold"],
    spouts: "2 Kran: 1x Normal & 1x Hot (Bisa Custom Suhu)",
    recommendedPax: "30 - 50 Orang / hari",
    filtrationType: "RO",
    dispenseType: "push-button",
    coolingCapacityLph: 0,
    heatingCapacityLph: "20 - 30",
    normalWaterYieldLph: 80,
    tankCapacity: {
      cold: 0,
      hot: 25,
      ambient: 80
    },
    dimensions: "560 x 430 x 1520 mm",
    bodyMaterial: "Stainless Steel SUS 304 Standar Komersial",
    powerWatt: {
      heating: 2000,
      cooling: 0,
      total: 2000
    },
    voltage: "220-240V ~ 50-60 Hz",
    keyFeatures: [
      "Kustomisasi Suhu Fleksibel: Bebas pilih kombinasi 2 suhu air (Panas + Normal, Dingin + Normal, atau Panas + Dingin) sesuai kebutuhan fasilitas",
      "Filtrasi RO 5-Tahap 0.0001 Mikron: Air murni 24/7 teruji klinis bebas klorin, mikroplastik, bakteri, dan logam berat",
      "Tangki Higienis SUS 304 Food-Grade: Baja tahan karat SUS 304 standar pangan bebas BPA, anti-karat, aman, dan mudah disanitasi",
      "Rancang Bangun Bodi Ramping 560 mm: Konstruksi bodi SUS 304 kokoh (560 x 430 x 1520 mm) hemat tempat untuk pantri & ruang administrasi",
      "Kapasitas Debit Cepat 2-Kran: Melayani air panas 20 - 30 L/h & air normal 80 L/h tanpa jeda antrean jam sibuk fasilitas",
      "Paket Pemeliharaan Rutin Terpadu: Termasuk sanitasi terjadwal, ganti filter berkala, servis gratis & 24/7 CS respons cepat"
    ],
    imageCover: "assets/img/products/cswds-2n-1h1-black.png",
    pdfDatasheetUrl: "Catalogue Product/(Education Edition) Pitch Deck PT Noto Water Envirotech.pdf",
    isFeatured: true,
    status: "active",
    purchasePrice: 33999000,
    monthlyMaintenancePrice: 500000,
    priceEstimate: "Beli: Rp 33.999.000 / Maintenance: Rp 500.000/bln",
    priceNotes: "Biaya belum termasuk Pajak (PPN), Ongkos Kirim dan Pemasangan di luar instalasi pipa standar gedung",
    idealFor: "Ruang Kerja Administrasi, Ruang Pantry, Ruang Istirahat, Zona Rawat Pasien, Ruang Teknisi"
  },
  {
    id: "prod-cswds-3n1h1c1",
    modelCode: "CSWDS 3N 1H1C1",
    name: "Deluxe Facility Dispenser (3-Spout Black)",
    series: "Deluxe Facility Water Dispenser",
    color: "Black",
    slug: "deluxe-facility-water-dispenser-cswds-3n-1h1c1",
    formFactor: "floor-standing",
    temperatures: ["ambient", "hot", "cold"],
    spouts: "3 Kran: 1x Normal, 1x Hot, 1x Cold (Bisa Custom Suhu)",
    recommendedPax: "30 - 50 Orang / hari",
    filtrationType: "RO",
    dispenseType: "push-button",
    coolingCapacityLph: "20 - 30",
    heatingCapacityLph: "20 - 30",
    normalWaterYieldLph: 80,
    tankCapacity: {
      cold: 25,
      hot: 25,
      ambient: 80
    },
    dimensions: "900 x 430 x 1520 mm",
    bodyMaterial: "Stainless Steel SUS 304 Standar Komersial",
    powerWatt: {
      heating: 2000,
      cooling: 1000,
      total: 3000
    },
    voltage: "220-240V ~ 50-60 Hz",
    keyFeatures: [
      "Kustomisasi Suhu 3-Kran Lengkap: Pilihan kombinasi 3 suhu lengkap (Air Panas, Suhu Normal, dan Dingin) siap saji seketika",
      "Bodi Ekstra Lebar 900 mm Heavy-Duty: Konstruksi bodi lebar 900 mm (900 x 430 x 1520 mm) dengan kapasitas tangki ekstra untuk area lalu lintas tinggi",
      "Filtrasi RO 5-Tahap 0.0001 Mikron: Kemurnian air 99.9% reverse osmosis presisi tinggi memenuhi standar baku mutu Permenkes RI No. 2 Tahun 2023",
      "Tangki Higienis Ganda SUS 304: Tangki air internal stainless steel 304 food-grade higienis, anti-bakteri, dan tahan korosi jangka panjang",
      "Kapasitas Debit Aliran Tinggi Multi-Kran: Melayani air panas 20 - 30 L/h, air dingin 20 - 30 L/h & air normal 80 L/h secara simultan",
      "Paket Pemeliharaan Rutin Terpadu: Termasuk ganti filter cartridge berkala, inspeksi fungsi mesin, garansi suku cadang resmi & 24/7 CS"
    ],
    imageCover: "assets/img/products/cswds-3n-1h1c1-black.png",
    pdfDatasheetUrl: "Catalogue Product/(Education Edition) Pitch Deck PT Noto Water Envirotech.pdf",
    isFeatured: true,
    status: "active",
    purchasePrice: 37499000,
    monthlyMaintenancePrice: 500000,
    priceEstimate: "Beli: Rp 37.499.000 / Maintenance: Rp 500.000/bln",
    priceNotes: "Biaya belum termasuk Pajak (PPN), Ongkos Kirim dan Pemasangan di luar instalasi pipa standar gedung",
    idealFor: "Ruang Tunggu/Lobby, Ruang Kantin, Ruang VIP, Area Publik, Restoran & Rumah Sakit"
  },
  {
    id: "prod-lgcmswds-2n1h1",
    modelCode: "LGCMSWDS 2N 1H1",
    name: "Ultimate Facility Dispenser (2-Spout Slate Blue)",
    series: "Ultimate Facility Water Dispenser",
    color: "Slate Blue",
    slug: "ultimate-facility-water-dispenser-lgcmswds-2n-1h1",
    formFactor: "floor-standing",
    temperatures: ["ambient", "hot", "cold"],
    spouts: "2 Kran: 1x Normal & 1x Hot (Bisa Custom Suhu)",
    recommendedPax: "30 - 50 Orang / hari",
    filtrationType: "RO",
    dispenseType: "push-button",
    coolingCapacityLph: 0,
    heatingCapacityLph: "20 - 30",
    normalWaterYieldLph: 80,
    tankCapacity: {
      cold: 0,
      hot: 25,
      ambient: 80
    },
    dimensions: "560 x 430 x 1520 mm",
    bodyMaterial: "Stainless Steel + Lacquered Glass Front Panel (Slate Blue)",
    powerWatt: {
      heating: 2000,
      cooling: 0,
      total: 2000
    },
    voltage: "220-240V ~ 50-60 Hz",
    keyFeatures: [
      "Kustomisasi Suhu Fleksibel: Fleksibel memilih kombinasi 2 suhu air sesuai preferensi dan kebutuhan ruangan eksekutif",
      "Panel Kaca Lacquered Glass Slate Blue: Desain mewah panel kaca reflektif modern tahan gores yang meningkatkan estetika interior",
      "Filtrasi RO 5-Tahap 0.0001 Mikron: Pemurnian air 24/7 bebas kontaminan kimiawi, mikroorganisme & endapan terlarut",
      "Tangki Higienis SUS 304 Food-Grade: Baja tahan karat SUS 304 food-grade bebas BPA, higienis, anti-karat & mudah disterilkan",
      "Bodi Ramping 560 mm Hemat Ruang: Dimensi 560 x 430 x 1520 mm ideal untuk tata letak ruang rapat eksekutif & lounge VIP",
      "Paket Pemeliharaan Rutin Terpadu: Termasuk sanitasi terjadwal, penggantian filter bulanan/semesteran, servis teknis & 24/7 CS"
    ],
    imageCover: "assets/img/products/lgcmswds-2n-1h1-slate-blue.png",
    pdfDatasheetUrl: "Catalogue Product/(Education Edition) Pitch Deck PT Noto Water Envirotech.pdf",
    isFeatured: true,
    status: "active",
    purchasePrice: 36599000,
    monthlyMaintenancePrice: 500000,
    priceEstimate: "Beli: Rp 36.599.000 / Maintenance: Rp 500.000/bln",
    priceNotes: "Biaya belum termasuk Pajak (PPN), Ongkos Kirim dan Pemasangan di luar instalasi pipa standar gedung",
    idealFor: "Ruang Kerja Administrasi Eksekutif, Ruang VIP, Ruang Pantry Modern, Ruang Tamu Pasien"
  },
  {
    id: "prod-lgcmswds-3n1h1c1",
    modelCode: "LGCMSWDS 3N 1H1C1",
    name: "Ultimate Facility Dispenser (3-Spout Slate Blue)",
    series: "Ultimate Facility Water Dispenser",
    color: "Slate Blue",
    slug: "ultimate-facility-water-dispenser-lgcmswds-3n-1h1c1",
    formFactor: "floor-standing",
    temperatures: ["ambient", "hot", "cold"],
    spouts: "3 Kran: 1x Normal, 1x Hot, 1x Cold (Bisa Custom Suhu)",
    recommendedPax: "30 - 50 Orang / hari",
    filtrationType: "RO",
    dispenseType: "push-button",
    coolingCapacityLph: "20 - 30",
    heatingCapacityLph: "20 - 30",
    normalWaterYieldLph: 80,
    tankCapacity: {
      cold: 25,
      hot: 25,
      ambient: 80
    },
    dimensions: "560 x 430 x 1520 mm",
    bodyMaterial: "Stainless Steel + Lacquered Glass Front Panel (Slate Blue)",
    powerWatt: {
      heating: 2000,
      cooling: 1000,
      total: 3000
    },
    voltage: "220-240V ~ 50-60 Hz",
    keyFeatures: [
      "Kustomisasi Suhu 3-Kran Lengkap: Konfigurasi 3 kran lengkap (Air Panas, Suhu Normal, dan Dingin) bebas atur sesuai kebutuhan fasilitas",
      "Panel Kaca Lacquered Glass Slate Blue: Tampilan elegan premium dengan sentuhan panel kaca modern untuk ruang kantor berkelas",
      "Triple Spout Berkecepatan Tinggi: Debit air panas 20 - 30 L/h, air normal 80 L/h, dan air dingin 20 - 30 L/h siap saji tanpa jeda antrean",
      "Performa Komersial Tangguh 3000 Watt: Sistem pemanas 2000W & pendingin 1000W tangguh dengan bodi ramping 560 mm berefisiensi tinggi",
      "Filtrasi RO 5-Tahap & Sterilisasi UV-C: Filtrasi reverse osmosis 0.0001 mikron dilengkapi sterilisasi UV-C LED untuk air murni 99.9%",
      "Paket Pemeliharaan Rutin Terpadu: Termasuk ganti filter terjadwal, kalibrasi suhu, garansi suku cadang orisinal & 24/7 CS"
    ],
    imageCover: "assets/img/products/lgcmswds-3n-1h1c1-slate-blue.png",
    pdfDatasheetUrl: "Catalogue Product/(Education Edition) Pitch Deck PT Noto Water Envirotech.pdf",
    isFeatured: true,
    status: "active",
    purchasePrice: 40099000,
    monthlyMaintenancePrice: 500000,
    priceEstimate: "Beli: Rp 40.099.000 / Maintenance: Rp 500.000/bln",
    priceNotes: "Biaya belum termasuk Pajak (PPN), Ongkos Kirim dan Pemasangan di luar instalasi pipa standar gedung",
    idealFor: "Lobby Utama, Lounge VIP Direksi, Institusi Pendidikan, Restoran & Rumah Sakit"
  }
];

const SEED_ARTICLES = [
  {
    id: "art-001",
    title: "Analisis Efisiensi Biaya Operasional Sistem Air Minum di Gedung & Perkantoran Komersial",
    slug: "analisis-efisiensi-biaya-air-minum-gedung-kantor",
    excerpt: "Simak analisis struktur biaya fasilitas dan panduan penghematan anggaran operasional air minum perkantoran melalui sistem dispenser komersial terintegrasi dengan pemeliharaan terukur.",
    category: "Efisiensi Biaya",
    tags: ["dispenser komersial", "efisiensi fasilitas", "manajemen gedung", "green office"],
    featuredImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    featuredImageAlt: "Ruang perkantoran modern yang efisien dan hemat biaya",
    author: {
      name: "Albert Adi Nugraha",
      role: "Commercial Water Solution Specialist",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80"
    },
    publishedAt: "24 Oktober 2026",
    readTimeMinutes: 6,
    viewCount: 1420,
    status: "published",
    seo: {
      metaTitle: "Analisis Efisiensi Biaya Operasional Air Minum Gedung & Perkantoran Komersial",
      metaDescription: "Pelajari panduan efisiensi biaya operasional air minum fasilitas perkantoran melalui sistem dispenser komersial terintegrasi dan pemeliharaan berkala terencana.",
      focusKeyword: "efisiensi biaya air minum kantor"
    },
    relatedProductIds: ["prod-cswds-2n1h1", "prod-cswds-3n1h1c1"],
    faqs: [
      {
        question: "Berapa estimasi penghematan biaya operasional dengan dispenser Celiol?",
        answer: "Fasilitas dengan 50-100 karyawan rata-rata menghemat 40% hingga 65% per tahun dibandingkan sistem galon fisik berkat eliminasi biaya pengiriman, penyimpanan galon, dan harga air baku yang sangat murah."
      },
      {
        question: "Apakah sistem pemeliharaan Rp 500.000/bln sudah mencakup penggantian suku cadang filter?",
        answer: "Ya, paket pemeliharaan resmi Rp 500.000/bln mencakup penggantian berkala cartridge sediment bulanan, granular carbon, blok karbon, dan membran RO 0.0001 µm setiap 6 bulan sekali tanpa biaya tambahan tersembunyi."
      },
      {
        question: "Bagaimana cara instalasi dispenser jika kantor berada di gedung bertingkat?",
        answer: "Tim teknisi Celiol akan melakukan survei jalur pipa air bersih (PDAM gedung) terdekat dan menyambungkan pipa fleksibel food-grade bertekanan tinggi dengan instalasi rapi tanpa merusak estetika interior kantor."
      }
    ],
    contentHtml: `
      <p class="lead text-lg text-slate-700 mb-6">Bagi tim pengelola gedung (facility management) dan bagian pengadaan (procurement) di lingkungan perkantoran modern, efisiensi operasional harian serta kepastian anggaran merupakan prioritas utama dalam menjaga kenyamanan ratusan staf dan tamu.</p>
      
      <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">Tantangan Pengelolaan Anggaran Air Minum Fasilitas</h2>
      <p class="text-slate-700 mb-4">Pada gedung perkantoran berskala menengah hingga besar dengan kapasitas 50 hingga 150 karyawan per lantai, kebutuhan air minum harian sangat dinamis. Tantangan operasional yang kerap dihadapi pengelola fasilitas antara lain:</p>
      <ul class="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li><strong>Ketidakpastian Biaya Bulanan:</strong> Fluktuasi konsumsi air saat jam kerja intensif atau acara korporat sering kali memicu pembengkakan biaya tak terduga jika tidak menggunakan skema pemeliharaan tetap.</li>
        <li><strong>Optimalisasi Tata Ruang Pantri:</strong> Pantri perkantoran modern membutuhkan ruang yang lapang, higienis, dan estetik untuk mendukung kolaborasi antar staf, tanpa terbebani penumpukan inventaris logistik yang memakan area kerja bernilai tinggi.</li>
        <li><strong>Keandalan Pasokan Berkelanjutan:</strong> Kesiapan sistem terpusat yang mampu menyalurkan air dingin dan air panas bersuhu presisi secara kontinu selama jam sibuk tanpa jeda tunggu.</li>
      </ul>

      <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">Struktur Biaya Operasional Terencana (Predictable OPEX)</h2>
      <p class="text-slate-700 mb-4">Model pengadaan dispenser komersial Celiol menggabungkan investasi aset fasilitas (*purchase*) dengan paket pemeliharaan berkala terjadwal (*maintenance rutin*). Skema ini memberikan transparansi anggaran yang dapat diproyeksikan secara akurat oleh divisi keuangan.</p>

      <div class="overflow-x-auto my-6">
        <table class="min-w-full divide-y divide-slate-200 border rounded-lg text-sm">
          <thead class="bg-slate-100">
            <tr>
              <th class="px-4 py-3 text-left font-semibold text-slate-800">Komponen Fasilitas</th>
              <th class="px-4 py-3 text-left font-semibold text-slate-800">Cakupan Layanan Terintegrasi</th>
              <th class="px-4 py-3 text-left font-semibold text-brand-600">Alokasi Biaya Terencana</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200">
            <tr>
              <td class="px-4 py-3 font-medium">Paket Maintenance Berkala</td>
              <td class="px-4 py-3">Penggantian filter cartridge bulanan, media karbon & membran RO semesteran, sanitasi tangki SUS 304, kalibrasi sistem on-site</td>
              <td class="px-4 py-3 text-emerald-600 font-semibold">Rp 500.000 / bulan / unit</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-medium">Konsumsi Air Baku Gedung (PDAM)</td>
              <td class="px-4 py-3">Terkoneksi langsung ke jalur pipa air bersih gedung secara aman dan tersaring presisi 0.0001 µm</td>
              <td class="px-4 py-3 text-slate-700 font-medium">~Rp 45.000 / bulan</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-medium">Dukungan Teknisi & SLA Resmi</td>
              <td class="px-4 py-3">Kunjungan teknisi tersertifikasi, pemeriksaan berkala parameter TDS, dan inspeksi higienitas menyeluruh</td>
              <td class="px-4 py-3 text-emerald-600 font-medium">Termasuk dalam Kontrak Pemeliharaan</td>
            </tr>
            <tr class="bg-brand-50 font-bold">
              <td class="px-4 py-3 text-slate-900">Total Biaya Operasional Bulanan</td>
              <td class="px-4 py-3 text-slate-700 font-medium">Estimasi anggaran operasional pasti dan terencana per unit dispenser</td>
              <td class="px-4 py-3 text-brand-700 font-extrabold text-base">~Rp 545.000 / bulan</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">Nilai Tambah Jangka Panjang bagi Fasilitas Perusahaan</h2>
      <p class="text-slate-700 mb-4">Selain memberikan efisiensi anggaran operasional yang terukur, implementasi dispenser komersial terintegrasi di perkantoran memberikan keunggulan strategis berupa:</p>
      <ul class="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li><strong>Dukungan Terhadap Target ESG & Keberlanjutan:</strong> Mengeliminasi jejak karbon pengiriman fisik berkala dan mendukung inisiatif pengurangan sampah kemasan korporat secara berkelanjutan.</li>
        <li><strong>Standar Kesehatan Berkelanjutan:</strong> Filtrasi 5-Tahap Reverse Osmosis (RO) bersertifikasi dipadukan modul UV-C LED aktif memastikan air yang dikonsumsi seluruh karyawan selalu higienis sesuai standar baku mutu Permenkes No. 2/2023.</li>
        <li><strong>Estetika Profesional & Modern:</strong> Desain bodi kokoh stainless steel maupun lacquered glass memperkuat citra profesional gedung dan ruang kerja perusahaan.</li>
      </ul>
    `
  },
  {
    id: "art-002",
    title: "Standar Higienitas Air Minum Komersial: Sinergi Sterilisasi UV-C LED dan Filtrasi 5-Tahap RO",
    slug: "standar-higienitas-air-minum-komersial-uv-c-filtrasi-5-tahap-ro",
    excerpt: "Di lingkungan kerja dengan ratusan pengguna bergantian, nozzle dan tangki dispenser rentan menjadi sarang biofilm dan bakteri. Temukan bagaimana sistem sterilisasi UV-C dan filtrasi RO melindungi kesehatan karyawan.",
    category: "Sanitasi & Higienitas",
    tags: ["higienitas", "UV-C LED", "filtrasi 5-tahap", "reverse osmosis", "kesehatan kantor"],
    featuredImage: "https://images.unsplash.com/photo-1584281729290-3e99fa80dfb2?auto=format&fit=crop&w=1200&q=80",
    featuredImageAlt: "Teknologi filtrasi air higienis dan lampu UV sterilisasi",
    author: {
      name: "Albert Adi Nugraha",
      role: "Commercial Water Solution Specialist",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80"
    },
    publishedAt: "28 Oktober 2026",
    readTimeMinutes: 5,
    viewCount: 980,
    status: "published",
    seo: {
      metaTitle: "Standar Higienitas Air Minum Komersial dengan UV-C & Filtrasi 5-Tahap RO",
      metaDescription: "Mengapa sterilisasi UV-C LED dan filtrasi 5-tahap Reverse Osmosis (RO) wajib ada di dispenser kantor modern? Ketahui cara mencegah penyebaran kuman dan biofilm di tempat kerja.",
      focusKeyword: "higienitas air dispenser komersial"
    },
    relatedProductIds: ["prod-lgcmswds-3n1h1c1", "prod-cswds-3n1h1c1"],
    faqs: [
      {
        question: "Bagaimana cara kerja sterilisasi UV-C LED pada dispenser Celiol?",
        answer: "Modul UV-C LED otomatis memancarkan sinar ultraviolet panjang gelombang 265-280 nm secara terjadwal di dalam tangki air dan nozzle, menonaktifkan DNA mikroorganisme hingga 99.99% tanpa bahan kimia."
      },
      {
        question: "Apakah dispenser Celiol aman dari risiko kontaminasi biofilm?",
        answer: "Ya, kombinasi tangki stainless steel SUS 304 higienis, sistem sirkulasi UV-C aktif, serta desinfeksi berkala teknisi resmi mencegah pembentukan lapisan lendir biofilm secara tuntas."
      }
    ],
    contentHtml: `
      <p class="lead text-lg text-slate-700 mb-6">Kesehatan tenaga kerja berbanding lurus dengan produktivitas bisnis. Namun, dispenser air konvensional di kantor sering kali menjadi salah satu titik paling rentan terkontaminasi jika jarang disanitasi secara profesional.</p>
      
      <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">Bahaya Tersembunyi: Biofilm pada Tangki & Keran Air</h2>
      <p class="text-slate-700 mb-4">Pada sistem penampungan air terbuka tanpa proteksi kedap udara, sirkulasi udara ruangan kantor yang membawa partikel debu, aerosol pendingin ruangan (AC), dan mikroorganisme rentan masuk ke dalam reservoir air. Tanpa proteksi sterilisasi aktif, lapisan lendir mikroskopis yang disebut biofilm dapat mulai terbentuk di dinding tangki dan saluran keran air.</p>

      <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">Solusi Celiol: Sinergi RO 5-Tahap & UV-C LED Sterilization 24/7</h2>
      <p class="text-slate-700 mb-4">Seluruh dispenser komersial Celiol memadukan sistem pemurnian Reverse Osmosis 5-tahap dengan modul sinar ultraviolet UV-C (panjang gelombang 265-280 nm) aktif di dalam tangki air dan nozzle pengeluaran. Sinar UV-C memutus rantai DNA/RNA bakteri dan virus hingga 99.99% tanpa menggunakan bahan kimia apa pun, sehingga air tetap segar dan steril sepanjang waktu.</p>

      <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">Protokol Pemeliharaan Rutin Berkala</h2>
      <p class="text-slate-700 mb-4">Selain teknologi proteksi internal otomatis, paket maintenance berkala dari PT Noto Water Envirotech menjamin penggantian filter cartridge terjadwal serta sanitasi menyeluruh oleh teknisi terlatih, memastikan standar higienitas selalu memenuhi baku mutu Permenkes No. 2 Tahun 2023.</p>
    `
  },
  {
    id: "art-003",
    title: "Panduan Lengkap Memilih Dispenser Air Minum untuk Hotel, Kafe, dan Restoran (HORECA)",
    slug: "panduan-memilih-dispenser-air-hotel-restoran-horeca",
    excerpt: "Kebutuhan air minum di industri hospitality menuntut kecepatan layanan tinggi, fleksibilitas kombinasi suhu (Panas, Dingin, Normal), serta estetika bodi mewah berstandar hotel berbintang.",
    category: "Studi Kasus",
    tags: ["horeca", "dispenser hotel", "restoran", "kafe", "hospitality"],
    featuredImage: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80",
    featuredImageAlt: "Suasana restoran dan hotel mewah dengan dispenser air segar",
    author: {
      name: "Albert Adi Nugraha",
      role: "Commercial Water Solution Specialist",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80"
    },
    publishedAt: "02 November 2026",
    readTimeMinutes: 6,
    viewCount: 1150,
    status: "published",
    seo: {
      metaTitle: "Panduan Memilih Dispenser Air Komersial untuk Hotel & Restoran (HORECA)",
      metaDescription: "Tingkatkan pengalaman tamu Anda dengan air minum berkualitas tinggi, efisiensi operasional hotel, dan dispenser komersial modern terintegrasi.",
      focusKeyword: "dispenser air hotel restoran"
    },
    relatedProductIds: ["prod-lgcmswds-2n1h1", "prod-lgcmswds-3n1h1c1"],
    contentHtml: `
      <p class="lead text-lg text-slate-700 mb-6">Dalam industri hospitality (Hotel, Restaurant, dan Cafe), penyajian air minum bukan sekadar fasilitas pelengkap, melainkan bagian penting dari pengalaman tamu (*guest experience*), efisiensi alur kerja staf dapur, serta citra keberlanjutan properti Anda.</p>
      
      <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">Tantangan Logistik Air di Zona Hospitality</h2>
      <p class="text-slate-700 mb-4">Di industri hospitality dengan ritme kerja yang padat, penyediaan air minum yang tidak terintegrasi sering kali menghadapi keterbatasan ruang inventaris di area dapur yang sempit, risiko keterlambatan pasokan air saat jam sibuk (*rush hour*), serta ketidakstabilan suhu penyajian air.</p>

      <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">Kriteria Utama Dispenser HORECA Celiol</h2>
      <ul class="list-disc pl-6 space-y-2.5 text-slate-700 mb-6">
        <li><strong>Estetika Premium Lacquered Glass:</strong> Varian Ultimate Facility Series berbalut panel kaca reflektif berwarna Slate Blue sangat serasi ditempatkan di lobby hotel, executive lounge, maupun buffet counter tanpa merusak interior mewah.</li>
        <li><strong>Kemudahan Kustomisasi Suhu:</strong> Fleksibilitas memilih konfigurasi suhu air panas berdebit stabil untuk penyeduhan teh/kopi tamu serta air dingin segar untuk area sarapan buffet.</li>
        <li><strong>Standar Higienitas Bebas Kontaminasi:</strong> Material stainless steel dan tangki bebas BPA yang terintegrasi filtrasi Reverse Osmosis 5-Tahap dan sterilisasi UV-C LED aktif memastikan air selalu steril dan aman untuk seluruh tamu internasional.</li>
      </ul>

      <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">Efisiensi Operasional & Keberlanjutan Fasilitas</h2>
      <p class="text-slate-700 mb-4">Dengan sistem dispenser komersial Celiol yang terhubung langsung ke sumber air gedung, hotel dan restoran mendapatkan efisiensi alur kerja staf dapur, stabilitas pasokan air minum tanpa henti, sekaligus memperkuat komitmen ramah lingkungan (*sustainable hospitality*) secara nyata.</p>
    `
  },
  {
    id: "art-004",
    title: "Sistem Filtrasi 5-Tahap Reverse Osmosis (RO): Standar Kemurnian Air Minum Komersial Celiol",
    slug: "sistem-filtrasi-5-tahap-reverse-osmosis-ro-dispenser-celiol",
    excerpt: "Ketahui bagaimana teknologi filtrasi 5-tahap Reverse Osmosis (RO) 0.0001 mikron pada dispenser Celiol memastikan air minum higienis, bebas kuman, logam berat, dan kontaminan bagi fasilitas bisnis Anda.",
    category: "Teknologi Filtrasi",
    tags: ["teknologi filtrasi", "reverse osmosis", "filtrasi 5-tahap", "kualitas air", "celiol dispenser"],
    featuredImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    featuredImageAlt: "Laboratorium pengujian filtrasi air teknologi membran Reverse Osmosis",
    author: {
      name: "Albert Adi Nugraha",
      role: "Commercial Water Solution Specialist",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80"
    },
    publishedAt: "05 November 2026",
    readTimeMinutes: 5,
    viewCount: 840,
    status: "published",
    seo: {
      metaTitle: "Sistem Filtrasi 5-Tahap Reverse Osmosis (RO) Dispenser Komersial Celiol",
      metaDescription: "Pelajari cara kerja filtrasi 5-tahap Reverse Osmosis (RO) 0.0001 mikron Celiol untuk menjamin kemurnian air minum perkantoran dan fasilitas komersial.",
      focusKeyword: "filtrasi 5 tahap reverse osmosis celiol"
    },
    relatedProductIds: ["prod-cswds-2n1h1", "prod-cswds-3n1h1c1"],
    faqs: [
      {
        question: "Berapa ukuran porositas membran Reverse Osmosis Celiol?",
        answer: "Membran RO Celiol memiliki presisi 0.0001 mikron, mampu memisahkan molekul air murni dari logam berat terlarut, garam kapur, mikroplastik, serta mikroorganisme patogen."
      },
      {
        question: "Apakah sistem filtrasi 5-tahap ini membutuhkan daya listrik besar?",
        answer: "Tidak, pompa pendorong RO beroperasi sangat hemat daya hanya saat tangki internal mengisi ulang, dengan efisiensi energi tinggi yang cocok untuk gedung ramah lingkungan (green building)."
      }
    ],
    contentHtml: `
      <p class="lead text-lg text-slate-700 mb-6">Untuk memenuhi standar kesehatan dan keamanan tertinggi di fasilitas komersial modern, seluruh lini dispenser Celiol dibekali standar sistem <strong>Filtrasi 5-Tahap Reverse Osmosis (RO)</strong> terintegrasi.</p>
      
      <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">Mengapa Menggunakan Reverse Osmosis (RO) 0.0001 Mikron?</h2>
      <p class="text-slate-700 mb-4">Berbeda dengan filter konvensional berpori mikro yang lebih longgar sehingga tidak dapat menyaring partikel kimia terlarut atau mikroplastik halus, membran semi-permeabel Reverse Osmosis (RO) memiliki kerapatan pori super-presisi hingga <strong>0.0001 mikron</strong> (seperseratus ribu diameter rambut manusia). Hal ini memungkinkan Celiol memurnikan air baku gedung menjadi air minum murni yang bebas dari timbal, kapur, klorin, bakteri, maupun virus.</p>

      <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">5 Tahapan Pemurnian Air Celiol:</h2>
      <div class="space-y-3.5 my-6">
        <div class="p-4 border border-slate-200 rounded-xl">
          <h3 class="text-sm font-bold text-slate-900 mb-1">Tahap 1: Sedimen PP (Polypropylene Filter)</h3>
          <p class="text-xs text-slate-600 leading-relaxed">Menyaring partikel fisik tersuspensi dari pipa distribusi gedung seperti pasir, karat, lumpur, dan debu.</p>
        </div>
        <div class="p-4 border border-slate-200 rounded-xl">
          <h3 class="text-sm font-bold text-slate-900 mb-1">Tahap 2: Pre-Carbon Active Filter</h3>
          <p class="text-xs text-slate-600 leading-relaxed">Menyerap zat kaporit/klorin, residu pestisida, bahan kimia organik berbahaya, serta menghilangkan bau dan warna pada air baku.</p>
        </div>
        <div class="p-4 border border-slate-200 rounded-xl">
          <h3 class="text-sm font-bold text-slate-900 mb-1">Tahap 3: High-Density Carbon Block</h3>
          <p class="text-xs text-slate-600 leading-relaxed">Menyaring partikel mikro sekunder dan melindungi membran RO dari zat pengoksidasi guna memperpanjang usia operasional sistem.</p>
        </div>
        <div class="p-4 border border-slate-200 rounded-xl">
          <h3 class="text-sm font-bold text-slate-900 mb-1">Tahap 4: Membran Reverse Osmosis (RO) 0.0001 Mikron</h3>
          <p class="text-xs text-slate-600 leading-relaxed">Penyaringan tingkat molekuler yang mengeliminasi hingga 99.99% logam berat (arsenik, timbal, merkuri), mikroplastik, serta menurunkan TDS ke batas kemurnian optimal.</p>
        </div>
        <div class="p-4 border border-slate-200 rounded-xl">
          <h3 class="text-sm font-bold text-slate-900 mb-1">Tahap 5: Post-Carbon Taste Refinement</h3>
          <p class="text-xs text-slate-600 leading-relaxed">Menyempurnakan kesegaran dan cita rasa alami air minum sebelum disalurkan ke tangki penampung berbahan stainless steel higienis.</p>
        </div>
      </div>

      <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">Sinergi Proteksi UV-C LED</h2>
      <p class="text-slate-700 mb-4">Setelah melewati 5 tahap pemurnian RO, tangki dan nozzle dispenser Celiol senantiasa diproteksi oleh sinar UV-C LED otomatis guna memastikan air minum tetap steril 24/7 tanpa risiko rekontaminasi udara.</p>
    `
  },
  {
    id: "art-005",
    title: "Tantangan Rantai Pasok Air Minum Kantor & Solusi Direct-Pipe 5-Tahap Reverse Osmosis",
    slug: "tantangan-rantai-pasok-air-minum-kantor-solusi-direct-pipe-ro",
    excerpt: "Ketergantungan pada sistem galon konvensional membebani anggaran operasional dan logistik kantor. Temukan keunggulan sistem dispenser direct-pipe 5-Tahap RO 0.0001 mikron yang higienis dan efisien.",
    category: "Efisiensi Biaya",
    tags: ["rantai pasok kantor", "direct-pipe", "reverse osmosis", "efisiensi fasilitas", "manajemen gedung"],
    featuredImage: "assets/img/additional/Celiol Dispenser - 01.png",
    featuredImageAlt: "Dispenser Celiol direct-pipe dengan filtrasi reverse osmosis di perkantoran modern",
    author: {
      name: "Albert Adi Nugraha",
      role: "Commercial Water Solution Specialist",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80"
    },
    publishedAt: "09 November 2026",
    readTimeMinutes: 5,
    viewCount: 1250,
    status: "published",
    seo: {
      metaTitle: "Tantangan Rantai Pasok Air Minum Kantor & Solusi Direct-Pipe RO | Celiol",
      metaDescription: "Solusi direct-pipe dispenser 5-tahap RO 0.0001 mikron Celiol mengeliminasi rantai pasok galon, memangkas beban logistik, dan menjaga kepatuhan Permenkes No. 2/2023.",
      focusKeyword: "rantai pasok air minum kantor"
    },
    relatedProductIds: ["prod-cswds-2n1h1", "prod-cswds-3n1h1c1"],
    faqs: [
      {
        question: "Mengapa sistem galon menimbulkan beban operasional tersembunyi bagi perkantoran?",
        answer: "Sistem galon membutuhkan biaya berulang per unit, memakan ruang simpan berharga di kantor, menyita tenaga personel fasilitas untuk angkat galon berat, serta menimbulkan risiko kontaminasi silang pada leher botol."
      },
      {
        question: "Bagaimana dispenser Celiol menyuplai air minum murni tanpa galon?",
        answer: "Dispenser Celiol disambungkan langsung ke instalasi air gedung (direct-pipe). Pemurnian internal menggunakan filtrasi 5-Tahap Reverse Osmosis (RO) 0.0001 mikron dan tangki Stainless Steel SUS 304 food-grade berstandar Permenkes No. 2 Tahun 2023."
      },
      {
        question: "Apa saja cakupan paket pemeliharaan resmi Celiol Rp 500.000/bulan?",
        answer: "Paket mencakup penggantian cartridge sediment setiap 1 bulan, pembaruan media granular carbon, blok karbon, serta membran RO 0.0001 µm setiap 6 bulan, disertai sanitasi higienis tangki secara terjadwal oleh teknisi resmi."
      }
    ],
    contentHtml: `
<p class="mb-5 text-gray-700 leading-relaxed font-normal">Pengelolaan fasilitas perkantoran modern kerap menghadapi tantangan tersembunyi dalam rantai pasok air minum harian. Ketergantungan pada sistem galon konvensional tidak hanya menguras anggaran operasional lewat akumulasi biaya per unit, tetapi juga membebani tim operasional dengan urusan logistik, penerimaan barang, hingga kebutuhan ruang penyimpanan galon yang memakan area produktif kantor.</p>

<h2 class="text-xl sm:text-2xl font-bold text-gray-900 font-heading mt-8 mb-4">Beban Operasional dan Risiko Tersembunyi Sistem Galon</h2>
<p class="mb-5 text-gray-700 leading-relaxed font-normal">Bagi gedung komersial dan korporasi dengan ratusan karyawan, biaya air minum sistem galon memiliki pos pengeluaran sekunder yang jarang dihitung secara cermat:</p>

<ol class="list-decimal pl-6 my-4 space-y-2 text-gray-700 font-sans">
  <li class="leading-relaxed font-normal"><strong>Inefisiensi Anggaran:</strong> Biaya berulang per galon meningkat seiring bertambahnya volume konsumsi air harian karyawan dan tamu.</li>
  <li class="leading-relaxed font-normal"><strong>Beban Tenaga Kerja & Ruang:</strong> Personel fasilitas harus memindahkan galon berat secara manual, meningkatkan risiko kecelakaan kerja dan membuang waktu produktif.</li>
  <li class="leading-relaxed font-normal"><strong>Risiko Kontaminasi Silang:</strong> Area leher galon dan jalur pompa rentan terkontaminasi debu atau sentuhan tangan saat proses penggantian botol.</li>
</ol>

<h2 class="text-xl sm:text-2xl font-bold text-gray-900 font-heading mt-8 mb-4">Solusi Direct-Pipe 5-Tahap Reverse Osmosis 0.0001 Mikron</h2>
<p class="mb-5 text-gray-700 leading-relaxed font-normal">Dispenser Celiol mengeliminasi seluruh rantai pasok galon dengan menyambungkan unit langsung ke instalasi air gedung (direct-pipe). Sistem pemurnian internal menggunakan filtrasi 5-Tahap Reverse Osmosis (RO) berpresisi 0.0001 mikron yang efektif menyaring mikroplastik, klorin, bakteri, virus, endapan kapur, serta logam berat terlarut.</p>
<p class="mb-5 text-gray-700 leading-relaxed font-normal">Air yang dihasilkan mengalir ke tangki internal berbahan Stainless Steel SUS 304 higienis yang sepenuhnya food-grade dan BPA-free, memastikan pemenuhan parameter kelayakan air minum sesuai regulasi Permenkes No. 2 Tahun 2023.</p>

<h2 class="text-xl sm:text-2xl font-bold text-gray-900 font-heading mt-8 mb-4">Pilihan Seri Fasilitas & Fleksibilitas Suhu</h2>
<p class="mb-5 text-gray-700 leading-relaxed font-normal">Untuk menunjang estetika interior pantri maupun ruang eksekutif, Celiol menghadirkan dua lini produk utama:</p>

<ol class="list-decimal pl-6 my-4 space-y-2 text-gray-700 font-sans">
  <li class="leading-relaxed font-normal"><strong>Deluxe Facility Water Dispenser:</strong> Dirancang dengan casing heavy-duty Stainless Steel SUS 304 yang tangguh untuk area dengan lalu lintas penggunaan tinggi.</li>
  <li class="leading-relaxed font-normal"><strong>Ultimate Facility Water Dispenser:</strong> Menghadirkan sentuhan elegan melalui panel lacquered tempered glass yang berpadu dengan bodi stainless steel.</li>
</ol>
<p class="mb-5 text-gray-700 leading-relaxed font-normal">Kedua varian menyediakan opsi 2 atau 3 kran dengan fitur kustomisasi suhu, memungkinkan fasilitas memilih kombinasi air panas, dingin, maupun suhu normal (ambient) sesuai preferensi kerja.</p>

<h2 class="text-xl sm:text-2xl font-bold text-gray-900 font-heading mt-8 mb-4">Kepastian Mutu Melalui Paket Pemeliharaan Resmi</h2>
<p class="mb-5 text-gray-700 leading-relaxed font-normal">Investasi fasilitas perkantoran terhadap dispenser Celiol didukung dengan program kepemilikan unit dan paket pemeliharaan resmi terencana sebesar Rp 500.000/bulan. Tim teknisi melakukan penggantian cartridge sediment setiap 1 bulan, pembaruan media granular carbon, blok karbon, serta membran RO 0.0001 µm setiap 6 bulan, disertai sanitasi higienis tangki secara terjadwal untuk menjaga efisiensi serta higienitas air minum jangka panjang.</p>
    `
  }
];

const SEED_LEADS = [
  {
    id: "lead-001",
    fullName: "Hendra Wijaya",
    companyName: "PT Sentra Graha Finansial",
    phone: "081234567890",
    email: "hendra.w@sentragraha.co.id",
    employeeCount: "30-80 Orang",
    interestedModel: "CSWDS 2N 1H1 (Black)",
    acquisitionType: "Beli Putus (Purchase)",
    message: "Mohon penawaran untuk 4 unit di gedung Wisma GKBI lantai 12-14.",
    status: "new",
    submittedAt: "06 Nov 2026, 14:20"
  },
  {
    id: "lead-002",
    fullName: "Siska Wardhani",
    companyName: "Grand Botanica Hotel",
    phone: "081987654321",
    email: "purchasing@grandbotanica.com",
    employeeCount: "> 200 Orang",
    interestedModel: "LGCMSWDS 3N 1H1C1 (Slate Blue)",
    acquisitionType: "Beli Putus (Purchase)",
    message: "Butuh dispenser kapasitas tinggi untuk area Executive Lounge dan Restoran.",
    status: "contacted",
    submittedAt: "05 Nov 2026, 09:45"
  }
];

// LocalStorage API Provider
window.CeliolData = {
  // Products
  getProducts: function() {
    const raw = localStorage.getItem('celiol_products_v9');
    if (!raw) {
      localStorage.setItem('celiol_products_v9', JSON.stringify(SEED_PRODUCTS));
      localStorage.removeItem('celiol_products_v8');
      localStorage.removeItem('celiol_products_v7');
      localStorage.removeItem('celiol_products_v6');
      localStorage.removeItem('celiol_products_v5');
      localStorage.removeItem('celiol_products_v4');
      localStorage.removeItem('celiol_products_v3');
      localStorage.removeItem('celiol_products_v2');
      localStorage.removeItem('celiol_products');
      return SEED_PRODUCTS;
    }
    try {
      const parsed = JSON.parse(raw);
      // If empty or has old mock IDs, reset to official seed
      if (!Array.isArray(parsed) || parsed.length === 0 || !parsed[0].modelCode.includes('CSWDS') && !parsed[0].modelCode.includes('LGCMSWDS')) {
        localStorage.setItem('celiol_products_v9', JSON.stringify(SEED_PRODUCTS));
        return SEED_PRODUCTS;
      }
      return parsed;
    } catch(e) {
      return SEED_PRODUCTS;
    }
  },

  getProductById: function(id) {
    const products = this.getProducts();
    return products.find(p => p.id === id);
  },

  getProductBySlug: function(slug) {
    const products = this.getProducts();
    return products.find(p => p.slug === slug);
  },

  saveProduct: function(product) {
    let products = this.getProducts();
    if (!product.id) {
      product.id = 'prod-' + Date.now();
      product.createdAt = new Date().toISOString();
      products.unshift(product);
    } else {
      const idx = products.findIndex(p => p.id === product.id);
      if (idx !== -1) {
        product.updatedAt = new Date().toISOString();
        products[idx] = product;
      } else {
        products.unshift(product);
      }
    }
    localStorage.setItem('celiol_products_v9', JSON.stringify(products));
    return product;
  },

  deleteProduct: function(id) {
    let products = this.getProducts();
    products = products.filter(p => p.id !== id);
    localStorage.setItem('celiol_products_v9', JSON.stringify(products));
    return true;
  },

  toggleProductStatus: function(id) {
    let products = this.getProducts();
    const p = products.find(item => item.id === id);
    if (p) {
      p.status = p.status === 'active' ? 'draft' : 'active';
      localStorage.setItem('celiol_products_v9', JSON.stringify(products));
      return p.status;
    }
    return null;
  },

  // Intelligent Article Auto-Formatter
  formatArticleHtml: function(rawText) {
    if (!rawText || typeof rawText !== 'string' || !rawText.trim()) return '';
    let text = rawText.trim();

    // If already contains structured semantic HTML with multiple <p> tags, apply consistent Tailwind spacing & typography
    const pCount = (text.match(/<p[\s>]/gi) || []).length;
    if (pCount >= 2 && (text.includes('<h2') || text.includes('<table') || text.includes('<ul') || text.includes('<ol'))) {
      return text
        .replace(/<p(?![^>]*class=)([^>]*)>/gi, '<p class="mb-5 text-gray-700 leading-relaxed font-normal"$1>')
        .replace(/<h2(?![^>]*class=)([^>]*)>/gi, '<h2 class="text-xl sm:text-2xl font-bold text-gray-900 font-heading mt-8 mb-4"$1>')
        .replace(/<h3(?![^>]*class=)([^>]*)>/gi, '<h3 class="text-lg sm:text-xl font-bold text-gray-900 font-heading mt-6 mb-3"$1>')
        .replace(/<ol(?![^>]*class=)([^>]*)>/gi, '<ol class="list-decimal pl-6 my-4 space-y-2 text-gray-700 font-sans"$1>')
        .replace(/<ul(?![^>]*class=)([^>]*)>/gi, '<ul class="list-disc pl-6 my-4 space-y-2 text-gray-700 font-sans"$1>')
        .replace(/<li(?![^>]*class=)([^>]*)>/gi, '<li class="leading-relaxed font-normal"$1>');
    }

    // Normalize line endings
    text = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

    // Strip wrapping markdown codeblocks
    text = text.replace(/^```(?:html|markdown)?\s*/i, '').replace(/\s*```$/i, '').trim();

    // 1. Separate common merged headings (period or colon directly touching capital section title)
    const knownHeaders = [
      'Beban Operasional dan Risiko Tersembunyi Sistem Galon',
      'Solusi Direct-Pipe 5-Tahap Reverse Osmosis 0.0001 Mikron',
      'Pilihan Seri Fasilitas & Fleksibilitas Suhu',
      'Kepastian Mutu Melalui Paket Pemeliharaan Resmi',
      'Analisis Efisiensi Biaya Operasional',
      'Standar Baku Mutu Permenkes No. 2 Tahun 2023',
      'Standar Higienitas Air Minum Komersial',
      'Kesimpulan dan Rekomendasi Solusi Celiol',
      'Tantangan Pengelolaan Anggaran Air Minum Fasilitas',
      'Struktur Biaya Operasional Terencana',
      'Nilai Tambah Jangka Panjang bagi Fasilitas Perusahaan',
      'Bahaya Tersembunyi: Biofilm pada Tangki & Keran Air',
      '5 Tahapan Pemurnian Air Celiol',
      'Sinergi Proteksi UV-C LED'
    ];

    knownHeaders.forEach(kh => {
      const escaped = kh.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // Preceded by period: "kantor.Beban Operasional..."
      const beforeRegex = new RegExp(`([^\\n])\\s*(${escaped})`, 'g');
      text = text.replace(beforeRegex, '$1\n\n## $2\n\n');
      // Followed by sentence: "## ... SuhuUntuk..."
      const afterRegex = new RegExp(`(##\\s*${escaped})([A-Z][a-z])`, 'g');
      text = text.replace(afterRegex, '$1\n\n$2');
    });

    // 2. Separate known merged list items:
    const knownItems = [
      { key: 'Inefisiensi Anggaran', num: '1' },
      { key: 'Beban Tenaga Kerja & Ruang', num: '2' },
      { key: 'Risiko Kontaminasi Silang', num: '3' },
      { key: 'Deluxe Facility Water Dispenser', num: '1' },
      { key: 'Ultimate Facility Water Dispenser', num: '2' },
      { key: 'Ketidakpastian Biaya Bulanan', num: '1' },
      { key: 'Optimalisasi Tata Ruang Pantri', num: '2' },
      { key: 'Keandalan Pasokan Berkelanjutan', num: '3' },
      { key: 'Dukungan Terhadap Target ESG & Keberlanjutan', num: '1' },
      { key: 'Standar Kesehatan Berkelanjutan', num: '2' },
      { key: 'Estetika Profesional & Modern', num: '3' }
    ];

    knownItems.forEach(item => {
      const escaped = item.key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const r = new RegExp(`([^\\n])\\s*(${escaped}\\s*:)`, 'g');
      text = text.replace(r, `$1\n\n${item.num}. **$2** `);
    });

    // 3. Separate sentences attached without spaces: e.g. "2023.Pilihan" or "tamu.Beban"
    text = text.replace(/([0-9a-z\)])\.(Deluxe|Ultimate|Kedua varian|Air yang dihasilkan|Dispenser Celiol|Investasi fasilitas|Bagi gedung|Sistem pemurnian|Untuk menunjang|Tim teknisi)/g, '$1.\n\n$2');

    // 4. Split lines into logical blocks
    const rawLines = text.split('\n');
    const blocks = [];
    let currentParagraph = [];

    for (let rawLine of rawLines) {
      const trimmed = rawLine.trim();
      if (!trimmed) {
        if (currentParagraph.length > 0) {
          blocks.push(currentParagraph.join(' '));
          currentParagraph = [];
        }
        continue;
      }

      // Markdown Headings: #, ##, ###
      if (/^#{1,4}\s+/.test(trimmed)) {
        if (currentParagraph.length > 0) {
          blocks.push(currentParagraph.join(' '));
          currentParagraph = [];
        }
        blocks.push(trimmed);
        continue;
      }

      // Numbered list items: 1. Item or 1) Item
      if (/^[0-9]+[\.\)]\s+/.test(trimmed)) {
        if (currentParagraph.length > 0) {
          blocks.push(currentParagraph.join(' '));
          currentParagraph = [];
        }
        blocks.push(trimmed);
        continue;
      }

      // Bullet items: * Item or - Item
      if (/^[-*•]\s+/.test(trimmed)) {
        if (currentParagraph.length > 0) {
          blocks.push(currentParagraph.join(' '));
          currentParagraph = [];
        }
        blocks.push(trimmed);
        continue;
      }

      // Table or div HTML
      if (trimmed.startsWith('<table') || trimmed.startsWith('<div') || trimmed.startsWith('<blockquote')) {
        if (currentParagraph.length > 0) {
          blocks.push(currentParagraph.join(' '));
          currentParagraph = [];
        }
        blocks.push(trimmed);
        continue;
      }

      currentParagraph.push(trimmed);
    }

    if (currentParagraph.length > 0) {
      blocks.push(currentParagraph.join(' '));
    }

    // 5. Convert blocks to clean HTML tags with Tailwind typography
    const out = [];
    let inOl = false;
    let inUl = false;

    blocks.forEach(block => {
      // Heading
      if (/^#{1,4}\s+/.test(block)) {
        if (inOl) { out.push('</ol>'); inOl = false; }
        if (inUl) { out.push('</ul>'); inUl = false; }
        const level = block.match(/^#+/)[0].length;
        const title = block.replace(/^#+\s*/, '').trim();
        if (level <= 2) {
          out.push(`\n<h2 class="text-xl sm:text-2xl font-bold text-gray-900 font-heading mt-8 mb-4">${title}</h2>`);
        } else {
          out.push(`\n<h3 class="text-lg sm:text-xl font-bold text-gray-900 font-heading mt-6 mb-3">${title}</h3>`);
        }
        return;
      }

      // Numbered list
      if (/^[0-9]+[\.\)]\s+/.test(block)) {
        if (inUl) { out.push('</ul>'); inUl = false; }
        if (!inOl) {
          out.push('\n<ol class="list-decimal pl-6 my-4 space-y-2 text-gray-700 font-sans">');
          inOl = true;
        }
        let content = block.replace(/^[0-9]+[\.\)]\s+/, '').trim();
        content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        if (!content.includes('<strong>') && content.includes(':')) {
          content = content.replace(/^([^:]+:)/, '<strong>$1</strong>');
        }
        out.push(`  <li class="leading-relaxed font-normal">${content}</li>`);
        return;
      }

      // Bullet list
      if (/^[-*•]\s+/.test(block)) {
        if (inOl) { out.push('</ol>'); inOl = false; }
        if (!inUl) {
          out.push('\n<ul class="list-disc pl-6 my-4 space-y-2 text-gray-700 font-sans">');
          inUl = true;
        }
        let content = block.replace(/^[-*•]\s+/, '').trim();
        content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        if (!content.includes('<strong>') && content.includes(':')) {
          content = content.replace(/^([^:]+:)/, '<strong>$1</strong>');
        }
        out.push(`  <li class="leading-relaxed font-normal">${content}</li>`);
        return;
      }

      // Regular Paragraph
      if (inOl) { out.push('</ol>'); inOl = false; }
      if (inUl) { out.push('</ul>'); inUl = false; }

      if (block.startsWith('<table') || block.startsWith('<div') || block.startsWith('<blockquote')) {
        out.push(block);
        return;
      }

      // Clean inline markdown bolds
      let pContent = block.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      out.push(`<p class="mb-5 text-gray-700 leading-relaxed font-normal">${pContent}</p>`);
    });

    if (inOl) out.push('</ol>');
    if (inUl) out.push('</ul>');

    return out.join('\n');
  },

  // Articles
  getArticles: function() {
    const raw = localStorage.getItem('celiol_articles_v8');
    if (!raw) {
      localStorage.removeItem('celiol_articles_v7');
      localStorage.removeItem('celiol_articles_v6');
      localStorage.removeItem('celiol_articles_v5');
      localStorage.removeItem('celiol_articles_v4');
      localStorage.removeItem('celiol_articles_v2');
      localStorage.removeItem('celiol_articles'); // Clean up old cached articles
      localStorage.setItem('celiol_articles_v8', JSON.stringify(SEED_ARTICLES));
      return SEED_ARTICLES;
    }
    try {
      const articles = JSON.parse(raw);
      let updated = false;
      articles.forEach(a => {
        // Ensure all articles use Albert Adi Nugraha as author
        if (!a.author || a.author.name !== "Albert Adi Nugraha") {
          a.author = {
            name: "Albert Adi Nugraha",
            role: a.author?.role || "Commercial Water Solution Specialist",
            avatarUrl: a.author?.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80"
          };
          updated = true;
        }
        // Ensure contentHtml has proper spacing & formatting
        if (a.contentHtml && !a.contentHtml.includes('<p class=')) {
          a.contentHtml = this.formatArticleHtml(a.contentHtml);
          updated = true;
        }
      });
      if (updated) {
        localStorage.setItem('celiol_articles_v8', JSON.stringify(articles));
      }
      return articles;
    } catch(e) {
      return SEED_ARTICLES;
    }
  },

  getArticleById: function(id) {
    const articles = this.getArticles();
    return articles.find(a => a.id === id);
  },

  getArticleBySlug: function(slug) {
    const articles = this.getArticles();
    let found = articles.find(a => a.slug === slug);
    if (!found) {
      // Graceful fallback for legacy slugs
      if (slug && (slug.includes('galon') || slug.includes('biaya') || slug.includes('hitung') || slug.includes('efisiensi') || slug.includes('rantai-pasok'))) {
        found = articles.find(a => a.id === 'art-005') || articles.find(a => a.id === 'art-001');
      }
    }
    return found || articles[0];
  },

  saveArticle: function(article) {
    let articles = this.getArticles();
    if (!article.author || !article.author.name) {
      article.author = {
        name: "Albert Adi Nugraha",
        role: "Commercial Water Solution Specialist",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80"
      };
    }
    // Auto format content HTML to ensure spacing and list structure
    if (article.contentHtml) {
      article.contentHtml = this.formatArticleHtml(article.contentHtml);
    }
    if (!article.id) {
      article.id = 'art-' + Date.now();
      article.publishedAt = article.publishedAt || "Hari ini";
      article.viewCount = 0;
      articles.unshift(article);
    } else {
      const idx = articles.findIndex(a => a.id === article.id);
      if (idx !== -1) {
        articles[idx] = article;
      } else {
        articles.unshift(article);
      }
    }
    localStorage.setItem('celiol_articles_v8', JSON.stringify(articles));
    return article;
  },

  deleteArticle: function(id) {
    let articles = this.getArticles();
    articles = articles.filter(a => a.id !== id);
    localStorage.setItem('celiol_articles_v8', JSON.stringify(articles));
    return true;
  },

  // Leads / RFQ
  getLeads: function() {
    const raw = localStorage.getItem('celiol_leads');
    if (!raw) {
      localStorage.setItem('celiol_leads', JSON.stringify(SEED_LEADS));
      return SEED_LEADS;
    }
    try {
      return JSON.parse(raw);
    } catch(e) {
      return SEED_LEADS;
    }
  },

  saveLead: function(lead) {
    let leads = this.getLeads();
    lead.id = 'lead-' + Date.now();
    lead.submittedAt = new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    lead.status = 'new';
    leads.unshift(lead);
    localStorage.setItem('celiol_leads', JSON.stringify(leads));
    return lead;
  },

  // Reset to default seed
  resetDefaults: function() {
    localStorage.setItem('celiol_products_v9', JSON.stringify(SEED_PRODUCTS));
    localStorage.removeItem('celiol_products_v8');
    localStorage.removeItem('celiol_products_v7');
    localStorage.removeItem('celiol_products_v6');
    localStorage.removeItem('celiol_products_v5');
    localStorage.removeItem('celiol_products_v4');
    localStorage.removeItem('celiol_products_v3');
    localStorage.removeItem('celiol_products_v2');
    localStorage.removeItem('celiol_products');
    localStorage.setItem('celiol_articles_v8', JSON.stringify(SEED_ARTICLES));
    localStorage.removeItem('celiol_articles_v7');
    localStorage.removeItem('celiol_articles_v6');
    localStorage.removeItem('celiol_articles_v5');
    localStorage.removeItem('celiol_articles_v4');
    localStorage.removeItem('celiol_articles_v2');
    localStorage.removeItem('celiol_articles');
    localStorage.setItem('celiol_leads', JSON.stringify(SEED_LEADS));
    location.reload();
  }
};

// Official Preline UI Icon Initializer (Lucide SVG with Preline standard stroke & shrink)
window.initPrelineIcons = function() {
  if (window.lucide) {
    window.lucide.createIcons({
      attrs: {
        'stroke-width': 2,
        class: 'shrink-0'
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', function() {
  if (window.initPrelineIcons) {
    window.initPrelineIcons();
  }
});
