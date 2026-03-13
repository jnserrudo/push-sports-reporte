import React, { useState, useEffect } from 'react';

// Polyfill minimal de Buffer para compatibilidad con @react-pdf/renderer en navegadores modernos (Vite)
if (typeof window !== 'undefined' && !window.Buffer) {
    window.Buffer = {
        isBuffer: (arg) => arg && arg._isBuffer,
        from: (data) => {
            if (typeof data === 'string') {
                const b = new TextEncoder().encode(data);
                b._isBuffer = true;
                return b;
            }
            const b = new Uint8Array(data);
            b._isBuffer = true;
            return b;
        },
        alloc: (size) => {
            const b = new Uint8Array(size);
            b._isBuffer = true;
            return b;
        }
    };
}
import { 
  Printer, 
  Edit2, 
  Save, 
  X, 
  TrendingUp, 
  Box, 
  Activity,
  Loader2,
  Download,
  Store,
  Plus,
  Trash2,
  ListPlus,
  ArrowLeft
} from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ReportPDF from './ReportPDF';
import ShopReportPDF from './ShopReportPDF';

// --- DATOS INICIALES (ESTÁTICOS) ---
const INITIAL_PRODUCTS = [
  { id: 1, marca: 'STAR NUTRITION', producto: 'Creatina 300 Grs Star', sabores: ['Frutos Rojos'], precioPush: 25000, precioPublico: 30000, image: '/productos_push_sports/v1/Creatina_star_sobre.jpeg' },
  { id: 2, marca: 'ONE FIT', producto: 'Creatina 200 Grs One Fit', sabores: [], precioPush: 28000, precioPublico: 33000, image: '/productos_push_sports/v1/Creatina_One_Fit_200g.jpeg' },
  { id: 3, marca: 'ONE FIT', producto: 'Creatina 500 Grs One Fit Pote', sabores: [], precioPush: 28000, precioPublico: 33000, image: '/productos_push_sports/img_one_fit_creatina_500g.jpeg' }, 
  { id: 4, marca: 'STAR NUTRITION', producto: 'L-Carnitina Star Nutrition', sabores: [], precioPush: 8000, precioPublico: 12000, image: '/productos_push_sports/v1/L-Carnitina_Star_Nutrition.jpeg' }, 
  { id: 5, marca: 'STAR NUTRITION', producto: 'Proteina Star 1 Kg', sabores: ['Frutilla', 'Chocolate', 'Banana', 'Cookie', 'Vainilla'], precioPush: 42000, precioPublico: 47000, image: '/productos_push_sports/v1/Proteina_Star_1kg.jpeg' },
  { id: 6, marca: 'STAR NUTRITION', producto: 'Proteina Star 1 Kg (Con Colageno)', sabores: ['Vainilla', 'Chocolate'], precioPush: 42000, precioPublico: 47000, image: '/productos_push_sports/v1/Proteina_Star_1kg_colageno.jpeg' },
  { id: 7, marca: 'STAR NUTRITION', producto: 'Proteina Star Organica', sabores: [], precioPush: 42000, precioPublico: 47000, image: '/productos_push_sports/v1/Proteina-Star-Organica.jpeg' },
  { id: 8, marca: 'ONE FIT', producto: 'Proteina One Fit', sabores: ['Vainilla', 'Frutilla', 'Chocolate'], precioPush: 28000, precioPublico: 33000, image: '/productos_push_sports/v1/Proteina_Onefit.jpeg' },
  { id: 9, marca: 'ONE FIT', producto: 'Fat Distroyer 2.0 One Fit (90 Caps)', sabores: [], precioPush: 14000, precioPublico: 19000, image: '/productos_push_sports/v1/img_quemador_fat_destroyer_one_fit.jpeg' },
  { id: 10, marca: 'STAR NUTRITION', producto: 'Bcca Star Limon 270grs (en Polvo)', sabores: ['Limon','Frutos Rojos'], precioPush: 8000, precioPublico: 12000, image: '/productos_push_sports/v1/Bcca_Star_270.jpeg' },
  //{ id: 11, marca: 'STAR NUTRITION', producto: 'Bcca Star Frutos Rojos 300grs (en Polvo)', sabores: ['Frutos Rojos'], precioPush: 27000, precioPublico: 32000, image: '/productos_push_sports/img_bcaa_mtor_270g_star.jpeg' },
  { id: 12, marca: 'STAR NUTRITION', producto: 'Bcca Star En Capsulas', sabores: [], precioPush: 8000, precioPublico: 12000, image: '/productos_push_sports/img_vitamina_c_star_nutrition.jpeg' },
  { id: 13, marca: 'ONE FIT', producto: 'Bcca One Fit 300grs', sabores: [], precioPush: 28000, precioPublico: 33000, image: '/productos_push_sports/v1/Bcca_One_Fit_300g.jpeg' },
  { id: 14, marca: 'STAR NUTRITION', producto: 'Eaa\u00B4s Essential Aminos (360 Gr) Star', sabores: [], precioPush: 30000, precioPublico: 35000, image: '/productos_push_sports/img_eaas_essential_aminos_star.jpeg' },
  { id: 15, marca: 'STAR NUTRITION', producto: 'Omega 3 Star (60 Comp)', sabores: [], precioPush: 30000, precioPublico: 35000, image: '/productos_push_sports/img_omega_3_star.jpeg' },
  { id: 16, marca: 'ONE FIT', producto: 'Omega 3 One Fit (30 Comp)', sabores: [], precioPush: 28000, precioPublico: 33000, image: '/productos_push_sports/v1/Omega3_Onefit_30comp.jpeg' },
  { id: 17, marca: 'STAR NUTRITION', producto: 'Pre Entreno Star V8', sabores: ['Sandia', 'Acai'], precioPush: 34000, precioPublico: 40000, image: '/productos_push_sports/img_pre_entreno_pump_v8.jpeg' },
  { id: 18, marca: '-', producto: 'Pre Entreno 3d Limon', sabores: ['Limon'], precioPush: 17000, precioPublico: 20000, image: '/productos_push_sports/img_pre_entreno_3d_ripped.jpeg' },
  { id: 19, marca: '-', producto: 'Pre Entreno Tnt', sabores: ['Acai', 'Blue Razz'], precioPush: 23000, precioPublico: 28000, image: '/productos_push_sports/img_pre_entreno_tnt.jpeg' },
  { id: 20, marca: 'ONE FIT', producto: 'Pre Entreno One Fit', sabores: ['Limon', 'Uva'], precioPush: 17000, precioPublico: 20000, image: '/productos_push_sports/v1/Preentreno_OneFit.jpeg' },
  { id: 21, marca: '-', producto: 'Shaker Gris', sabores: [], precioPush: 12000, precioPublico: 17000, image: '/productos_push_sports/img_shaker_gris.jpeg' },
  { id: 22, marca: '-', producto: 'Shaker Rosa', sabores: [], precioPush: 12000, precioPublico: 17000, image: '/productos_push_sports/v1/Shaker_rosa.jpeg' },
  { id: 23, marca: 'GRANGER FOODS', producto: 'Panqueques Granger', sabores: ['Chocolate', 'Vainilla'], precioPush: 10000, precioPublico: 15000, image: '/productos_push_sports/v1/Panqueques_Granger.jpeg' },
  { id: 24, marca: 'GRANGER FOODS', producto: 'Galleta Granger', sabores: [], precioPush: 9000, precioPublico: 12000, image: '/productos_push_sports/v1/Panqueques_Granger2.jpeg' },
  { id: 25, marca: '-', producto: 'Panqueques Queso', sabores: ['Queso'], precioPush: 12000, precioPublico: 14000, image: '/productos_push_sports/img_pancake_salado_queso.jpeg' },
  { id: 26, marca: '-', producto: 'Panqueques Mole Vainilla', sabores: ['Vainilla'], precioPush: 12000, precioPublico: 14000, image: '/productos_push_sports/img_pancake_vainilla.jpeg' },
  { id: 27, marca: '-', producto: 'Panqueque Keto', sabores: [], precioPush: 0, precioPublico: 0, image: '/productos_push_sports/v1/Panqueques_Keto.jpeg' },
  { id: 28, marca: '-', producto: 'Cupcke Microondas', sabores: [], precioPush: 0, precioPublico: 0, image: '/productos_push_sports/v1/Cupcakes_Proteicos.jpeg' },
  { id: 29, marca: 'STAR NUTRITION', producto: 'Colageno Star', sabores: ['Limon', 'Frutos Rojos'], precioPush: 21000, precioPublico: 26000, image: '/productos_push_sports/v1/Colageno_Limon.jpeg' },
  { id: 30, marca: 'ONE FIT', producto: 'Colageno One Fit 240 Gr', sabores: ['Naranja', 'Frutilla'], precioPush: 14000, precioPublico: 18000, image: '/productos_push_sports/v1/Colageno_Onefit_240gr.jpeg' },
  { id: 31, marca: 'STAR NUTRITION', producto: 'Citrato De Magnesio Star', sabores: ['Neutro', 'Frutos Rojos'], precioPush: 27000, precioPublico: 32000, image: '/productos_push_sports/v1/Citrato_Magnesio_Star_Com_60u.jpeg' },
  { id: 32, marca: 'STAR NUTRITION', producto: 'Citrato De Magnesio Star Comp 60u', sabores: [], precioPush: 27000, precioPublico: 32000, image: '/productos_push_sports/img_citrato_magnesio_star.jpeg' },
  { id: 33, marca: 'ONE FIT', producto: 'Citrato De Magnesio One Fit Sin Sabor', sabores: [], precioPush: 12000, precioPublico: 17000, image: '/productos_push_sports/img_citrato_magnesio_onefit.jpeg' },
  { id: 34, marca: '-', producto: 'Hydro Max', sabores: ['Naranja', 'Pomelo'], precioPush: 14000, precioPublico: 18000, image: '/productos_push_sports/v1/Hydro_Max.jpeg' },
  { id: 35, marca: 'STAR NUTRITION', producto: 'Vitamina C Star', sabores: [], precioPush: 8000, precioPublico: 12000, image: '/productos_push_sports/img_vitamina_c_star_nutrition.jpeg' },
  { id: 36, marca: 'STAR NUTRITION', producto: 'Multivitaminico Star', sabores: [], precioPush: 8000, precioPublico: 12000, image: '/productos_push_sports/v1/Multivitaminico_Star.jpeg' },
  { id: 37, marca: '-', producto: 'Reverastrol', sabores: [], precioPush: 0, precioPublico: 0, image: '/productos_push_sports/v1/Reverastrol.jpeg' },
  { id: 38, marca: '-', producto: 'Barras Cereales', sabores: [], precioPush: 0, precioPublico: 0, image: '/productos_push_sports/v1/Barra_chocolate.jpeg' },
  { id: 39, marca: 'INTEGRA', producto: 'Caja Integra', sabores: ['Mani Y Chocolate', 'Arandanos', 'Chocolate Y Mani', 'Girasol Y Arandanos'], precioPush: 20000, precioPublico: 0, image: '/productos_push_sports/img_integra_barritas_caja.jpeg' },
];

export default function App() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [editingProduct, setEditingProduct] = useState(null);
  const [currentDate, setCurrentDate] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isReportMode, setIsReportMode] = useState(false);
  const [isShopReportMode, setIsShopReportMode] = useState(false);
  const [isShopPreviewMode, setIsShopPreviewMode] = useState(false);
  const [shopName, setShopName] = useState('');
  const [shopItems, setShopItems] = useState([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(null);

  useEffect(() => {
    // Configurar fecha
    const date = new Date();
    setCurrentDate(date.toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' }));
    
    // Inyectar fuente Oswald
    const style = document.createElement('style');
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&display=swap');
      :root {
        --color-bg: #0F0F0F;
        --color-cyan: #00A3CC;
        --color-cyan-bright: #00E5FF;
      }
      body {
        background-color: var(--color-bg);
        color: white;
        font-family: 'Inter', system-ui, sans-serif;
      }
      .font-oswald {
        font-family: 'Oswald', sans-serif;
      }
      .glass-panel {
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        border: 1px solid rgba(255, 255, 255, 0.05);
      }
      @media print {
        body {
          background-color: white !important;
          color: black !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        .no-print {
          display: none !important;
        }
        .print-only {
          display: block !important;
        }
        @page {
          margin: 1cm;
          size: auto;
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleEditClick = (product) => {
    setEditingProduct({ ...product });
  };

  const handleSave = () => {
    setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
    setEditingProduct(null);
  };

  const formatPrice = (price) => {
    if (!price) return '-';
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(price);
  };

  // Función para entrar en modo reporte
  const handleGeneratePDF = () => {
    setIsReportMode(true);
    // Scroll to top
    window.scrollTo(0, 0);
  };

  const handleGenerateShopPDFMode = () => {
    setIsShopReportMode(true);
    setIsShopPreviewMode(false);
    window.scrollTo(0, 0);
  };

  const handleOpenShopPreview = () => {
    setIsShopPreviewMode(true);
    window.scrollTo(0, 0);
  };

  const handleAddShopItem = (product) => {
    setShopItems([...shopItems, { 
      product, 
      stockAnterior: 0, 
      cantidadDejada: 0,
      precioPush: product.precioPush,
      precioPublico: product.precioPublico
    }]);
  };

  const handleRemoveShopItem = (index) => {
    setShopItems(shopItems.filter((_, i) => i !== index));
  };

  const updateShopItem = (index, field, value) => {
    const newItems = [...shopItems];
    let parsedValue = value === '' ? '' : Number(value);
    // Prevent negative numbers
    if (parsedValue !== '' && parsedValue < 0) parsedValue = 0;
    newItems[index][field] = parsedValue;
    setShopItems(newItems);
  };

  const totalProducts = products.length;
  // Validations for generating PDF
  const hasValidName = shopName.trim().length > 0;
  const hasValidItems = shopItems.length > 0 && shopItems.some(i => i.cantidadDejada > 0 || i.stockAnterior > 0);
  const isValidReport = hasValidName && hasValidItems;
  const avgPushPrice = products.reduce((acc, curr) => acc + curr.precioPush, 0) / totalProducts;

  if (isShopPreviewMode) {
    const totalArticles = shopItems.reduce((acc, curr) => acc + (Number(curr.stockAnterior) || 0) + (Number(curr.cantidadDejada) || 0), 0);
    return (
      <div className="min-h-screen bg-[#F9FAFB] text-[#111827] p-4 md:p-10 font-sans">
        {/* Toolbar no imprimible - Responsive */}
        <div className="no-print fixed bottom-6 left-1/2 -translate-x-1/2 md:top-6 md:bottom-auto md:right-6 md:left-auto md:translate-x-0 flex flex-col md:flex-row gap-3 md:gap-4 z-[100] pointer-events-auto w-[90%] md:w-auto">
          <button 
            onClick={() => setIsShopPreviewMode(false)}
            className="bg-black/80 hover:bg-black text-white px-6 py-4 md:py-3 rounded-full font-oswald uppercase tracking-widest text-[10px] md:text-xs flex items-center justify-center gap-2 transition-all backdrop-blur-md border border-white/10 cursor-pointer shadow-xl active:scale-95 w-full md:w-auto"
          >
            <ArrowLeft className="w-4 h-4" /> Volver al Editor
          </button>
          
          <PDFDownloadLink 
            document={<ShopReportPDF shopName={shopName} items={shopItems} currentDate={currentDate} />} 
            fileName={`Reporte_${shopName.replace(/ /g, '_')}_${currentDate.replace(/\//g, '-')}.pdf`}
            className="bg-[#00A3CC] hover:bg-[#00E5FF] text-[#0F0F0F] px-8 py-4 md:py-3 rounded-full font-oswald uppercase tracking-widest text-[10px] md:text-xs flex items-center justify-center gap-2 shadow-2xl transition-all font-bold cursor-pointer hover:scale-105 active:scale-95 w-full md:w-auto"
          >
            {({ loading }) => (
              <>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                {loading ? 'Preparando...' : 'Descargar PDF'}
              </>
            )}
          </PDFDownloadLink>
        </div>

        {/* CONTENIDO DEL REPORTE PREMIUM (HTML PREVIEW) */}
        <div className="max-w-4xl mx-auto bg-[#FFFFFF] shadow-2xl p-6 md:p-10 rounded-2xl md:rounded-[30px] relative overflow-hidden">
          {/* Decoración */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gray-50 rounded-full opacity-50 -mr-32 -mt-32"></div>
          <div className="absolute bottom-10 left-10 w-4 h-4 rounded-full bg-[#00A3CC]"></div>

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline mb-4 md:mb-6 border-b-2 md:border-b-4 border-black pb-2 md:pb-4 gap-4 md:gap-6 relative z-10">
            <div className="w-full">
              <h1 className="font-oswald text-3xl md:text-6xl font-black tracking-tighter uppercase leading-none break-words w-full md:max-w-[500px]">
                {shopName || 'COMERCIO'}
              </h1>
              <p className="font-oswald text-[9px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] text-[#00A3CC] uppercase mt-2 font-bold">
                Reporte de Artículos y Precios
              </p>
            </div>
            <div className="text-left md:text-right shrink-0">
              <p className="font-oswald text-[8px] md:text-[10px] uppercase tracking-widest text-gray-400 mb-0.5 md:mb-1 font-bold">Fecha Emisión</p>
              <p className="font-oswald text-base md:text-xl font-bold">{currentDate}</p>
            </div>
          </div>

          {/* Tabla */}
          <div className="relative z-10 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 md:border-b-4 border-black">
                  <th className="py-2.5 md:py-4 text-center font-oswald uppercase text-[9px] md:text-xs tracking-widest text-[#1F2937] w-[45%] md:w-[50%]">Imagen</th>
                  <th className="py-2.5 md:py-4 text-left font-oswald uppercase text-[9px] md:text-xs tracking-widest text-[#1F2937] w-[30%] md:w-[28%] pl-2">Producto</th>
                  <th className="py-2.5 md:py-4 text-center font-oswald uppercase text-[9px] md:text-xs tracking-widest text-[#1F2937] w-[13%] md:w-[12%]">Stock</th>
                  <th className="py-2.5 md:py-4 text-right font-oswald uppercase text-[9px] md:text-xs tracking-widest text-[#1F2937] w-[12%] md:w-[10%]">P. Público</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {shopItems.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 px-2 flex justify-center items-center h-40 md:h-52">
                      {item.product.image ? (
                        <div className="w-[120px] md:w-[160px] h-[120px] md:h-[160px] rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-white flex items-center justify-center">
                          {/* MODIFICA EL VALOR scale-[1.10] ABAJO PARA AJUSTAR EL RECORTE DE LA IMAGEN */}
                          <img src={item.product.image} className="w-full h-full object-cover scale-[1.10]" alt="prod" />
                        </div>
                      ) : (
                        <div className="w-[120px] md:w-[160px] h-32 md:h-40 bg-gray-100 rounded-xl flex items-center justify-center border border-gray-200">
                          <span className="font-oswald text-4xl md:text-6xl text-gray-300 font-bold uppercase">{item.product.producto.charAt(0)}</span>
                        </div>
                      )}
                    </td>
                    <td className="py-4 pl-2 pr-4">
                       <p className="text-[11px] md:text-lg font-bold text-black uppercase leading-tight">{item.product.producto}</p>
                       <p className="text-[9px] md:text-[11px] text-[#374151] mt-1.5 md:mt-2 uppercase tracking-tight font-bold">{item.product.marca} {item.product.sabores && item.product.sabores.length > 0 && <span className="text-gray-400 font-medium ml-1">• {item.product.sabores.join(', ')}</span>}</p>
                    </td>
                    <td className="py-4 text-center">
                       <div className="flex flex-col gap-1 items-center justify-center">
                          <p className="text-[9px] md:text-[11px] text-[#4B5563] font-bold uppercase tracking-tighter">Ant: <span className="text-[#007A99]">{item.stockAnterior || 0}</span></p>
                          <p className="text-[9px] md:text-[11px] text-[#4B5563] font-bold uppercase tracking-tighter">Dej: <span className="text-[#007A99]">{item.cantidadDejada || 0}</span></p>
                          <p className="text-[10px] md:text-sm text-black font-black uppercase tracking-tighter mt-1 border-t-2 border-gray-100 pt-1 min-w-[60px] md:w-24">Total: {(item.stockAnterior || 0) + (item.cantidadDejada || 0)}</p>
                       </div>
                    </td>
                    <td className="py-4 text-right font-black text-xs md:text-lg text-black whitespace-nowrap">
                       {item.precioPublico > 0 ? formatPrice(item.precioPublico) : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 pt-4 border-t border-gray-100 flex justify-center items-center">
             <p className="font-oswald text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">
                TOTAL DE ARTÍCULOS INGRESADOS: {totalArticles}
             </p>
          </div>
        </div>
      </div>
    );
  }

  if (isShopReportMode) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] text-white p-4 md:p-10 pb-32 md:pb-10 font-sans">
        {/* Toolbar superior */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="font-oswald text-3xl font-bold uppercase tracking-tighter">
              Modo <span className="text-[#00A3CC]">Comercio</span>
            </h1>
            <p className="text-gray-400 text-xs uppercase tracking-widest mt-1">Configuración de Reporte por Sucursal</p>
          </div>

          <div className="flex flex-col md:flex-row gap-3 md:gap-4 w-full md:w-auto items-center mt-4 md:mt-0 fixed bottom-6 left-1/2 -translate-x-1/2 md:static md:translate-x-0 z-[100] px-4 md:px-0 pointer-events-auto">
            <button 
              onClick={() => setIsShopReportMode(false)}
              className="bg-black/80 md:bg-white/5 hover:bg-black md:hover:bg-white/10 text-white px-6 py-4 md:py-3 rounded-full font-oswald uppercase tracking-widest text-[10px] md:text-xs flex items-center justify-center gap-2 transition-all cursor-pointer w-full md:w-auto backdrop-blur-md border border-white/10 md:border-none shadow-xl md:shadow-none"
            >
              <X className="w-4 h-4" /> Cancelar
            </button>
            
            {isValidReport && (
              <button 
                onClick={handleOpenShopPreview}
                className="bg-white hover:bg-gray-200 text-[#0F0F0F] px-8 py-4 md:py-3 rounded-full font-oswald uppercase tracking-widest text-[10px] md:text-xs flex items-center justify-center gap-2 transition-all font-bold cursor-pointer w-full md:w-auto shadow-xl md:shadow-none"
              >
                <Printer className="w-4 h-4" /> Vista Previa
              </button>
            )}

            {isValidReport ? (
              <PDFDownloadLink 
                document={<ShopReportPDF shopName={shopName} items={shopItems} currentDate={currentDate} />} 
                fileName={`Reporte_${shopName.replace(/ /g, '_')}_${currentDate.replace(/\//g, '-')}.pdf`}
                className="bg-[#00A3CC] hover:bg-[#00E5FF] text-[#0F0F0F] px-8 py-4 md:py-3 rounded-full font-oswald uppercase tracking-widest text-[10px] md:text-xs flex items-center justify-center gap-2 transition-all font-bold cursor-pointer shadow-2xl w-full md:w-auto"
              >
                {({ loading }) => (
                  <>
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                    {loading ? 'Generando...' : 'Descargar PDF'}
                  </>
                )}
              </PDFDownloadLink>
            ) : (
              <button 
                disabled
                className="bg-white/5 text-gray-500 px-8 py-4 md:py-3 rounded-full font-oswald uppercase tracking-widest text-[10px] md:text-xs flex items-center justify-center gap-2 cursor-not-allowed w-full md:w-auto"
              >
                <Download className="w-4 h-4" /> Validar Campos
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Panel Izquierdo: Selección de Productos */}
          <div className="lg:col-span-1 glass-panel rounded-[32px] overflow-hidden flex flex-col h-auto lg:h-[75vh]">
            <div className="p-4 md:p-6 border-b border-white/5 bg-black/20">
              <h2 className="font-oswald text-lg md:text-xl font-bold uppercase tracking-tighter">Añadir al Listado</h2>
            </div>
            <div className="p-3 md:p-4 overflow-y-auto flex-1 space-y-3 custom-scrollbar max-h-[400px] lg:max-h-none">
              {products.map(prod => (
                <div key={prod.id} className="bg-black/40 border border-white/5 rounded-2xl p-4 flex justify-between items-center hover:border-white/20 transition-all gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    {prod.image ? (
                        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-white border border-white/5 flex items-center justify-center">
                          {/* MODIFICA EL VALOR scale-[1.10] ABAJO PARA AJUSTAR EL RECORTE DE LA IMAGEN */}
                          <img src={prod.image} alt={prod.producto} className="w-full h-full object-cover scale-[1.10]" />
                        </div>
                    ) : (
                        <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 font-oswald shrink-0 border border-white/10 text-2xl font-bold uppercase">{prod.producto.charAt(0)}</div>
                    )}
                    <div className="min-w-0">
                      <p className="font-bold text-sm md:text-base leading-tight text-white line-clamp-2">{prod.producto}</p>
                      <p className="text-[10px] md:text-xs text-[#00A3CC] tracking-widest uppercase mt-1 truncate">{prod.marca} {prod.sabores && prod.sabores.length > 0 && `• ${prod.sabores.join(', ')}`}</p>
                    </div>
                  </div>
                  <button onClick={() => handleAddShopItem(prod)} className="p-3 bg-[#00A3CC]/20 hover:bg-[#00A3CC]/50 text-[#00E5FF] hover:text-white rounded-xl transition-all shrink-0">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Panel Derecho: Configuración del Comercio y Lista */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-panel rounded-[32px] p-6">
               <label className="block text-xs font-oswald uppercase tracking-widest text-[#00A3CC] mb-3">
                  Nombre del Comercio
               </label>
               <input
                  type="text"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  placeholder="Ej: Aconcagua Indumentaria"
                  className="w-full bg-black/50 border border-white/10 rounded-2xl py-4 px-6 text-white font-bold text-lg focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all placeholder:text-gray-600"
               />
            </div>

            <div className="glass-panel rounded-[32px] overflow-hidden flex flex-col h-auto lg:h-[calc(75vh-120px)] p-3 md:p-6">
               <div className="p-4 md:p-6 border-b border-white/5 bg-black/20 flex justify-between items-center shrink-0">
                 <h2 className="font-oswald text-lg md:text-xl font-bold uppercase tracking-tighter">Artículos Añadidos</h2>
                 <span className="text-[10px] md:text-xs bg-white/10 px-2 md:px-3 py-1 rounded-full font-bold">{shopItems.length} items</span>
               </div>
               
               <div className="p-3 md:p-6 space-y-4 overflow-y-auto custom-scrollbar flex-1 max-h-[500px] lg:max-h-none">
                 {shopItems.length === 0 ? (
                    <div className="text-center py-12 md:py-20 opacity-50 flex flex-col items-center justify-center">
                       <ListPlus className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 text-[#00A3CC]" />
                       <p className="font-oswald text-lg md:text-xl uppercase tracking-widest text-[#00A3CC]">Lista Vacía</p>
                       <p className="text-[11px] md:text-sm text-gray-400 mt-2 max-w-[250px] md:max-w-xs mx-auto">Agregue productos desde el panel izquierdo para confeccionar el reporte del comercio.</p>
                       {!hasValidName && (
                          <p className="text-[9px] md:text-xs text-red-400 uppercase tracking-widest mt-4 font-bold border border-red-500/20 bg-red-500/10 px-3 md:px-4 py-2 rounded-full">
                            Ingrese nombre de comercio
                          </p>
                       )}
                    </div>
                 ) : (
                    shopItems.map((item, index) => (
                      <div key={index} className="bg-black/40 border border-white/5 rounded-2xl md:rounded-3xl p-4 md:p-6 flex flex-col items-start gap-4 md:gap-6 hover:border-white/20 transition-all">
                         <div className="flex items-start md:items-center gap-4 md:gap-5 w-full">
                            {item.product.image ? (
                                <div className="w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-2xl overflow-hidden shrink-0 bg-white border border-white/10 flex items-center justify-center">
                                  {/* MODIFICA EL VALOR scale-[1.10] ABAJO PARA AJUSTAR EL RECORTE DE LA IMAGEN */}
                                  <img src={item.product.image} alt="prod" className="w-full h-full object-cover scale-[1.10]" />
                                </div>
                            ) : (
                                <div className="w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-white/5 flex items-center justify-center text-gray-400 text-[10px] md:text-sm shrink-0 font-oswald border border-white/10 text-center px-1">NO IMG</div>
                            )}
                            <div className="flex-1 min-w-0">
                               <p className="font-bold text-white leading-tight text-sm md:text-xl line-clamp-2">{item.product.producto}</p>
                               <p className="text-[9px] md:text-sm text-[#00A3CC] tracking-widest uppercase mt-1 md:mt-2 truncate">{item.product.marca} {item.product.sabores && item.product.sabores.length > 0 && `• ${item.product.sabores.join(', ')}`}</p>
                            </div>
                            <button onClick={() => handleRemoveShopItem(index)} className="md:hidden p-2 bg-red-500/10 text-red-500 rounded-lg">
                              <Trash2 className="w-4 h-4" />
                            </button>
                         </div>
                         
                         <div className="grid grid-cols-2 sm:flex sm:items-end gap-3 w-full">
                            <div className="flex-1 min-w-0">
                              <label className="block text-[8px] md:text-xs uppercase text-gray-500 mb-1 font-bold truncate">Stock Ant.</label>
                              <input type="number" min="0" value={item.stockAnterior === '' ? '' : item.stockAnterior} onChange={(e) => updateShopItem(index, 'stockAnterior', e.target.value)} placeholder="0" className="w-full bg-black/50 border border-white/10 rounded-lg md:rounded-xl py-2 px-2 text-center focus:outline-none focus:border-[#00E5FF] text-white text-xs md:text-base" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <label className="block text-[8px] md:text-xs uppercase text-[#00E5FF] mb-1 font-bold truncate">Dejado</label>
                              <input type="number" min="0" value={item.cantidadDejada === '' ? '' : item.cantidadDejada} onChange={(e) => updateShopItem(index, 'cantidadDejada', e.target.value)} placeholder="0" className="w-full bg-[#00A3CC]/20 border border-[#00A3CC]/50 rounded-lg md:rounded-xl py-2 px-2 text-center focus:outline-none focus:border-[#00E5FF] focus:bg-[#00A3CC]/30 text-white font-bold transition-all text-xs md:text-base" />
                            </div>
                            <div className="hidden sm:block w-16 md:w-24 shrink-0">
                              <label className="block text-[8px] md:text-xs uppercase text-gray-500 mb-1 font-bold text-center truncate">Total</label>
                              <div className="w-full bg-white/5 border border-white/5 rounded-lg md:rounded-xl py-2 px-2 text-center text-white font-bold text-xs md:text-base">{(item.stockAnterior || 0) + (item.cantidadDejada || 0)}</div>
                            </div>
                            <div className="col-span-2 sm:flex-1 sm:max-w-[200px] relative">
                              <label className="block text-[8px] md:text-xs uppercase text-gray-500 mb-1 font-bold truncate">P. Público Sug. ($)</label>
                              <div className="relative">
                                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-[10px] md:text-xs">$</span>
                                <input type="number" min="0" value={item.precioPublico === '' ? '' : item.precioPublico} onChange={(e) => updateShopItem(index, 'precioPublico', e.target.value)} placeholder="0" className="w-full bg-black/50 border border-white/10 rounded-lg md:rounded-xl py-2 pl-5 pr-2 text-left focus:outline-none focus:border-[#00E5FF] text-white text-xs md:text-base" />
                              </div>
                            </div>
                            <button onClick={() => handleRemoveShopItem(index)} className="hidden md:block p-3 bg-red-500/10 hover:bg-red-500/30 text-red-500 hover:text-red-400 rounded-xl transition-all shrink-0">
                              <Trash2 className="w-5 h-5" />
                            </button>
                         </div>
                      </div>
                    ))
                 )}
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }


  if (isReportMode) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] text-[#111827] p-4 md:p-10 font-sans">
        {/* Toolbar no imprimible */}
        <div className="no-print fixed top-6 right-6 flex gap-4 z-[100] pointer-events-auto">
          <button 
            onClick={() => setIsReportMode(false)}
            className="bg-black/80 hover:bg-black text-white px-6 py-3 rounded-full font-oswald uppercase tracking-widest text-xs flex items-center gap-2 transition-all backdrop-blur-md border border-white/10 cursor-pointer shadow-xl active:scale-95"
          >
            <X className="w-4 h-4" /> Volver al Tablero
          </button>
          
          <PDFDownloadLink 
            document={<ReportPDF products={products} currentDate={currentDate} totalProducts={totalProducts} showPushPrice={true} />} 
            fileName={`PushSport_Reporte_${currentDate.replace(/\//g, '-')}.pdf`}
            className="bg-[#00A3CC] hover:bg-[#00E5FF] text-[#0F0F0F] px-8 py-3 rounded-full font-oswald uppercase tracking-widest text-xs flex items-center gap-2 shadow-2xl transition-all font-bold cursor-pointer hover:scale-105 active:scale-95"
          >
            {({ blob, url, loading, error }) => (
              <>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                {loading ? 'Preparando...' : 'PDF Completo'}
              </>
            )}
          </PDFDownloadLink>

          <PDFDownloadLink 
            document={<ReportPDF products={products} currentDate={currentDate} totalProducts={totalProducts} showPushPrice={false} />} 
            fileName={`PushSport_Publico_${currentDate.replace(/\//g, '-')}.pdf`}
            className="bg-white/80 hover:bg-white text-[#0F0F0F] px-8 py-3 rounded-full font-oswald uppercase tracking-widest text-xs flex items-center gap-2 shadow-2xl transition-all font-bold cursor-pointer hover:scale-105 active:scale-95 border border-black/10"
          >
            {({ blob, url, loading, error }) => (
              <>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                {loading ? 'Preparando...' : 'PDF Solo Público'}
              </>
            )}
          </PDFDownloadLink>
        </div>

        {/* CONTENIDO DEL REPORTE PREMIUM */}
        <div id="report-content" className="max-w-4xl mx-auto bg-[#FFFFFF] shadow-2xl p-6 md:p-16 print:shadow-none print:p-0 rounded-3xl md:rounded-[40px] print:rounded-none relative overflow-hidden">
          
          {/* Header del Reporte */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-8 md:mb-16 border-b-2 md:border-b-4 border-black pb-6 md:pb-10 gap-6">
            <div>
              <h1 className="font-oswald text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-none">
                PUSH<span className="text-[#00A3CC]">SPORT</span>
              </h1>
              <p className="font-oswald text-[10px] md:text-sm tracking-[0.2em] md:tracking-[0.3em] text-[#00A3CC] uppercase mt-2 font-semibold">
                Intelligence & Performance Report
              </p>
            </div>
            <div className="text-left md:text-right">
              <p className="font-oswald text-[10px] uppercase tracking-widest text-gray-400 mb-1">Fecha Emisión</p>
              <p className="font-oswald text-lg md:text-xl font-bold">{currentDate}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-12">
            <div className="bg-gray-50 border-l-4 border-[#00A3CC] p-6 rounded-2xl">
              <p className="font-oswald text-[10px] uppercase tracking-widest text-gray-500 mb-2 font-bold">Total Referencias</p>
              <p className="font-oswald text-4xl font-bold text-black">{totalProducts}</p>
            </div>
            {/* <div className="bg-gray-50 border-l-4 border-[#00E5FF] p-6 rounded-2xl">
              <p className="font-oswald text-[10px] uppercase tracking-widest text-gray-500 mb-2 font-bold">Promedio de Precios</p>
              <p className="font-oswald text-4xl font-bold text-[#007A99]">{formatPrice(avgPushPrice)}</p>
            </div> */}
          </div>

          {/* Tabla de Productos */}
          <div className="overflow-x-auto -mx-6 md:mx-0">
            <table className="w-full border-collapse mb-10 min-w-[700px] md:min-w-full px-6 md:px-0">
              <thead>
                <tr className="border-b-2 border-[#000000]">
                  <th className="py-2.5 md:py-4 text-center font-oswald uppercase text-[9px] md:text-xs tracking-widest text-[#1F2937] w-[15%]">Imagen</th>
                  <th className="py-2.5 md:py-4 text-left font-oswald uppercase text-[9px] md:text-xs tracking-widest text-[#1F2937] w-[15%]">Marca</th>
                  <th className="py-2.5 md:py-4 text-left font-oswald uppercase text-[9px] md:text-xs tracking-widest text-[#1F2937] w-[30%]">Producto / Sabor</th>
                  <th className="py-2.5 md:py-4 text-right font-oswald uppercase text-[9px] md:text-xs tracking-widest text-[#1F2937] w-[20%]">Precio PushSport</th>
                  <th className="py-2.5 md:py-4 text-right font-oswald uppercase text-[9px] md:text-xs tracking-widest text-[#1F2937] w-[20%]">Sugerido</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6]">
                {products.map((product) => (
                  <tr key={`print-${product.id}`} className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="py-2 px-2 flex justify-center items-center h-24 md:h-32">
                      {product.image ? (
                        <div className="w-[80px] md:w-[100px] h-[80px] md:h-[100px] rounded-lg overflow-hidden shadow-sm border border-gray-100 bg-white flex items-center justify-center">
                          {/* MODIFICA EL VALOR scale-[1.10] ABAJO PARA AJUSTAR EL RECORTE DE LA IMAGEN */}
                          <img src={product.image} className="w-full h-full object-cover scale-[1.10]" alt="prod" />
                        </div>
                      ) : (
                        <div className="w-[80px] md:w-[100px] h-20 md:h-24 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                          <span className="font-oswald text-3xl md:text-4xl text-gray-300 font-bold uppercase">{product.producto.charAt(0)}</span>
                        </div>
                      )}
                    </td>
                    <td className="py-3 md:py-4 text-xs md:text-sm font-semibold text-[#4B5563] uppercase tracking-tight">{product.marca}</td>
                    <td className="py-3 md:py-4 pr-4">
                      <div className="font-bold text-sm md:text-base text-[#000000] leading-tight">{product.producto}</div>
                      {product.sabores && product.sabores.length > 0 && <div className="text-[10px] text-[#374151] mt-0.5 uppercase tracking-widest font-bold">{product.sabores.join(', ')}</div>}
                    </td>
                    <td className="py-3 md:py-4 text-right font-oswald font-bold text-base md:text-lg text-[#007A99] tracking-tighter">
                      {formatPrice(product.precioPush)}
                    </td>
                    <td className="py-3 md:py-4 text-right font-oswald font-bold text-base md:text-lg text-[#000000] tracking-tighter">
                      {product.precioPublico > 0 ? formatPrice(product.precioPublico) : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer del Reporte */}
          <div className="mt-20 pt-10 border-t border-gray-100 text-center">
            <p className="text-[10px] text-gray-300 font-medium uppercase tracking-[0.2em] mb-2">Este reporte contiene información confidencial de Push Sport</p>
{/*             <p className="font-oswald text-xs font-bold tracking-widest text-gray-500">WWW.PUSHSPORT.COM.AR</p>
 */}          </div>

          {/* Decoración PDF (Simplificada para evitar errores de captura) */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gray-50 rounded-full opacity-50 -mr-32 -mt-32"></div>
          <div className="absolute bottom-10 left-10 w-4 h-4 rounded-full bg-[#00A3CC]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white p-4 md:p-8 relative overflow-hidden">
      
      {/* Glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00A3CC] rounded-full blur-[150px] opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-[#00E5FF] rounded-full blur-[120px] opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER DE LA APP */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#00A3CC] to-[#00E5FF] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.3)]">
              <Activity className="text-[#0F0F0F] w-7 h-7" strokeWidth={3} />
            </div>
            <div>
              <h1 className="font-oswald text-4xl font-bold tracking-tighter uppercase text-white">
                PUSH<span className="text-[#00A3CC]">SPORT</span>
              </h1>
              <p className="font-oswald text-xs tracking-widest text-[#00A3CC] uppercase opacity-80">
                Panel de Control de Precios
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto mt-4 md:mt-0">
            <button 
              onClick={handleGenerateShopPDFMode}
              className="group flex flex-1 md:flex-none items-center justify-center gap-2 bg-[#1A1A1A] hover:bg-[#2A2A2A] border border-white/10 text-white font-oswald font-bold px-6 py-4 md:py-3 rounded-full transition-all duration-300 uppercase tracking-tight cursor-pointer active:scale-95 text-sm"
            >
              <Store className="w-4 h-4 text-[#00A3CC]" strokeWidth={2.5} />
              REPORTE COMERCIO
            </button>
            <button 
              onClick={handleGeneratePDF}
              className="group flex flex-1 md:flex-none items-center justify-center gap-2 bg-[#00A3CC] hover:bg-[#00E5FF] text-[#0F0F0F] font-oswald font-bold px-6 py-4 md:py-3 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(0,163,204,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] uppercase tracking-tight cursor-pointer active:scale-95 text-sm relative z-[100]"
            >
              <Printer className="w-5 h-5 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
              VISTA PREVIA GLOBAL
            </button>
          </div>
        </header>

        {/* MÉTRICAS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="glass-panel rounded-[32px] p-6 relative overflow-hidden group">
            <div className="absolute right-[-20px] top-[-20px] opacity-10 group-hover:opacity-20 transition-opacity">
              <Box className="w-32 h-32 text-[#00E5FF]" />
            </div>
            <p className="font-oswald text-xs tracking-widest text-gray-400 mb-2">TOTAL REFERENCIAS</p>
            <p className="font-oswald text-5xl font-bold text-white tracking-tighter">
              {totalProducts}
            </p>
            <div className="mt-4 h-1 w-1/3 bg-gradient-to-r from-[#00A3CC] to-transparent rounded-full"></div>
          </div>

         {/*  <div className="glass-panel rounded-[32px] p-6 relative overflow-hidden group">
            <div className="absolute right-[-20px] top-[-20px] opacity-10 group-hover:opacity-20 transition-opacity">
              <TrendingUp className="w-32 h-32 text-[#00A3CC]" />
            </div>
            <p className="font-oswald text-xs tracking-widest text-gray-400 mb-2">PROMEDIO PUSHSPORT</p>
            <p className="font-oswald text-4xl font-bold text-[#00E5FF] tracking-tighter mt-1">
              {formatPrice(avgPushPrice)}
            </p>
            <div className="mt-4 h-1 w-1/3 bg-gradient-to-r from-[#00E5FF] to-transparent rounded-full"></div>
          </div>

          <div className="glass-panel rounded-[32px] p-6 flex flex-col justify-center items-start border-l-4 border-l-[#00A3CC]">
            <p className="font-oswald text-sm text-gray-300 uppercase tracking-widest mb-1">Estado del Sistema</p>
            <div className="flex items-center gap-3">
              <span className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-[#00A3CC]"></span>
              </span>
              <span className="font-oswald text-xl text-white tracking-tight uppercase">Sincronizado</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">Última actualización: Hoy</p>
          </div> */}
        </div>

        {/* TABLA DE APLICACIÓN */}
        <div className="glass-panel rounded-[32px] overflow-hidden">
          <div className="p-6 border-b border-white/5 bg-black/20 flex justify-between items-center">
            <h2 className="font-oswald text-2xl font-bold uppercase tracking-tighter text-white">
              Catálogo <span className="text-[#00A3CC]">Activo</span>
            </h2>
          </div>
          <div className="md:hidden divide-y divide-white/5">
            {products.map((product) => (
              <div key={`mobile-${product.id}`} className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="min-w-0">
                    <p className="text-[10px] text-[#00A3CC] uppercase tracking-widest font-bold">{product.marca}</p>
                    <h3 className="text-white font-bold text-lg leading-tight mt-1">{product.producto}</h3>
                    {product.sabores && product.sabores.length > 0 && (
                      <p className="text-xs text-gray-400 mt-1">{product.sabores.join(', ')}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleEditClick(product)}
                    className="p-3 rounded-xl bg-white/5 text-gray-400 active:bg-[#00A3CC]/20 active:text-[#00E5FF] transition-all"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex gap-4 pt-2">
                  <div className="flex-1 bg-black/40 rounded-2xl p-3 border border-white/5 text-center">
                    <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">PushSport</p>
                    <p className="font-oswald font-bold text-[#00A3CC] text-xl">{formatPrice(product.precioPush)}</p>
                  </div>
                  <div className="flex-1 bg-black/40 rounded-2xl p-3 border border-white/5 text-center">
                    <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">Sugerido</p>
                    <p className="font-oswald font-bold text-white text-xl">{formatPrice(product.precioPublico)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/40 text-xs font-oswald tracking-widest text-[#00E5FF] uppercase border-b border-white/10">
                  <th className="px-6 py-5 font-semibold">Marca</th>
                  <th className="px-6 py-5 font-semibold">Producto</th>
                  <th className="px-6 py-5 font-semibold">Sabor</th>
                  <th className="px-6 py-5 font-semibold text-right">Precio PushSport</th>
                  <th className="px-6 py-5 font-semibold text-right">P. Público Sug.</th>
                  <th className="px-6 py-5 font-semibold text-center w-24">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4 text-sm text-gray-300 font-medium">{product.marca}</td>
                    <td className="px-6 py-4 text-sm text-white font-bold">{product.producto}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">{product.sabores && product.sabores.length > 0 ? product.sabores.join(', ') : '-'}</td>
                    <td className="px-6 py-4 text-sm text-right font-oswald font-bold text-[#00A3CC] tracking-tight text-lg">
                      {formatPrice(product.precioPush)}
                    </td>
                    <td className="px-6 py-4 text-sm text-right font-oswald font-bold text-gray-300 tracking-tight text-lg">
                      {formatPrice(product.precioPublico)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleEditClick(product)}
                        className="p-2 rounded-xl bg-white/5 hover:bg-[#00A3CC]/20 text-gray-400 hover:text-[#00E5FF] transition-all duration-200 inline-flex items-center justify-center group-hover:border-[#00A3CC]/50 border border-transparent"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>


      {/* MODAL DE EDICIÓN */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-panel rounded-[32px] w-full max-w-md border border-[#00A3CC]/30 shadow-[0_0_40px_rgba(0,163,204,0.15)] overflow-hidden">
            
            <div className="p-6 bg-gradient-to-r from-[#00A3CC]/20 to-transparent border-b border-white/10 flex justify-between items-center">
              <div>
                <h3 className="font-oswald text-2xl font-bold uppercase tracking-tighter text-white">
                  Editar <span className="text-[#00E5FF]">Valores</span>
                </h3>
                <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Actualización de Sistema</p>
              </div>
              <button 
                onClick={() => setEditingProduct(null)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">Producto Seleccionado</p>
                <p className="text-lg font-bold text-white leading-tight">{editingProduct.producto}</p>
                <p className="text-sm text-[#00A3CC]">{editingProduct.marca} {editingProduct.sabores && editingProduct.sabores.length > 0 && `• ${editingProduct.sabores.join(', ')}`}</p>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <label className="block text-xs font-oswald uppercase tracking-widest text-gray-400 mb-2">
                    Precio PushSport ($)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-oswald text-lg">$</span>
                    <input
                      type="number"
                      value={editingProduct.precioPush === 0 ? '' : editingProduct.precioPush}
                      placeholder="0"
                      onChange={(e) => {
                        const val = e.target.value === '' ? 0 : Number(e.target.value);
                        setEditingProduct({...editingProduct, precioPush: val});
                      }}
                      className="w-full bg-black/50 border border-white/10 rounded-2xl py-3 pl-8 pr-4 text-white font-oswald text-xl focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-xs font-oswald uppercase tracking-widest text-gray-400 mb-2">
                    Precio Sugerido Público ($)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-oswald text-lg">$</span>
                    <input
                      type="number"
                      value={editingProduct.precioPublico === 0 ? '' : editingProduct.precioPublico}
                      placeholder="0"
                      onChange={(e) => {
                        const val = e.target.value === '' ? 0 : Number(e.target.value);
                        setEditingProduct({...editingProduct, precioPublico: val});
                      }}
                      className="w-full bg-black/50 border border-white/10 rounded-2xl py-3 pl-8 pr-4 text-white font-oswald text-xl focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleSave}
                className="w-full mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-[#00A3CC] to-[#007A99] hover:from-[#00E5FF] hover:to-[#00A3CC] text-[#0F0F0F] font-oswald font-bold text-lg uppercase tracking-tight py-4 rounded-2xl transition-all duration-300 shadow-[0_4px_15px_rgba(0,163,204,0.4)]"
              >
                <Save className="w-5 h-5" />
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
