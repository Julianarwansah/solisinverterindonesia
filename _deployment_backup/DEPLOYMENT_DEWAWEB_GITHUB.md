# Panduan Deploy Dewaweb via GitHub (Next.js & Directus) 🚀

Panduan ini menggunakan fitur **Git™ Version Control** dan **Setup Node.js App** di cPanel Dewaweb.
Lokasi instalasi: Langsung di folder domain `/solisinverterindonesia.com` (Bukan di dalam `public_html`).

---

## 🛠️ Langkah 1: Persiapan Project di Laptop

Pastikan project Anda sudah dipisah ke GitHub:
1. **Frontend Repository**: `solisinverters-web` (Gunakan output: 'standalone' di next.config.mjs)
2. **Backend/CMS Repository**: `directus-cms` (Gunakan MySQL)

---

## 📂 Langkah 2: Koneksi GitHub ke cPanel Dewaweb

1. **Buka cPanel Dewaweb** -> Menu **Git™ Version Control**.
2. Klik **Create**.
3. **Clone URL**: Masukkan URL repository GitHub Anda.
4. **Repository Path**: Isi dengan `solisinverterindonesia.com` (Ini akan menempatkan kode langsung di folder utama domain Anda).
5. **Repository Name**: `solis-web`.
6. Klik **Create**.

*Ulangi untuk Directus, tapi gunakan path: `solisinverterindonesia.com/admin`.*

---

## 🏗️ Langkah 3: Setup Node.js App

### A. Setup Website Utama (Next.js)
1. Buka cPanel -> **Setup Node.js App**.
2. Klik **Create Application**.
3. **Node.js version**: Pilih **20.x**.
4. **Application mode**: **Production**.
5. **Application root**: Isi dengan `solisinverterindonesia.com` (Folder tempat kode di-git tadi).
6. **Application URL**: `solisinverterindonesia.com`.
7. **Application startup file**: Ketik `server.js`.
8. Klik **Create**.

### B. Setup Admin Panel (Directus)
1. Klik **Create Application** lagi.
2. **Application root**: `solisinverterindonesia.com/admin`.
3. **Application URL**: `admin.solisinverterindonesia.com`.
4. **Application startup file**: `node_modules/directus/cli.js`.
5. Klik **Create**.

---

## ⚙️ Langkah 4: Build & File Static

### 1. Build & Push
Push hasil build dari laptop ke GitHub. Pastikan folder `.next/standalone` sudah ter-push (atau di-handle oleh GitHub Actions jika Anda menggunakannya).

### 2. Copy Folder Static (WAJIB)
Karena kita pakai folder di luar `public_html`, pastikan folder berikut ada di server:
- Folder `solisinverterindonesia.com/public` (Copy dari laptop)
- Folder `solisinverterindonesia.com/.next/static` (Copy dari laptop)

*Gunakan cPanel **File Manager** untuk meng-upload folder ini jika tidak ikut ter-push ke GitHub.*

### 3. Environment Variables (.env)
Di menu **Setup Node.js App**, klik icon Edit pada aplikasi:
- Tambahkan variable: `NEXT_PUBLIC_DIRECTUS_URL`, `DIRECTUS_URL`, `DB_DATABASE`, dll.
- Klik **Save**.

---

## 🔄 Langkah 5: Cara Update Website

Setiap kali Anda mengubah kode di laptop dan push ke GitHub:
1. Masuk ke cPanel -> **Git™ Version Control**.
2. Klik **Manage** -> Tab **Pull or Deploy**.
3. Klik **Update from Remote**.
4. Setelah kodenya masuk, buka **Setup Node.js App** -> Klik **Restart** pada aplikasi Anda.

---

## ✅ Selesai
Cek website Anda di `https://solisinverterindonesia.com`.

**Catatan**: Jika muncul error 404 pada gambar, pastikan folder `public` sudah berada tepat di dalam folder `solisinverterindonesia.com`.
