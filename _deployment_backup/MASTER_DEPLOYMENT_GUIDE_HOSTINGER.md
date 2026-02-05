# Panduan Lengkap Deploy Manual Hostinger (Tanpa Git) 🚀

Panduan ini khusus untuk deploy secara **MANUAL** (Upload File) ke Hostinger Cloud Startup.
Kita akan deploy **Backend (Directus)** dan **Website (Next.js)**.

---

## 📦 Bagian 1: Persiapan File di Laptop (Wajib)

Kita akan siapkan dan bungkus (ZIP) semua file di laptop dulu agar siap upload.

### A. Persiapan Backend (Directus)

1.  **Buat Folder Baru**
    Buat folder kosong di Desktop laptop Anda, beri nama `upload_directus`.

2.  **Siapkan Directus**
    Buka terminal (CMD/PowerShell) di folder `upload_directus` tersebut:
    ```bash
    npm init -y
    npm install directus
    ```
    *Ini akan membuat file `package.json` dan folder `node_modules`.*

3.  **Hapus `node_modules`**
    PENTING: Hapus folder `node_modules` sebelum di-zip (kita install ulang di server nanti biar cepat uploadnya).

4.  **Siapkan Snapshot Database**
    Dari folder project `solisinverterindonesia` Anda yang sekarang:
    - Masuk ke folder `cms`: `cd cms`
    - Jalankan: `npx directus schema snapshot snapshot.yaml`
    - Copy file `snapshot.yaml` ini ke dalam folder `upload_directus` di Desktop tadi.
    - Copy juga folder `uploads` (isi gambar) ke dalam `upload_directus`.

5.  **ZIP Folder**
    Select semua isi folder `upload_directus` (package.json, snapshot.yaml, folder uploads) -> Klik Kanan -> **Compress to ZIP**.
    Nama file: `directus_siap_upload.zip`.

---

### B. Persiapan Frontend (Next.js)

1.  **Build Project**
    Di terminal project `solisinverterindonesia`:
    ```bash
    npm run build
    ```
    tunggu sampai selesai.

2.  **Siapkan Folder Standalone**
    Masuk ke folder hidden `.next/standalone`. Folder ini adalah hasil build yang siap pakai.
    
    ⚠️ **PENTING: Copy Item Tambahan**
    Secara default, standalone tidak menyertakan gambar/css static. Kita harus copy manual:
    - Copy folder `.next/static` -> Paste ke dalam `.next/standalone/.next/static`
    - Copy folder `public` -> Paste ke dalam `.next/standalone/public`

3.  **ZIP Folder Standalone**
    Masuk ke dalam folder `.next/standalone`, Select Semua isinya -> Klik Kanan -> **Compress to ZIP**.
    Nama file: `nextjs_siap_upload.zip`.

---

## 🗄️ Bagian 2: Setup Database Hostinger

1.  Login ke **hPanel Hostinger**.
2.  Menu **Databases** -> **Management**.
3.  **Create New Database**:
    - **Name**: `u123456_directus` (Catat!)
    - **User**: `u123456_admin` (Catat!)
    - **Pass**: `PasswordKuat123!` (Catat!)
4.  Klik Create.

---

## ⚙️ Bagian 3: Deploy Backend (Directus)

### 1. Buat Subdomain & App
- **Domains** -> **Subdomains**: Buat `admin.domainanda.com`. Custom folder: `public_html/admin`.
- **Advanced** -> **Node.js**:
  - Create Application
  - Version: `20`
  - Mode: `Production`
  - Root: `public_html/admin` (sesuai subdomain)
  - URL: `admin.domainanda.com`
  - Startup File: `node_modules/directus/cli.js` (Ketik manual ini!)
  - Klik **Create**.

### 2. Upload File
- Buka **File Manager** Hostinger.
- Masuk folder `public_html/admin`.
- Hapus file default (kalau ada).
- **Upload** file `directus_siap_upload.zip` yang sudah Anda siapkan tadi.
- Klik Kanan file zip -> **Extract** (dot `.` untuk extract di folder ini).
- Hapus file zip nya.

### 3. Install Directus di Server
- Di menu Node.js, klik tombol **Create Package.json** (jika ada, atau pastikan package.json dari zip terbaca).
- Klik tombol **Run NPM Install** (Tunggu sampai selesai).
  *Ini akan menginstall Directus di server.*

### 4. Setup Environment (.env)
- Di menu Node.js, klik **Environment Variables**.
- Masukkan (Copy-Paste satu per satu):
  ```
  KEY=randomPanjang123
  SECRET=randomPanjang456
  PORT=8055
  PUBLIC_URL=https://admin.domainanda.com
  
  DB_CLIENT=mysql
  DB_HOST=127.0.0.1
  DB_PORT=3306
  DB_DATABASE=u123456_directus (sesuai Bagian 2)
  DB_USER=u123456_admin (sesuai Bagian 2)
  DB_PASSWORD=PasswordKuat123! (sesuai Bagian 2)
  
  ADMIN_EMAIL=admin@domainanda.com
  ADMIN_PASSWORD=AdminPass123!
  
  CORS_ENABLED=true
  CORS_ORIGIN=https://domainanda.com
  ```
- Save.

### 5. Apply Snapshot & Start
- Buka **Terminal** hPanel (bukan di laptop).
- Ketik: `cd public_html/admin`
- Ketik: `npx directus schema apply ./snapshot.yaml` (Pilih Yes).
- Kembali ke menu Node.js -> Klik **Start/Restart**.

Tes buka: `https://admin.domainanda.com`. Login harusnya bisa!

---

## 🌐 Bagian 4: Deploy Frontend (Next.js)

### 1. Buat App Node.js Kedua
- **Advanced** -> **Node.js**:
  - Create Application
  - Version: `20`
  - Mode: `Production`
  - Root: `public_html` (folder utama domain)
  - URL: `domainanda.com`
  - Startup File: `server.js` (Ketik manual!)
  - Klik **Create**.

### 2. Upload File
- Buka **File Manager**.
- Masuk folder `public_html`.
- Hapus file default (index.php, default.php, dll).
- **Upload** file `nextjs_siap_upload.zip`.
- Klik Kanan -> **Extract** (dot `.`).
- Hapus file zip.
- Pastikan ada file `server.js` di root `public_html`.

### 3. Install Dependencies
- Di menu Node.js App kedua (Web).
- Klik **Run NPM Install**.

### 4. Setup Environment (.env)
- Di menu Node.js -> **Environment Variables**.
- Input:
  ```
  NEXT_PUBLIC_DIRECTUS_URL=https://admin.domainanda.com
  DIRECTUS_URL=https://admin.domainanda.com
  PORT=3000
  ```
- Save.

### 5. Start Website
- Kembali ke menu Node.js.
- Klik **Start/Restart**.

---

## ✅ Selesai!

Cek website utama: `https://domainanda.com`.

### Jika Website Error 500 / Tidak Muncul Gambar:
1. Pastikan Anda SUDAH copy folder `public` dan `.next/static` saat tahap **Persiapan B (No. 2)**. Ini kesalahan paling umum.
2. Cek Log di menu Node.js untuk melihat error detail.
