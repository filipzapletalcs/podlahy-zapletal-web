#!/bin/bash

# Setup script pro Cloud CDN s Load Balancer
# Automaticky vytvoří kompletní CDN infrastrukturu

PROJECT_ID="podlahy-web"
BUCKET_NAME="podlahy-zapletal-images"
REGION="europe-west1"
LB_NAME="podlahy-cdn-lb"
BACKEND_BUCKET_NAME="podlahy-cdn-backend"
URL_MAP_NAME="podlahy-cdn-urlmap"
TARGET_PROXY_NAME="podlahy-cdn-proxy"
FORWARDING_RULE_NAME="podlahy-cdn-forwarding"
IP_NAME="podlahy-cdn-ip"

echo "🚀 Nastavuji Cloud CDN pro maximální rychlost..."

# Kontrola gcloud CLI
if ! command -v gcloud &> /dev/null; then
    echo "❌ gcloud CLI není nainstalované"
    exit 1
fi

# Nastavení projektu
gcloud config set project $PROJECT_ID

# 1. Vytvoř statickou IP adresu
echo "🌐 Vytvářím statickou IP adresu..."
gcloud compute addresses create $IP_NAME \
    --ip-version=IPV4 \
    --global

# Získej IP adresu
IP_ADDRESS=$(gcloud compute addresses describe $IP_NAME --global --format="value(address)")
echo "📍 Statická IP: $IP_ADDRESS"

# 2. Vytvoř backend bucket
echo "📦 Vytvářím backend bucket..."
gcloud compute backend-buckets create $BACKEND_BUCKET_NAME \
    --gcs-bucket-name=$BUCKET_NAME \
    --enable-cdn \
    --cache-mode=CACHE_ALL_STATIC \
    --default-ttl=86400 \
    --max-ttl=31536000 \
    --client-ttl=3600

# 3. Vytvoř URL map
echo "🗺️  Vytvářím URL mapu..."
gcloud compute url-maps create $URL_MAP_NAME \
    --default-backend-bucket=$BACKEND_BUCKET_NAME

# 4. Vytvoř SSL certifikát (managed)
echo "🔒 Vytvářím SSL certifikát..."
SSL_CERT_NAME="podlahy-cdn-ssl"
gcloud compute ssl-certificates create $SSL_CERT_NAME \
    --domains=cdn.podlahyzapletal.cz \
    --global

# 5. Vytvoř HTTPS target proxy
echo "🎯 Vytvářím HTTPS target proxy..."
gcloud compute target-https-proxies create $TARGET_PROXY_NAME \
    --url-map=$URL_MAP_NAME \
    --ssl-certificates=$SSL_CERT_NAME

# 6. Vytvoř forwarding rule
echo "📡 Vytvářím forwarding rule..."
gcloud compute forwarding-rules create $FORWARDING_RULE_NAME \
    --address=$IP_NAME \
    --global \
    --target-https-proxy=$TARGET_PROXY_NAME \
    --ports=443

# Poznámka: HTTP redirect můžete přidat později podle potřeby

echo ""
echo "✅ Cloud CDN úspěšně nastaven!"
echo ""
echo "📋 Detaily:"
echo "   🌐 CDN IP: $IP_ADDRESS"
echo "   🔗 CDN URL: https://cdn.podlahyzapletal.cz"
echo "   📦 Backend: gs://$BUCKET_NAME"
echo "   ⚡ Cache TTL: 1 rok (max), 1 den (default)"
echo ""
echo "🔧 DNS nastavení (přidejte do vaší DNS zóny):"
echo "   cdn.podlahyzapletal.cz A $IP_ADDRESS"
echo ""
echo "⏱️  Propagace:"
echo "   • Load Balancer: 5-10 minut"
echo "   • SSL certifikát: 10-60 minut"
echo "   • DNS: podle vašeho providera"
echo ""
echo "🧪 Test CDN (po propagaci):"
echo "   curl -I https://cdn.podlahyzapletal.cz/Fotky_logo/IMG_2254.jpg"
echo ""
echo "📊 Monitoring:"
echo "   https://console.cloud.google.com/net-services/loadbalancing"