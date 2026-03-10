import React, { useState, useEffect } from 'react';
import { 
  Printer, 
  Edit2, 
  Save, 
  X, 
  TrendingUp, 
  Box, 
  Activity,
  Loader2,
  Download
} from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ReportPDF from './ReportPDF';

// --- DATOS INICIALES (ESTÁTICOS) ---
const INITIAL_PRODUCTS = [
  { id: 1, marca: 'INTEGRA', producto: 'BARRITAS PROTEICAS (CAJA 10u)', sabor: 'PASTA DE MANÍ Y ARÁND', precioPush: 20000, precioPublico: 0 },
  { id: 2, marca: 'INTEGRA', producto: 'BARRITAS PROTEICAS (CAJA 10u)', sabor: '-', precioPush: 20000, precioPublico: 0 },
  { id: 3, marca: 'INTEGRA', producto: 'BARRITAS PROTEICAS (CAJA 10u)', sabor: '-', precioPush: 20000, precioPublico: 0 },
  { id: 4, marca: 'STAR NUTRITION', producto: 'BCAA - 120 CAPS', sabor: '-', precioPush: 18000, precioPublico: 22000 },
  { id: 5, marca: 'STAR NUTRITION', producto: 'BCAA MTOR 270 GR', sabor: '-', precioPush: 26000, precioPublico: 29000 },
  { id: 6, marca: 'ONE FIT', producto: 'BCAA PUSH 300 GR', sabor: '-', precioPush: 17000, precioPublico: 22000 },
  { id: 7, marca: 'STAR NUTRITION', producto: 'CARNITINA - 60COMPRIMIDOS', sabor: '-', precioPush: 15000, precioPublico: 18000 },
  { id: 8, marca: 'STAR NUTRITION', producto: 'CITRATO DE MAGNESIO 500 GR', sabor: 'NEUTRO', precioPush: 27000, precioPublico: 32000 },
  { id: 9, marca: 'STAR NUTRITION', producto: 'STAR NUTRITION', sabor: 'FRUTOS ROJOS', precioPush: 27000, precioPublico: 32000 },
  { id: 10, marca: 'ONE FIT', producto: 'CITRATO DE MAGNESIO 150 GR', sabor: '-', precioPush: 12000, precioPublico: 17000 },
  { id: 11, marca: 'ONE FIT', producto: 'COLAGENO 360 GR', sabor: 'LIMÓN', precioPush: 21000, precioPublico: 26000 },
  { id: 12, marca: 'STAR NUTRITION', producto: 'COLAGENO 360 GR', sabor: 'FRUTOS ROJOS', precioPush: 21000, precioPublico: 26000 },
  { id: 13, marca: 'ONE FIT', producto: 'COLAGENO - 260 GR', sabor: 'NARANJA', precioPush: 14000, precioPublico: 18000 },
  { id: 14, marca: 'ONE FIT', producto: 'COLAGENO - 260 GR', sabor: 'FRUTILLA', precioPush: 14000, precioPublico: 18000 },
  { id: 15, marca: 'STAR NUTRITION', producto: 'CREATINA 300 GR', sabor: 'Neutro-Frutos Rojos', precioPush: 25000, precioPublico: 30000 },
  { id: 16, marca: 'ONE FIT', producto: 'CREATINA 200 GR', sabor: '-', precioPush: 16000, precioPublico: 21000 },
  { id: 17, marca: 'ONE FIT', producto: 'Creatina 500 grs ONE FIT POTE', sabor: '-', precioPush: 28000, precioPublico: 33000 },
  { id: 18, marca: 'GRANGER', producto: 'CUPCAKE PROTEICO', sabor: 'CHOCOLATE', precioPush: 12000, precioPublico: 14000 },
  { id: 19, marca: 'STAR NUTRITION', producto: 'MULTIVITAMÍNICO - 60COMPRIMIDOS', sabor: '-', precioPush: 19000, precioPublico: 24000 },
  { id: 20, marca: 'ONE FIT', producto: 'OMEGA 3 - 30 COMPRIMIDOS', sabor: '-', precioPush: 23000, precioPublico: 28000 },
  { id: 21, marca: 'STAR NUTRITION', producto: 'OMEGA 3 - 60 COMPRIMIDOS', sabor: '-', precioPush: 30000, precioPublico: 35000 },
  { id: 22, marca: 'GRANGER', producto: 'PANCAKES', sabor: 'CHOCOLATE', precioPush: 12000, precioPublico: 14000 },
  { id: 23, marca: 'GRANGER', producto: 'PANCAKES', sabor: 'VAINILLA', precioPush: 12000, precioPublico: 14000 },
  { id: 24, marca: 'GRANGER', producto: 'PANCAKES', sabor: 'QUESO', precioPush: 12000, precioPublico: 14000 },
  { id: 25, marca: 'GRANGER', producto: 'GALLETAS', sabor: 'CHIP CHOCÓ/VAINILLA', precioPush: 9000, precioPublico: 12000 },
  { id: 26, marca: 'STAR NUTRITION', producto: 'PRE-ENTRENO 3D RIPPES', sabor: 'LIMÓN', precioPush: 34000, precioPublico: 40000 },
  { id: 27, marca: 'STAR NUTRITION', producto: 'PRE-ENTRENO TNT DINAMITA', sabor: 'ACAÍ POWER', precioPush: 23000, precioPublico: 28000 },
  { id: 28, marca: 'STAR NUTRITION', producto: 'PRE-ENTRENO TNT DINAMITA', sabor: 'BLUE RAZZ', precioPush: 23000, precioPublico: 28000 },
  { id: 29, marca: 'ONE FIT', producto: 'PRE-ENTRENO - 30 SERV', sabor: 'LIMON', precioPush: 17000, precioPublico: 20000 },
  { id: 30, marca: 'ONE FIT', producto: 'PRE-ENTRENO - 30 SERV', sabor: 'UVA', precioPush: 17000, precioPublico: 20000 },
  { id: 31, marca: 'STAR NUTRITION', producto: 'PROTEINA', sabor: 'VAINILLA', precioPush: 42000, precioPublico: 47000 },
  { id: 32, marca: 'STAR NUTRITION', producto: 'PROTEINA', sabor: 'CHOCOLATE', precioPush: 42000, precioPublico: 47000 },
  { id: 33, marca: 'STAR NUTRITION', producto: 'PROTEINA', sabor: 'FRUTILLA', precioPush: 42000, precioPublico: 47000 },
  { id: 34, marca: 'STAR NUTRITION', producto: 'PROTEINA', sabor: 'COOCKIES', precioPush: 42000, precioPublico: 47000 },
  { id: 35, marca: 'STAR NUTRITION', producto: 'PROTEINA JUST PLANT', sabor: 'NEUTRO', precioPush: 37000, precioPublico: 42000 },
  { id: 36, marca: 'ONE FIT', producto: 'PROTEINA WHEY PROTEIN', sabor: 'VAINILLA', precioPush: 26000, precioPublico: 31000 },
  { id: 37, marca: 'ONE FIT', producto: 'PROTEINA WHEY PROTEIN', sabor: 'CHOCOLATE', precioPush: 26000, precioPublico: 31000 },
  { id: 38, marca: 'ONE FIT', producto: 'QUEMADOR', sabor: '-', precioPush: 14000, precioPublico: 19000 },
  { id: 39, marca: 'STAR NUTRITION', producto: 'RESVERATROL', sabor: '-', precioPush: 18000, precioPublico: 22000 },
  { id: 40, marca: 'ONE FIT', producto: 'SHAKER', sabor: 'GRIS', precioPush: 12000, precioPublico: 17000 },
  { id: 41, marca: 'ONE FIT', producto: 'SHAKER', sabor: 'ROSA', precioPush: 12000, precioPublico: 17000 },
  { id: 42, marca: 'STAR NUTRITION', producto: 'VITAMINA C STAR NUTRITION', sabor: '-', precioPush: 8000, precioPublico: 12000 },
];

export default function App() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [editingProduct, setEditingProduct] = useState(null);
  const [currentDate, setCurrentDate] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isReportMode, setIsReportMode] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(null);

  useEffect(() => {
    // Configurar fecha
    const date = new Date();
    setCurrentDate(date.toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' }));
    
    // Inyectar librería html2pdf dinámicamente
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    script.async = true;
    document.body.appendChild(script);

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

  const totalProducts = products.length;
  const avgPushPrice = products.reduce((acc, curr) => acc + curr.precioPush, 0) / totalProducts;

  if (isReportMode) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] text-[#111827] p-4 md:p-10 font-sans">
        {/* Toolbar no imprimible */}
        <div className="no-print fixed top-6 right-6 flex gap-4 z-50">
          <button 
            onClick={() => setIsReportMode(false)}
            className="bg-black/80 hover:bg-black text-white px-6 py-3 rounded-full font-oswald uppercase tracking-widest text-xs flex items-center gap-2 transition-all backdrop-blur-md border border-white/10"
          >
            <X className="w-4 h-4" /> Volver al Tablero
          </button>
          
          <PDFDownloadLink 
            document={<ReportPDF products={products} currentDate={currentDate} totalProducts={totalProducts} />} 
            fileName={`PushSport_Reporte_${currentDate.replace(/\//g, '-')}.pdf`}
            className="bg-[#00A3CC] hover:bg-[#00E5FF] text-[#0F0F0F] px-8 py-3 rounded-full font-oswald uppercase tracking-widest text-xs flex items-center gap-2 shadow-lg transition-all font-bold"
          >
            {({ blob, url, loading, error }) => (
              <>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                {loading ? 'Preparando archivo...' : 'Descargar PDF'}
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
            <table className="w-full border-collapse mb-10 min-w-[600px] md:min-w-full px-6 md:px-0">
              <thead>
                <tr className="border-b-2 border-[#000000]">
                  <th className="py-4 text-left font-oswald uppercase text-[10px] md:text-xs tracking-widest text-[#4B5563]">Marca</th>
                  <th className="py-4 text-left font-oswald uppercase text-[10px] md:text-xs tracking-widest text-[#4B5563]">Producto / Sabor</th>
                  <th className="py-4 text-right font-oswald uppercase text-[10px] md:text-xs tracking-widest text-[#4B5563]">Precio PushSport</th>
                  <th className="py-4 text-right font-oswald uppercase text-[10px] md:text-xs tracking-widest text-[#4B5563]">Sugerido</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6]">
                {products.map((product) => (
                  <tr key={`print-${product.id}`} className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="py-4 md:py-5 text-xs md:text-sm font-semibold text-[#9CA3AF] uppercase tracking-tight">{product.marca}</td>
                    <td className="py-4 md:py-5">
                      <div className="font-bold text-base md:text-lg text-[#000000] leading-tight">{product.producto}</div>
                      {product.sabor !== '-' && <div className="text-[10px] text-[#9CA3AF] mt-0.5 uppercase tracking-widest">{product.sabor}</div>}
                    </td>
                    <td className="py-4 md:py-5 text-right font-oswald font-bold text-lg md:text-xl text-[#007A99] tracking-tighter">
                      {formatPrice(product.precioPush)}
                    </td>
                    <td className="py-4 md:py-5 text-right font-oswald font-bold text-lg md:text-xl text-[#000000] tracking-tighter">
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
            <p className="font-oswald text-xs font-bold tracking-widest text-gray-500">WWW.PUSHSPORT.COM.AR</p>
          </div>

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
          
          <button 
            onClick={handleGeneratePDF}
            className="group flex items-center justify-center gap-2 bg-[#00A3CC] hover:bg-[#00E5FF] text-[#0F0F0F] font-oswald font-bold px-6 py-4 md:py-3 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(0,163,204,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] uppercase tracking-tight w-full md:w-auto"
          >
            <Printer className="w-5 h-5 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
            VER VISTA PREVIA
          </button>
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
          <div className="overflow-x-auto">
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
                    <td className="px-6 py-4 text-sm text-gray-400">{product.sabor}</td>
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
                <p className="text-sm text-[#00A3CC]">{editingProduct.marca} {editingProduct.sabor !== '-' && `• ${editingProduct.sabor}`}</p>
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
