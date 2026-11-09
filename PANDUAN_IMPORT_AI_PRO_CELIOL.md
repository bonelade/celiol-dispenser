# Panduan Pembuatan Artikel Edukatif & Optimasi SEO Hook dengan Google AI Pro (Gemini)
**Celiol Dispenser — PT Noto Water Envirotech**

Panduan ini dibuat agar Anda dapat memanfaatkan akun langganan **Google AI Pro (Gemini Advanced)** bulanan untuk memproduksi artikel edukasi berbobot tinggi dengan **daya pikat SEO (SEO Hook)** yang terbukti meningkatkan *Click-Through Rate* (CTR) dan menduduki peringkat #1 Google SERP tanpa biaya token / *pay-as-you-go*.

---

## 1. Fitur Optimasi SEO & Edukasi Terbaru yang Telah Aktif

1. **Auto FAQ Rich Snippet (Schema.org FAQPage)**:
   - Setiap artikel yang di-generate menyertakan 3-4 Tanya Jawab Kunci (FAQ).
   - Sistem secara otomatis menginjeksi skema data terstruktur Google (`FAQPage` JSON-LD). Google akan menampilkan akordion tanya-jawab langsung di halaman hasil pencarian, membuat hasil pencarian Celiol tampil 2x lebih besar dan dominan!
2. **Daftar Isi Otomatis (Table of Contents Jump Links)**:
   - Setiap sub-judul (`<h2>`) otomatis dipindai dan dibuatkan navigasi lompat cepat. Ini memicu Google menampilkan fitur *site-links* ("Lompat ke bagian ini") pada hasil pencarian.
3. **Indikator Progres Membaca (Reading Progress Bar)**:
   - Batang progres biru elegan di bagian atas layar artikel untuk meningkatkan interaktivitas (*dwell time*), mengurangi *bounce rate*, yang merupakan sinyal positif algoritma Google.
4. **Live On-Page SEO & Hook Audit Checklist di Admin Panel**:
   - Di formulir editor artikel, panel audit otomatis mengukur skor kesiapan SEO (0 - 100):
     - Focus Keyword di Judul H1
     - Focus Keyword di Permalink Slug
     - Focus Keyword di Meta Deskripsi
     - Panjang Meta Deskripsi optimal (120-160 karakter)
     - Struktur Heading (`<h2>`) terdeteksi
     - Format Edukasi (Tabel Komparasi / Bullet Points)
5. **Google SERP Snippet Switcher (Desktop & Mobile Preview)**:
   - Menguji tampilan cuplikan hasil pencarian Google baik di layar Komputer maupun Layar HP calon klien.

---

## 2. Alur Kerja 3 Langkah (Sangat Praktis)

1. **Buka Panel Admin Celiol** di [`admin/articles.html`](admin/articles.html).
2. Klik tombol **"Import dari Google AI Pro"** (ikon sparkles).
3. **Pilih Ide Topik Edukatif Populer** dari menu tarik-turun (atau biarkan kosong jika Anda memiliki topik sendiri).
4. Klik **"Salin Master Prompt"**.
5. Buka **[gemini.google.com](https://gemini.google.com)** dengan akun Google AI Pro Anda, tempelkan teks prompt tersebut, lalu tekan **Enter**.
6. Salin seluruh balasan dari Gemini, kembali ke Panel Admin Celiol, tempel di kolom input, lalu pilih:
   - **Proses & Buka di Editor**: Untuk melihat Live SEO Scorecard dan membaca ulang sebelum publikasi.
   - **Proses & Langsung Terbitkan**: Artikel langsung aktif di situs web seketika!

---

## 3. Master Prompt Resmi Celiol (Edukasi Ilmiah & Berita Terkini)

Prompt berikut sudah ditanamkan langsung pada tombol *Salin Master Prompt* di panel admin:

```text
Anda adalah Senior Water Quality Educator, Environmental Health Specialist, & Technical SEO Content Strategist untuk Celiol Dispenser (PT Noto Water Envirotech - https://celiol.cloud).

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
   - Setiap paragraf WAJIB dibungkus tag <p class="mb-5 leading-relaxed"> dan dipisahkan jeda baris ganda (\n\n).
   - Setiap sub-judul topik WAJIB menggunakan tag <h2> dengan jeda baris jelas sebelum dan sesudahnya.
   - Setiap poin bernomor WAJIB menggunakan tag <ol class="list-decimal pl-6 my-4 space-y-2.5"><li><strong>Nama Poin:</strong> Penjelasan mendalam...</li></ol>.
   - DILARANG KERAS menempelkan judul ke kalimat berikutnya atau menggabungkan poin tanpa jeda baris.

FORMAT KELUARAN (WAJIB KELUARKAN DALAM BLOK JSON MURNI TANPA TEKS LAIN SEBELUM ATAU SESUDAHNYA):
{
  "title": "Judul artikel edukatif ber-hook tajam dan ramah SEO (maksimal 70 karakter)",
  "slug": "url-permalink-ramah-seo-huruf-kecil-dipisah-tanda-hubung",
  "category": "Pilih salah satu: Sanitasi & Higienitas | Teknologi Filtrasi | Kualitas Air & Regulasi | Studi Kasus Fasilitas",
  "excerpt": "Ringkasan intisari artikel 2-3 kalimat berbasis fakta ilmiah/berita yang memikat pembaca (maksimal 200 karakter).",
  "contentHtml": "<p class=\"mb-5 leading-relaxed\">Paragraf pembuka ber-hook kuat dengan rujukan berita/riset terkini...</p>\n\n<h2>Sub-judul Bahaya Kualitas Air & Fakta Riset</h2>\n\n<p class=\"mb-5 leading-relaxed\">Penjelasan mendalam mengutip rujukan media berita atau jurnal ilmiah...</p>\n\n<ol class=\"list-decimal pl-6 my-4 space-y-2.5\">\n  <li><strong>Fakta Kualitas 1:</strong> Uraian parameter...</li>\n  <li><strong>Fakta Kualitas 2:</strong> Uraian parameter...</li>\n</ol>\n\n<div class=\"overflow-x-auto my-6\"><table class=\"min-w-full border text-xs sm:text-sm\"><thead><tr class=\"bg-slate-100\"><th class=\"p-3 text-left\">Parameter Kualitas Air</th><th class=\"p-3 text-left\">Air Minum Galon Biasa</th><th class=\"p-3 text-left text-brand-700\">Dispenser RO Celiol</th></tr></thead><tbody><tr><td class=\"p-3 font-semibold\">Presisi Filtrasi Molekuler</td><td class=\"p-3\">Bervariasi (Risiko Partikel Terlarut)</td><td class=\"p-3 font-bold text-emerald-700\">RO 0.0001 Mikron (Penyaringan Molekuler)</td></tr><tr><td class=\"p-3 font-semibold\">Residu Mikroplastik</td><td class=\"p-3\">Rentan Partikel Mikroplastik Kemasan</td><td class=\"p-3 font-bold text-emerald-700\">Bebas Mikroplastik (Tersaring 99.99%)</td></tr><tr><td class=\"p-3 font-semibold\">Standar Higienitas Wadah</td><td class=\"p-3\">Plastik Berulang Rentan Biofilm</td><td class=\"p-3 font-bold text-emerald-700\">Tangki SUS 304 Food-Grade BPA-Free</td></tr><tr><td class=\"p-3 font-semibold\">Kepatuhan Permenkes No. 2/2023</td><td class=\"p-3\">Tergantung Penanganan Distribusi Fisik</td><td class=\"p-3 font-bold text-emerald-700\">Terpenuhi Konsisten di Titik Kran</td></tr></tbody></table></div>\n\n<h2>Sub-judul Solusi Reverse Osmosis 0.0001 Mikron & Standar Kesehatan</h2>\n\n<p class=\"mb-5 leading-relaxed\">Penjelasan sistem filtrasi Reverse Osmosis berpresisi 0.0001 mikron dan kepatuhan baku mutu Permenkes No. 2 Tahun 2023...</p>\n\n<h2>Kesimpulan & Rekomendasi Solusi Celiol</h2>\n\n<p class=\"mb-5 leading-relaxed\">Rekomendasi implementasi sistem pemurnian air direct-pipe Celiol untuk menjamin kesehatan pengguna fasilitas secara berkelanjutan...</p>",
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
[TULISKAN TOPIK, PERTANYAAN, ATAU KASUS YANG INGIN DIBAHAS DI SINI]
```

---

## 4. Solusi Anti-Teks Menumpuk (Auto-Formatter Celiol)

Jika Anda menyalin artikel dari Gemini baik dalam format JSON, format teks biasa, atau teks yang jeda barisnya terkompresi / hilang:

1. **Auto-Formatting saat Import**:
   - Sistem CMS Celiol secara otomatis memindai judul bab, paragraf, dan daftar berangka `1.`, `2.`, `3.`.
   - Menghasilkan tag `<p class="mb-5 leading-relaxed">`, `<h2>`, dan `<ol class="list-decimal pl-6 my-4 space-y-2 text-gray-700">` dengan spasi lega standar editorial.
2. **Tombol "Rapikan Jeda & Spasi Otomatis" di Editor Artikel**:
   - Jika Anda menempelkan teks langsung ke textarea konten editor, cukup klik tombol **"Rapikan Jeda & Spasi Otomatis"** (ikon sparkles). Seluruh teks seketika akan diubah menjadi format paragraf dan daftar bernomor yang rapi.
3. **Auto-Format Fallback di Halaman Baca (`article-detail.html`)**:
   - Halaman artikel publik memiliki *built-in formatter* yang memastikan semua artikel selalu tampil rapi dengan tipografi lapang dan navigasi daftar isi (*jump links*).

---

## 5. Rekomendasi Topik Edukatif Populer (Berbasis Riset & Berita Terkini)

1. *Fakta Ilmiah Bahaya Mikroplastik pada Air Minum Kemasan & Solusi Filtrasi Reverse Osmosis 0.0001 Mikron* (Rujukan Riset Lingkungan & Media Berita)
2. *Implementasi Standar Baku Mutu Air Minum Permenkes No. 2 Tahun 2023 pada Gedung & Fasilitas Komersial* (Kepatuhan Regulasi Kemenkes RI)
3. *Mengenal Biofilm pada Jalur Keran Dispenser & Keunggulan Tangki Stainless Steel SUS 304 Food-Grade* (Higienitas, Mikrobiologi & Sanitasi)
4. *Perbandingan Efektivitas Membran Reverse Osmosis 0.0001 Mikron vs Filtrasi Konvensional Menurut Kajian WHO* (Kajian Sains Pemurnian Air)
5. *Pengaruh Kualitas Air Minum dan Hidrasi Terhadap Fokus serta Kesehatan Pengguna Fasilitas Modern* (Kesehatan, Kebugaran & Ergonomi Kerja)

