import zipfile
import xml.etree.ElementTree as ET
import sys

def get_docx_text(path):
    try:
        document = zipfile.ZipFile(path)
        xml_content = document.read('word/document.xml')
        document.close()
        tree = ET.XML(xml_content)
        
        NAMESPACE = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
        TEXT = NAMESPACE + 't'
        
        text = []
        for node in tree.iter(TEXT):
            if node.text:
                text.append(node.text)
        return '\n'.join(text)
    except Exception as e:
        return str(e)

if __name__ == '__main__':
    print(get_docx_text(r"c:\jnserrudo\nahuel_dev\push_sport_reporte\public\PUSH SPORT CATALOGO CON FOTOS + DETALLE.docx"))
