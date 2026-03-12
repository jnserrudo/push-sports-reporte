import re
import json
import logging

logging.basicConfig(level=logging.INFO)

existing_js_path = 'src/App.jsx'
raw_products_path = 'tmp/raw_products.txt'

def parse_existing():
    existing = []
    with open(existing_js_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    start_idx = content.find('const INITIAL_PRODUCTS = [')
    end_idx = content.find('];', start_idx)
    
    array_str = content[start_idx:end_idx+2]
    # Simple regex to extract id, marca, producto, sabor, image
    matches = re.finditer(r"id:\s*(\d+).*?marca:\s*'([^']+)'.*?producto:\s*'([^']+)'.*?sabor:\s*'([^']+)'.*?precioPush:\s*(\d+).*?precioPublico:\s*(\d+)(?:.*?image:\s*'([^']+)')?", array_str)
    
    for m in matches:
        existing.append({
            'id': int(m.group(1)),
            'marca': m.group(2),
            'producto': m.group(3),
            'sabor': m.group(4),
            'precioPush': int(m.group(5)),
            'precioPublico': int(m.group(6)),
            'image': m.group(7) if m.group(7) else ''
        })
    return existing

def format_title_case(text):
    # "mayusculas la primera letra y el resto en minuscula, es pascal case creo eso"
    # User probably means PascalCase or Title Case. Let's do Title Case: "Creatina 300 Grs Star"
    words = text.split()
    return ' '.join([w.capitalize() for w in words])

def match_product(new_name, existing):
    # Try to find the best match based on keywords
    new_name_lower = new_name.lower()
    best_match = None
    best_score = 0
    
    for p in existing:
        score = 0
        p_name = p['producto'].lower()
        p_sabor = p['sabor'].lower()
        p_marca = p['marca'].lower()
        
        # Check basic words
        for word in new_name_lower.split():
            if len(word) > 2:
                if word in p_name: score += 1
                if word in p_sabor: score += 1
                if word in p_marca: score += 1
                
        if score > best_score:
            best_score = score
            best_match = p
            
    return best_match

def process():
    existing = parse_existing()
    with open(raw_products_path, 'r', encoding='utf-8') as f:
        lines = [l.strip() for l in f if l.strip()]
        
    new_products = []
    
    for i, line in enumerate(lines):
        line = line.replace('"', '') # remove accidental quotes
        formatted_name = format_title_case(line)
        
        # Guess marca
        marca = '-'
        if 'STAR' in line.upper(): marca = 'STAR NUTRITION'
        elif 'ONE FIT' in line.upper(): marca = 'ONE FIT'
        elif 'INTEGRA' in line.upper(): marca = 'INTEGRA'
        elif 'GRANGER' in line.upper(): marca = 'GRANGER FOODS'
        
        # Guess Sabor
        sabor = '-'
        flavors = ['FRUTILLA', 'CHOCOLATE', 'VAINILLA', 'BANANA', 'COOKIE', 'LIMON', 'FRUTOS ROJOS', 'NEUTRO', 'NARANJA', 'POMELO', 'ACAI', 'ACAÍ', 'BLUE RAZZ', 'UVA', 'SANDIA', 'QUESO']
        for f in flavors:
            if f in line.upper():
                sabor = format_title_case(f)
                break
                
        # Match with existing for image and prices
        match = match_product(line, existing)
        
        image = match['image'] if match and match.get('image') else ''
        precioPush = match['precioPush'] if match else 0
        precioPublico = match['precioPublico'] if match else 0
        
        # For completely new items, we can set default prices or 0
        
        new_products.append({
            'id': i + 1,
            'marca': marca,
            'producto': formatted_name,
            'sabor': sabor,
            'precioPush': precioPush,
            'precioPublico': precioPublico,
            'image': image
        })
        
    with open('new_products_js.js', 'w', encoding='utf-8') as f:
        f.write('const INITIAL_PRODUCTS = [\n')
        for p in new_products:
            img_val = f"'{p['image']}'" if p['image'] else "''"
            f.write(f"  {{ id: {p['id']}, marca: '{p['marca']}', producto: '{p['producto']}', sabor: '{p['sabor']}', precioPush: {p['precioPush']}, precioPublico: {p['precioPublico']}, image: {img_val} }},\n")
        f.write('];\n')
        
    print(f"Generated {len(new_products)} products.")

if __name__ == '__main__':
    process()
