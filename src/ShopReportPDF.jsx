import React from 'react';
import { 
  Page, 
  Text, 
  View, 
  Document, 
  StyleSheet, 
  Image
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 0, backgroundColor: '#F9FAFB', fontFamily: 'Helvetica' },
  container: { margin: 40, padding: 40, backgroundColor: '#FFFFFF', borderRadius: 40, minHeight: '92%', position: 'relative', overflow: 'hidden' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', borderBottomWidth: 4, borderBottomColor: '#000000', paddingBottom: 25, marginBottom: 40 },
  logoMain: { fontSize: 48, fontFamily: 'Helvetica-Bold', fontWeight: 'black', letterSpacing: -2, textTransform: 'uppercase', lineHeight: 1 },
  logoSport: { color: '#00A3CC' },
  logoSub: { fontSize: 9, color: '#00A3CC', letterSpacing: 3, marginTop: 6, textTransform: 'uppercase', fontWeight: 'bold' },
  shopTitle: { fontSize: 24, fontFamily: 'Helvetica-Bold', color: '#000000', textTransform: 'uppercase', marginBottom: 5, letterSpacing: -1 },
  dateContainer: { textAlign: 'right' },
  dateLabel: { fontSize: 7, color: '#9CA3AF', textTransform: 'uppercase', marginBottom: 5, fontWeight: 'bold', letterSpacing: 2 },
  dateValue: { fontSize: 18, fontFamily: 'Helvetica-Bold', fontWeight: 'bold', color: '#000000' },
  tableHeader: { flexDirection: 'row', borderBottomWidth: 3, borderBottomColor: '#000000', paddingBottom: 12, marginBottom: 10 },
  colImg: { width: '14%', justifyContent: 'center', alignItems: 'center' },
  colProducto: { width: '36%' },
  colStock: { width: '10%', textAlign: 'center' },
  colPrecio: { width: '15%', textAlign: 'right' },
  headerText: { fontSize: 8, color: '#4B5563', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: 1 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#F3F4F6', paddingVertical: 14, alignItems: 'center' },
  productImage: { width: 52, height: 52, borderRadius: 6, objectFit: 'cover' },
  imagePlaceholder: { width: 52, height: 52, borderRadius: 6, backgroundColor: '#E5E7EB' },
  rowTextProducto: { fontSize: 11, fontFamily: 'Helvetica-Bold', fontWeight: 'bold', color: '#000000' },
  rowTextMarca: { fontSize: 8, color: '#9CA3AF', textTransform: 'uppercase', marginTop: 3 },
  rowTextStock: { fontSize: 13, fontFamily: 'Helvetica-Bold', fontWeight: 'bold', color: '#00A3CC' },
  rowTextPrecio: { fontSize: 12, fontFamily: 'Helvetica-Bold', color: '#000000' },
  footer: { marginTop: 'auto', paddingTop: 40, borderTopWidth: 1, borderTopColor: '#F3F4F6', textAlign: 'center' },
  footerText: { fontSize: 8, color: '#D1D5DB', fontWeight: 'medium', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 6 },
  footerSite: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: '#9CA3AF', fontWeight: 'bold', letterSpacing: 1.5 },
  circleDecor: { position: 'absolute', top: -50, right: -50, width: 250, height: 250, borderRadius: 125, backgroundColor: '#F9FAFB', opacity: 0.8 },
  dotDecor: { position: 'absolute', bottom: 50, left: 50, width: 12, height: 12, borderRadius: 6, backgroundColor: '#00A3CC' }
});

const formatPrice = (price) => {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price);
};

const ShopReportPDF = ({ shopName, items, currentDate }) => {
  const totalArticles = items.reduce((acc, curr) => acc + (Number(curr.cantidadDejada) || 0), 0);

  return (
    <Document title={`Reporte_${shopName}_${currentDate}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <View style={styles.circleDecor} />
          <View style={styles.dotDecor} />

          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.shopTitle}>{shopName || 'COMERCIO NO ESPECIFICADO'}</Text>
              <Text style={styles.logoSub}>REPORTE DE ARTÍCULOS Y PRECIOS</Text>
            </View>
            <View style={styles.dateContainer}>
              <Text style={styles.dateLabel}>Fecha Emisión</Text>
              <Text style={styles.dateValue}>{currentDate}</Text>
            </View>
          </View>

          {/* Table Header */}
          <View style={styles.tableHeader}>
            <View style={styles.colImg}><Text style={styles.headerText}>Img</Text></View>
            <View style={styles.colProducto}><Text style={styles.headerText}>Producto</Text></View>
            <View style={styles.colStock}><Text style={styles.headerText}>Anterior</Text></View>
            <View style={styles.colStock}><Text style={styles.headerText}>Dejado</Text></View>
            <View style={styles.colStock}><Text style={styles.headerText}>Total</Text></View>
            <View style={styles.colPrecio}><Text style={styles.headerText}>Precio Push</Text></View>
            <View style={styles.colPrecio}><Text style={styles.headerText}>Público</Text></View>
          </View>

          {/* Table Body */}
          {items.map((item, index) => {
            const prod = item.product;
            const totalStock = (Number(item.stockAnterior) || 0) + (Number(item.cantidadDejada) || 0);
            return (
              <View key={index} style={styles.tableRow} wrap={false}>
                <View style={styles.colImg}>
                  {prod.image ? (
                    <Image src={prod.image} style={styles.productImage} />
                  ) : (
                    <View style={styles.imagePlaceholder} />
                  )}
                </View>
                <View style={styles.colProducto}>
                  <Text style={styles.rowTextProducto}>{prod.producto}</Text>
                  <Text style={styles.rowTextMarca}>{prod.marca} {prod.sabor !== '-' ? `• ${prod.sabor}` : ''}</Text>
                </View>
                <View style={styles.colStock}><Text style={styles.rowTextStock}>{Number(item.stockAnterior) || 0}</Text></View>
                <View style={styles.colStock}><Text style={styles.rowTextStock}>{Number(item.cantidadDejada) || 0}</Text></View>
                <View style={styles.colStock}><Text style={[styles.rowTextStock, { color: '#000' }]}>{totalStock}</Text></View>
                <View style={styles.colPrecio}><Text style={[styles.rowTextPrecio, { color: '#00A3CC' }]}>{formatPrice(Number(item.precioPush) || 0)}</Text></View>
                <View style={styles.colPrecio}><Text style={styles.rowTextPrecio}>{Number(item.precioPublico) > 0 ? formatPrice(Number(item.precioPublico)) : '-'}</Text></View>
              </View>
            );
          })}

          {/* Footer */}
          <View style={styles.footer} fixed>
            <Text style={styles.footerText}>TOTAL DE ARTÍCULOS INGRESADOS: {totalArticles}</Text>
            <Text style={styles.footerSite}>WWW.PUSHSPORT.COM.AR</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ShopReportPDF;
