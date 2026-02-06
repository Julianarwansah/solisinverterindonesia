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
   - Buat repository baru di [github.com](https://github.com) (Private disarankan).
   - Hubungkan folder lokal ke GitHub:
     ```bash
     git remote add origin https://github.com/Username/repo-anda.git
     git branch -M main
     git push -u origin main
     ```

## 📋 Tahap 2: Setup SSH Key (Untuk Private Repo)

Jika repository Anda **Private**, Hostinger butuh izin akses:
1. Di Hostinger hPanel, cari menu **Git**.
2. Klik tombol **Generate SSH Key**.
3. Copy key yang muncul (biasanya diawali `ssh-rsa`).
4. Buka Repository GitHub Anda -> **Settings** -> **Deploy keys**.
5. Klik **Add deploy key**, beri nama "Hostinger", paste kodenya, dan centang **Allow write access** (opsional, tapi disarankan).

## 📋 Tahap 3: Hubungkan GitHub ke Hostinger

> [!IMPORTANT]
> **PENTING: Jika Website Sudah Live (Ada file di hPanel)**
> Karena Hostinger mewajibkan folder `public_html` **KOSONG**, ikuti langkah aman ini agar website tidak error lama:
> 1. **Backup file `.env`**: Masuk ke File Manager, copy file `.env` ke folder lain (misal folder root `/`).
> 2. **Pindahkan isi `public_html`**: Buat folder baru bernama `live_backup` (sejajar dengan `public_html`), lalu pindahkan semua isi `public_html` ke sana.
> 3. **Link Git**: Sekarang `public_html` kosong, lakukan proses **Create** di menu Git Hostinger.
> 4. **Kembalikan `.env`**: Setelah file dari GitHub masuk ke `public_html`, copy kembali file `.env` tadi ke dalam `public_html`.
> 5. **Sync Storage**: Jika ada gambar yang sudah diupload user di website live, pindahkan folder `storage/app/public` dari `live_backup` ke `public_html/storage/app/public`.

1. Di Hostinger hPanel (**Advanced** -> **Git**):
2. **Repository URL**: Masukkan URL SSH repo Anda (contoh: `git@github.com:user/repo.git`).
3. **Branch**: `main`.
4. **Install Path**: Kosongkan (untuk install langsung di `public_html`).
5. Klik **Create**.

## 📋 Tahap 4: Setup Auto-Deployment (Webhook)

Agar website update otomatis saat Anda `git push`:
1. Di Hostinger, klik tombol **Auto-deployment** pada repo yang baru dibuat.
2. Copy **Webhook URL** yang diberikan.
3. Di GitHub Repository -> **Settings** -> **Webhooks** -> **Add webhook**.
4. Paste URL ke **Payload URL**.
5. **Content type**: `application/json`.
6. Klik **Add webhook**.

## 📋 Tahap 5: Deployment Script (Khusus Laravel)

Agar Laravel berjalan sempurna setelah diupdate, Hostinger menyediakan fitur **Deployment Script**:
1. Di menu Git Hostinger, cari bagian **Deployment Script**.
2. Masukkan script berikut:
   ```bash
   # Masuk ke direktori aplikasi
   cd public_html
   
   # Update dependencies (jika ada perubahan composer.json)
   composer install --no-dev --optimize-autoloader
   
   # Link storage (hanya sekali, tapi aman dijalankan berulang)
   php artisan storage:link
   
   # Jalankan migrasi database
   php artisan migrate --force
   
   # Optimasi Cache
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```
3. Klik **Save**. Sekarang, setiap kali Anda push, script ini akan dijalankan otomatis.

## 🚀 Keuntungan Cara Ini:
- **Backup Aman**: Kode Anda tersimpan di GitHub.
- **Update Cepat**: Langsung `git push`, Hostinger otomatis tarik data.
- **Auto-Fix**: Script deployment memastikan cache selalu update dan database termigrasi.

> [!WARNING]
> Jangan pernah meng-upload file `.env` ke GitHub. Pastikan `.env` sudah ada di file `.gitignore`. Kelola file `.env` langsung melalui File Manager Hostinger di root folder.
