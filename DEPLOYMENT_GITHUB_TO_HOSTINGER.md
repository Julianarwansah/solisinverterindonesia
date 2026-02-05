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
   - Buka [github.com](https://github.com) dan buat repository baru (Private disarankan).
   - Hubungkan folder lokal ke GitHub:
     ```bash
     git remote add origin https://github.com/Username/repo-anda.git
     git branch -M main
     git push -u origin main
     ```

## 📋 Tahap 2: Hubungkan GitHub ke Hostinger

1. Login ke **hPanel Hostinger**.
2. Cari menu **Advanced** -> **Git**.
3. Masukkan **Repository URL** (pilih HTTPS atau SSH).
4. Pilih Branch: `main`.
5. Klik **Create**.

## 📋 Tahap 3: Setup Auto-Deployment (Webhook)

Agar setiap Anda push ke GitHub website otomatis terupdate:
1. Di Hostinger, klik tombol **Auto-deployment**.
2. Copy **Webhook URL** yang diberikan.
3. Buka Repository Anda di GitHub -> **Settings** -> **Webhooks**.
4. Klik **Add webhook**.
5. Paste URL ke **Payload URL**, pilih `application/json`.
6. Klik **Add webhook**.

## 🚀 Keuntungan Cara Ini:
- **Backup Aman**: Kode Anda tersimpan di GitHub.
- **Update Cepat**: Tidak perlu ZIP dan upload manual lagi.
- **Kolaborasi**: Memudahkan jika nanti ada tim lain yang ikut mengedit.

> [!WARNING]
> Jangan pernah meng-upload file `.env` ke GitHub. Pastikan `.env` sudah ada di file `.gitignore`. File `.env` dikonfigurasi langsung lewat File Manager Hostinger.
