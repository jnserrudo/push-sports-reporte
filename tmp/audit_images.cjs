const fs = require('fs');
const path = require('path');

const INITIAL_PRODUCTS = [
  { id: 1, marca: 'INTEGRA', producto: 'BARRITAS PROTEICAS (CAJA 10u)', sabor: 'PASTA DE MANÍ Y ARÁND', precioPush: 20000, precioPublico: 0, image: '/productos_push_sports/img_integra_barritas_caja.jpeg' },
  { id: 2, marca: 'INTEGRA', producto: 'BARRITAS PROTEICAS (CAJA 10u)', sabor: '-', precioPush: 20000, precioPublico: 0, image: '/productos_push_sports/img_integra_barritas_caja.jpeg' },
  { id: 3, marca: 'INTEGRA', producto: 'BARRITAS PROTEICAS (CAJA 10u)', sabor: '-', precioPush: 20000, precioPublico: 0, image: '/productos_push_sports/img_integra_barritas_caja.jpeg' },
  { id: 4, marca: 'STAR NUTRITION', producto: 'BCAA - 120 CAPS', sabor: '-', precioPush: 18000, precioPublico: 22000, image: '/productos_push_sports/img_bcaa_star_2000.jpeg' },
  { id: 5, marca: 'STAR NUTRITION', producto: 'BCAA MTOR 270 GR', sabor: '-', precioPush: 26000, precioPublico: 29000, image: '/productos_push_sports/img_bcaa_mtor_270g_star.jpeg' },
  { id: 6, marca: 'ONE FIT', producto: 'BCAA PUSH 300 GR', sabor: '-', precioPush: 17000, precioPublico: 22000, image: '/productos_push_sports/img_bcaa_push_300g_one_fit.jpeg' },
  { id: 7, marca: 'STAR NUTRITION', producto: 'CARNITINA - 60COMPRIMIDOS', sabor: '-', precioPush: 15000, precioPublico: 18000, image: '/productos_push_sports/img_carnitina_star.jpeg' },
  { id: 8, marca: 'STAR NUTRITION', producto: 'CITRATO DE MAGNESIO 500 GR', sabor: 'NEUTRO', precioPush: 27000, precioPublico: 32000, image: '/productos_push_sports/img_citrato_magnesio_star.jpeg' },
  { id: 9, marca: 'STAR NUTRITION', producto: 'BCAA MTOR 270 GR', sabor: 'FRUTOS ROJOS', precioPush: 27000, precioPublico: 32000, image: '/productos_push_sports/img_bcaa_mtor_270g_star.jpeg' },
  { id: 10, marca: 'ONE FIT', producto: 'CITRATO DE MAGNESIO 150 GR', sabor: '-', precioPush: 12000, precioPublico: 17000, image: '/productos_push_sports/img_citrato_magnesio_onefit.jpeg' },
  { id: 11, marca: 'ONE FIT', producto: 'COLAGENO 360 GR', sabor: 'LIMÓN', precioPush: 21000, precioPublico: 26000, image: '/productos_push_sports/img_collagen_plus_limon.jpeg' },
  { id: 12, marca: 'STAR NUTRITION', producto: 'COLAGENO 360 GR', sabor: 'FRUTOS ROJOS', precioPush: 21000, precioPublico: 26000, image: '/productos_push_sports/img_collagen_whey_chocolate.jpeg' },
  { id: 13, marca: 'ONE FIT', producto: 'COLAGENO - 260 GR', sabor: 'NARANJA', precioPush: 14000, precioPublico: 18000, image: '/productos_push_sports/img_collagen_sport_naranja.jpeg' },
  { id: 14, marca: 'ONE FIT', producto: 'COLAGENO - 260 GR', sabor: 'FRUTILLA', precioPush: 14000, precioPublico: 18000, image: '/productos_push_sports/img_collagen_onefit_frutilla.jpeg' },
  { id: 15, marca: 'STAR NUTRITION', producto: 'CREATINA 300 GR', sabor: 'Neutro-Frutos Rojos', precioPush: 25000, precioPublico: 30000, image: '/productos_push_sports/img_creatina_star_monohydrate.jpeg' },
  { id: 16, marca: 'ONE FIT', producto: 'CREATINA 200 GR', sabor: '-', precioPush: 16000, precioPublico: 21000, image: '/productos_push_sports/img_one_fit_creatina_200g.jpeg' },
  { id: 17, marca: 'ONE FIT', producto: 'Creatina 500 grs ONE FIT POTE', sabor: '-', precioPush: 28000, precioPublico: 33000, image: '/productos_push_sports/img_one_fit_creatina_500g.jpeg' },
  { id: 18, marca: 'GRANGER FOODS', producto: 'CUPCAKE PROTEICO - 360 GR', sabor: 'CHOCOLATE', precioPush: 10000, precioPublico: 15000, image: '/productos_push_sports/img_cupcake_chocolate.jpeg' },
  { id: 19, marca: 'STAR NUTRITION', producto: 'MULTIVITAMÍNICO - 60COMPRIMIDOS', sabor: '-', precioPush: 19000, precioPublico: 24000, image: '/productos_push_sports/img_multivitaminico_star_nutrition.jpeg' },
  { id: 20, marca: 'ONE FIT', producto: 'OMEGA 3 - 30 COMPRIMIDOS', sabor: '-', precioPush: 23000, precioPublico: 28000, image: '/productos_push_sports/img_omega_3_onefit.jpeg' },
  { id: 21, marca: 'STAR NUTRITION', producto: 'OMEGA 3 - 60 COMPRIMIDOS', sabor: '-', precioPush: 30000, precioPublico: 35000, image: '/productos_push_sports/img_omega_3_star.jpeg' },
  { id: 22, marca: 'GRANGER', producto: 'PANCAKES', sabor: 'CHOCOLATE', precioPush: 12000, precioPublico: 14000, image: '/productos_push_sports/img_pancake_chocolate.jpeg' },
  { id: 23, marca: 'GRANGER', producto: 'PANCAKES', sabor: 'VAINILLA', precioPush: 12000, precioPublico: 14000, image: '/productos_push_sports/img_pancake_vainilla.jpeg' },
  { id: 24, marca: 'GRANGER', producto: 'PANCAKES', sabor: 'QUESO', precioPush: 12000, precioPublico: 14000, image: '/productos_push_sports/img_pancake_salado_queso.jpeg' },
  { id: 25, marca: 'GRANGER', producto: 'GALLETAS', sabor: 'CHIP CHOCÓ/VAINILLA', precioPush: 9000, precioPublico: 12000, image: '/productos_push_sports/img_cookies_granger.jpeg' },
  { id: 26, marca: 'STAR NUTRITION', producto: 'PRE-ENTRENO 3D RIPPES', sabor: 'LIMÓN', precioPush: 34000, precioPublico: 40000, image: '/productos_push_sports/img_pre_entreno_3d_ripped.jpeg' },
  { id: 27, marca: 'STAR NUTRITION', producto: 'PRE-ENTRENO TNT DINAMITA', sabor: 'ACAÍ POWER', precioPush: 23000, precioPublico: 28000, image: '/productos_push_sports/img_pre_entreno_tnt.jpeg' },
  { id: 28, marca: 'STAR NUTRITION', producto: 'PRE-ENTRENO TNT DINAMITA', sabor: 'BLUE RAZZ', precioPush: 23000, precioPublico: 28000, image: '/productos_push_sports/img_pre_entreno_tnt.jpeg' },
  { id: 29, marca: 'ONE FIT', producto: 'PRE-ENTRENO - 30 SERV', sabor: 'LIMON', precioPush: 17000, precioPublico: 20000, image: '/productos_push_sports/img_pre_entreno_pump_v8.jpeg' },
  { id: 30, marca: 'ONE FIT', producto: 'PRE-ENTRENO - 30 SERV', sabor: 'UVA', precioPush: 17000, precioPublico: 20000, image: '/productos_push_sports/img_pre_entreno_friction.jpeg' },
  { id: 31, marca: 'STAR NUTRITION', producto: 'PROTEINA', sabor: 'VAINILLA', precioPush: 42000, precioPublico: 47000, image: '/productos_push_sports/img_star_proteina_vainilla.jpeg' },
  { id: 32, marca: 'STAR NUTRITION', producto: 'PROTEINA', sabor: 'CHOCOLATE', precioPush: 42000, precioPublico: 47000, image: '/productos_push_sports/img_star_proteina_chocolate.jpeg' },
  { id: 33, marca: 'STAR NUTRITION', producto: 'PROTEINA', sabor: 'FRUTILLA', precioPush: 42000, precioPublico: 47000, image: '/productos_push_sports/img_star_proteina_frutilla.jpeg' },
  { id: 34, marca: 'STAR NUTRITION', producto: 'PROTEINA', sabor: 'COOCKIES', precioPush: 42000, precioPublico: 47000, image: '/productos_push_sports/img_star_proteina_cookies.jpeg' },
  { id: 35, marca: 'STAR NUTRITION', producto: 'PROTEINA JUST PLANT', sabor: 'NEUTRO', precioPush: 37000, precioPublico: 42000, image: '/productos_push_sports/img_star_proteina_just_plant.jpeg' },
  { id: 36, marca: 'ONE FIT', producto: 'PROTEINA WHEY PROTEIN', sabor: 'VAINILLA', precioPush: 26000, precioPublico: 31000, image: '/productos_push_sports/img_one_fit_whey_protein.jpeg' },
  { id: 37, marca: 'ONE FIT', producto: 'PROTEINA WHEY PROTEIN', sabor: 'CHOCOLATE', precioPush: 26000, precioPublico: 31000, image: '/productos_push_sports/img_one_fit_whey_protein.jpeg' },
  { id: 38, marca: 'ONE FIT', producto: 'QUEMADOR', sabor: '-', precioPush: 14000, precioPublico: 19000, image: '/productos_push_sports/img_quemador_fat_destroyer_one_fit.jpeg' },
  { id: 39, marca: 'STAR NUTRITION', producto: 'RESVERATROL', sabor: '-', precioPush: 18000, precioPublico: 22000, image: '/productos_push_sports/img_star_resveratrol.jpeg' },
  { id: 40, marca: 'ONE FIT', producto: 'SHAKER', sabor: 'GRIS', precioPush: 12000, precioPublico: 17000, image: '/productos_push_sports/img_shaker_gris.jpeg' },
  { id: 41, marca: 'ONE FIT', producto: 'SHAKER', sabor: 'ROSA', precioPush: 12000, precioPublico: 17000, image: '/productos_push_sports/img_shaker_rosa.jpeg' },
  { id: 42, marca: 'STAR NUTRITION', producto: 'VITAMINA C STAR NUTRITION', sabor: '-', precioPush: 8000, precioPublico: 12000, image: '/productos_push_sports/img_vitamina_c_star_nutrition.jpeg' },
  { id: 43, marca: 'STAR NUTRITION', producto: 'EAA´s Essential Aminos (360 gr)', sabor: 'LIMON', precioPush: 30000, precioPublico: 35000, image: '/productos_push_sports/img_eaas_essential_aminos_star.jpeg' },
  { id: 44, marca: 'ENDURANCE', producto: 'Hydro Plus Endurance', sabor: 'LIMON', precioPush: 15000, precioPublico: 20000, image: '/productos_push_sports/img_endurance_hydro_plus_limon.jpeg' },
  { id: 45, marca: 'ONE FIT', producto: 'Fat Distroyer 2.0 One Fit (90 caps)', sabor: '-', precioPush: 14000, precioPublico: 19000, image: '/productos_push_sports/img_quemador_fat_destroyer_one_fit.jpeg' },
  { id: 46, marca: 'ONE FIT', producto: 'PRE-ENTRENO Pump V8 (285 gr)', sabor: 'Acaí', precioPush: 17000, precioPublico: 20000, image: '/productos_push_sports/img_pre_entreno_pump_v8.jpeg' },
];

const publicDir = 'c:/jnserrudo/nahuel_dev/push_sport_reporte/public';

INITIAL_PRODUCTS.forEach(p => {
    const fullPath = path.join(publicDir, p.image);
    if (!fs.existsSync(fullPath)) {
        console.log(`MISSING: ${p.producto} (${p.sabor}) -> ${p.image}`);
    }
});
