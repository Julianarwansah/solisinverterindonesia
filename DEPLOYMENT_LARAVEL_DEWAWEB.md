# Panduan Deployment Laravel ke Dewaweb (cPanel) 🚀

Karena kita sudah memindahkan seluruh tampilan (Next.js UI) dan data ke **Laravel**, proses hosting di Dewaweb menjadi jauh lebih mudah dan stabil dibandingkan menggunakan Node.js/Next.js.

## 📋 Langkah-langkah Deployment

### 1. Persiapan File di Laptop
- Masuk ke folder `laravel_app`.
- Hapus folder `node_modules` dan `vendor` untuk memperkecil ukuran file (nanti di-install di server).
- Zip seluruh isi folder `laravel_app` menjadi `laravel_ready.zip`.
- **PENTING**: Pastikan file `.env` juga ikut di-zip (atau buat manual nanti di server).

### 2. Upload ke cPanel
- Buka **File Manager** di cPanel Dewaweb.
- Upload `laravel_ready.zip` ke folder tujuan (misal: `public_html/solis` atau langsung di root `public_html`).
- **Ekstrak** file tersebut.

### 3. Setup Database di cPanel
- Buka menu **MySQL® Databases**.
- Buat database baru (misal: `u123_solis`).
- Buat user database baru dan berikan akses penuh ke database tersebut.
- **Import Data**: Gunakan **phpMyAdmin** untuk mengimpor database lokal Anda ke database hosting.

### 4. Konfigurasi `.env` di Server
- Edit file `.env` di server.
- Sesuaikan bagian berikut:
  ```env
  APP_ENV=production
  APP_DEBUG=false
  APP_URL=https://solisinverterindonesia.com

  DB_DATABASE=nama_db_cpanel
  DB_USERNAME=user_db_cpanel
  DB_PASSWORD=password_db_cpanel
  ```

### 5. Pengaturan Folder `public` (Agar Website Jalan)
Laravel mengharuskan akses point ada di folder `public`.
- **Opsi A (Paling Aman)**: Gunakan Menu **Domains** di cPanel untuk mengubah "Document Root" domain Anda ke folder `public_html/public`.
- **Opsi B**: Jika tidak bisa ubah root, kita gunakan file `.htaccess` di root untuk mengarahkan ke `public`.

### 6. Finalisasi via Terminal (SSH)
Jika Anda punya akses SSH:
- Jalankan `composer install --no-dev`.
- Jalankan `php artisan storage:link`.
- Jalankan `php artisan config:cache` dan `php artisan route:cache`.

---

## 💡 Kenapa Pakai Cara Ini?
1. **Performa**: Website akan loading sangat cepat karena menggunakan PHP asli di server Dewaweb.
2. **Kemudahan**: Anda tidak perlu pusing memikirkan `GLIBC` error atau `NPROC` limits yang sering terjadi di Node.js/Next.js.
3. **Tampilan**: Tampilan 100% sama dengan desain Next.js yang lama.
