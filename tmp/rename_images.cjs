const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../public/productos_push_sports');
const files = fs.readdirSync(dir).sort();

const fileMapping = {};

// Here we define the targeted standard names for the known images.
const exactMapping = {
    // Shakers
    'WhatsApp Image 2026-03-11 at 6.49.34 AM (4).jpeg': 'img_shaker_gris.jpeg',
    'WhatsApp Image 2026-03-11 at 6.49.35 AM (1).jpeg': 'img_shaker_gris_2.jpeg',
    'WhatsApp Image 2026-03-11 at 6.49.35 AM (2).jpeg': 'img_shaker_celeste.jpeg',
    'WhatsApp Image 2026-03-11 at 6.49.35 AM (3).jpeg': 'img_shaker_verde.jpeg',
    'WhatsApp Image 2026-03-11 at 6.49.35 AM.jpeg': 'img_shaker_rosa.jpeg',

    // Citrato Magnesio
    'WhatsApp Image 2026-03-11 at 6.49.34 AM (2).jpeg': 'img_citrato_magnesio_star.jpeg',
    'WhatsApp Image 2026-03-11 at 6.49.34 AM (3).jpeg': 'img_citrato_magnesio_onefit.jpeg',

    // BCAA & Pre-Entreno
    'WhatsApp Image 2026-03-11 at 6.49.34 AM.jpeg': 'img_bcaa_star_2000.jpeg',
    'WhatsApp Image 2026-03-11 at 6.49.35 AM (4).jpeg': 'img_pre_entreno_pump_v8.jpeg',
    'WhatsApp Image 2026-03-11 at 6.49.36 AM (1).jpeg': 'img_pre_entreno_tnt.jpeg',
    'WhatsApp Image 2026-03-11 at 6.49.36 AM (2).jpeg': 'img_pre_entreno_friction.jpeg',
    'WhatsApp Image 2026-03-11 at 6.49.36 AM.jpeg': 'img_pre_entreno_3d_ripped.jpeg',

    // Colágeno
    'WhatsApp Image 2026-03-11 at 6.49.36 AM (3).jpeg': 'img_collagen_whey_chocolate.jpeg',
    'WhatsApp Image 2026-03-11 at 6.49.36 AM (4).jpeg': 'img_collagen_onefit_frutilla.jpeg',
    'WhatsApp Image 2026-03-11 at 6.49.37 AM (1).jpeg': 'img_collagen_sport_naranja.jpeg',
    'WhatsApp Image 2026-03-11 at 6.49.37 AM.jpeg': 'img_collagen_plus_limon.jpeg',

    // Granger (Pancakes, Cupcakes, Cookies)
    'WhatsApp Image 2026-03-11 at 6.49.37 AM (2).jpeg': 'img_pancake_vainilla.jpeg',
    'WhatsApp Image 2026-03-11 at 6.49.38 AM (1).jpeg': 'img_cupcake_chocolate.jpeg',
    'WhatsApp Image 2026-03-11 at 6.49.38 AM (2).jpeg': 'img_pancake_chocolate.jpeg',
    'WhatsApp Image 2026-03-11 at 6.49.38 AM (3).jpeg': 'img_pancake_keto.jpeg',
    'WhatsApp Image 2026-03-11 at 6.49.38 AM.jpeg': 'img_pancake_salado_queso.jpeg',
    'WhatsApp Image 2026-03-11 at 6.49.39 AM (1).jpeg': 'img_pancake_best_seller.jpeg',
    'WhatsApp Image 2026-03-11 at 6.49.39 AM (2).jpeg': 'img_cookies_granger.jpeg',

    // Salud (Omega, Carnitina, Creatina)
    'WhatsApp Image 2026-03-11 at 6.49.37 AM (3).jpeg': 'img_omega_3_star.jpeg',
    'WhatsApp Image 2026-03-11 at 6.49.38 AM (4).jpeg': 'img_omega_3_onefit.jpeg',
    'WhatsApp Image 2026-03-11 at 6.49.37 AM (4).jpeg': 'img_carnitina_star.jpeg',
    'WhatsApp Image 2026-03-11 at 6.49.39 AM.jpeg': 'img_creatina_star_monohydrate.jpeg',
};

// Generic renaming for anything left
let counter = 1;
files.forEach(file => {
    const oldPath = path.join(dir, file);
    if (!fs.statSync(oldPath).isFile()) return;

    let newName = exactMapping[file] || `img_generic_${counter++}.jpeg`;
    
    // Check if duplicate mapped name (safeguard)
    if (fileMapping[newName]) {
       newName = newName.replace('.jpeg', `_dup_${counter++}.jpeg`);
    }
    
    fileMapping[newName] = true;
    const newPath = path.join(dir, newName);
    
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed: "${file}" -> "${newName}"`);
});

console.log("Renaming complete.");
