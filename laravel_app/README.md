# Solis Inverter Indonesia - Laravel Application

Project Solis Inverter Indonesia yang telah dimigrasi dari Directus/Next.js ke Laravel PHP.

## Akses Admin Panel (Filament)

Anda dapat mengelola produk, kategori, dan artikel melalui dashboard admin.

- **URL**: [http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin)
- **Email**: `admin@solis.id`
- **Password**: `admin123`

> [!IMPORTANT]
> Harap ganti password atau hapus akun ini saat sistem sudah naik ke production (live).

## Cara Menjalankan Lokal

1. Pastikan Laragon/MySQL menyala.
2. Buka terminal di folder `laravel_app`.
3. Jalankan server Laravel:
   ```bash
   php artisan serve
   ```
4. Jalankan Vite untuk asset (CSS/JS) jika ingin melakukan perubahan desain:
   ```bash
   npm run dev
   ```

## Folder Penting
- **Produk & Kategori**: `app/Filament/Resources`
- **Tampilan (UI)**: `resources/views`
- **Gambar**: `public/images`
