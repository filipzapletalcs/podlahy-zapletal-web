#!/bin/bash

# Setup script pro Google Cloud Storage + CDN pro obrázky
# Používá gcloud CLI místo gsutil pro kompatibilitu

PROJECT_ID="podlahy-web"
BUCKET_NAME="podlahy-zapletal-images"
REGION="europe-west1"

echo "🚀 Nastavuji Google Cloud Storage + CDN pro Podlahy Zapletal..."

# Kontrola gcloud CLI
if ! command -v gcloud &> /dev/null; then
    echo "❌ gcloud CLI není nainstalované. Instalujte z: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Kontrola přihlášení
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q "@"; then
    echo "❌ Nejste přihlášeni do gcloud. Spusťte: gcloud auth login"
    exit 1
fi

# Nastavení projektu
echo "📋 Nastavuji projekt: $PROJECT_ID"
gcloud config set project $PROJECT_ID

# 1. Vytvoř bucket pomocí gcloud
echo "📦 Vytvářím storage bucket..."
gcloud storage buckets create gs://$BUCKET_NAME \
    --location=$REGION \
    --uniform-bucket-level-access

# 2. Nastav veřejný přístup
echo "🌐 Nastavuji veřejný přístup..."
gcloud storage buckets add-iam-policy-binding gs://$BUCKET_NAME \
    --member=allUsers \
    --role=roles/storage.objectViewer

# 3. Nastav CORS pro web
echo "🔧 Konfiguruji CORS..."
cat > cors.json << EOF
[
  {
    "origin": ["*"],
    "method": ["GET"],
    "responseHeader": ["Content-Type", "Cache-Control"],
    "maxAgeSeconds": 3600
  }
]
EOF

gcloud storage buckets update gs://$BUCKET_NAME --cors-file=cors.json
rm cors.json

# 4. Nahraj obrázky
echo "📸 Nahrávám obrázky..."
if [ -d "public/Fotky_logo" ]; then
    gcloud storage cp -r public/Fotky_logo/* gs://$BUCKET_NAME/Fotky_logo/
else
    echo "⚠️  Složka public/Fotky_logo nenalezena, přeskakuji upload obrázků"
fi

if [ -f "public/slide_01.jpg" ]; then
    gcloud storage cp public/*.jpg gs://$BUCKET_NAME/
else
    echo "⚠️  Hero slide obrázky nenalezeny, přeskakuji upload"
fi

# 5. Nastav cache control pro všechny obrázky
echo "⚡ Nastavuji cache headers..."
gcloud storage objects update gs://$BUCKET_NAME/** \
    --cache-control="public, max-age=31536000" \
    --recursive || echo "⚠️  Cache headers se nepodařilo nastavit, pokračuji..."

echo ""
echo "✅ Hotovo! Bucket je připraven na:"
echo "   🌐 https://storage.googleapis.com/$BUCKET_NAME/"
echo ""
echo "🔗 Další kroky pro CDN:"
echo "   1. Jděte do Google Cloud Console"
echo "   2. Network Services > Cloud CDN"
echo "   3. Create Load Balancer"
echo "   4. Backend: Cloud Storage bucket ($BUCKET_NAME)"
echo "   5. Frontend: HTTPS, nová statická IP"
echo "   6. Zapněte Cloud CDN pro backend"
echo "   7. Poznamenejte si CDN URL"
echo ""

# Výpis nahrané soubory
echo "📋 Obsah bucket:"
gcloud storage ls gs://$BUCKET_NAME/ --recursive