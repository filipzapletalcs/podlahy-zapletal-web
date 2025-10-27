#!/bin/bash

# Test script pro monitoring CDN výkonu

CDN_URL="https://cdn.podlahyzapletal.cz"
GCS_URL="https://storage.googleapis.com/podlahy-zapletal-images"
TEST_IMAGE="Fotky_logo/IMG_2254.jpg"

echo "🧪 Testování CDN výkonu..."
echo ""

# Test DNS resolving
echo "🌐 DNS test:"
nslookup cdn.podlahyzapletal.cz || echo "❌ DNS ještě nepropagováno"
echo ""

# Test SSL certifikátu
echo "🔒 SSL certifikát test:"
curl -I --max-time 10 $CDN_URL/$TEST_IMAGE 2>/dev/null | head -1 || echo "❌ SSL certifikát ještě není připraven"
echo ""

# Speed comparison
echo "⚡ Porovnání rychlosti načítání:"

echo "📦 GCS Direct:"
GCS_TIME=$(curl -o /dev/null -s -w "%{time_total}" --max-time 10 $GCS_URL/$TEST_IMAGE)
echo "   Čas: ${GCS_TIME}s"

echo "🚀 Cloud CDN:"
CDN_TIME=$(curl -o /dev/null -s -w "%{time_total}" --max-time 10 $CDN_URL/$TEST_IMAGE 2>/dev/null)
if [ $? -eq 0 ]; then
    echo "   Čas: ${CDN_TIME}s"
    
    # Výpočet zrychlení
    SPEEDUP=$(echo "scale=2; $GCS_TIME / $CDN_TIME" | bc 2>/dev/null || echo "N/A")
    echo "   🏆 Zrychlení: ${SPEEDUP}x"
else
    echo "   ⏳ CDN ještě není dostupné"
fi

echo ""
echo "📊 Cache headers test:"
curl -I --max-time 10 $CDN_URL/$TEST_IMAGE 2>/dev/null | grep -E "(cache-control|x-cache|age)" || echo "⏳ CDN ještě není aktivní"

echo ""
echo "🔗 Užitečné odkazy:"
echo "   📊 Monitoring: https://console.cloud.google.com/net-services/loadbalancing"
echo "   🔒 SSL Status: https://console.cloud.google.com/security/ccm/list"
echo "   📈 CDN Analytics: https://console.cloud.google.com/net-services/cdn"