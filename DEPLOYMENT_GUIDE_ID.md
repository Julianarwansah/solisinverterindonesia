# Panduan Deployment Solis Inverter ke Hostinger

Panduan ini akan membantu Anda mengunggah dan mengatur website Solis Inverter Indonesia (Backend Laravel + Frontend Statis) ke hosting Hostinger.

## 1. Persiapan File
Saya telah membuatkan dua file ZIP untuk Anda di folder project:
*   **`backend.zip`**: Berisi kode Laravel (API).
*   **`frontend.zip`**: Berisi kode tampilan website (Next.js Static).

## 2. Mengunggah Backend (Laravel)

1.  Login ke **hPanel Hostinger** Anda.
2.  Buka **File Manager**.
3.  Di folder `domains/solisinverterindonesia.com/` (atau root domain Anda), buat folder baru bernama `laravel_app`.
    *   *Catatan: Folder ini sebaiknya sejajar dengan `public_html`, bukan di dalamnya, untuk keamanan.*
4.  Masuk ke folder `laravel_app` tersebut.
5.  **Unggah** file `backend.zip`.
6.  Klik kanan pada `backend.zip` dan pilih **Extract** (Ekstrak). Pilih tujuan ekstraksi ke folder saat ini (`.`).
7.  Hapus file `backend.zip` setelah diekstrak.

## 3. Mengatur Database

1.  Di hPanel, cari menu **Databases** -> **Management**.
2.  Buat Database Baru:
    *   **Database Name**: (misal: `u123456_solis_db`)
    *   **MySQL Username**: (misal: `u123456_solis_user`)
    *   **Password**: (Simpan password ini baik-baik)
3.  Klik **Create**.
4.  Kembali ke File Manager, buka folder `laravel_app`.
5.  Cari file `.env.example`, ubah namanya menjadi `.env`.
6.  Edit file `.env` tersebut dan sesuaikan dengan detail database Anda:
    ```env
    APP_NAME=SolisInverter
    APP_ENV=production
    APP_DEBUG=false
    APP_URL=https://api.solisinverterindonesia.com  <-- Sesuaikan dengan domain/subdomain API Anda

    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=u123456_solis_db (nama database dari langkah 2)
    DB_USERNAME=u123456_solis_user (username dari langkah 2)
    DB_PASSWORD=password_anda (password dari langkah 2)
    ```
7.  Simpan file.

## 4. Setup Aplikasi Laravel (via SSH atau Terminal)

Jika Anda memiliki akses terminal di hPanel (fitur Advanced -> Terminal):
1.  Masuk ke folder laravel: `cd domains/solisinverterindonesia.com/laravel_app`
2.  Install dependency (jika perlu, tapi `vendor` sudah disertakan di zip): `composer install --optimize-autoloader --no-dev`
3.  Generate key aplikasi: `php artisan key:generate`
4.  Migrasi database: `php artisan migrate --force`
5.  Link storage (agar gambar muncul): `php artisan storage:link`
    *   *Penting: Langkah ini membuat shortcut dari `public/storage` ke `storage/app/public`. Pastikan folder `public` laravel bisa diakses.*

**Alternatif jika tidak ada Terminal (Manual Storage Link):**
1.  Di File Manager, masuk `laravel_app/storage/app`.
2.  Pastikan ada folder `public`.
3.  Masuk ke `public_html/storage` (jika Anda ingin menyimpan gambar di public_html utama) ATAU biarkan di `laravel_app/public/storage`.
*Cara paling mudah di Hostinger Shared:* gunakan `cron job` untuk mengeksekusi perintah sekali saja:
`cd /home/u123456/domains/solisinverterindonesia.com/laravel_app && php artisan storage:link`

## 5. Mengunggah Frontend (Tampilan Web)

1.  Di File Manager, buka folder **`public_html`**.
2.  Hapus file default Hostinger (seperti `default.php`) jika ada.
3.  **Unggah** file `frontend.zip`.
4.  Klik kanan dan **Extract**. Pastikan isinya langsung berada di `public_html` (bukan di dalam subfolder `out`).
    *   Jika terekstrak ke dalam folder `out`, masuk ke folder itu, blok semua file, dan **Move** (Pindahkan) ke `public_html`.
5.  Hapus `frontend.zip`.

## 6. Selesai!

Website Anda sekarang seharusnya sudah bisa diakses di domain utama.

**Tips Tambahan:**
*   Pastikan URL API di frontend sudah benar mengarah ke backend Anda. Jika Anda mengalami error CORS atau 404 pada data produk, cek kembali konfigurasi `.env` Laravel.
*   Jika gambar tidak muncul, cek kembali langkah "Link Storage".
