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

> [!IMPORTANT]
> **PENTING: Struktur Folder Anda (`public_html/laravel_app`)**
> Karena project Anda berada di dalam folder `laravel_app`, perhatikan pengaturan ini:
> 1. **Backup file `.env`**: Masuk ke File Manager, copy file `.env` dari dalam `public_html/laravel_app` ke folder root (luar `public_html`).
> 2. **Pindahkan isi `laravel_app`**: Pindahkan semua isi `public_html/laravel_app` ke folder backup (misal `live_backup`).
> 3. **Link Git**: Saat mengisi form Git:
>    - **Install Path**: Masukkan `laravel_app` (agar file dari GitHub masuk ke folder tersebut).
>    - **PENTING**: Folder `public_html/laravel_app` harus **KOSONG** saat pertama kali dihubungkan.

1. Di Hostinger hPanel (**Advanced** -> **Git**):
2. **Repository URL**: Masukkan URL SSH repo Anda.
3. **Branch**: `main`.
4. **Install Path**: Ketik `laravel_app`.
5. Klik **Create**.

## 📋 Tahap 4: Setup Auto-Deployment (Webhook)

... (sama seperti sebelumnya) ...

## 📋 Tahap 5: Deployment Script (Struktur `laravel_app`)

Sesuaikan perintah `cd` agar script berjalan di folder yang benar:
1. Di menu Git Hostinger, cari bagian **Deployment Script**.
2. Masukkan script berikut:
   ```bash
   # Masuk ke direktori aplikasi (SESUAI STRUKTUR ANDA)
   cd public_html/laravel_app
   
   # Update dependencies
   composer install --no-dev --optimize-autoloader
   
   # Link storage
   php artisan storage:link
   
   # Jalankan migrasi database
   php artisan migrate --force
   
   # Optimasi Cache
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```
3. Klik **Save**.

## 🚀 Keuntungan Cara Ini:
- **Backup Aman**: Kode Anda tersimpan di GitHub.
- **Update Cepat**: Langsung `git push`, Hostinger otomatis tarik data.
- **Auto-Fix**: Script deployment memastikan cache selalu update dan database termigrasi.

> [!WARNING]
> Jangan pernah meng-upload file `.env` ke GitHub. Pastikan `.env` sudah ada di file `.gitignore`. Kelola file `.env` langsung melalui File Manager Hostinger di root folder.
