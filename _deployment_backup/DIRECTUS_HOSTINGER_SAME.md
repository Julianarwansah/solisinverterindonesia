# Setup Directus di Hostinger Cloud Startup (Satu Hosting)

## Kenapa Ini Lebih Baik?

✅ **Semua dalam satu tempat** - Tidak perlu VPS terpisah
✅ **Lebih murah** - Cukup satu hosting saja
✅ **Lebih mudah manage** - Satu control panel
✅ **Lebih cepat** - Directus dan Next.js dalam network yang sama

## Cara Setup

Hostinger Cloud Startup Anda mendukung **10 Managed Node.js apps**, jadi Anda bisa jalankan:
1. Next.js app (app utama)
2. Directus CMS (app kedua)

### Langkah 1: Setup Database MySQL di Hostinger

1. **Login ke hPanel Hostinger**
2. **Buka "Databases" → "MySQL Databases"**
3. **Create New Database**:
   - Database name: `directus_db`
   - Username: `directus_user`
   - Password: (buat password yang kuat)
   - Klik "Create"

4. **Catat informasi**:
   ```
   Database: u123456789_directus (contoh)
   Username: u123456789_directus
   Password: your-password
   Host: localhost (atau IP yang diberikan)
   ```

### Langkah 2: Deploy Directus sebagai Node.js App Kedua

1. **Di hPanel, buka "Node.js"**
2. **Klik "Create Application"**
3. **Konfigurasi**:
   - Application mode: **Production**
   - Node.js version: **20.x**
   - Application root: `/directus` (folder terpisah)
   - Application URL: `directus.yourdomain.com` (subdomain)
   - Entry point: `node_modules/directus/cli.js start`

4. **Upload Directus via Git atau FTP**:

   **Option A: Via Terminal SSH**
   ```bash
   # SSH ke Hostinger
   ssh u123456789@yourdomain.com
   
   # Buat folder directus
   mkdir directus
   cd directus
   
   # Install Directus
   npm init -y
   npm install directus
   
   # Initialize Directus
   npx directus init
   ```

   **Option B: Upload Manual**
   - Buat project Directus di local
   - Upload via FTP ke folder `/directus`
   - SSH dan run `npm install`

### Langkah 3: Configure Directus

1. **Edit `.env` di folder Directus**:
   ```env
   PORT=8055
   PUBLIC_URL=https://directus.yourdomain.com
   
   # Database MySQL
   DB_CLIENT=mysql
   DB_HOST=localhost
   DB_PORT=3306
   DB_DATABASE=u123456789_directus
   DB_USER=u123456789_directus
   DB_PASSWORD=your-password
   
   # Security
   KEY=replace-with-random-string-min-32-chars
   SECRET=replace-with-another-random-string
   
   # Admin
   ADMIN_EMAIL=admin@yourdomain.com
   ADMIN_PASSWORD=secure-admin-password
   
   # CORS untuk Next.js
   CORS_ENABLED=true
   CORS_ORIGIN=https://yourdomain.com
   
   # Storage
   STORAGE_LOCATIONS=local
   STORAGE_LOCAL_ROOT=./uploads
   ```

2. **Generate random keys**:
   ```bash
   # Di terminal
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

### Langkah 4: Setup Subdomain untuk Directus

1. **Di hPanel, buka "Domains" → "Subdomains"**
2. **Create subdomain**: `directus.yourdomain.com`
3. **Point ke Directus Node.js app**
4. **Enable SSL** (Let's Encrypt gratis)

### Langkah 5: Start Directus App

1. **Di Node.js panel, start Directus app**
2. **Akses**: `https://directus.yourdomain.com`
3. **Login** dengan admin email/password yang Anda set

### Langkah 6: Configure Next.js untuk Connect ke Directus

1. **Update `.env.production`**:
   ```env
   NEXT_PUBLIC_DIRECTUS_URL=https://directus.yourdomain.com
   DIRECTUS_URL=https://directus.yourdomain.com
   ```

2. **Update `next.config.mjs`**:
   ```javascript
   {
       protocol: 'https',
       hostname: 'directus.yourdomain.com',
       pathname: '/assets/**',
   }
   ```

3. **Deploy Next.js app** (app pertama di Hostinger)

## Struktur di Hostinger

```
Hostinger Cloud Startup
├── Node.js App #1: Next.js
│   ├── Domain: yourdomain.com
│   ├── Folder: /public_html atau /nextjs
│   └── Entry: .next/standalone/server.js
│
├── Node.js App #2: Directus
│   ├── Subdomain: directus.yourdomain.com
│   ├── Folder: /directus
│   └── Entry: node_modules/directus/cli.js start
│
└── MySQL Database
    └── directus_db
```

## Migrasi Data dari Development

### 1. Export dari Local Directus

```bash
# Di local development
cd cms
npx directus schema snapshot ./snapshot.yaml
npx directus database export ./data.json
```

### 2. Upload ke Production

```bash
# Upload files via FTP atau SCP
scp snapshot.yaml u123456789@yourdomain.com:/home/u123456789/directus/
scp data.json u123456789@yourdomain.com:/home/u123456789/directus/

# SSH ke Hostinger
ssh u123456789@yourdomain.com
cd directus

# Import schema
npx directus schema apply ./snapshot.yaml

# Import data (optional)
npx directus database import ./data.json
```

### 3. Upload Gambar Produk

```bash
# Upload folder uploads
scp -r cms/uploads/* u123456789@yourdomain.com:/home/u123456789/directus/uploads/
```

## Resource Usage

Dengan Cloud Startup (4GB RAM):
- Next.js: ~500MB - 1GB RAM
- Directus: ~300MB - 500MB RAM
- MySQL: ~200MB - 300MB RAM
- **Total**: ~1-2GB (masih ada sisa untuk traffic)

✅ **Cukup untuk production!**

## Keuntungan Setup Ini

1. ✅ **Satu hosting** - Tidak perlu bayar VPS terpisah
2. ✅ **Network lokal** - Directus dan Next.js dalam server yang sama (lebih cepat)
3. ✅ **Mudah manage** - Satu control panel
4. ✅ **Backup mudah** - Semua data dalam satu tempat
5. ✅ **SSL gratis** - Let's Encrypt untuk main domain dan subdomain

## Troubleshooting

### Directus tidak start
```bash
# Check logs
cd directus
npm run directus start

# Atau check di Hostinger Node.js panel logs
```

### Database connection error
- Pastikan DB credentials benar
- Check MySQL database sudah dibuat
- Verify DB_HOST (biasanya `localhost`)

### CORS error
- Set `CORS_ORIGIN=https://yourdomain.com`
- Restart Directus app

### Out of memory
- Monitor di Hostinger panel
- Optimize Directus (disable extensions yang tidak perlu)
- Upgrade ke Cloud Professional jika perlu

## Alternative: Shared Hosting (Jika Tidak Bisa Node.js)

Jika Hostinger Anda tidak support multiple Node.js apps, gunakan:
- **Directus di Railway/Render** (gratis)
- **Next.js di Hostinger**

Tapi dengan Cloud Startup, Anda **bisa run keduanya** di satu hosting! 🎉

## Biaya

- Hostinger Cloud Startup: $6.99/mo (sudah include semua)
- Directus: $0 (self-hosted di Hostinger yang sama)
- Database: $0 (MySQL included di Hostinger)
- **Total**: $6.99/mo saja! 💰

Jauh lebih murah daripada:
- Hostinger + Directus Cloud: $6.99 + $15/mo = $21.99/mo
- Hostinger + VPS: $6.99 + $6/mo = $12.99/mo
