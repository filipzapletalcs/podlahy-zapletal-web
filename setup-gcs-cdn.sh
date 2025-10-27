#!/bin/bash

# Setup script pro Google Cloud Storage + CDN pro obrázky
# Spusťte tento skript po přihlášení do gcloud CLI

PROJECT_ID="podlahy-web"
BUCKET_NAME="podlahy-zapletal-images"
REGION="europe-west1"

echo "🚀 Nastavuji Google Cloud Storage + CDN pro Podlahy Zapletal..."

# 1. Vytvoř bucket
echo "📦 Vytvářím storage bucket..."
gsutil mb -p $PROJECT_ID -c STANDARD -l $REGION gs://$BUCKET_NAME

# 2. Nastav veřejný přístup
echo "🌐 Nastavuji veřejný přístup..."
gsutil iam ch allUsers:objectViewer gs://$BUCKET_NAME

# 3. Nastav CORS pro web
echo "🔧 Konfiguruji CORS..."
cat > cors.json << EOF
[
  {
    "origin": ["*"],
    "method": ["GET"],
    "responseHeader": ["Content-Type"],
    "maxAgeSeconds": 3600
  }
]
EOF

gsutil cors set cors.json gs://$BUCKET_NAME
rm cors.json

# 4. Nahraj obrázky
echo "📸 Nahrávám obrázky..."
gsutil -m cp -r public/Fotky_logo/* gs://$BUCKET_NAME/

# 5. Nastav cache control
echo "⚡ Nastavuji cache headers..."
gsutil -m setmeta -h "Cache-Control:public, max-age=31536000" gs://$BUCKET_NAME/**

echo "✅ Hotovo! Bucket URL: https://storage.googleapis.com/$BUCKET_NAME/"
echo "🔗 Pro CDN pokračujte v Google Cloud Console:"
echo "   1. Jděte do Network Services > Cloud CDN"
echo "   2. Vytvořte nový Load Balancer"
echo "   3. Připojte bucket jako backend"
echo "   4. Zapněte Cloud CDN"

# Výpis všech uploadovaných souborů
echo "📋 Nahrané soubory:"
gsutil ls gs://$BUCKET_NAME/