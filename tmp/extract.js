const AdmZip = require('adm-zip');
const xml2js = require('xml2js');
const fs = require('fs');

async function extractText(filePath) {
    try {
        const zip = new AdmZip(filePath);
        const zipEntries = zip.getEntries();
        const documentXml = zipEntries.find(entry => entry.entryName === 'word/document.xml');
        
        if (!documentXml) {
            console.log('document.xml not found');
            return;
        }

        const xmlString = documentXml.getData().toString('utf8');
        const parser = new xml2js.Parser();
        const result = await parser.parseStringPromise(xmlString);
        
        let text = '';
        function extractNode(node) {
            if (node['w:t']) {
                node['w:t'].forEach(t => {
                    text += (typeof t === 'string' ? t : t._) + ' ';
                });
            }
            for (let key in node) {
                 if (Array.isArray(node[key])) {
                     node[key].forEach(child => extractNode(child));
                 } else if (typeof node[key] === 'object') {
                     extractNode(node[key]);
                 }
            }
        }
        
        if (result['w:document'] && result['w:document']['w:body']) {
            extractNode(result['w:document']['w:body'][0]);
        }
        
        console.log(text.replace(/\s+/g, ' ').trim());
    } catch (e) {
        console.error(e);
    }
}

extractText("c:\\jnserrudo\\nahuel_dev\\push_sport_reporte\\public\\PUSH SPORT CATALOGO CON FOTOS + DETALLE.docx");
