#!/bin/bash

# Script pro nahrání všech obrázků do Google Cloud Storage
# Ujistěte se, že máte nainstalované a nakonfigurované gcloud CLI

BUCKET_NAME="podlahy-zapletal-images"
PUBLIC_DIR="public"

echo "🚀 Nahrávám obrázky do Google Cloud Storage..."

# Kontrola jestli existuje bucket
if ! gsutil ls gs://$BUCKET_NAME &> /dev/null; then
    echo "❌ Bucket gs://$BUCKET_NAME neexistuje. Spusťte nejdřív setup-gcs-cdn.sh"
    exit 1
fi

# Nahraj všechny obrázky z public složky
echo "📸 Synchronizuji obrázky..."
gsutil -m rsync -r -d $PUBLIC_DIR gs://$BUCKET_NAME/

# Nastav správné cache headers pro obrázky
echo "⚡ Nastavuji cache headers..."
gsutil -m setmeta -h "Cache-Control:public, max-age=31536000" \
       -h "Content-Type:image/jpeg" \
       gs://$BUCKET_NAME/**/*.jpg

gsutil -m setmeta -h "Cache-Control:public, max-age=31536000" \
       -h "Content-Type:image/png" \
       gs://$BUCKET_NAME/**/*.png

gsutil -m setmeta -h "Cache-Control:public, max-age=31536000" \
       -h "Content-Type:image/webp" \
       gs://$BUCKET_NAME/**/*.webp

echo "✅ Hotovo! Obrázky jsou dostupné na:"
echo "   🌐 https://storage.googleapis.com/$BUCKET_NAME/"

# Vypsat statistiky
echo ""
echo "📊 Statistiky:"
gsutil du -sh gs://$BUCKET_NAME/
echo "📁 Celkový počet souborů:"
gsutil ls -r gs://$BUCKET_NAME/ | wc -l

echo ""
echo "🔗 Pro zapnutí CDN:"
echo "   1. Jděte do Google Cloud Console"
echo "   2. Network Services > Cloud CDN"
echo "   3. Vytvořte Load Balancer s bucket jako backend"
echo "   4. Zapněte Cloud CDN"
echo "   5. Aktualizujte CDN_BASE_URL v .env souboru"