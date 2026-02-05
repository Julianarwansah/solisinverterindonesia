# Panduan Deployment Dewaweb (Metode Upload Manual) 🚀

Panduan ini dirancang untuk hosting **cPanel Dewaweb** menggunakan fitur **Setup Node.js App**.
Kita akan melakukan **Build di Laptop** (untuk menghindari error memory limit di server) dan meng-upload hasilnya.

---

## 🛠️ Langkah 1: Persiapan di Laptop (Sebelum Upload)

### A. Siapkan Database
Pastikan Anda memiliki database lokal atau backup database Directus Anda jika sudah ada isinya. Nanti kita akan import ke Dewaweb.

### B. Upload File Frontend (TANPA node_modules)
1.  Buka terminal di VS Code, build project: `npm run build`.
2.  Buka folder `.next/standalone`.
3.  **PENTING**:
    *   Copy folder `public` asli ke `.next/standalone/public`.
    *   Copy folder `.next/static` asli ke `.next/standalone/.next/static`.
4.  **HAPUS folder `node_modules`** yang ada di dalam `.next/standalone` sebelum di-zip.
    *   *Alasan*: cPanel Dewaweb (CloudLinux) akan error jika ada folder `node_modules` bawaan. Kita harus biarkan cPanel yang menginstallnya.
5.  **Zip** sisa isinya (`server.js`, `package.json`, `.next`, `public`) menjadi `frontend.zip`.
6.  Upload `frontend.zip` ke cPanel di folder root `solisinverterindonesia.com`.
7.  Extract file tersebut.

### C. Setup Node.js App (Frontend)
1.  Ke menu **Setup Node.js App**.
2.  Create Application -> Setting seperti sebelumnya (Node 20.x, Production, root: `solisinverterindonesia.com`, startup: `server.js`).
3.  Klik **Create**.
4.  **SEKARANG** klik tombol **Run NPM Install**.
    *   Karena kita tidak meng-upload `node_modules`, tombol ini akan bekerja normal dan menginstall dependencies yang dibutuhkan ke dalam virtual environment cPanel.
5.  Setelah selesai install, klik **Start App** (atau Restart).

### D. Upload & Setup Backend (Directus)
1.  Untuk Directus, lakukan hal yang sama: **Jangan upload node_modules**.
2.  Zip folder `cms` (tanpa `node_modules`).
3.  Upload ke folder `admin.solisinverterindonesia.com` dan Extract.
4.  Setup environment variables (`.env`) seperti sebelumnya.
5.  Buat Node.js App baru untuk admin.
6.  Klik **Run NPM Install** (Wajib, untuk install Directus).
7.  Set startup file ke `node_modules/directus/cli.js` (setelah install selesai).
    *   *Catatan*: Jika field startup file tidak bisa mendeteksi file yang baru diinstall, coba reload halaman atau ketik manual.
        ```javascript
        // start.js
        require('child_process').execSync('npx directus start', { stdio: 'inherit' });
        ```
    *   Lalu set Startup File ke `start.js`.

---

## 🚀 Langkah 3: Finalisasi

1.  **Start Backend**: Pastikan aplikasi Directus statusnya **Started**.
    *   Cek URL `admin.solisinverterindonesia.com`. Jika muncul login, berarti sukses.
    *   Login dan import schema/data jika perlu.
2.  **Start Frontend**: Pastikan aplikasi Frontend statusnya **Started**.
    *   Cek URL utama.
    *   Jika gambar tidak muncul, cek langkah "Copy Folder Static" di tahap 1B.

Selamat mencoba! Jika ada error, cek tombol **Logs** di halaman Setup Node.js App.
