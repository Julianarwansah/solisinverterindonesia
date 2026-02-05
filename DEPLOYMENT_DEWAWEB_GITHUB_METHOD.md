# Panduan Deployment Dewaweb via GitHub 🐙

Metode ini disarankan karena Anda memiliki paket hosting dengan spesifikasi tinggi (**4 CPU, 4GB RAM**). Ini memungkinkan proses build aplikasi dilakukan langsung di server.

Keuntungan:
*   Tidak perlu upload ZIP manual berulang kali.
*   Cukup `git push` dari laptop, lalu `pull` dari cPanel.

---

## 🛠️ Langkah 1: Persiapan Repository GitHub

1.  Pastikan project sudah ada di GitHub (Repository Private disarankan).
2.  Struktur project standar (Next.js di root, Directus di folder `cms`).
3.  Pastikan file `.env` **TIDAK** ikut ter-push (biasanya sudah ada di `.gitignore`).

---

## 🔐 Langkah Penting: Setup SSH Key (Hanya Jika Repo Private)

*Jika repository Anda **Public**, lewati langkah ini.*

(Bagian ini opsional jika Anda menggunakan HTTPS pada repo Public)

1.  **Di cPanel**:
    *   Buka menu **SSH Access**.
    *   Klik **Manage SSH Keys**.
    *   Klik **Generate a New Key**.
    *   Isi Key Name (misal: `id_rsa_github`), Password (kosongkan saja agar auto-login), Key Type `RSA`, Key Size `2048` atau `4096`.
    *   Klik **Generate Key**.
    *   Kembali, lalu klik **Manage** pada key yang baru dibuat.
    *   Klik **Authorize**.
    *   Kembali, lalu klik **View/Download** pada kolom **Public Key**.
    *   Copy semua teks yang muncul (mulai dari `ssh-rsa ...`).

2.  **Di GitHub**:
    *   Buka Repository Anda -> **Settings** -> **Deploy keys**.
    *   Klik **Add deploy key**.
    *   Title: `cPanel Dewaweb`.
    *   Key: Paste key yang tadi dicopy.
    *   Centang **Allow write access** (jika ingin bisa push dari cPanel, tapi biasanya read-only cukup).
    *   Klik **Add key**.

3.  **Clone Menggunakan SSH (Jika Repo Private)**:
    *   Saat create repository di cPanel Git Version Control, gunakan URL SSH:
        `git@github.com:username/repo-name.git`
    *   (Bukan yang https://...)

---

## 🌐 Langkah 2: Setup Git di cPanel (Metode Public Repo)

1.  Buka cPanel Dewaweb, cari menu **Git™ Version Control**.
2.  Klik **Create**.
3.  **Clone URL**: Gunakan URL HTTPS biasa (karena repo Public, tidak butuh password):
    `https://github.com/Julianarwansah/solisinverterindonesia.git`
4.  **Repository Path**:
    *   Masukkan: `solisinverterindonesia.com` (Agar root folder project langsung menjadi folder aplikasi).
    *   *Catatan*: Jika folder sudah ada dan tidak kosong, Anda mungkin perlu menghapusnya dulu lewat File Manager (Backup dulu jika ada data penting!).
5.  **Repository Name**: Bebas, misal `solis-web`.
6.  Klik **Create**.

---

## 🚀 Langkah 3: Setup Frontend (Metode Hybrid)

Karena server Dewaweb Anda memiliki batasan proses (`EAGAIN`) saat melakukan build, kita harus melakukan build di laptop lalu meng-upload-nya.

### A. Persiapan File di Laptop
1.  Di VS Code laptop Anda, jalankan: `npm run build`.
2.  Buka folder `.next/standalone` hasil build tersebut.
3.  **Lengkapi folder standalone** agar bisa jalan sendiri:
    *   **Copy** folder `public` (dari root laptop) lalu **Paste** ke dalam `.next/standalone/public`.
    *   **Copy** folder `.next/static` (dari root laptop) lalu **Paste** ke dalam `.next/standalone/.next/static`.
4.  Sekarang, masuk ke dalam folder `.next/standalone`, pilih **SEMUA** file/folder di dalamnya (`server.js`, `package.json`, `.next`, `public`), lalu **Zip** menjadi `frontend_build.zip`.
    *   *Ingat: Yang di-zip adalah isinya, bukan folder "standalone"-nya.*

### B. Upload & Ekstrak di cPanel
1.  Buka **File Manager** cPanel.
2.  Masuk ke folder `solisinverterindonesia.com`.
3.  (Opsional tapi disarankan) Hapus dulu file lama atau pindahkan ke folder backup agar tidak berantakan.
4.  Upload `frontend_build.zip` ke folder tersebut dan **Ekstrak**.
5.  Setelah diekstrak, Anda akan melihat file `server.js` ada di folder utama `solisinverterindonesia.com`.

### C. Finalisasi di Setup Node.js App
1.  Buka menu **Setup Node.js App** di cPanel.
2.  Klik **Edit** pada aplikasi Anda.
3.  Ubah **Application startup file** menjadi: `server.js` (Kita tidak butuh `start_server.js` lagi karena `server.js` sudah ada di root).
4.  Klik **Save**.
5.  Klik **Restart**.
6.  Cek website Anda!

---

## 🗄️ Langkah 4: Setup Backend (Directus)

### A. Persiapan Folder Admin
Karena folder `cms` ada di dalam repo git `solisinverterindonesia.com/cms`, kita bisa langsung arahkan sub-domain ke sana, TAPI Node.js App butuh root folder sendiri biasanya.

1.  Masuk ke Terminal cPanel.
2.  Masuk ke folder cms:
    ```bash
    cd solisinverterindonesia.com/cms
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Setup `.env`:
    *   Buat file `.env` di dalam folder `cms`.

### B. Konfigurasi Node.js App (Admin)
1.  Buka **Setup Node.js App**.
2.  **Create Application**.
3.  **Application root**: `solisinverterindonesia.com/cms`.
4.  **Application URL**: `admin.solisinverterindonesia.com`.
5.  **Application startup file**: `node_modules/directus/cli.js` (atau buat `start.js` seperti panduan manual jika susah).
6.  Klik **Start**.

---

## ❓ Troubleshooting (Masalah Umum)

### Error: `Permission denied (publickey)`
Ini artinya kunci SSH belum dikenali. Cek 2 hal ini:

1.  **Cek "Authorize" di cPanel (Sering Lupa!)**
    *   Buka menu **SSH Access** -> **Manage SSH Keys**.
    *   Lihat di kolom **Authorization** pada key Anda.
    *   Jika statusnya **"not authorized"**, klik **Manage** -> Klik tombol **Authorize**.
    *   *Ini wajib dilakukan agar cPanel mau menggunakan key tersebut.*

2.  **Cek Key di GitHub**
    *   Pastikan Anda men-copy **Public Key** (bukan Private Key).
    *   Public Key diawali dengan `ssh-rsa AAAA...` dan diakhiri dengan nama key/email.
    *   Coba hapus key lama di GitHub dan add lagi.

### Error: `Unable to find app venv folder`
Ini berarti setup Node.js di cPanel korup/rusak. Solusinya **Reset Total**:

1.  Di menu **Setup Node.js App**, klik icon **Sampah (Delete)** pada aplikasi tersebut.
    *   **PENTING**: Jika muncul error *"FileNotFoundError: ... .htaccess"*, itu karena file `.htaccess` hilang.
    *   **Solusi**: Buka File Manager, masuk ke folder `solisinverterindonesia.com`, dan buat file kosong bernama `.htaccess`.
    *   Lalu coba klik Delete lagi.
2.  Buka **File Manager** cPanel.
3.  Cari folder `nodevenv` di home directory.
4.  Masuk ke dalamnya, cari folder `solisinverterindonesia.com`. **HAPUS** folder itu.
5.  Kembali ke **Setup Node.js App**, buat ulang aplikasi dari awal (Create Application).
6.  **LANGSUNG** klik tombol **Run NPM Install** setelah create.

### Error: `Output Buffer` / `Out of Memory` saat Build
Jika build gagal di tengah jalan:
*   Berarti RAM server penuh.
*   Solusi: Ganti ke **Metode Upload Manual** (lihat file `DEPLOYMENT_DEWAWEB_FINAL.md`).

---

## 🔄 Cara Update (Workflow)

Setiap kali ada perubahan:
1.  **Laptop**: `git push`.
2.  **cPanel**: Buka **Git™ Version Control** -> Klik **Pull** (Update from Remote).
3.  **Terminal cPanel**:
    *   Jika update Frontend:
        ```bash
        cd solisinverterindonesia.com
        npm install
        npm run build
        ```
    *   Jika update Backend:
        ```bash
        cd solisinverterindonesia.com/cms
        npm install
        ```
4.  **Setup Node.js App**: Klik **Restart**.
