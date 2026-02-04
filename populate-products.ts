import { createDirectus, rest, staticToken, createItems, readItems, deleteItems, updateItem } from '@directus/sdk';

const directus = createDirectus('http://127.0.0.1:8055')
    .with(staticToken('static-admin-token-12345'))
    .with(rest());

const DATA = {
    categories: [
        {
            name: 'Inverter Hybrid & Off-grid',
            slug: 'inverter-hybrid-off-grid',
            subs: [
                {
                    name: 'Inverter Penyimpanan Energi Perumahan',
                    slug: 'hybrid-perumahan',
                    subs: [
                        {
                            name: 'Inverter Hybrid Baterai Tegangan Rendah Satu fasa',
                            slug: 'hybrid-tekangan-rendah-1-fasa',
                            products: [
                                {
                                    name: 'S6-EH1P(3-10)K-L-PLUS',
                                    description: `
                                        <p><strong>3K/3.6K/5K/6K/8K/10K(21A)</strong></p>
                                        <p>S6-EH1P(3-10)K-L-PLUS inverter hibrid satu fase dengan tegangan baterai rendah (40–60V). Seri inverter canggih ini dilengkapi dengan dua MPPT terintegrasi, masing-masing memiliki kapasitas arus hingga 21 A, dan kompatibel dengan beragam merek baterai lithium dan asam timbal.</p>
                                        <p>Dirancang untuk aplikasi on-grid dan off-grid, seri S6-EH1P(3–10)K-L-PLUS menyediakan fitur melimpah, termasuk kompatibilitas dengan generator, penggabungan inverter yang terhubung ke jaringan listrik, operasi paralel, dan manajemen beban pintar—menjadikannya solusi yang terukur untuk penyimpanan energi residensial.</p>
                                        <br>
                                        <h3>Fitur Unggulan</h3>
                                        <ul class="list-disc pl-5 space-y-2">
                                            <li>IP66 perlindungan masuk, untuk operasi dalam kondisi yang keras</li>
                                            <li>Mendukung maksimal 6 unit secara paralel, memperluas kapasitas sistem</li>
                                            <li>Mendukung operasi off-grid hanya dengan PV, mengurangi biaya di muka</li>
                                            <li>Tingkat pencadangan baterai yang dapat disesuaikan untuk daya tanpa henti</li>
                                            <li>Pilihan baterai lebih banyak, kompatibel dengan segala baterai (antara 40V-60V)</li>
                                            <li>Manajemen beban pintar, memperpanjang waktu pencadangan untuk beban kritis</li>
                                            <li>Mendukung arus input PV hingga 21A, kompatibel dengan modul PV daya lebih tinggi di masa depan</li>
                                            <li>Mendukung input PV hingga 160% dari daya DC inverter terukur, memaksimalkan pemanfaatan tenaga surya</li>
                                            <li>Beberapa metode sambungan generator dan kontrol otomatis, memungkinkan penempatan lokal yang fleksibel</li>
                                            <li>Layar sentuh kelas industri 7 inci, menyediakan antarmuka yang lebih besar dan ramah pengguna untuk operasi lokal</li>
                                            <li>SolisCloud: Kontrol jarak jauh pintar, pengoptimalan AI, dan pemecahan masalah instan - semua dalam satu platform</li>
                                            <li>Peralihan antara on/off-grid dengan lancar dalam waktu kurang dari 10 milidetik, menjamin pasokan daya tanpa henti</li>
                                            <li>Mendukung sambungan daya PV yang terhubung ke jaringan listrik yang ada untuk kontrol ekspor dan penggunaan off-grid</li>
                                            <li>Beban berlebih 200% selama 10 detik dalam mode off-grid, memastikan penyalaan yang stabil untuk motor, pompa air, dan pendingin udara.</li>
                                        </ul>
                                    `,
                                    slug: 's6-eh1p-3-10k-l-plus'
                                },
                                {
                                    name: 'S6-EH1P(12-18)K03-NV-YD-L',
                                    description: `
                                        <p><strong>12K/14K/16K/18K</strong></p>
                                        <p>S6-EH1P(12-18)K03-NV-YD-L Inverter hibrid satu fase dengan tegangan baterai rendah (40-60V). Seri inverter canggih ini dilengkapi dengan tiga MPPT terintegrasi, masing-masing memiliki kapasitas arus hingga 20 A, dan kompatibel dengan beragam merek baterai lithium dan asam timbal.</p>
                                        <p>Dirancang untuk aplikasi on-grid dan off-grid, S6-EH1P(12–18)K03-NV-YD-L menyediakan fitur melimpah, termasuk kompatibilitas generator, penggabungan inverter yang terhubung ke jaringan listrik, operasi paralel, dan manajemen beban pintar—menjadikannya solusi yang terukur untuk penyimpanan energi residensial.</p>
                                        <br>
                                        <h3>Fitur Unggulan</h3>
                                        <ul class="list-disc pl-5 space-y-2">
                                            <li>IP66 perlindungan masuk, untuk operasi dalam kondisi yang keras</li>
                                            <li>Mendukung maksimal 6 unit secara paralel, memperluas kapasitas sistem</li>
                                            <li>Tingkat pencadangan baterai yang dapat disesuaikan untuk daya tanpa henti</li>
                                            <li>Mendukung operasi off-grid hanya dengan PV, mengurangi biaya di muka</li>
                                            <li>Pilihan baterai lebih banyak, kompatibel dengan segala baterai (antara 40V-60V)</li>
                                            <li>Manajemen beban pintar, memperpanjang waktu pencadangan untuk beban kritis</li>
                                            <li>Mendukung arus input PV hingga 20A, kompatibel dengan modul PV daya tinggi terbaru</li>
                                            <li>Mendukung input PV hingga 160% dari daya DC inverter terukur, memaksimalkan pemanfaatan tenaga surya</li>
                                            <li>Beberapa metode sambungan generator dan kontrol otomatis, memungkinkan penempatan lokal yang fleksibel</li>
                                            <li>Layar sentuh kelas industri 7 inci, menyediakan antarmuka yang lebih besar dan ramah pengguna untuk operasi lokal</li>
                                            <li>Peralihan antara on/off-grid dengan lancar dalam waktu kurang dari 10 milidetik, menjamin pasokan daya tanpa henti</li>
                                            <li>SolisCloud: Kontrol jarak jauh pintar, pengoptimalan AI, dan pemecahan masalah instan - semua dalam satu platform</li>
                                            <li>Mendukung sambungan daya PV yang terhubung ke jaringan listrik yang ada untuk kontrol ekspor dan penggunaan off-grid</li>
                                            <li>Beban berlebih 200% selama 10 detik dalam mode off-grid, memastikan penyalaan yang stabil untuk motor, pompa air, dan pendingin udara.</li>
                                        </ul>
                                    `,
                                    slug: 's6-eh1p-12-18k03-nv-yd-l'
                                }
                            ]
                        },
                        {
                            name: 'Inverter Hybrid Baterai Tegangan Rendah Tiga fasa',
                            slug: 'hybrid-tekangan-rendah-3-fasa',
                            products: [
                                {
                                    name: 'S6-EH3P(8-18)K02-NV-YD-L',
                                    description: 'Inverter Penyimpan Energi Tegangan Rendah 3-Phase / Kompatibel dengan generator, memperpanjang lamanya pencadangan selama pemadaman jaringan listrik',
                                    slug: 's6-eh3p-8-18k02-nv-yd-l'
                                }
                            ]
                        },
                        {
                            name: 'Inverter Hybrid Baterai Tegangan Tinggi Tiga fasa',
                            slug: 'hybrid-tekangan-tinggi-3-fasa',
                            products: [
                                {
                                    name: 'S6-EH3P(5-12)K-H',
                                    description: 'Industry leading 50A/10kW max charge/discharge rating / Supports Unbalanced and Half-Wave Loads on both the Grid and Backup Port',
                                    slug: 's6-eh3p-5-12k-h'
                                },
                                {
                                    name: 'S6-EH3P(12-20)K-H',
                                    description: 'Inverter Penyimpan Energi Tegangan Tinggi 3-Phase / Kompatibel dengan generator, memperpanjang lamanya pencadangan selama pemadaman jaringan listrik / Kompatibilitas pompa panas SG',
                                    slug: 's6-eh3p-12-20k-h'
                                }
                            ]
                        },
                        {
                            name: 'Inverter Off-grid Satu fasa',
                            slug: 'off-grid-1-fasa',
                            products: [
                                {
                                    name: 'S6-EO1P(4-6)K-48',
                                    description: 'Inverter Off-Grid Tegangan Rendah 1-Phase / Beberapa inverter dapat dipadukan bersama untuk membentuk microgrid / Daya lonjakan 200% dalam 10 detik',
                                    slug: 's6-eo1p-4-6k-48'
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'Inverter Penyimpanan Energi C&I',
                    slug: 'hybrid-ci',
                    products: [
                        {
                            name: 'S6-EH3P(30-50)K-H',
                            description: 'Inverter Penyimpan Energi Tegangan Tinggi 3-Phase / Daya lonjakan 160% dalam 2 detik / Arus pengisian/pelepasan daya baterai sebesar 140A/70A+70A, cocok untuk kondisi aplikasi standar 0,5C dengan sel 280Ah',
                            slug: 's6-eh3p-30-50k-h'
                        },
                        {
                            name: 'S6-EH3P(30-60)K-H(21A)',
                            description: 'Inverter Penyimpan Energi Tegangan Tinggi 3-Phase / Mendukung input PV hingga 100kW, memaksimalkan penggunaan tenaga surya',
                            slug: 's6-eh3p-30-60k-h-21a'
                        },
                        {
                            name: 'S6-EH3P(80-125)K10-NV-YD-H',
                            description: 'Inverter Penyimpan Energi Tegangan Tinggi 3-Phase Solis / Mendukung 100% output tiga fase yang tidak seimbang / 200% kapasitas input PV untuk memaksimalkan pemanfaatan energi surya',
                            slug: 's6-eh3p-80-125k10-nv-yd-h'
                        }
                    ]
                },
                {
                    name: 'Aksesori & Monitoring',
                    slug: 'aksesori-hybrid',
                    products: [
                        { name: 'S1-W4G-ST', description: 'Data Logger / Mendukung komunikasi WiFi dan 4G / Alarm kegagalan, pemantauan real-time', slug: 's1-w4g-st-hybrid' },
                        { name: 'S3-GPRS/WIFI-ST', description: 'Data Logger / Alarm kegagalan, pemantauan real-time / Plug & Play, mudah dan cepat', slug: 's3-gprs-wifi-st-hybrid' },
                        { name: 'S5-WiFi-ST', description: 'Data Logger / Mengirim pemberitahuan alarm melalui teks dan email / Mendukung router dua pita berupa 5GHz dan 2,4GHz', slug: 's5-wifi-st-hybrid' },
                        { name: 'S3-Logger', description: 'Data Logger / Mendukung koneksi data ke sistem pemantauan lokal / Mendukung berbagai protokol komunikasi', slug: 's3-logger-hybrid' },
                        { name: 'Solis-EPM-5G', description: 'Manajer Daya Ekspor / Kontrol simultan 20 inverter Solis / Memantau pembangkit listrik dan konsumsi beban setiap saat', slug: 'solis-epm-5g-hybrid' },
                        { name: 'SolisCloud', description: 'SolisCloud merupakan pemantauan sistem PV cerdas generasi baru. Platform baru ini akan mendukung Anda seperti yang belum pernah ada sebelumnya.', slug: 'soliscloud-hybrid' }
                    ]
                }
            ]
        },
        {
            name: 'Inverter PV Tersambung Jaringan',
            slug: 'inverter-pv-jaringan',
            subs: [
                {
                    name: 'Inverter Tersambung Jaringan Perumahan',
                    slug: 'grid-perumahan',
                    subs: [
                        {
                            name: 'Inverter Satu fasa',
                            slug: 'grid-1-fasa',
                            products: [
                                { name: 'S6-GR1P(0.7-3.6)K-M', description: 'Max. efficiency 97.3% / String current up to 14A / Super high frequency switching technology', slug: 's6-gr1p-0-7-3-6k-m' },
                                { name: 'S6-GR1P(2.5-6)K-S', description: 'Inverter Grid-Tie 1-Phase / Arus string hingga 16 A / Terintegrasi dengan fungsi kontrol ekspor 0 Watt', slug: 's6-gr1p-2-5-6k-s' },
                                { name: 'S6-GR1P(8-10)K03-NV-ND', description: 'Inverter Grid-Tie 1-Phase / Desain tampilan baru, mudah dioperasikan melalui aplikasi Bluetooth / Desain 3 MPPT, cocok untuk atap menghadap ke segala arah', slug: 's6-gr1p-8-10k03-nv-nd' }
                            ]
                        },
                        {
                            name: 'Inverter Tiga fasa',
                            slug: 'grid-3-fasa',
                            products: [
                                { name: 'S5-GR3P(5-20)K', description: 'Inverter Grid-Tie 3-Phase / Efisiensi maksimal 98,7% / Arus string hingga 16 A / Rentang tegangan yang luas dan tegangan awal yang rendah', slug: 's5-gr3p-5-20k' }
                            ]
                        }
                    ]
                },
                {
                    name: 'Inverter Tersambung Jaringan C&I',
                    slug: 'grid-ci',
                    products: [
                        { name: 'S6-GC3P(25-36)K03-NV-ND', description: 'Inverter Grid-Tie 3-Phase / Efisiensi maksimal 98,5% / Arus string hingga 20 A', slug: 's6-gc3p-25-36k03-nv-nd' },
                        { name: 'S6-GC3P(40-60)K-NV-ND', description: 'Inverter Grid-Tie 3-Phase / Efisiensi maksimal 98,6% / Arus string hingga 20 A', slug: 's6-gc3p-40-60k-nv-nd' },
                        { name: 'S5-GC(50-60)K', description: 'Inverter Grid-Tie 3-Phase / Efisiensi maksimal 98,7% / Arus string hingga 16 A / Desain 5/6 MPPT, mendukung desain sistem orientasi beragam', slug: 's5-gc-50-60k' },
                        { name: 'Solis-80K-5G-PRO', description: 'Inverter Grid-Tie 3-Phase / 6 MPPT, efisiensi maksimal 98,5% / Rasio DC/AC > 150% / Kompatibel dengan modul bifacial', slug: 'solis-80k-5g-pro' },
                        { name: 'S6-GC(100-125)K', description: 'Inverter Grid-Tie 3-Phase / 10 MPPT, efisiensi maksimal 98,7% / Rasio DC/AC > 150% / Arus string hingga 21 A, sangat cocok dengan modul bifacial berarus besar', slug: 's6-gc-100-125k' },
                        { name: 'S6-GC3P150K07-NV-ND', description: 'Inverter Grid-Tie 3-Phase / 7 MPPT, efisiensi maksimal 98,8% / Rasio DC/AC > 150%', slug: 's6-gc3p150k07-nv-nd' }
                    ]
                },
                {
                    name: 'Inverter Skala Utilitas',
                    slug: 'grid-utilitas',
                    products: [
                        { name: 'S6-GU3P350K06-EV-ND', description: '30 input, > 150% rasio DC / AC / Tingkat Anti Karat C5-M, IP66', slug: 's6-gu3p350k06-ev-nd' }
                    ]
                },
                {
                    name: 'Aksesori & Monitoring',
                    slug: 'aksesori-grid',
                    products: [
                        { name: 'S1-W4G-ST', description: 'Data Logger / Mendukung komunikasi WiFi dan 4G / Alarm kegagalan, pemantauan real-time', slug: 's1-w4g-st-grid' },
                        { name: 'S3-GPRS/WIFI-ST', description: 'Data Logger / Alarm kegagalan, pemantauan real-time / Plug & Play, mudah dan cepat', slug: 's3-gprs-wifi-st-grid' },
                        { name: 'S5-WiFi-ST', description: 'Data Logger / Mengirim pemberitahuan alarm melalui teks dan email / Mendukung router dua pita berupa 5GHz dan 2,4GHz', slug: 's5-wifi-st-grid' },
                        { name: 'S3-Logger', description: 'Data Logger / Mendukung koneksi data ke sistem pemantauan lokal / Mendukung berbagai protokol komunikasi', slug: 's3-logger-grid' },
                        { name: 'Solis-EPM-5G', description: 'Manajer Daya Ekspor / Kontrol simultan 20 inverter Solis / Memantau pembangkit listrik dan konsumsi beban setiap saat', slug: 'solis-epm-5g-grid' },
                        { name: 'MB-S4-W4', description: 'Data Logger Solis:MB-S4-W4', slug: 'mb-s4-w4' },
                        { name: 'SolisCloud', description: 'SolisCloud merupakan pemantauan sistem PV cerdas generasi baru. Platform baru ini akan mendukung Anda seperti yang belum pernah ada sebelumnya.', slug: 'soliscloud-grid' }
                    ]
                }
            ]
        }
    ]
};

async function cleanup() {
    console.log('🧹 Cleaning up existing data...');
    try {
        const categories = await directus.request(readItems('product_categories', { fields: ['id'], limit: 100 }));
        if (categories.length > 0) {
            await directus.request(deleteItems('product_categories', categories.map(c => c.id)));
        }

        const products = await directus.request(readItems('products', { fields: ['id'], limit: 100 }));
        if (products.length > 0) {
            await directus.request(deleteItems('products', products.map(p => p.id)));
        }
        console.log('✅ Cleanup complete.');
    } catch (error) {
        console.error('Error during cleanup:', error);
    }
}

async function createRecursive(category: any, parentId?: string | number) {
    console.log(`Creating category: ${category.name} (Parent: ${parentId || 'None'})`);

    // Create current category
    const createdCat = await directus.request(createItems('product_categories', {
        name: category.name,
        slug: category.slug,
        parent_category: parentId,
        description: category.name
    }));

    // Create products if any
    if (category.products && category.products.length > 0) {
        for (const product of category.products) {
            console.log(`  Creating product: ${product.name}`);
            await directus.request(createItems('products', {
                name: product.name,
                slug: product.slug,
                description: product.description,
                category: createdCat.id
            }));
        }
    }

    // Create sub-categories if any
    if (category.subs && category.subs.length > 0) {
        for (const sub of category.subs) {
            await createRecursive(sub, createdCat.id);
        }
    }
}

async function populate() {
    await cleanup();
    console.log('🚀 Starting population...');

    for (const cat of DATA.categories) {
        await createRecursive(cat);
    }

    console.log('🎉 Population complete!');
}

populate();
