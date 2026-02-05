# Setup Directus Gratis untuk Production

Panduan ini akan membantu Anda setup Directus CMS secara gratis untuk production.

## Pilihan 1: Railway.app (Paling Mudah) ⭐ RECOMMENDED

Railway menawarkan free tier yang cukup untuk project kecil-menengah.

### Langkah-langkah:

1. **Daftar di Railway**
   - Kunjungi https://railway.app
   - Sign up dengan GitHub (gratis)
   - Verifikasi email Anda

2. **Deploy Directus**
   - Klik "New Project"
   - Pilih "Deploy from Template"
   - Cari "Directus" di marketplace
   - Klik "Deploy Now"

3. **Konfigurasi**
   - Railway akan otomatis setup:
     - PostgreSQL database
     - Directus instance
     - Environment variables
   - Tunggu deployment selesai (~2-3 menit)

4. **Akses Directus**
   - Klik pada service Directus
   - Buka "Settings" → "Networking"
   - Copy public URL (contoh: `https://your-app.railway.app`)
   - Buka URL di browser
   - Login dengan credentials default atau yang Anda set

5. **Import Data**
   - Login ke Directus admin
   - Import schema dan data dari development
   - Upload gambar produk ke Directus

6. **Setup CORS**
   - Di Railway, buka Directus service
   - Tambahkan environment variable:
     ```
     CORS_ENABLED=true
     CORS_ORIGIN=https://yourdomain.com
     ```
   - Restart service

### Free Tier Limits:
- ✅ 500 execution hours/month
- ✅ 1GB RAM
- ✅ 1GB storage
- ✅ Custom domain support
- ⚠️ Setelah $5 usage, perlu upgrade

---

## Pilihan 2: Render.com (Alternatif Gratis)

Render juga menawarkan free tier yang bagus untuk Directus.

### Langkah-langkah:

1. **Daftar di Render**
   - Kunjungi https://render.com
   - Sign up dengan GitHub/GitLab
   - Verifikasi email

2. **Create PostgreSQL Database**
   - Dashboard → "New" → "PostgreSQL"
   - Pilih free tier
   - Tunggu database ready

3. **Deploy Directus**
   - "New" → "Web Service"
   - Connect repository atau use Docker:
     ```
     Docker Image: directus/directus:latest
     ```
   - Set environment variables:
     ```
     KEY=generate-random-key-here
     SECRET=generate-random-secret-here
     DB_CLIENT=pg
     DB_HOST=[dari database yang dibuat]
     DB_PORT=5432
     DB_DATABASE=[database name]
     DB_USER=[database user]
     DB_PASSWORD=[database password]
     ADMIN_EMAIL=admin@example.com
     ADMIN_PASSWORD=your-secure-password
     PUBLIC_URL=https://your-app.onrender.com
     ```

4. **Deploy & Access**
   - Klik "Create Web Service"
   - Tunggu deployment (~5 menit)
   - Akses via URL yang diberikan

### Free Tier Limits:
- ✅ 750 hours/month
- ✅ 512MB RAM
- ✅ PostgreSQL database included
- ⚠️ Service sleep setelah 15 menit tidak aktif
- ⚠️ Cold start ~30 detik

---

## Pilihan 3: DigitalOcean (Free $200 Credit)

Jika Anda baru di DigitalOcean, dapat $200 credit untuk 60 hari.

### Langkah-langkah:

1. **Daftar DigitalOcean**
   - Kunjungi https://www.digitalocean.com
   - Sign up (butuh kartu kredit untuk verifikasi)
   - Dapatkan $200 credit untuk 60 hari

2. **Create Droplet**
   - "Create" → "Droplets"
   - Pilih Ubuntu 22.04 LTS
   - Plan: Basic ($6/month)
   - Pilih datacenter terdekat (Singapore)

3. **Install Directus**
   SSH ke server:
   ```bash
   ssh root@your-droplet-ip
   
   # Update system
   apt update && apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
   apt install -y nodejs
   
   # Install PostgreSQL
   apt install -y postgresql postgresql-contrib
   
   # Create database
   sudo -u postgres psql
   CREATE DATABASE directus;
   CREATE USER directus WITH PASSWORD 'your-password';
   GRANT ALL PRIVILEGES ON DATABASE directus TO directus;
   \q
   
   # Install Directus
   npm install -g directus
   
   # Create project
   mkdir directus-project
   cd directus-project
   npx directus init
   
   # Configure .env
   nano .env
   ```

4. **Configure .env**
   ```env
   PORT=8055
   PUBLIC_URL=http://your-droplet-ip:8055
   
   DB_CLIENT=pg
   DB_HOST=localhost
   DB_PORT=5432
   DB_DATABASE=directus
   DB_USER=directus
   DB_PASSWORD=your-password
   
   KEY=generate-random-key
   SECRET=generate-random-secret
   
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=secure-password
   
   CORS_ENABLED=true
   CORS_ORIGIN=https://yourdomain.com
   ```

5. **Start Directus**
   ```bash
   # Install PM2 untuk keep alive
   npm install -g pm2
   
   # Start Directus
   pm2 start "npx directus start" --name directus
   pm2 save
   pm2 startup
   ```

6. **Setup Nginx (Optional)**
   ```bash
   apt install -y nginx certbot python3-certbot-nginx
   
   # Configure Nginx
   nano /etc/nginx/sites-available/directus
   ```
   
   Paste:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:8055;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
   
   ```bash
   ln -s /etc/nginx/sites-available/directus /etc/nginx/sites-enabled/
   nginx -t
   systemctl restart nginx
   
   # Setup SSL
   certbot --nginx -d your-domain.com
   ```

---

## Pilihan 4: Hostinger VPS (Jika Ada Budget)

Jika Anda sudah punya Hostinger, bisa tambah VPS.

- VPS KVM 1: ~$4/month
- 1 vCore, 4GB RAM, 50GB SSD
- Cukup untuk Directus + Database

Ikuti langkah yang sama seperti DigitalOcean di atas.

---

## Rekomendasi

### Untuk Pemula:
✅ **Railway.app** - Paling mudah, one-click deploy

### Untuk Developer:
✅ **Render.com** - Lebih kontrol, tetap mudah

### Untuk Production Serius:
✅ **DigitalOcean/Hostinger VPS** - Full control, lebih stabil

---

## Setelah Setup Directus

1. **Import Data Development**
   - Export schema dari local: `npx directus schema snapshot ./snapshot.yaml`
   - Import ke production: `npx directus schema apply ./snapshot.yaml`

2. **Upload Gambar Produk**
   - Login ke Directus admin
   - Upload semua gambar produk
   - Atau sync folder uploads

3. **Update Next.js Config**
   - Edit `.env.production`:
     ```env
     NEXT_PUBLIC_DIRECTUS_URL=https://your-directus-url.com
     DIRECTUS_URL=https://your-directus-url.com
     ```
   
   - Edit `next.config.mjs`:
     ```javascript
     {
         protocol: 'https',
         hostname: 'your-directus-url.com',
         pathname: '/assets/**',
     }
     ```

4. **Test Connection**
   ```bash
   npm run build
   npm start
   ```

---

## Troubleshooting

### Railway/Render service sleep
- Free tier services sleep setelah tidak aktif
- First request akan lambat (cold start)
- Solusi: Upgrade ke paid tier atau gunakan VPS

### Database connection error
- Cek environment variables
- Pastikan database sudah running
- Verify credentials

### CORS error
- Set `CORS_ENABLED=true`
- Set `CORS_ORIGIN` dengan domain Next.js Anda
- Restart Directus service

---

## Biaya Estimasi

| Platform | Free Tier | Paid (jika perlu) |
|----------|-----------|-------------------|
| Railway | $0 (500 hrs) | $5+/month |
| Render | $0 (750 hrs) | $7+/month |
| DigitalOcean | $0 (60 hari) | $6/month |
| Hostinger VPS | - | $4/month |

**Rekomendasi**: Mulai dengan Railway atau Render free tier, upgrade jika traffic tinggi.
