# STANDAR OPERASIONAL PROSEDUR (SOP) DESAIN, KONTEN & PENGEMBANGAN
## Website B2B Celiol Dispenser — PT Noto Water Envirotech
**Versi:** 1.0  
**Status:** Dokumen Resmi Pedoman UI/UX, Copywriting, dan Manajemen Data  
**Target Pengguna:** Pengembang Web, Desainer UI/UX, Administrator Produk, dan Tim Konten/SEO.

---

## 1. TUJUAN & RUANG LINGKUP

SOP ini disusun sebagai panduan baku (single source of truth) dalam merancang, menambahkan, mengubah, dan memelihara seluruh elemen antarmuka (UI), komponen interaktif, data produk, serta gaya bahasa (copywriting) pada ekosistem web Celiol Dispenser.

Setiap perubahan di masa mendatang **wajib** mengikuti aturan dalam dokumen ini agar konsistensi brand, estetika minimalis profesional B2B, dan akurasi data teknis tetap terjaga.

---

## 2. ATURAN COPYWRITING & TERMINOLOGI RESMI

Gunakan tabel terminologi baku berikut untuk menjaga konsistensi komunikasi brand di seluruh halaman:

| Komponen / Konteks | Istilah RESMI (WAJIB Digunakan) | Istilah DILARANG / HINDARI | Catatan Kebijakan |
| :--- | :--- | :--- | :--- |
| **Layanan Pemeliharaan** | **Maintenance** (misal: *Maintenance: Rp 500.000/bln*) | ~~Biaya Servis~~, ~~Ongkos Servis~~ | Dispenser komersial menggunakan skema maintenance berkala, bukan biaya servis perorangan. |
| **Model Bisnis & Kepemilikan** | **Beli Unit (Purchase) + Maintenance Rutin** | ~~Sewa~~, ~~Rental~~, ~~Sewa Bulanan~~, ~~Sewa Operasional~~, ~~Trial Sewa~~ | Dispenser komersial Celiol TIDAK disewakan. Seluruh unit dibeli sebagai aset fasilitas (purchase) dan didukung paket maintenance berkala (Rp 500.000/bln). Dilarang menampilkan opsi atau klaim sewa menyewa. |
| **Teknologi Filtrasi Air** | **Filtrasi 5-Tahap Reverse Osmosis (RO)** | ~~UF~~, ~~Ultrafiltration~~, ~~Saringan Biasa~~, ~~Filter 3-Tahap~~ | Seluruh unit komersial Celiol wajib menggunakan teknologi filtrasi 5-tahap sistem Reverse Osmosis (RO) 0.0001 mikron. Dilarang mencantumkan atau menawarkan sistem UF (Ultrafiltration). |
| **CTA Utama Beranda** | **Pesan Sekarang** | ~~Minta Penawaran B2B~~ | Mengarahkan calon klien langsung ke form pemesanan cepat. |
| **CTA Tombol Produk & Form** | **Pesan Sekarang** | ~~Minta RFQ~~, ~~Beli Langsung~~, ~~Add to Cart~~ | Digunakan pada tombol kartu produk di katalog, drawer spesifikasi, dan formulir pemesanan cepat. |
| **Segmen Testimoni** | **Testimoni** / **Apa Kata Mereka** | ~~Kepercayaan Korporat~~, ~~Apa Kata Pengelola Gedung & Fasilitas~~ | Lebih ramah, ringkas, dan modern. |
| **Klaim Garansi** | *Dukungan teknisi resmi / Layanan pemeliharaan terjadwal* | ~~Garansi seumur hidup~~, ~~Klaim garansi teknis resmi~~ *(sementara dihindari)* | Jangan membuat klaim garansi prematur sebelum disepakati dalam kontrak SLA resmi. |
| **Sertifikasi Publik** | Hanya sertifikasi yang diverifikasi aktif | ~~Badge sertifikasi acak tanpa lisensi~~ | Bagian badge sertifikasi internasional telah ditiadakan dari beranda. |
| **Stat Hero Kemurnian Air** | **99.9% Kemurnian Air** | ~~Steril UV-C LED~~ | Pada baris statistik hero beranda, gunakan label "Kemurnian Air" agar lebih langsung dipahami manfaat utamanya oleh calon klien. |
| **Suhu Air** | **Air Panas**, **Air Dingin**, **Air Suhu Ruang (Ambient)** | ~~Air Hangat~~, ~~Air Mentah~~, ~~Air Soda~~ *(kecuali ada model baru)* | Menyesuaikan spesifikasi ril produk Celiol saat ini. |
| **Penyebutan Segmen / Pasar** | **Komersial**, **Fasilitas & Kantor**, **Perusahaan**, **Fasilitas Gedung** | ~~B2B~~ | Kata "B2B" dilarang ditampilkan pada seluruh copy teks halaman publik. Gunakan padanan yang lebih elegan dan natural seperti "Komersial", "Fasilitas & Kantor", atau dihilangkan. |
| **Kebijakan Komparasi** | **Fokus Keunggulan Mandiri Celiol** (Sistem Terintegrasi, Predictable OPEX, Higienitas RO 5-Tahap) | ~~Komparasi dengan Galon~~, ~~Tabel vs Galon~~, ~~Klaim vs Galon Konvensional~~ | Dilarang menyertakan komparasi head-to-head langsung dengan air galon di seluruh materi konten (artikel blog, beranda, katalog, brosur, atau form RFQ). Konten wajib berfokus penuh pada keunggulan nilai mandiri Celiol (keandalan pasokan 24/7, kenyamanan pantri modern, higienitas sistem tertutup RO 5-tahap + UV-C, dan transparansi paket maintenance rutin Rp 500k/bln). |

---

## 3. PANDUAN DESAIN UI/UX (DESIGN SYSTEM)

### 3.1 Palet Warna (Tailwind CSS Tokens)
Website Celiol mengadopsi nuansa biru korporat higienis (*clean water tech*):

```css
/* Brand Primary Palette (Tailwind brand) */
--brand-50:  #f0f9ff; /* Background badge / highlight lembut */
--brand-100: #e0f2fe;
--brand-200: #bae6fd;
--brand-500: #0ea5e9;
--brand-600: #0284c7; /* Warna Utama: Tombol CTA, Teks Aksen, Border Fokus */
--brand-700: #0369a1; /* Hover State Tombol Utama */
--brand-800: #075985;
--brand-900: #0c4a6e;

/* Neutral Palette */
--bg-main:    #ffffff; /* Latar belakang utama */
--bg-soft:    #f8fafc; /* Slate-50 / Gray-50 untuk kartu & section selang-seling */
--border:     #e5e7eb; /* Gray-200 untuk divider & container kartu */
--text-head:  #111827; /* Gray-900 font-heading */
--text-body:  #4b5563; /* Gray-600 untuk body text */
--text-muted: #9ca3af; /* Gray-400 untuk metadata & SKU */
```

### 3.2 Tipografi & Hierarchy
- **Font Heading (`font-heading` / `Plus Jakarta Sans`)**:
  - Digunakan untuk: Seluruh elemen heading (`h1` s/d `h6`), judul kartu produk, nama model dispenser, label harga Rupiah (`Rp 33.999.000`), teks counter hasil katalog (seperti `"4 Model Ditemukan"`), dan teks tombol CTA penting.
  - Sifat: Sans-serif modern, tegas, `font-bold` atau `font-extrabold`, `tracking-tight`.
- **Font Kode / Teknis (`font-mono` / `JetBrains Mono`)**:
  - **HANYA BOLEH DIGUNAKAN UNTUK**:
    1. Kode SKU mesin resmi (misal: `CSWDS 2N 1H1`, `LGCMSWDS 3N 1H1C1`).
    2. Angka spesifikasi teknis murni: dimensi fisik (`560 x 430 x 1520 mm`), daya listrik pemanas/pendingin (`2000 Watt`), dan debit teknis (`25 Liter / Jam`).
  - **DILARANG KERAS MENGGUNAKAN `font-mono` PADA**:
    - Teks antarmuka umum seperti `"4 Model Ditemukan"`, `"Daftar Model"`, atau `"Memuat model..."`.
    - Teks rekomendasi kapasitas pengguna seperti `"50 - 80 Orang / hari"`.
    - Teks estimasi biaya atau keterangan paket seperti `"Beli: Rp 33.999.000 / Maintenance: Rp 500.000/bln"` atau `"Sesuai Kontrak"`.
    - Teks konfigurasi keran seperti `"2 Kran (Bisa Custom Suhu)"`.
    - Input form umum seperti nomor telepon atau nama model pada formulir pemesanan.
- **Font Body (`font-sans` / `Inter`)**:
  - Digunakan untuk: Teks isi paragraf, deskripsi fitur, teks artikel blog, label form, dan teks antarmuka standar.
- **Struktur Eyebrow Subtitle**:
  ```html
  <div class="flex items-center gap-2 mb-1.5">
    <span class="w-5 h-0.5 bg-brand-600"></span>
    <span class="text-xs font-bold uppercase tracking-widest text-brand-600">[NAMA KATEGORI / EYEBROW]</span>
  </div>
  ```

### 3.3 Standar Kartu & Container
1. **Sudut & Border**: Gunakan `rounded-xl` atau `rounded-2xl` dengan border tipis `border border-gray-200`. Dilarang menggunakan bayangan berlebih (*chunky shadow*); utamakan `shadow-sm` atau `shadow-xs`.
2. **Hover State**: Halus dengan transisi warna border (`hover:border-brand-600 transition-colors`).
3. **Ikonografi**: Seluruh ikon menggunakan Lucide Icons (`data-lucide="..."`), stroke width `2`, dan selalu memiliki kelas `shrink-0`. Inisialisasi wajib memanggil `window.initPrelineIcons()`.

### 3.4 Standar Navigasi Header (Navbar)
1. **Tautan Utama**: Hanya mencakup halaman mandiri terpisah:
   - `Beranda` (`index.html`)
   - `Katalog Produk` (`catalog.html`)
   - `Blog & Edukasi` (`blog.html`)
2. **Dilarang Menaruh Anchor Link**: Dilarang menyematkan tautan anchor segmen internal beranda (seperti *"Solusi Industri"*) pada navigasi header agar fokus navigasi tetap bersih, konsisten, dan tidak membingungkan pengguna saat berpindah antar halaman.
3. **Portal Admin**: Disembunyikan (*hidden*) dari panduan navigasi publik / header agar calon klien fokus pada produk dan penawaran bisnis. Akses admin dilakukan langsung via path URL internal (`/admin/`) dan wajib melewati autentikasi kata sandi resmi (`celiolsuksesselalu`) pada halaman `admin/login.html` sebelum dapat mengakses dashboard overview, manajemen produk, atau artikel.
4. **Aksi Kanan (Action Items)**:
   - Tombol konversi utama `Minta Penawaran` (`#contactRfq` atau trigger modal katalog).

---

## 4. SOP TAMPILAN PRODUK DI BERANDA

### 4.1 Segmen Hero Carousel (Bagian Paling Atas)
Pada slide carousel hero utama, urutan tampilan wajib:
1. **Atas**: Kode tipe produk (font-mono, warna aksen brand). Contoh: `CSWDS 2N 1H1 (Black)`.
2. **Bawah**: Nama seri/model produk (font-heading gelap bold). Contoh: `Deluxe Series (2-Spout)`.
3. **Tombol**: `Detail` mengarah ke katalog dengan parameter model (`catalog.html?model=...`).

### 4.2 Segmen "Model Pilihan" (Featured Products Grid)
Pada grid 4 kolom produk unggulan di beranda:
1. **Foto Produk**: Panggung foto bersih `relative h-60 bg-gray-50/70` dengan gambar PNG transparan.
2. **Tipe & Model SAJA**:
   - Baris 1: Tipe / Form Factor di kiri (`text-brand-600 uppercase`) dan SKU Model di kanan (`font-mono text-gray-400`).
   - Baris 2: Nama varian produk (`font-heading font-bold text-gray-900 leading-snug`). Teks nama model **wajib membungkus ke baris bawah secara utuh (wrap text)** dan **dilarang menggunakan `line-clamp-1`** agar nama tidak terpotong.
3. **DILARANG memasukkan**:
   - ❌ Paragraf deskripsi peruntukan ruangan (`idealFor`).
   - ❌ Badge list pilihan suhu air di tengah kartu.
   - ❌ Biaya maintenance bulanan pada kartu segmen ini.
4. **Biaya (Card Footer)**:
   - Menampilkan label **Biaya** dan hanya nilai harga beli produk: `Rp [Nominal]`.
   - Tombol **Detail** ke katalog.

### 4.3 Segmen Solusi Sektor Komersial (Carousel Solusi Industri)
Segmen ini wajib berorientasi pada **solusi fasilitas & keunggulan operasional sektor komersial (Solution & Facility Centric)**, BUKAN penjualan perangkat keras spesifik (Product Centric):
1. **Pendekatan Konten (Facility & Solution Centric)**:
   - Menjelaskan bagaimana dispenser komersial Celiol dapat diterapkan dan memecahkan tantangan operasional di sektor tersebut (Perkantoran, Sekolah/Kampus, HORECA, Rumah Sakit, Pabrik/Manufaktur, Gym & Kebugaran, Sarana Olahraga, Stasiun Kereta, Bandara Internasional).
   - Menyoroti efisiensi area kerja, pembebasan dari tumpukan galon manual, higienitas sistem tertutup, dan kesiapan melayani lonjakan konsumsi air saat jam sibuk.
2. **Aturan Elemen Segmen**:
   - ❌ **Dilarang badge SKU produk kaku:** Jangan gunakan label `Model: CSWDS 2N 1H1 (Black)`. Wajib gunakan badge implementasi sektor, contoh: `Penerapan: Pantri & Area Kerja Korporat`.
   - ❌ **Dilarang tombol model spesifik:** Jangan gunakan tombol `Lihat Model CSWDS ...`. Wajib gunakan CTA konsultasi sektor, contoh: `Konsultasi Solusi Perkantoran` yang mengarah ke form konsultasi (`#contactRfq`).
   - ❌ **Hindari narasi angka teknis murni:** Seluruh poin fitur wajib dikaitkan dengan dampak nyata fasilitas (penghematan biaya, kebersihan, kepuasan karyawan/tamu).

### 4.4 Segmen Testimoni ("Apa Kata Mereka")
1. **Tanpa Badge Sektor di Atas Kartu**: Bagian atas kartu testimoni hanya menampilkan deretan 5 bintang rating; **dilarang menyertakan badge kategori sektor** di dalam kartu.
2. **Inisial Nama Pengguna**: Dilarang menggunakan nama lengkap atau gelar akademis panjang. Wajib menggunakan format inisial (misal: `D.W.`, `S.R.`, `A.S.`, `H.W.`, `B.S.`, `K.S.`) untuk menjaga privasi klien.
3. **Kategori Sektor sebagai Pengganti Identitas Perusahaan/Lokasi**: Dilarang menyebutkan nama gedung, nama perusahaan, atau kota klien secara spesifik. Cukup cantumkan jabatan peran dan kategori sektor (contoh: `Facility Manager — Sektor Perkantoran`, `F&B Director — Sektor Hospitality`).

### 4.5 Segmen Formulir Konsultasi & Penawaran Resmi Beranda (`#rfqForm`)
1. **Pendekatan Klien-Sentris (Bukan Model-Centric)**:
   - Calon klien umumnya belum menghafal kode SKU model teknis (`CSWDS...`) dan belum siap memilih skema pengadaan kontrak di tahap awal konsultasi. Dilarang memaksa klien memilih model spesifik atau opsi skema pada formulir beranda.
2. **Struktur Isian Formulir**:
   - **Kontak Dasar**: Nama Lengkap & Jabatan, Nama Perusahaan/Gedung, Nomor WhatsApp aktif, dan Email Kantor.
   - **Sektor Fasilitas (`rfqSector`)**: Pilihan profil tempat (Perkantoran, Hotel/Resto/Kafe, Rumah Sakit/Klinik, Pabrik/Kawasan Industri, Pendidikan, Area Publik).
   - **Estimasi Pengguna (`rfqPax`)**: Pilihan kapasitas harian (10–30, 50–80 [Standar 1 Unit Celiol], 80–150, >150 Orang/hari).
   - **Topik Kebutuhan / Template Pertanyaan (`rfqNeed`)**: Dropdown pertanyaan siap pilih (Rekomendasi model & kapasitas, Hitung simulasi estimasi efisiensi biaya operasional TCO, Kustomisasi kombinasi suhu, Standar higienitas 5-tahap RO & UV-C, Jadwal survei teknis gedung, Proposal resmi pengadaan).
   - **Catatan Tambahan (`rfqNotes`)**: Textarea opsional untuk detail lantai, pantri, atau kebutuhan khusus.

---

## 5. SOP HALAMAN KATALOG & FILTER SPESIFIKASI

### 5.1 Sidebar Filter Katalog (Ringkas & Efisien)
Sidebar filter katalog dirancang bersih dan terfokus pada klasifikasi produk utama:
1. **Pencarian Model / Fitur**: Mendukung pencarian instan nama model, kode SKU, dan kata kunci fasilitas.
2. **Seri Produk (Series Filter)**:
   - `Deluxe Facility (Stainless Steel)`
   - `Ultimate Facility (Lacquered Glass)`
3. **Kategori Filter yang DITIADAKAN**:
   - ❌ **Filter Jumlah Kran & Opsi Suhu Air DITIADAKAN**: Seluruh unit Celiol (baik 2 kran maupun 3 kran) mendukung kustomisasi suhu air secara bebas (*custom suhu*), sehingga opsi suhu tidak dibatasi oleh checkbox filter kaku.
   - ❌ **Filter Material & Finishing, Teknologi Filtrasi, serta Bentuk/Form Factor DITIADAKAN**: Agar navigasi pencarian ringkas; rincian material stainless steel/glass dan filtrasi standar RO 5-tahap diuraikan di modal **Spesifikasi (Details)**.
4. **Kartu Bantuan & Konsultasi Fasilitas**: Tautan langsung untuk pengujian kualitas air baku (TDS) dan survei instalasi cuma-cuma.

### 5.2 Tampilan Kartu Produk di Katalog (Product Display Ringkas)
Tampilan kartu produk pada grid katalog dirancang bersih dan minimalis tanpa overloading informasi:
1. **Elemen yang Ditampilkan**:
   - Foto produk bersih di panggung abu-abu lembut (`relative h-60 bg-gray-50/70`).
   - Baris 1: Form Factor (`text-brand-600 uppercase`) dan SKU Model (`font-mono text-gray-400`).
   - Baris 2: Nama varian produk (`font-heading font-bold text-gray-900`).
   - Baris 3: Tag jumlah kran (misal: `2 Kran` / `3 Kran`) dan badge penanda **"Bisa Custom Suhu"** (`bg-blue-50 text-brand-700`).
   - Baris 4 (Card Footer): Nilai harga beli produk langsung tanpa label teks *"Biaya Unit"*, dengan ukuran font lebih besar dan tegas (`text-lg sm:text-xl font-extrabold text-gray-900 font-heading`).
   - Tombol Aksi: **Spesifikasi** (Membuka modal rincian teknis lengkap) dan **Pesan Sekarang** (Membuka modal formulir pemesanan cepat).
2. **Aturan DILARANG pada Display Kartu**:
   - ❌ **Dilarang memuat bullet points fitur panjang (`keyFeatures`)** di kartu katalog.
   - ❌ **Dilarang memuat paragraf deskripsi peruntukan ruangan** di kartu katalog.
   - Seluruh keterangan lengkap wajib dipindahkan dan dijelaskan di dalam modal **Spesifikasi (Details)**.

### 5.3 SOP Tampilan Pop-up / Modal Spesifikasi Produk & Cetak Spesifikasi PDF (Corporate Standard)
Di dalam modal / pop-up **Spesifikasi Produk** (`#productDetailModal`):
1. **Larangan Penggunaan Kotak/Cards (Zero-Card Standard)**:
   - Dilarang membungkus informasi ke dalam deretan kotak-kotak *cards* yang membuat pop-up padat dan berantakan.
   - **Rekomendasi Kapasitas** dan **Estimasi Beli / Maintenance** wajib **dipisah secara jelas** sebagai baris informasi semantik tipografi terpisah (tanpa kartu penampung / *card container*).
   - **Dilarang menampilkan kartu khusus "Bisa Custom Suhu Air Sesuai Kebutuhan" beserta kartu perbandingan model 2 keran vs 3 keran**. Seluruh model Celiol yang ditampilkan sudah memiliki konfigurasi keran spesifik; yang dapat dikustomisasi adalah pilihan temperatur suhunya dan hal ini cukup dijelaskan di dalam baris **Tabel Spesifikasi Teknis**.
2. **Struktur Header & Ringkasan Atas**:
   - Menampilkan foto unit bersih, badge SKU/Seri, nama produk (H2 font-heading), peruntukan ruangan.
   - Bagian **Estimasi Biaya Pengadaan**: Menampilkan harga beli resmi per unit, catatan biaya belum termasuk Pajak (PPN), Ongkos Kirim dan Pemasangan, serta biaya pemeliharaan berkala Rp 500.000 / bulan / unit (termasuk pemeliharaan bulanan, pergantian filter, perbaikan jika ada kerusakan & 24/7 CS).
   - Bagian **Rekomendasi Kapasitas**: Menampilkan kapasitas layanan harian resmi (30–50 Orang / hari).
   - Tombol aksi utama:
     * **Pesan Sekarang**: Membuka modal formulir pemesanan cepat.
     * **Cetak Spesifikasi (PDF)**: Menjalankan fungsi `printProductDatasheet(productId)` untuk mencetak/menyimpan Lembar Spesifikasi Teknis Resmi (Datasheet) A4 siap cetak dengan Kop Surat PT Noto Water Envirotech, nomor dokumen resmi, dan rincian teknis lengkap.
3. **Standar Cetak Lembar Spesifikasi Teknis (A4 Product Catalog & Technical Datasheet Berbasis SOP)**:
   - Fitur **Cetak Spesifikasi (PDF)** wajib menghasilkan dokumen siap cetak A4 berdesain elegan, profesional, berorientasi *Product Catalog Design*, dan 100% konsisten dengan Design System Celiol:
     * **Standar Warna Font Monokrom Netral (Black & Gray Standard)**: Seluruh teks hanya boleh menggunakan warna hitam (`#1e293b` / `#0f172a`) atau abu-abu netral (`#475569` / `#64748b`). Dilarang keras menggunakan warna font biru (`#0284c7`, `#0369a1`, dsb.).
     * **Standar Dilarang Background Color pada Teks (Zero Text Background Color Standard)**: Dilarang keras memberikan warna latar belakang (*background color*) pada teks—baik berupa badge/pill berwarna (`bg-blue-50`, `#f0f9ff`, `#f8fafc`), highlight teks, maupun sel tabel/kontainer yang diwarnai. Seluruh teks wajib diletakkan di atas latar belakang putih bersih (`#ffffff`) dengan garis pembatas/border tipis halus (`#e2e8f0` atau `#cbd5e1`).
     * **Foto Unit Hero Diperbesar (High-Impact Product Showcase)**: Gambar dispenser diperbesar (tinggi ~240–250px) agar tampil gagah dan jelas sebagai katalog produk profesional, dilengkapi bayangan kontak lantai halus (*floor contact shadow*) bersih tanpa teks label/tag yang mengganggu di bawahnya.
     * **Kop Surat Resmi PT Noto Water Envirotech**: Garis aksen atas minimalis (`2.5px #1e293b`), tipografi CELIOL bold, sub-brand **Commercial Water Dispenser**, alamat kantor Rasuna Said Jakarta Selatan, email `sales@noto.asia`, nomor WhatsApp resmi, dan website `noto.asia`.
     * **Judul Dokumen Resmi**: Menggunakan judul lugas **LEMBAR SPESIFIKASI TEKNIS** (tanpa embel-embel "& estimasi pengadaan unit", dan tanpa subtitle Permenkes di baris judul).
     * **Tata Letak Bebas Cards (Zero-Card Standard)**: Menampilkan nama model, SKU resmi, seri, estimasi biaya beli resmi unit, dan paket pemeliharaan rutin Rp 500.000/bln dalam baris tipografi semantik yang bersih tanpa kartu/kotak pembungkus (zero cards).
     * **Tabel 1: Spesifikasi Parameter Teknis Lengkap**: Diambil langsung dari seluruh parameter teknis lengkap produk terkait (19 parameter teknis termasuk SKU, seri, material bodi, tangki SUS 304, dimensi, keran, custom suhu, kapasitas harian, debit air panas/dingin/normal, daya listrik, tegangan, filtrasi RO 0.0001 µm, sterilisasi UV-C LED, tombol kran presisi, standar mutu Permenkes No. 2/2023, serta skema pengadaan dan ketentuan biaya). Seluruh baris berlatar putih bersih (`#ffffff`), border 1px halus (`#e2e8f0`), dan pembagian font sesuai SOP (`font-heading` untuk label, `font-mono` untuk SKU, dimensi, daya watt, dan debit).
     * **Tabel 2: Fitur & Keunggulan Model (Key Features Masing-Masing Produk)**: Diambil secara dinamis dari `keyFeatures` spesifik unit produk terkait dalam format tabel bersih 3 kolom (No, Fitur Rekayasa Produk, Deskripsi Keunggulan Teknis & Higienitas) tanpa card boxes dan bebas hardcode.
     * **Tabel 3: Paket Layanan Pemeliharaan & Jaminan Layanan Masing-Masing Produk**: Disesuaikan dengan spesifikasi masing-masing unit (menyebutkan SKU model, nama unit, daya watt, konfigurasi kran, seri suku cadang orisinal resmi, serta besaran biaya pemeliharaan berkala). Menyajikan 4 pilar layanan: Pemeliharaan Rutin Bulanan, Pergantian Filter Terjadwal, Garansi Perbaikan Suku Cadang, dan 24/7 Layanan Pelanggan Teknis.
     * **Catatan Ketentuan Pengadaan Resmi**: Penjelasan PPN 11%, ongkos kirim, instalasi perpipaan standar gedung, serta jaminan baku mutu Permenkes RI No. 2/2023.
     * **Paginasi Terkalibrasi**: Terbagi rapi ke dalam 2 halaman A4 pas tanpa tabel terpotong di tengah.
     * **Dilarang mencetak tab tersembunyi**: Konten cetak tidak boleh bergantung pada tab aktif/non-aktif di web modal, melainkan dicetak penuh melalui wadah cetak resmi `#officialPrintDatasheet`.
4. **Tab Navigasi Preline UI (3 Tab Murni Berbasis Tabel pada Tampilan Layar)**:
   - **Tab 1: Tabel Spesifikasi Teknis Lengkap**: Menyajikan seluruh parameter teknis secara komprehensif dalam satu tabel terpadu (SKU, Seri & Warna, Konfigurasi Keran, Kustomisasi Suhu Air, 5-Tahap RO 0.0001 µm, 99.9% Kemurnian Air & UV-C LED, Kapasitas 30–50 Orang/hari, Debit Pemanas/Pendingin/Normal, Material Bodi, Tangki SUS 304 Food Grade, Dimensi Mesin, Daya Listrik Total, Tegangan Listrik, Kran Presisi, Standar Baku Mutu Permenkes No. 2/2023, serta Skema Pembelian + Maintenance Rutin Rp 500k/bln).
   - **Tab 2: Fitur & Keunggulan Model**: Menyajikan daftar keunggulan rekayasa produk dalam format tabel bernomor urut rapi (tanpa *card boxes*).
   - **Tab 3: Perawatan & Komitmen SLA**: Menyajikan tabel 4 pilar layanan pemeliharaan berkala (Pemeliharaan Bulanan, Pergantian Filter Terjadwal, Garansi Perbaikan Suku Cadang, dan 24/7 Layanan Pelanggan dalam paket Rp 500.000 / bulan / unit).

---

## 6. SOP PENAMBAHAN / PERUBAHAN DATA PRODUK

Setiap penambahan atau pembaruan unit produk baru wajib mengikuti skema objek berikut pada `assets/js/data.js` maupun panel admin:

```javascript
{
  id: "prod-[kode-slug-unik]",
  modelCode: "CSWDS [X]N [Y]H[Z]C",         // Wajib: Format kode SKU resmi
  name: "[Nama Seri] ([Jumlah Spout] [Warna])", // Wajib: Contoh: "Deluxe Facility Dispenser (2-Spout Black)"
  series: "Deluxe Facility Water Dispenser",   // Pilihan: Deluxe / Ultimate
  color: "Black",                             // Black / Slate Blue / Custom
  slug: "deluxe-facility-water-dispenser-...", // URL slug ramah SEO
  formFactor: "floor-standing",               // floor-standing / countertop
  temperatures: ["ambient", "hot", "cold"],   // Array kombinasi suhu
  spouts: "3 Kran (1x Normal, 1x Hot, 1x Cold)",
  recommendedPax: "50 - 80 Orang / hari",     // Standar kapasitas per unit hingga maksimal 50-80 orang/hari
  filtrationType: "RO",                       // Wajib: Standar RO 5-Tahap (Bukan UF)
  dispenseType: "push-button",                // push-button / touchless
  coolingCapacityLph: 25,                     // Angka integer debit pendingin
  heatingCapacityLph: 25,                     // Angka integer debit pemanas
  normalWaterYieldLph: 80,                    // Angka integer debit air normal
  tankCapacity: { cold: 25, hot: 25, ambient: 80 },
  dimensions: "900 x 430 x 1520 mm",
  bodyMaterial: "Stainless Steel",            // Stainless Steel / Lacquered Glass
  powerWatt: { heating: 2000, cooling: 1000 },
  voltage: "220-240V ~ 50-60 Hz",
  keyFeatures: [
    "Fitur Utama 1",
    "Fitur Utama 2",
    "Layanan Maintenance Rutin Berkala (Termasuk Penggantian Filter Terjadwal & Sanitasi)"
  ],
  imageCover: "assets/img/products/[filename].png", // PNG Transparan resolusi tinggi
  pdfDatasheetUrl: "Catalogue Product/[Datasheet].pdf",
  isFeatured: true,                           // true jika tampil di Beranda
  status: "active",                           // active / draft
  purchasePrice: 37499000,                    // Angka integer tanpa format titik
  monthlyMaintenancePrice: 500000,            // Standar maintenance Rp 500.000
  priceEstimate: "Beli: Rp 37.499.000 / Maintenance: Rp 500.000/bln",
  idealFor: "Lobby Utama, Kantor Korporat, Rumah Sakit"
}
```

---

## 7. SOP TAMPILAN FOOTER RESMI (OFFICIAL FOOTER)

1. **Logo & Branding Header Footer**:
   - Dilarang menampilkan logo grafis Celiol / ikon tetesan air buatan di dalam footer.
   - Kolom profil kiri langsung memuat deskripsi ringkas solusi dispenser tanpa galon serta hak cipta resmi PT Noto Water Envirotech.
2. **Daftar Model Dispenser**:
   - Dilarang memuat kolom daftar produk spesifik / SKU model dispenser di dalam footer untuk menjaga tampilan tetap bersih dan minimalis (pengunjung diarahkan ke katalog melalui menu Navigasi).
3. **Struktur Grid Footer**:
   - Footer menggunakan grid 4 kolom (`grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8`):
     - Kolom 1 (Span 2): Deskripsi Perusahaan & Legalitas / Hak Cipta.
     - Kolom 2 (Span 1): Menu Navigasi Bersih (Beranda, Katalog Produk, Blog & Edukasi). Dilarang memasukkan tautan anchor segmen beranda (#teknologi, #contactRfq, #industri, #testimoni) dan tautan Portal Admin disembunyikan (*hidden*) dari publik.
     - Kolom 3 (Span 1): Kontak Resmi (Telepon, Email sales@noto.asia, Alamat Kantor).

---

## 8. SOP PORTAL ADMIN & KEAMANAN SISTEM

1. **Akses & Proteksi Kata Sandi**:
   - URL internal: `/admin/` (dan seluruh file antarmuka di dalamnya: `index.html`, `products.html`, `articles.html`).
   - Wajib diproteksi autentikasi kata sandi resmi (`celiolsuksesselalu`) via `admin/login.html` sebelum pengguna dapat melihat atau mengakses dashboard.
2. **Larangan Background Color pada Teks "Admin Portal" / Branding (Clean Text Standard)**:
   - ❌ **DILARANG MEMBERIKAN BACKGROUND COLOR PADA TEKS "ADMIN PORTAL" MAUPUN SUB-JUDUL IDENTITAS ADMIN**:
     Teks seperti `"Admin Portal"`, `"Portal Admin"`, atau label identitas pengelola **wajib tampil bersih murni berupa tipografi (clean text typography)** tanpa kotak badge latar berwarna (dilarang menggunakan `bg-brand-50`, `bg-blue-50`, `bg-gray-100`, dsb.) dan tanpa border pembungkus kotak (*border-box*).
   - Teks disajikan murni dengan warna aksen teks brand (contoh: `text-brand-600 font-heading uppercase tracking-wider`) atau netral di samping wordmark logo utama:
     ```html
     <!-- Format Resmi Header / Brand Login Admin -->
     <a href="../index.html" class="inline-flex items-center gap-2.5 mb-3 group focus:outline-none">
       <span class="text-2xl font-black tracking-tight text-gray-900 font-heading">CELIOL</span>
       <span class="h-4 w-px bg-gray-300"></span>
       <span class="text-xs font-semibold tracking-wider uppercase text-brand-600 font-heading">
         Admin Portal
       </span>
     </a>
     ```
   - Seluruh elemen identitas teks pada halaman login dan dashboard admin wajib mematuhi standar ini agar tampilan selalu mencerminkan citra brand B2B yang bersih, modern, dan tidak terkesan murahan (*uncluttered corporate aesthetic*).

---

## 9. SOP HALAMAN ARTIKEL DETAIL (SINGLE ARTICLE PAGE)

1. **Tata Letak Grid 2 Kolom**:
   - Container utama menggunakan `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12`.
   - Layout responsif 12-kolom:
     - **Kolom Utama (8 Kolom / `lg:col-span-8`)**: Dibungkus kartu putih elegan (`bg-white rounded-2xl sm:rounded-3xl border border-gray-200/90 p-5 sm:p-8 lg:p-10 shadow-xs`).
     - **Kolom Samping (4 Kolom / `lg:col-span-4 lg:sticky lg:top-24`)**: Berisi widget pelengkap yang menempel (*sticky*) saat pengguna membaca artikel.
2. **Elemen Kolom Utama (Artikel)**:
   - **Breadcrumbs**: Beranda > Blog & Edukasi > [Judul Artikel] (tanpa kategori).
   - **Header Artikel**: Langsung judul utama H1 (`font-extrabold font-heading`) tanpa kategori di atas judul, serta bilah metadata penulis (avatar, nama Albert Adi Nugraha, peran, tanggal terbit, waktu baca, dan jumlah pembaca) berlatar transparan (divider halus tanpa background color).
   - **Featured Image**: Aspek rasio 16/9, sudut membulat, dilengkapi caption dinamis berlatar bersih transparan.
   - **Lead Excerpt**: Intisari artikel bergaris aksen tepi (`border-l-4 border-brand-600 pl-4`) tanpa latar warna (bebas background color).
   - **Tipografi Konten (.article-body / .prose)**: Heading h2/h3 tebal berkontras tinggi, spasi baris 1.8, list berpoin jelas (*disc*), dan seluruh teks/tabel bebas latar warna background color.
   - **Topik Terkait**: Tag teks border transparan tanpa background color yang terhubung ke pencarian blog (`blog.html?q=...`).
   - **Author Bio Box**: Kotak profil keahlian Albert Adi Nugraha berlatar bersih transparan tanpa background badge untuk memperkuat E-E-A-T.
   - **Bilah Aksi Bawah**: Tombol "Kembali ke Blog & Edukasi" dan tombol CTA "Pesan Sekarang / Konsultasi".
3. **Elemen Kolom Samping (Sidebar)**:
   - **Widget 1: Dispenser Terkait (Zero-Card Standard)**: Format daftar produk elegan berbasis divider halus (`divide-y divide-gray-100`). **DILARANG KERAS menggunakan cards dalam cards** (dilarang membungkus tiap produk dalam kotak card terpisah dengan border/background tebal). Menampilkan foto transparan pada stage abu-abu lembut tanpa border ganda, kode SKU resmi (`font-mono text-brand-600`), nama produk (`font-heading font-bold`), kapasitas layanan `50 - 80 Orang / hari`, harga beli resmi (`font-heading font-extrabold`), dan tombol aksi "Pesan Sekarang".
   - **Widget 2: Artikel Edukasi Lainnya**: Daftar 2-3 artikel edukasi lain dari basis data agar pembaca tetap menjelajah konten edukasi.
   - **Widget 3: Konsultasi Fasilitas Gedung**: Kartu gradient gelap profesional dengan tombol langsung WhatsApp Sales (+62 821-2098-8201) dan tombol eksplorasi katalog.

---

## 10. CHECKLIST QUALITY CONTROL (QC) SEBELUM PUBLIKASI

Sebelum menerapkan kode ke live/production, lakukan verifikasi mandiri berikut:

- [ ] **Navigasi & Header/Footer Check**: Tautan menu Navigasi (header & footer) hanya mencakup halaman terpisah: *Beranda*, *Katalog Produk*, dan *Blog & Edukasi*. Tidak ada anchor link internal (#) dan tombol *Portal Admin* disembunyikan dari antarmuka publik.
- [ ] **Katalog Product Display & Custom Suhu Check**: Kartu produk di katalog ringkas tanpa bullet points keterangan panjang, menampilkan penanda kran & "Bisa Custom Suhu", serta penjelasan lengkap custom suhu (baik 2 keran maupun 3 keran) diuraikan di modal Spesifikasi (Details).
- [ ] **Footer Check**: Tidak menampilkan logo grafis Celiol dan tidak memuat kolom Model Dispenser di footer (tata letak rapi 4 kolom).
- [ ] **Model Bisnis Check**: Dilarang ada kata "sewa", "rental", atau opsi sewa di seluruh halaman. Skema resmi adalah Beli Unit (Purchase) + Maintenance Rutin.
- [ ] **Filtrasi 5-Tahap RO Check**: Dilarang mencantumkan opsi atau menyebut sistem UF (Ultrafiltration). Seluruh unit wajib terstandarisasi sistem Filtrasi 5-Tahap Reverse Osmosis (RO) 0.0001 mikron.
- [ ] **Copy Check**: Tidak ada kata "biaya servis" pada produk (harus "maintenance").
- [ ] **CTA Check**: Tombol hero beranda bertuliskan "Jelajahi Produk" atau "Pesan Sekarang".
- [ ] **Carousel Check**: Di hero carousel, kode SKU berada di baris atas, dan nama model berada di baris bawah.
- [ ] **Model Pilihan Check**: Kartu produk di segmen Model Pilihan beranda hanya menampilkan Tipe, Model, dan Biaya Beli (tanpa deskripsi panjang & tanpa maintenance fee).
- [ ] **Filter Check**: Sidebar filter katalog ringkas dan efisien (hanya memuat Pencarian Cepat dan Seri Produk; tanpa kategori kaku jumlah kran, opsi suhu, material, filtrasi, dan form factor).
- [ ] **Testimoni Check**: Judul segmen menggunakan "Testimoni" dan "Apa Kata Mereka", nama inisial saja, tanpa badge sektor di dalam kartu, dan tanpa menyebut instansi/kota spesifik.
- [ ] **Bebas Komparasi Galon Check**: Dilarang memuat komparasi head-to-head dengan air galon konvensional di seluruh konten (artikel blog, testimoni, hero stat, dan form RFQ). Narasi wajib berfokus mandiri pada keunggulan teknologi, higienitas sistem tertutup, dan efisiensi operasional terencana.
- [ ] **Admin Portal Clean Text Check**: Teks identitas seperti "Admin Portal" atau "Portal Admin" di halaman login maupun dashboard wajib tampil murni dan elegan sebagai tipografi bersih (*clean text*) tanpa latar warna kotak (bebas dari kelas background-color seperti `bg-brand-50` dan border-box).
- [ ] **Halaman Artikel Detail Check**: Layout 2-kolom seimbang dengan kartu putih editorial, featured image 16/9, caption dinamis, author bio box, tombol Pesan Sekarang, dan sidebar dispenser terkait berbasis divider bebas nested cards (Zero-Card Standard) dengan kapasitas 50-80 orang/hari serta artikel lainnya.
- [ ] **Icon Check**: Fungsi `initPrelineIcons()` terpanggil dan seluruh ikon SVG ter-render rapi.
- [ ] **Mobile Responsive**: Tampilan rapi pada viewport smartphone (360px - 414px) dan desktop (1024px+).
