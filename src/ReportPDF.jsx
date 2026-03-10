import React from 'react';
import { 
  Page, 
  Text, 
  View, 
  Document, 
  StyleSheet, 
  Font
} from '@react-pdf/renderer';

// Registrar fuentes (opcional, pero mejora el diseño)
Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v36/TK3iWkUHHAIjg752FD8G.ttf'
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
    paddingBottom: 20,
    marginBottom: 30,
  },
  logoContainer: {
    flexDirection: 'column',
  },
  logoMain: {
    fontSize: 32,
    fontFamily: 'Oswald',
    fontWeight: 'bold',
    letterSpacing: -1,
  },
  logoPush: {
    color: '#000000',
  },
  logoSport: {
    color: '#00A3CC',
  },
  logoSub: {
    fontSize: 8,
    color: '#00A3CC',
    letterSpacing: 2,
    marginTop: 4,
    textTransform: 'uppercase',
  },
  dateContainer: {
    textAlign: 'right',
  },
  dateLabel: {
    fontSize: 8,
    color: '#9CA3AF',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  dateValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 30,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderLeftWidth: 3,
    borderLeftColor: '#00A3CC',
    padding: 15,
    borderRadius: 8,
  },
  metricCardAlternate: {
    borderLeftColor: '#00E5FF',
  },
  metricLabel: {
    fontSize: 7,
    color: '#6B7280',
    textTransform: 'uppercase',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  table: {
    width: '100%',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 5,
    marginBottom: 10,
  },
  colMarca: { width: '20%' },
  colProducto: { width: '50%' },
  colPrecio: { width: '15%', textAlign: 'right' },
  colSugerido: { width: '15%', textAlign: 'right' },
  headerText: {
    fontSize: 8,
    color: '#4B5563',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingVertical: 8,
    alignItems: 'center',
  },
  rowTextMarca: {
    fontSize: 8,
    color: '#9CA3AF',
    textTransform: 'uppercase',
  },
  rowTextProducto: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000000',
  },
  rowTextSabor: {
    fontSize: 7,
    color: '#9CA3AF',
    textTransform: 'uppercase',
    marginTop: 2,
  },
  rowTextPrecio: {
    fontSize: 11,
    fontFamily: 'Oswald',
    color: '#007A99',
    fontWeight: 'bold',
  },
  rowTextSugerido: {
    fontSize: 11,
    fontFamily: 'Oswald',
    color: '#000000',
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 40,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    textAlign: 'center',
  },
  footerText: {
    fontSize: 8,
    color: '#9CA3AF',
    fontWeight: 'bold',
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
          <View style={[styles.metricCard, styles.metricCardAlternate]}>
            <Text style={styles.metricLabel}>Última Actualización</Text>
            <Text style={styles.metricValue}>{currentDate}</Text>
          </View>
        </View>

        {/* Table Header */}
        <View style={styles.tableHeader}>
          <View style={styles.colMarca}><Text style={styles.headerText}>Marca</Text></View>
          <View style={styles.colProducto}><Text style={styles.headerText}>Producto / Sabor</Text></View>
          <View style={styles.colPrecio}><Text style={styles.headerText}>Precio Push</Text></View>
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
          <Text style={styles.footerText}>WWW.PUSHSPORT.COM.AR</Text>
        </View>
      </Page>
    </Document>
  );
};

export default ReportPDF;
