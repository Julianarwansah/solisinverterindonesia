# Panduan Deployment via GitHub ke Hostinger 🐙 -> 🚀

Menggunakan GitHub sebagai jembatan deployment adalah cara paling profesional. Anda cukup `git push` dari VS Code, dan website di Hostinger akan terupdate otomatis.

## 📋 Tahap 1: Upload ke GitHub

1. **Inisialisasi Git** (di folder `laravel_app` laptop Anda):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Laravel version with Next.js UI"
   ```
2. **Setup Repository**:
   - **Jika belum ada**: Buat repository baru di [github.com](https://github.com) (Private disarankan).
   - **Jika SUDAH ada**: Anda bisa langsung pakai repository tersebut.
   - Hubungkan folder lokal ke GitHub (lewati jika sudah terhubung):
     ```bash
     git remote add origin https://github.com/Username/repo-anda.git
     git branch -M main
     git push -u origin main
     ```
   - *Catatan: Pastikan semua perubahan terbaru sudah di-push sebelum lanjut ke Hostinger.*

## 📋 Tahap 2: Setup SSH Key (Untuk Private Repo)

Jika repository Anda **Private**, Hostinger butuh izin akses:
1. Di Hostinger hPanel, cari menu **Git**.
2. Klik tombol **Generate SSH Key**.
3. Copy key yang muncul (biasanya diawali `ssh-rsa`).
4. Buka Repository GitHub Anda -> **Settings** -> **Deploy keys**.
5. Klik **Add deploy key**, beri nama "Hostinger", paste kodenya, dan centang **Allow write access** (opsional, tapi disarankan).

## 📋 Tahap 3: Hubungkan GitHub ke Hostinger

> [!TIP]
> **Apa itu URL SSH?**
> Untuk repository **Private**, menggunakan SSH jauh lebih mudah karena tidak perlu mengetik password/token berkali-kali.
> - URL HTTPS (Anda): `https://github.com/Julianarwansah/solisinverterindonesia.git`
> - **URL SSH (Gunakan ini):** `git@github.com:Julianarwansah/solisinverterindonesia.git`
>
> **Cara mendapatkannya di GitHub:**
> 1. Klik tombol hijau **Code** di halaman repository Anda.
> 2. Klik tab **SSH**.
> 3. Copy link yang diawali `git@github.com...`.

> [!IMPORTANT]
> **PENTING: Struktur Folder Anda (`public_html/laravel_app`)**
> 1. **Backup file `.env`**: Masuk ke File Manager, copy file `.env` dari dalam `public_html/laravel_app` ke folder root.
> 2. **Pindahkan isi `laravel_app`**: Pindahkan semua isi `public_html/laravel_app` ke folder backup (misal `live_backup`).
> 3. **Link Git**: Saat mengisi form Git:
>    - **Repository URL**: `git@github.com:Julianarwansah/solisinverterindonesia.git`
>    - **Install Path**: Ketik `laravel_app`.
>    - **PENTING**: Folder `laravel_app` harus **KOSONG** sebelum klik Create.

1. Di Hostinger hPanel (**Advanced** -> **Git**):
2. **Repository URL**: `git@github.com:Julianarwansah/solisinverterindonesia.git`
3. **Branch**: `main`.
4. **Install Path**: Ketik `laravel_app`.
5. Klik **Create**.

## 📋 Tahap 4: Setup Auto-Deployment (Webhook)

... (sama seperti sebelumnya) ...

## 📋 Tahap 5: Deployment Script (Apa yang harus dilakukan?)

> [!WARNING]
> **Jika Menu "Deployment Script" tidak ada di hPanel Anda:**
> Beberapa paket Hosting (Shared) memang tidak menyediakan menu script otomatis. Jika tidak ada, Anda punya dua pilihan **"Plan B"**:

### Opsi 1: Pakai SSH (Paling Bersih)
Jika Anda tidak bisa input script di panel, Anda bisa menjalankan perintah manual lewat Terminal (VS Code Anda) yang terhubung ke Hosting:
1. Anda harus login SSH ke Hostinger (Menu **Advanced > SSH Access**).
2. Jalankan perintah ini di terminal VS Code setelah Anda `push`:
   ```bash
   ssh user@ip-hosting "cd public_html/laravel_app && php artisan migrate --force && php artisan optimize"
   ```

### Opsi 2: Buat Route khusus Update (Paling Mudah)
Jika tidak ingin pakai SSH, kita bisa buat "pintu rahasia" di Laravel untuk menjalankan perintah tersebut via URL.
1. Tambahkan kode ini di `routes/web.php` project Anda:
   ```php
   Route::get('/deploy-update-8899', function() {
       Artisan::call('migrate', ['--force' => true]);
       Artisan::call('optimize');
       return "Update Berhasil!";
   });
   ```
2. Setelah Anda `push` ke GitHub dan Hostinger sudah menarik datanya, Anda tinggal buka alamat: `websiteanda.com/deploy-update-8899`.

## � Tahap 6: Struktur Hybrid (Next.js + Laravel)

Jika ingin tampilan luar **Next.js** dan tampilan dalam (admin) **Laravel**:
1.  **Laravel (API/Admin)**: Sudah berada di folder `laravel_app`. Anda bisa mengaksesnya (misal) lewat `solisinverterindonesia.com/laravel_app/public`.
2.  **Next.js (Frontend)**: 
    *   Lakukan `npm run build` di laptop.
    *   Hasil folder `out` atau file statisnya diupload ke root `public_html`.
    *   Alternatif: Jika pakai Hostinger Node.js, Next.js ditaruh sejajar dengan `laravel_app`.

## 🚀 Kesimpulan... (lanjutan)
