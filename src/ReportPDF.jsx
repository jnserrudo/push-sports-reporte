import React from 'react';
import { 
  Page, 
  Text, 
  View, 
  Document, 
  StyleSheet, 
  Font,
  Image
} from '@react-pdf/renderer';

// Usaremos los core fonts de react-pdf (Helvetica) para evitar errores de red y formato

const styles = StyleSheet.create({
  page: { padding: 0, backgroundColor: '#FFFFFF', fontFamily: 'Helvetica' },
  container: { margin: 25, padding: 30, backgroundColor: '#FFFFFF', borderRadius: 30, minHeight: '94%', position: 'relative', overflow: 'hidden' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', borderBottomWidth: 4, borderBottomColor: '#000000', paddingBottom: 8, marginBottom: 15 },
  logoContainer: { flexDirection: 'column', flex: 1 },
  logoMain: { fontSize: 44, fontFamily: 'Helvetica-Bold', fontWeight: 'black', letterSpacing: -2, textTransform: 'uppercase', lineHeight: 1, color: '#000000' },
  logoSport: { color: '#00A3CC' },
  logoSub: { fontSize: 9, color: '#00A3CC', letterSpacing: 2, marginTop: 6, textTransform: 'uppercase', fontWeight: 'bold' },
  dateContainer: { textAlign: 'right', paddingTop: 10 },
  dateLabel: { fontSize: 7, color: '#4B5563', textTransform: 'uppercase', marginBottom: 5, fontWeight: 'bold', letterSpacing: 2 },
  dateValue: { fontSize: 18, fontFamily: 'Helvetica-Bold', fontWeight: 'bold', color: '#000000' },
  metricsGrid: { flexDirection: 'row', gap: 20, marginBottom: 25 },
  metricCard: { flex: 1, backgroundColor: '#F9FAFB', borderLeftWidth: 5, borderLeftColor: '#00A3CC', padding: 24, borderRadius: 16 },
  metricLabel: { fontSize: 8, color: '#4B5563', textTransform: 'uppercase', marginBottom: 8, fontWeight: 'bold', letterSpacing: 1.5 },
  metricValue: { fontSize: 36, fontFamily: 'Helvetica-Bold', fontWeight: 'bold', color: '#000000' },
  tableHeader: { flexDirection: 'row', borderBottomWidth: 3, borderBottomColor: '#000000', paddingBottom: 4, marginBottom: 4, alignItems: 'center' },
  headerText: { fontSize: 8, color: '#1F2937', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: 1 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E5E7EB', paddingVertical: 6, alignItems: 'center' },
  imageWrapper: { width: 140, height: 140, borderRadius: 8, overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' },
  // MODIFICA EL PORCENTAJE ABAJO (Ej. '110%', '115%') PARA AJUSTAR EL RECORTE DEL BORDE
  productImage: { width: '125%', height: '125%', objectFit: 'cover' },
  imagePlaceholder: { width: 140, height: 140, borderRadius: 8, backgroundColor: '#F3F4F6', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  placeholderText: { fontSize: 56, fontFamily: 'Helvetica-Bold', color: '#9CA3AF', textTransform: 'uppercase' },
  rowTextMarca: { fontSize: 7, color: '#374151', textTransform: 'uppercase', fontWeight: 'bold' },
  rowTextProducto: { fontSize: 9, fontFamily: 'Helvetica-Bold', fontWeight: 'bold', color: '#000000' },
  rowTextSabor: { fontSize: 6, color: '#4B5563', textTransform: 'uppercase', marginTop: 4, letterSpacing: 0.5 },
  rowTextPrecioPush: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#005F7A', fontWeight: 'bold' },
  rowTextPrecioPublico: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: '#000000', fontWeight: 'bold' },
  footer: { marginTop: 'auto', paddingTop: 15, borderTopWidth: 1, borderTopColor: '#F3F4F6', textAlign: 'center' },
  footerText: { fontSize: 8, color: '#9CA3AF', fontWeight: 'medium', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 6 },
  footerSite: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: '#4B5563', fontWeight: 'bold', letterSpacing: 1.5 },
  circleDecor: { position: 'absolute', top: -50, right: -50, width: 250, height: 250, borderRadius: 125, backgroundColor: '#F9FAFB', opacity: 0.8 },
  dotDecor: { position: 'absolute', bottom: 50, left: 50, width: 12, height: 12, borderRadius: 6, backgroundColor: '#00A3CC' }
});

const ReportPDF = ({ products, currentDate, showPushPrice = true }) => {
  const totalProducts = products.length;
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price);
  };

  // Dynamic column widths based on whether Push price is shown
  const colImg = { width: showPushPrice ? '50%' : '55%', justifyContent: 'center', alignItems: 'center', paddingRight: 10 };
  const colCategoria = { width: showPushPrice ? '12%' : '14%', paddingRight: 15 };
  const colProducto = { width: showPushPrice ? '18%' : '21%', paddingRight: 10 };
  const colPrecioPush = { width: '10%', textAlign: 'right' };
  const colPrecioPublico = { width: '10%', textAlign: 'right' };

  return (
    <Document title={`Reporte PushSport - ${currentDate}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <View style={styles.circleDecor} />
          <View style={styles.dotDecor} />

          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoMain}>PUSH<Text style={styles.logoSport}>SPORT</Text></Text>
              <Text style={styles.logoSub}>{showPushPrice ? 'INTELLIGENCE & PERFORMANCE REPORT' : 'LISTADO DE PRECIOS MAYORISTAS'}</Text>
            </View>
            <View style={styles.dateContainer}>
              <Text style={styles.dateLabel}>Fecha Emisión</Text>
              <Text style={styles.dateValue}>{currentDate}</Text>
            </View>
          </View>

          <View style={styles.tableHeader}>
            <View style={colImg}><Text style={styles.headerText}>Img</Text></View>
            <View style={colCategoria}><Text style={styles.headerText}>Categoría</Text></View>
            <View style={colProducto}><Text style={styles.headerText}>Producto y Detalle</Text></View>
            {showPushPrice && <View style={colPrecioPush}><Text style={styles.headerText}>P. Push</Text></View>}
            <View style={colPrecioPublico}><Text style={styles.headerText}>P. Público</Text></View>
          </View>

          {products.map((prod) => {
            const getAbsoluteImageUrl = (url) => {
              if (!url) return null;
              if (url.startsWith('http')) return url;
              return `${window.location.origin}${url.startsWith('/') ? '' : '/'}${url}`;
            };

            return (
              <View key={prod.id} style={styles.tableRow} wrap={false}>
                  <View style={colImg}>
                    {prod.image ? (
                      <View style={styles.imageWrapper}>
                        <Image src={getAbsoluteImageUrl(prod.image)} style={styles.productImage} />
                      </View>
                    ) : (
                      <View style={styles.imagePlaceholder}>
                        <Text style={styles.placeholderText}>{prod.producto.charAt(0)}</Text>
                      </View>
                    )}
                  </View>
                  <View style={colCategoria}>
                    <Text style={styles.rowTextMarca}>{prod.marca}</Text>
                    {prod.sabores && prod.sabores.length > 0 && <Text style={styles.rowTextSabor}>Sabores: {prod.sabores.join(', ')}</Text>}
                  </View>
                <View style={colProducto}>
                  <Text style={styles.rowTextProducto}>{prod.producto}</Text>
                </View>
                {showPushPrice && (
                  <View style={colPrecioPush}>
                    <Text style={styles.rowTextPrecioPush}>{prod.precioPush > 0 ? formatPrice(prod.precioPush) : '-'}</Text>
                  </View>
                )}
                <View style={colPrecioPublico}>
                  <Text style={styles.rowTextPrecioPublico}>{prod.precioPublico > 0 ? formatPrice(prod.precioPublico) : '-'}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
};

export default ReportPDF;
