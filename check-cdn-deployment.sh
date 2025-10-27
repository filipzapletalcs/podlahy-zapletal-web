#!/bin/bash

SERVICE_URL="https://podlahy-zapletal-640434502655.europe-west1.run.app"

echo "🔍 Kontroluji CDN v produkčním deploymentu..."
echo ""

# Test 1: Zkontroluj HTML source
echo "📝 Kontrola HTML source pro CDN URLs:"
CDN_USAGE=$(curl -s $SERVICE_URL | grep -o 'storage\.googleapis\.com' | wc -l)
if [ $CDN_USAGE -gt 0 ]; then
    echo "   ✅ CDN se používá! ($CDN_USAGE výskytů)"
else
    echo "   ❌ CDN se nepoužívá - stále lokální obrázky"
fi

echo ""

# Test 2: Zkontroluj rychlost načítání
echo "⚡ Test rychlosti obrázků:"
echo "📦 Přes GCS CDN:"
GCS_TIME=$(curl -o /dev/null -s -w "%{time_total}" https://storage.googleapis.com/podlahy-zapletal-images/Fotky_logo/IMG_2254.jpg)
echo "   Čas: ${GCS_TIME}s"

echo "🌐 Přes Cloud Run:"
RUN_TIME=$(curl -o /dev/null -s -w "%{time_total}" $SERVICE_URL/Fotky_logo/IMG_2254.jpg)
echo "   Čas: ${RUN_TIME}s"

# Porovnání
if (( $(echo "$GCS_TIME < $RUN_TIME" | bc -l) )); then
    echo "   🚀 GCS je rychlejší!"
else
    echo "   📈 Cloud Run je rychlejší (možná cache)"
fi

echo ""

# Test 3: Cache headers
echo "🗂️  Cache headers test:"
curl -I $SERVICE_URL/Fotky_logo/IMG_2254.jpg 2>/dev/null | grep -E "(cache-control|etag|expires)" || echo "   ⚠️ Žádné cache headers"

echo ""
echo "🔗 Deployment URL: $SERVICE_URL"