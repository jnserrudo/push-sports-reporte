import json
import re

with open(r'c:\jnserrudo\nahuel_dev\push_sport_reporte\src\App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the INITIAL_PRODUCTS list
match = re.search(r'const INITIAL_PRODUCTS = (\[.*?\]);', content, re.DOTALL)
if not match:
    print("Could not find INITIAL_PRODUCTS")
    exit(1)

list_str = match.group(1)
# Clean up the JS object to make it valid JSON so we can parse it
# Find keys and add quotes
list_str = re.sub(r'(\w+):', r'"\1":', list_str)
# Remove trailing commas
list_str = re.sub(r',\s*\}', '}', list_str)
list_str = re.sub(r',\s*\]', ']', list_str)
# Parse using json
import ast
try:
    # Use ast.literal_eval because it's slightly more lenient than json for JS-like objects (e.g. single quotes)
    # Actually ast.literal_eval doesn't like unquoted strings or true/false, but the values seem to be strings/ints.
    # Let's clean up JS single quotes to double quotes for json, or just use a custom parser.
    list_str = list_str.replace("'", '"')
    products = json.loads(list_str)
except Exception as e:
    print("JSON decode error, trying regex parsing.")
    products = []
    blocks = re.findall(r'\{(.*?)\}', match.group(1), re.DOTALL)
    for block in blocks:
        prod = {}
        for prop in re.findall(r'(\w+):\s*(.*?(?:,|(?=\s*$)))', block):
            k, v = prop[0], prop[1].strip().strip(',')
            if v.startswith("'") or v.startswith('"'):
                prod[k] = v[1:-1]
            elif v.isdigit():
                prod[k] = int(v)
            else:
                prod[k] = v
        products.append(prod)

grouped = {}
next_id = 1

def get_base_name(name):
    name = name.lower()
    # Normalize some names to group them correctly
    if name.startswith('creatina 300 grs star'):
        return 'Creatina 300 Grs Star'
    if name.startswith('creatina 500 grs one fit') or name.startswith('creatina 200 grs one fit'):
        return None # DON'T GROUP
    if name.startswith('proteina star 1 kg ( con colageno)') or name.startswith('proteina star 1 kg (con colageno)'):
        return 'Proteina Star 1 Kg (Con Colageno)'
    if name.startswith('proteina star 1 kg'):
        return 'Proteina Star 1 Kg'
    if name.startswith('proteina one fit'):
        return 'Proteina One Fit'
    if name.startswith('bcca star limon') or name.startswith('bcca star frutos rojos'):
        return None # Different prices
    if name.startswith('pre entreno star v8'):
        return 'Pre Entreno Star V8'
    if name.startswith('pre entreno tnt'):
        return 'Pre Entreno Tnt'
    if name.startswith('pre entreno one fit'):
        return 'Pre Entreno One Fit'
    if name.startswith('panqueques chocolate granger') or name.startswith('panqueques vainilla granger'):
        return 'Panqueques Granger'
    if name.startswith('colageno star'):
        return 'Colageno Star'
    if name.startswith('colageno one fit 240 gr'):
        return 'Colageno One Fit 240 Gr'
    if name.startswith('citrato de magnesio star neutro') or name.startswith('citrato de magnesio star frutos rojos'):
        return 'Citrato De Magnesio Star'
    if name.startswith('hydro max'):
        return 'Hydro Max'
    if name.startswith('caja integra'):
        # They have the same price, group them
        return 'Caja Integra'
    
    return None

for prod in products:
    base = get_base_name(prod['producto'])
    sabor = prod.get('sabor', '-')
    
    if not base:
        base = prod['producto'] # Use its own name if no group
    
    # We group by base name, brand, and prices. If price is different, it becomes a new group!
    key = (base, prod['marca'], int(prod['precioPush']), int(prod['precioPublico']))
    
    if key not in grouped:
        grouped[key] = {
            'marca': prod['marca'],
            'producto': base,
            'sabores': [],
            'precioPush': int(prod['precioPush']),
            'precioPublico': int(prod['precioPublico']),
            'image': prod['image']
        }
    
    if sabor != '-' and sabor not in grouped[key]['sabores']:
        grouped[key]['sabores'].append(sabor)
        
final_products = []
for k, v in grouped.items():
    if not v['sabores']:
        v['sabores'] = []
    v['id'] = next_id
    next_id += 1
    final_products.append(v)

# Generate JS code
js_lines = ["const INITIAL_PRODUCTS = ["]
for p in final_products:
    sabores_str = ", ".join(f"'{s}'" for s in p['sabores'])
    sabores_arr = f"[{sabores_str}]"
    js_lines.append(f"  {{ id: {p['id']}, marca: '{p['marca']}', producto: '{p['producto']}', sabores: {sabores_arr}, precioPush: {p['precioPush']}, precioPublico: {p['precioPublico']}, image: '{p['image']}' }},")
js_lines.append("];")

with open(r'c:\jnserrudo\nahuel_dev\push_sport_reporte\tmp\grouped_products.js', 'w', encoding='utf-8') as f:
    f.write("\n".join(js_lines))
    
print("Grouped products written to tmp/grouped_products.js")
