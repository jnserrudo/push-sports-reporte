const fs = require('fs');

const INITIAL_PRODUCTS = [
  { id: 1, marca: 'STAR NUTRITION', producto: 'Creatina 300 Grs Star', sabor: '-', precioPush: 25000, precioPublico: 30000, image: '/productos_push_sports/img_creatina_star_monohydrate.jpeg' },
  { id: 2, marca: 'STAR NUTRITION', producto: 'Creatina 300 Grs Star Frutos Rojos', sabor: 'Frutos Rojos', precioPush: 25000, precioPublico: 30000, image: '/productos_push_sports/img_creatina_star_monohydrate.jpeg' },
  { id: 3, marca: 'STAR NUTRITION', producto: 'Creatina 300 Grs Star En Pote', sabor: '-', precioPush: 25000, precioPublico: 30000, image: '/productos_push_sports/img_creatina_star_monohydrate.jpeg' },
  { id: 4, marca: 'ONE FIT', producto: 'Creatina 200 Grs One Fit', sabor: '-', precioPush: 28000, precioPublico: 33000, image: '/productos_push_sports/img_one_fit_creatina_500g.jpeg' },
  { id: 5, marca: 'ONE FIT', producto: 'Creatina 500 Grs One Fit Pote', sabor: '-', precioPush: 28000, precioPublico: 33000, image: '/productos_push_sports/img_one_fit_creatina_500g.jpeg' },
  { id: 6, marca: 'STAR NUTRITION', producto: 'L-carnitina Star Nutrition', sabor: '-', precioPush: 8000, precioPublico: 12000, image: '/productos_push_sports/img_vitamina_c_star_nutrition.jpeg' },
  { id: 7, marca: 'STAR NUTRITION', producto: 'Proteina Star 1 Kg Frutilla', sabor: 'Frutilla', precioPush: 42000, precioPublico: 47000, image: '/productos_push_sports/img_generic_4.jpeg' },
  { id: 8, marca: 'STAR NUTRITION', producto: 'Proteina Star 1 Kg Chocolate', sabor: 'Chocolate', precioPush: 42000, precioPublico: 47000, image: '/productos_push_sports/img_generic_4.jpeg' },
  { id: 9, marca: 'STAR NUTRITION', producto: 'Proteina Star 1 Kg Banana', sabor: 'Banana', precioPush: 42000, precioPublico: 47000, image: '/productos_push_sports/img_generic_4.jpeg' },
  { id: 10, marca: 'STAR NUTRITION', producto: 'Proteina Star 1 Kg Cookie', sabor: 'Cookie', precioPush: 42000, precioPublico: 47000, image: '/productos_push_sports/img_generic_4.jpeg' },
  { id: 11, marca: 'STAR NUTRITION', producto: 'Proteina Star 1 Kg Vainilla', sabor: 'Vainilla', precioPush: 42000, precioPublico: 47000, image: '/productos_push_sports/img_generic_4.jpeg' },
  { id: 12, marca: 'STAR NUTRITION', producto: 'Proteina Star 1 Kg ( Con Colageno) Vainilla', sabor: 'Vainilla', precioPush: 42000, precioPublico: 47000, image: '/productos_push_sports/img_generic_4.jpeg' },
  { id: 13, marca: 'STAR NUTRITION', producto: 'Proteina Star 1 Kg (con Colageno) Chocolate', sabor: 'Chocolate', precioPush: 42000, precioPublico: 47000, image: '/productos_push_sports/img_generic_4.jpeg' },
  { id: 14, marca: 'STAR NUTRITION', producto: 'Proteina Star Organica', sabor: '-', precioPush: 42000, precioPublico: 47000, image: '/productos_push_sports/img_generic_4.jpeg' },
  { id: 15, marca: 'ONE FIT', producto: 'Proteina One Fit Vainilla', sabor: 'Vainilla', precioPush: 28000, precioPublico: 33000, image: '/productos_push_sports/img_one_fit_creatina_500g.jpeg' },
  { id: 16, marca: 'ONE FIT', producto: 'Proteina One Fit Frutilla', sabor: 'Frutilla', precioPush: 28000, precioPublico: 33000, image: '/productos_push_sports/img_one_fit_creatina_500g.jpeg' },
  { id: 17, marca: 'ONE FIT', producto: 'Proteina One Fit Chocolate', sabor: 'Chocolate', precioPush: 28000, precioPublico: 33000, image: '/productos_push_sports/img_one_fit_creatina_500g.jpeg' },
  { id: 18, marca: 'ONE FIT', producto: 'Fat Distroyer 2.0 One Fit (90 Caps) (quemador)', sabor: '-', precioPush: 14000, precioPublico: 19000, image: '/productos_push_sports/img_quemador_fat_destroyer_one_fit.jpeg' },
  { id: 19, marca: 'STAR NUTRITION', producto: 'Bcca Star Limon 270grs (en Polvo)', sabor: 'Limon', precioPush: 8000, precioPublico: 12000, image: '/productos_push_sports/img_vitamina_c_star_nutrition.jpeg' },
  { id: 20, marca: 'STAR NUTRITION', producto: 'Bcca Star Frutos Rojos 300grs (en Polvo)', sabor: 'Frutos Rojos', precioPush: 27000, precioPublico: 32000, image: '/productos_push_sports/img_bcaa_mtor_270g_star.jpeg' },
  { id: 21, marca: 'STAR NUTRITION', producto: 'Bcca Star En Capsulas', sabor: '-', precioPush: 8000, precioPublico: 12000, image: '/productos_push_sports/img_vitamina_c_star_nutrition.jpeg' },
  { id: 22, marca: 'ONE FIT', producto: 'Bcca One Fit 300grs', sabor: '-', precioPush: 28000, precioPublico: 33000, image: '/productos_push_sports/img_one_fit_creatina_500g.jpeg' },
  { id: 23, marca: 'STAR NUTRITION', producto: 'Eaa´s Essential Aminos (360 Gr) Star', sabor: '-', precioPush: 30000, precioPublico: 35000, image: '/productos_push_sports/img_eaas_essential_aminos_star.jpeg' },
  { id: 24, marca: 'STAR NUTRITION', producto: 'Omega 3 Star (60 Comp)', sabor: '-', precioPush: 30000, precioPublico: 35000, image: '/productos_push_sports/img_omega_3_star.jpeg' },
  { id: 25, marca: 'ONE FIT', producto: 'Omega 3 One Fit (30 Comp)', sabor: '-', precioPush: 28000, precioPublico: 33000, image: '/productos_push_sports/img_one_fit_creatina_500g.jpeg' },
  { id: 26, marca: 'STAR NUTRITION', producto: 'Pre Entreno Star V8 Sandia', sabor: 'Sandia', precioPush: 34000, precioPublico: 40000, image: '/productos_push_sports/img_pre_entreno_3d_ripped.jpeg' },
  { id: 27, marca: 'STAR NUTRITION', producto: 'Pre Entreno Star V8 Sandia', sabor: 'Sandia', precioPush: 34000, precioPublico: 40000, image: '/productos_push_sports/img_pre_entreno_3d_ripped.jpeg' },
  { id: 28, marca: 'STAR NUTRITION', producto: 'Pre Entreno Star V8 Acai', sabor: 'Acai', precioPush: 34000, precioPublico: 40000, image: '/productos_push_sports/img_pre_entreno_3d_ripped.jpeg' },
  { id: 29, marca: '-', producto: 'Pre Entreno 3d Limon', sabor: 'Limon', precioPush: 17000, precioPublico: 20000, image: '/productos_push_sports/img_pre_entreno_pump_v8.jpeg' },
  { id: 30, marca: '-', producto: 'Pre Entreno Tnt Acai', sabor: 'Acai', precioPush: 23000, precioPublico: 28000, image: '/productos_push_sports/img_pre_entreno_tnt.jpeg' },
  { id: 31, marca: '-', producto: 'Pre Entreno Tnt Blue Razz', sabor: 'Blue Razz', precioPush: 23000, precioPublico: 28000, image: '/productos_push_sports/img_pre_entreno_tnt.jpeg' },
  { id: 32, marca: 'ONE FIT', producto: 'Pre Entreno One Fit Limon', sabor: 'Limon', precioPush: 17000, precioPublico: 20000, image: '/productos_push_sports/img_pre_entreno_pump_v8.jpeg' },
  { id: 33, marca: 'ONE FIT', producto: 'Pre Entreno One Fit Uva', sabor: 'Uva', precioPush: 17000, precioPublico: 20000, image: '/productos_push_sports/img_pre_entreno_friction.jpeg' },
  { id: 34, marca: '-', producto: 'Shaker Gris', sabor: '-', precioPush: 12000, precioPublico: 17000, image: '/productos_push_sports/img_shaker_gris.jpeg' },
  { id: 35, marca: '-', producto: 'Shaker Celeste', sabor: '-', precioPush: 12000, precioPublico: 17000, image: '/productos_push_sports/img_shaker_gris.jpeg' },
  { id: 36, marca: 'GRANGER FOODS', producto: 'Panqueques Chocolate Granger', sabor: 'Chocolate', precioPush: 10000, precioPublico: 15000, image: '/productos_push_sports/img_cupcake_chocolate.jpeg' },
  { id: 37, marca: 'GRANGER FOODS', producto: 'Panqueques Vainilla Granger', sabor: 'Vainilla', precioPush: 12000, precioPublico: 14000, image: '/productos_push_sports/img_pancake_vainilla.jpeg' },
  { id: 38, marca: 'GRANGER FOODS', producto: 'Galleta Granger', sabor: '-', precioPush: 9000, precioPublico: 12000, image: '/productos_push_sports/img_cookies_granger.jpeg' },
  { id: 39, marca: '-', producto: 'Panqueques Queso', sabor: 'Queso', precioPush: 12000, precioPublico: 14000, image: '/productos_push_sports/img_pancake_salado_queso.jpeg' },
  { id: 40, marca: '-', producto: 'Panqueques Mole Vainilla', sabor: 'Vainilla', precioPush: 12000, precioPublico: 14000, image: '/productos_push_sports/img_pancake_vainilla.jpeg' },
  { id: 41, marca: '-', producto: 'Panqueque Keto', sabor: '-', precioPush: 0, precioPublico: 0, image: '' },
  { id: 42, marca: '-', producto: 'Cupcke Microondas', sabor: '-', precioPush: 0, precioPublico: 0, image: '' },
  { id: 43, marca: 'STAR NUTRITION', producto: 'Colageno Star - Limon', sabor: 'Limon', precioPush: 21000, precioPublico: 26000, image: '/productos_push_sports/img_collagen_whey_chocolate.jpeg' },
  { id: 44, marca: 'STAR NUTRITION', producto: 'Colageno Star - Frutos Rojos', sabor: 'Frutos Rojos', precioPush: 21000, precioPublico: 26000, image: '/productos_push_sports/img_collagen_whey_chocolate.jpeg' },
  { id: 45, marca: 'ONE FIT', producto: 'Colageno One Fit 240 Gr Naranja', sabor: 'Naranja', precioPush: 14000, precioPublico: 18000, image: '/productos_push_sports/img_collagen_sport_naranja.jpeg' },
  { id: 46, marca: 'ONE FIT', producto: 'Colageno One Fit 240 Gr Frutilla', sabor: 'Frutilla', precioPush: 14000, precioPublico: 18000, image: '/productos_push_sports/img_collagen_onefit_frutilla.jpeg' },
  { id: 47, marca: 'STAR NUTRITION', producto: 'Citrato De Magnesio Star Neutro', sabor: 'Neutro', precioPush: 27000, precioPublico: 32000, image: '/productos_push_sports/img_citrato_magnesio_star.jpeg' },
  { id: 48, marca: 'STAR NUTRITION', producto: 'Citrato De Magnesio Star Frutos Rojos', sabor: 'Frutos Rojos', precioPush: 27000, precioPublico: 32000, image: '/productos_push_sports/img_citrato_magnesio_star.jpeg' },
  { id: 49, marca: 'STAR NUTRITION', producto: 'Citrato De Magnesio Star Comp 60u', sabor: '-', precioPush: 27000, precioPublico: 32000, image: '/productos_push_sports/img_citrato_magnesio_star.jpeg' },
  { id: 50, marca: 'ONE FIT', producto: 'Citrato De Magnesio One Fit Sin Sabor', sabor: '-', precioPush: 12000, precioPublico: 17000, image: '/productos_push_sports/img_citrato_magnesio_onefit.jpeg' },
  { id: 51, marca: '-', producto: 'Hydro Max Naranja', sabor: 'Naranja', precioPush: 14000, precioPublico: 18000, image: '/productos_push_sports/img_collagen_sport_naranja.jpeg' },
  { id: 52, marca: '-', producto: 'Hydro Max Pomelo', sabor: 'Pomelo', precioPush: 15000, precioPublico: 20000, image: '/productos_push_sports/img_generic_12.jpeg' },
  { id: 53, marca: 'STAR NUTRITION', producto: 'Vitamina C Star', sabor: '-', precioPush: 8000, precioPublico: 12000, image: '/productos_push_sports/img_vitamina_c_star_nutrition.jpeg' },
  { id: 54, marca: 'STAR NUTRITION', producto: 'Multivitaminico Star', sabor: '-', precioPush: 8000, precioPublico: 12000, image: '/productos_push_sports/img_vitamina_c_star_nutrition.jpeg' },
  { id: 55, marca: '-', producto: 'Reverastrol', sabor: '-', precioPush: 0, precioPublico: 0, image: '' },
  { id: 56, marca: '-', producto: 'Barras Cereales', sabor: '-', precioPush: 0, precioPublico: 0, image: '' },
  { id: 57, marca: 'INTEGRA', producto: 'Caja Integra Mani Y Chocolate', sabor: 'Chocolate', precioPush: 20000, precioPublico: 0, image: '/productos_push_sports/img_integra_barritas_caja.jpeg' },
  { id: 58, marca: 'INTEGRA', producto: 'Caja Integra Arandanos', sabor: '-', precioPush: 20000, precioPublico: 0, image: '/productos_push_sports/img_integra_barritas_caja.jpeg' },
  { id: 59, marca: 'INTEGRA', producto: 'Caja Integra Chocolate Y Mani', sabor: 'Chocolate', precioPush: 20000, precioPublico: 0, image: '/productos_push_sports/img_integra_barritas_caja.jpeg' },
  { id: 60, marca: 'INTEGRA', producto: 'Caja Integra Girasol Y Arandanos', sabor: '-', precioPush: 20000, precioPublico: 0, image: '/productos_push_sports/img_integra_barritas_caja.jpeg' },
];

function getBaseName(prod) {
  const name = prod.producto.toLowerCase();
  if (name.startsWith('creatina 300 grs star')) return 'Creatina 300 Grs Star';
  if (name.startsWith('proteina star 1 kg ( con colageno)') || name.startsWith('proteina star 1 kg (con colageno)')) return 'Proteina Star 1 Kg (Con Colageno)';
  if (name.startsWith('proteina star 1 kg')) return 'Proteina Star 1 Kg';
  if (name.startsWith('proteina one fit')) return 'Proteina One Fit';
  if (name.startsWith('bcca star limon 270grs') || name.startsWith('bcca star frutos rojos 300grs')) return null;
  if (name.startsWith('pre entreno star v8')) return 'Pre Entreno Star V8';
  if (name.startsWith('pre entreno tnt')) return 'Pre Entreno Tnt';
  if (name.startsWith('pre entreno one fit')) return 'Pre Entreno One Fit';
  if (name.startsWith('panqueques chocolate granger') || name.startsWith('panqueques vainilla granger') || name.startsWith('panqueques mole vainilla') || name.startsWith('panqueques queso')) return 'Panqueques Granger';
  if (name.startsWith('colageno star')) return 'Colageno Star';
  if (name.startsWith('colageno one fit 240 gr')) return 'Colageno One Fit 240 Gr';
  if (name.startsWith('citrato de magnesio star neutro') || name.startsWith('citrato de magnesio star frutos rojos')) return 'Citrato De Magnesio Star';
  if (name.startsWith('hydro max')) return 'Hydro Max';
  if (name.startsWith('caja integra')) return 'Caja Integra';
  
  return null;
}

const grouped = {};
let nextId = 1;

for (const prod of INITIAL_PRODUCTS) {
  let base = getBaseName(prod);
  if (!base) base = prod.producto;
  
  const key = `${base}|${prod.marca}|${prod.precioPush}|${prod.precioPublico}`;
  
  if (!grouped[key]) {
    grouped[key] = {
      marca: prod.marca,
      producto: base,
      sabores: [],
      precioPush: prod.precioPush,
      precioPublico: prod.precioPublico,
      image: prod.image
    };
  }
  
  if (prod.sabor !== '-' && !grouped[key].sabores.includes(prod.sabor)) {
    grouped[key].sabores.push(prod.sabor);
  }
}

const finalProducts = [];
for (const key in grouped) {
  const p = grouped[key];
  p.id = nextId++;
  finalProducts.push(p);
}

let jsLines = ['const INITIAL_PRODUCTS = ['];
for (const p of finalProducts) {
  const saboresArr = JSON.stringify(p.sabores);
  jsLines.push(`  { id: ${p.id}, marca: '${p.marca}', producto: '${p.producto}', sabores: ${saboresArr}, precioPush: ${p.precioPush}, precioPublico: ${p.precioPublico}, image: '${p.image}' },`);
}
jsLines.push('];');

fs.writeFileSync('c:\\\\jnserrudo\\\\nahuel_dev\\\\push_sport_reporte\\\\tmp\\\\grouped_products.js', jsLines.join('\\n'), 'utf-8');
console.log('Done!');
