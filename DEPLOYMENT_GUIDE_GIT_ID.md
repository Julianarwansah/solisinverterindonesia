# Panduan Deployment Solis Inverter via Git ke Hostinger

Panduan ini untuk men-deploy website menggunakan Git.

## 1. Push Kode ke GitHub (Local)

Di komputer Anda (VS Code Terminal), jalankan perintah berikut untuk mengirim semua kode (termasuk folder `out` dan `laravel_app`) ke repository GitHub Anda:

```bash
git push origin main
# atau sesuaikan dengan branch Anda
```

## 2. Persiapan di Hostinger (Server)

1.  Login ke **hPanel Hostinger**.
2.  Buka menu **Advanced** -> **Terminal** (atau gunakan SSH Client seperti PuTTY).
3.  Masuk ke direktori user Anda (biasanya sudah default saat login).

## 3. Clone Repository

Kita akan men-clone repository ke folder terpisah agar kode sumber aman dan tidak terekspos langsung ke publik.

```bash
# Pastikan berada di home directory
cd ~

# Clone repository (Ganti URL dengan URL repo Anda)
# Jika repository Private, Anda perlu setup SSH Key atau Personal Access Token terlebih dahulu.
git clone https://github.com/Julianarwansah/solisinverterindonesia.git build_repo
```

*Sekarang folder `build_repo` berisi seluruh kode proyek.*

## 4. Setup Backend (Laravel)

Kita pindahkan atau link folder `laravel_app` dari repo ke tempat yang seharusnya.

```bash
# Masuk ke folder domain Anda
cd domains/solisinverterindonesia.com

# Pindahkan/Copy folder laravel_app dari repo
cp -r ~/build_repo/laravel_app .

# Masuk ke folder laravel_app
cd laravel_app

# Setup .env (Edit sesuai database Anda)
cp .env.example .env
nano .env 
# (Simpan dengan Ctrl+X, Y, Enter)

# Install Dependencies & Setup
composer install --no-dev
php artisan key:generate
php artisan migrate --force
php artisan storage:link
```

## 5. Setup Frontend (Static)

Kita copy isi folder `out` (hasil build Next.js) ke folder `public_html`.

```bash
# Kembali ke folder domain Anda
cd ~/domains/solisinverterindonesia.com

# PENTING: Backup file lama dulu!
# Kita pindahkan isi public_html saat ini ke folder backup
# Jika folder public_html_backup sudah ada, hapus dulu atau beri nama lain
rm -rf public_html_backup
mv public_html public_html_backup

# Buat folder public_html baru yang kosong
mkdir public_html

# Copy isi folder out dari repo ke public_html
cp -r ~/build_repo/out/* public_html/
```

## 6. Update Kedepannya

Setiap kali Anda update kode dan melakukan `npm run build` serta `git push` di lokal:

1.  Login SSH Hostinger.
2.  Jalankan perintah update:

```bash
cd ~/build_repo
git pull origin main  # Ambil kode terbaru termasuk folder out baru
cp -r out/* ~/domains/solisinverterindonesia.com/public_html/  # Update frontend
cp -r laravel_app/* ~/domains/solisinverterindonesia.com/laravel_app/ # Update backend jika ada perubahan
```

## Alternatif: Menggunakan Fitur Git di hPanel (GUI)

Jika Anda tidak ingin mengetik perintah git clone manual, Anda bisa menggunakan fitur Git di hPanel, **NAMUN** cara ini memiliki keterbatasan:
1.  **Wajib Akses Terminal**: Karena folder `vendor` tidak ikut di-upload (aturan Git standar), Anda **tetap harus** membuka Terminal untuk menjalankan `composer install` agar Laravel berjalan. Jika tidak, backend akan error.
2.  **Struktur Folder**: Setelah pull, file website Anda akan berada di dalam folder `out`, jadi Anda tetap harus memindahkannya manual via File Manager.

**Langkah-langkah:**

1.  Di hPanel, cari menu **Git**.
2.  **PENTING (Untuk Repo Private):**
    *   Lihat bagian atas halaman Git Hostinger, ada tulisan **"SSH key"** (diawali `ssh-rsa ...`).
    *   **Copy** kode tersebut.
    *   Buka **GitHub** -> Buka Repository `solisinverterindonesia`.
    *   Masuk ke **Settings** -> **Deploy Keys** -> **Add deploy key**.
    *   **Title**: Hostinger
    *   **Key**: Paste kode SSH tadi.
    *   Klik **Add key**.
3.  Kembali ke hPanel Hostinger.
4.  Masukkan Repository URL: `git@github.com:Julianarwansah/solisinverterindonesia.git` (Gunakan format git@, bukan https)
5.  Branch: `main`
6.  Directory: Kosongkan (agar ke root project, tapi ingat ini akan menimpa public_html).
    *   *Saran:* Tetap gunakan folder terpisah misal `build_git` agar `.git` folder tidak terekspos di public_html, lalu pindahkan isinya manual. Tapi jika ingin langsung di root (`/`), pastikan folder `public_html` KOSONG dulu.
7.  Klik **Create**.
6.  Setelah selesai, klik **Deploy** (atau Auto Deploy).
7.  **PENTING (Langkah Lanjutan):**
    *   Buka **File Manager**.
    *   Buka folder `build_git` (atau nama folder yang Anda pilih).
    *   Pindahkan isi folder `out` ke `public_html`.
    *   Pindahkan folder `laravel_app` ke root domain (**PENTING: Jangan masukkan ke public_html. Ini demi KEAMANAN agar password database tidak bisa diakses publik**).
    *   **Login ke SSH:**
        *   Buka Terminal di laptop Anda (VS Code / PowerShell).
        *   Ketik: `ssh -p 65002 u363044081@178.16.132.161`
        *   Masukkan password SSH Anda (ketikan tidak muncul, itu normal).
    *   **Setelah masuk SSH, jalankan:**
        ```bash
        cd domains/solisinverterindonesia.com/laravel_app
        composer install --no-dev
        php artisan key:generate
        php artisan migrate --force
        php artisan storage:link
        ```
