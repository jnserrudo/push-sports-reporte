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
  container: { margin: 25, padding: 30, backgroundColor: '#FFFFFF', borderRadius: 30, minHeight: '94%', position: 'relative', overflow: 'hidden' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', borderBottomWidth: 2, borderBottomColor: '#000000', paddingBottom: 6, marginBottom: 6 },
  logoMain: { fontSize: 48, fontFamily: 'Helvetica-Bold', fontWeight: 'black', letterSpacing: -2, textTransform: 'uppercase', lineHeight: 1 },
  logoSport: { color: '#00A3CC' },
  logoSub: { fontSize: 9, color: '#00A3CC', letterSpacing: 3, marginTop: 6, textTransform: 'uppercase', fontWeight: 'bold' },
  titleContainer: { width: '65%' },
  shopTitle: { fontSize: 24, fontFamily: 'Helvetica-Bold', color: '#000000', textTransform: 'uppercase', marginBottom: 5, letterSpacing: -1 },
  dateContainer: { width: '30%', textAlign: 'right' },
  dateLabel: { fontSize: 7, color: '#9CA3AF', textTransform: 'uppercase', marginBottom: 5, fontWeight: 'bold', letterSpacing: 2 },
  dateValue: { fontSize: 16, fontFamily: 'Helvetica-Bold', fontWeight: 'bold', color: '#000000' },
  tableHeader: { flexDirection: 'row', borderBottomWidth: 2, borderBottomColor: '#000000', paddingBottom: 2, marginBottom: 2, alignItems: 'center' },
  headerText: { fontSize: 8, color: '#4B5563', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: 1 },
  colImg: { width: '55%', justifyContent: 'center', alignItems: 'center', paddingRight: 10 },
  colProducto: { width: '25%' },
  colDetalle: { width: '10%', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 1 },
  colPrecio: { width: '10%', textAlign: 'left' },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#F3F4F6', paddingVertical: 4, alignItems: 'center' },
  productImage: { width: 150, height: 150, borderRadius: 8, objectFit: 'contain' },
  imagePlaceholder: { width: 150, height: 150, borderRadius: 8, backgroundColor: '#E5E7EB' },
  rowTextProducto: { fontSize: 9, fontFamily: 'Helvetica-Bold', fontWeight: 'bold', color: '#000000' },
  rowTextMarca: { fontSize: 7, color: '#9CA3AF', textTransform: 'uppercase', marginTop: 2 },
  rowTextStockGroup: { fontSize: 6.5, color: '#4B5563', textTransform: 'uppercase', marginBottom: 1 },
  rowTextStockLabel: { fontFamily: 'Helvetica-Bold', color: '#9CA3AF' },
  rowTextStockValue: { fontFamily: 'Helvetica-Bold', color: '#00A3CC' },
  rowTextStockTotalValue: { fontFamily: 'Helvetica-Bold', color: '#000000' },
  rowTextPrecio: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#000000' },
  footer: { marginTop: 'auto', paddingTop: 15, borderTopWidth: 1, borderTopColor: '#F3F4F6', textAlign: 'center' },
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
            <View style={styles.titleContainer}>
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
            <View style={styles.colDetalle}><Text style={styles.headerText}>Detalle</Text></View>
            <View style={styles.colPrecio}><Text style={styles.headerText}>Público</Text></View>
          </View>

          {/* Table Body */}
          {items.map((item, index) => {
            const prod = item.product;
            const stockAnterior = Number(item.stockAnterior) || 0;
            const cantidadDejada = Number(item.cantidadDejada) || 0;
            const totalStock = stockAnterior + cantidadDejada;
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
                {/* Movimientos Agrupados */}
                <View style={styles.colDetalle}>
                    <Text style={styles.rowTextStockGroup}>
                      <Text style={styles.rowTextStockLabel}>Ant: </Text>
                      <Text style={styles.rowTextStockValue}>{stockAnterior}</Text>
                    </Text>
                    <Text style={styles.rowTextStockGroup}>
                      <Text style={styles.rowTextStockLabel}>Dejado: </Text>
                      <Text style={styles.rowTextStockValue}>{cantidadDejada}</Text>
                    </Text>
                    <Text style={[styles.rowTextStockGroup, { marginTop: 1, borderTopWidth: 1, borderTopColor: '#E5E7EB', paddingTop: 1 }]}>
                      <Text style={styles.rowTextStockLabel}>Total: </Text>
                      <Text style={styles.rowTextStockTotalValue}>{totalStock}</Text>
                    </Text>
                </View>
                <View style={styles.colPrecio}><Text style={styles.rowTextPrecio}>{Number(item.precioPublico) > 0 ? formatPrice(Number(item.precioPublico)) : '-'}</Text></View>
              </View>
            );
          })}

          <View style={styles.footer} fixed>
            <Text style={styles.footerText}>TOTAL DE ARTÍCULOS INGRESADOS: {totalArticles}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ShopReportPDF;
