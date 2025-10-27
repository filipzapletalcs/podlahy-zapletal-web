#!/bin/bash

# Deployment script pro Google Cloud Run s CDN

PROJECT_ID="podlahy-web"
SERVICE_NAME="podlahy-zapletal"
REGION="europe-west1"

echo "🚀 Deployuji do Google Cloud Run s CDN optimalizací..."

# Kontrola gcloud CLI
if ! command -v gcloud &> /dev/null; then
    echo "❌ gcloud CLI není nainstalované"
    exit 1
fi

# Nastavení projektu
gcloud config set project $PROJECT_ID

# Build & Deploy
echo "🔨 Building aplikace..."
npm run build

echo "📦 Deployuji do Cloud Run..."
gcloud run deploy $SERVICE_NAME \
    --source . \
    --platform managed \
    --region $REGION \
    --allow-unauthenticated \
    --port 3000 \
    --memory 1Gi \
    --cpu 1 \
    --timeout 300 \
    --set-env-vars NODE_ENV=production \
    --set-env-vars CDN_BASE_URL=https://storage.googleapis.com/podlahy-zapletal-images \
    --set-env-vars GCS_BUCKET_URL=https://storage.googleapis.com/podlahy-zapletal-images

# Získej URL
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --region=$REGION --format="value(status.url)")

echo ""
echo "✅ Deployment dokončen!"
echo ""
echo "📋 Detaily:"
echo "   🌐 URL: $SERVICE_URL"
echo "   🚀 CDN: Aktivní (Google Cloud Storage)"
echo "   ⚡ Cache: 1 rok TTL"
echo "   🖼️  Obrázky: Optimalizované přes GCS"
echo ""
echo "🧪 Test:"
echo "   curl -I $SERVICE_URL"
echo ""
echo "📊 Monitoring:"
echo "   https://console.cloud.google.com/run/detail/$REGION/$SERVICE_NAME"