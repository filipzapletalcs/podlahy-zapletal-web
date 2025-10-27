#!/bin/bash

# Script pro hromadnou aktualizaci všech obrázků na CDN

echo "🔄 Aktualizuji všechny obrázky na CDN..."

# Najdi všechny TSX soubory s lokálními obrázky
FILES=$(grep -r "src=\"/Fotky_logo" src/ --include="*.tsx" | cut -d: -f1 | sort -u)

echo "📁 Nalezené soubory k aktualizaci:"
echo "$FILES"
echo ""

for file in $FILES; do
    echo "🔧 Aktualizuji: $file"
    
    # Přidej import getImageUrl, pokud neexistuje
    if ! grep -q "getImageUrl" "$file"; then
        # Najdi řádek s posledním importem
        last_import_line=$(grep -n "^import" "$file" | tail -1 | cut -d: -f1)
        if [ ! -z "$last_import_line" ]; then
            sed -i '' "${last_import_line}a\\
import { getImageUrl } from '@/config/cdn';
" "$file"
        fi
    fi
    
    # Aktualizuj všechny src="/Fotky_logo/ na getImageUrl("Fotky_logo/
    sed -i '' 's|src="/Fotky_logo/\([^"]*\)"|src={getImageUrl("Fotky_logo/\1")}|g' "$file"
    
    # Aktualizuj také slide obrázky
    sed -i '' 's|src="/slide_\([^"]*\)"|src={getImageUrl("slide_\1")}|g' "$file"
    sed -i '' 's|src="/SLIDE_\([^"]*\)"|src={getImageUrl("SLIDE_\1")}|g' "$file"
    
    echo "   ✅ Dokončeno"
done

echo ""
echo "🚀 Všechny obrázky aktualizovány na CDN!"
echo "📦 Nyní spusťte rebuild a redeploy:"
echo "   npm run build"
echo "   gcloud run deploy podlahy-zapletal --source . --region=europe-west1 --allow-unauthenticated"