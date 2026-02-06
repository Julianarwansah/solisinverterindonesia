# Panduan Deployment Laravel ke Hostinger 🚀

Hostinger memiliki panel (hPanel) yang sangat user-friendly untuk Laravel. Versi Laravel yang kita buat jauh lebih mudah dideploy daripada Next.js.

## 📋 Langkah-langkah Deployment

### 1. Persiapan Archive di Laptop
- Di terminal folder `laravel_app`, bersihkan cache:
  ```bash
  php artisan config:clear
  php artisan cache:clear
  ```
- Kompres seluruh isi folder `laravel_app` (termasuk folder `public`, `app`, `config`, dll) menjadi `solis_laravel.zip`.
- **Catatan**: Folder `vendor` dan `node_modules` tidak perlu disertakan agar ringan.

### 2. Upload ke hPanel Hostinger
- Buka **File Manager** di Hostinger hPanel.
- Masuk ke folder `public_html`.
- Upload `solis_laravel.zip` dan **Extract**.
- Pindahkan isi folder hasil ekstrak agar file `index.php` berada di dalam folder yang benar (biasanya Hostinger mengarahkan domain ke `public_html/public` secara otomatis jika diatur sebagai "Laravel Application").

### 3. Setup Database
- Buka menu **Databases** -> **Management** di hPanel.
- Buat database, username, dan password baru.
- Masuk ke **phpMyAdmin**, pilih database tersebut, dan klik **Import**.
- Upload file SQL hasil export dari database lokal (Laragon) Anda.

### 4. Konfigurasi `.env`
- Di File Manager, edit `.env`:
  ```env
  APP_ENV=production
  APP_DEBUG=u363044081_solosiindo
  APP_URL=https://nama-domain-anda.com

  DB_DATABASE=u123456789_nama_db
  DB_USERNAME=u123456789_user_db
  DB_PASSWORD=password_anda
  ```

### 5. Optimasi Hostinger (PENTING)
- Buka Hostinger **Terminal** atau **SSH** (jika paket Anda mendukung).
- Jalankan:
  ```bash
  composer install --no-dev --optimize-autoloader
  php artisan storage:link
  php artisan optimize
  ```

## 🔔 Keuntungan di Hostinger:
- **Auto-Installer**: Hostinger memiliki fitur deteksi Laravel yang membantu konfigurasi folder `public` secara otomatis.
- **Node.js**: Sebenarnya bisa Next.js, tapi versi Laravel ini **jauh lebih hemat RAM** dan jarang mengalami error 503 dibandingkan Next.js di Shared Hosting.

