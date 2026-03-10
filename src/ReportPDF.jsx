import React from 'react';
import { 
  Page, 
  Text, 
  View, 
  Document, 
  StyleSheet, 
  Font
} from '@react-pdf/renderer';

// Usaremos los core fonts de react-pdf (Helvetica) para evitar errores de red y formato

const styles = StyleSheet.create({
  page: {
    padding: 0,
    backgroundColor: '#F9FAFB', // matched from bg-gray-50 / #F9FAFB
    fontFamily: 'Helvetica',
  },
  container: {
    margin: 40,
    padding: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 40, // matched from rounded-[40px]
    minHeight: '92%',
    position: 'relative',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    borderBottomWidth: 4, // matched from border-b-4
    borderBottomColor: '#000000',
    paddingBottom: 25,
    marginBottom: 40,
  },
  logoContainer: {
    flexDirection: 'column',
  },
  logoMain: {
    fontSize: 48, // matched from text-6xl (scale adjusted)
    fontFamily: 'Helvetica-Bold',
    fontWeight: 'black',
    letterSpacing: -2,
    textTransform: 'uppercase',
    lineHeight: 1, // matched from leading-none
  },
  logoSport: {
    color: '#00A3CC',
  },
  logoSub: {
    fontSize: 9,
    color: '#00A3CC',
    letterSpacing: 3, // matched from tracking-widest
    marginTop: 6,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  dateContainer: {
    textAlign: 'right',
  },
  dateLabel: {
    fontSize: 7,
    color: '#9CA3AF',
    textTransform: 'uppercase',
    marginBottom: 5,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  dateValue: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    fontWeight: 'bold',
    color: '#000000',
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 45,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#F9FAFB', // matched from bg-gray-50
    borderLeftWidth: 5, // matched from border-l-4
    borderLeftColor: '#00A3CC',
    padding: 24,
    borderRadius: 16,
  },
  metricLabel: {
    fontSize: 8,
    color: '#6B7280',
    textTransform: 'uppercase',
    marginBottom: 8,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  metricValue: {
    fontSize: 36,
    fontFamily: 'Helvetica-Bold',
    fontWeight: 'bold',
    color: '#000000',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 3, // matched from border-b-2 (emphasized for PDF)
    borderBottomColor: '#000000',
    paddingBottom: 12,
    marginBottom: 10,
  },
  colMarca: { width: '15%' },
  colProducto: { width: '55%' },
  colPrecio: { width: '15%', textAlign: 'right' },
  colSugerido: { width: '15%', textAlign: 'right' },
  headerText: {
    fontSize: 9,
    color: '#4B5563',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingVertical: 14,
    alignItems: 'center',
  },
  rowTextMarca: {
    fontSize: 9,
    color: '#9CA3AF',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  rowTextProducto: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    fontWeight: 'bold',
    color: '#000000',
  },
  rowTextSabor: {
    fontSize: 8,
    color: '#9CA3AF',
    textTransform: 'uppercase',
    marginTop: 4,
    letterSpacing: 0.5,
  },
  rowTextPrecio: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: '#007A99',
    fontWeight: 'bold',
  },
  rowTextSugerido: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: '#000000',
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 'auto',
    paddingTop: 40,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    textAlign: 'center',
  },
  footerText: {
    fontSize: 8,
    color: '#D1D5DB',
    fontWeight: 'medium',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 6,
  },
  footerSite: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#9CA3AF',
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  circleDecor: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#F9FAFB', // matched from bg-gray-50
    opacity: 0.8,
  },
  dotDecor: {
    position: 'absolute',
    bottom: 50,
    left: 50,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#00A3CC',
  }
});

const ReportPDF = ({ products, currentDate, totalProducts }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Document title={`Reporte PushSport - ${currentDate}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          {/* Decoración */}
          <View style={styles.circleDecor} />
          <View style={styles.dotDecor} />

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoMain}>
                PUSH<Text style={styles.logoSport}>SPORT</Text>
              </Text>
              <Text style={styles.logoSub}>Intelligence & Performance Report</Text>
            </View>
            <View style={styles.dateContainer}>
              <Text style={styles.dateLabel}>Fecha Emisión</Text>
              <Text style={styles.dateValue}>{currentDate}</Text>
            </View>
          </View>

          {/* Metrics */}
          <View style={styles.metricsGrid}>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Total Referencias</Text>
              <Text style={styles.metricValue}>{totalProducts}</Text>
            </View>
            <View style={[styles.metricCard, { borderLeftColor: '#00E5FF' }]}>
              <Text style={styles.metricLabel}>Estado del Sistema</Text>
              <Text style={styles.metricValue}>OK</Text>
            </View>
          </View>

          {/* Table Header */}
          <View style={styles.tableHeader}>
            <View style={styles.colMarca}><Text style={styles.headerText}>Marca</Text></View>
            <View style={styles.colProducto}><Text style={styles.headerText}>Producto / Sabor</Text></View>
            <View style={styles.colPrecio}><Text style={styles.headerText}>PushSport</Text></View>
            <View style={styles.colSugerido}><Text style={styles.headerText}>Sugerido</Text></View>
          </View>

          {/* Table Body */}
          {products.map((product) => (
            <View key={product.id} style={styles.tableRow} wrap={false}>
              <View style={styles.colMarca}>
                <Text style={styles.rowTextMarca}>{product.marca}</Text>
              </View>
              <View style={styles.colProducto}>
                <Text style={styles.rowTextProducto}>{product.producto}</Text>
                {product.sabor !== '-' && (
                  <Text style={styles.rowTextSabor}>{product.sabor}</Text>
                )}
              </View>
              <View style={styles.colPrecio}>
                <Text style={styles.rowTextPrecio}>{formatPrice(product.precioPush)}</Text>
              </View>
              <View style={styles.colSugerido}>
                <Text style={styles.rowTextSugerido}>
                  {product.precioPublico > 0 ? formatPrice(product.precioPublico) : '-'}
                </Text>
              </View>
            </View>
          ))}

          {/* Footer */}
          <View style={styles.footer} fixed>
            <Text style={styles.footerText}>Este reporte contiene información confidencial de Push Sport</Text>
            <Text style={styles.footerSite}>WWW.PUSHSPORT.COM.AR</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ReportPDF;
