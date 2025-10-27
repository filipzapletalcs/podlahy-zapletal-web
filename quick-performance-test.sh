#!/bin/bash

SERVICE_URL="https://podlahy-zapletal-640434502655.europe-west1.run.app"

echo "🚀 Rychlý performance test..."
echo ""

echo "📊 Test načítání celé stránky:"
PAGE_TIME=$(curl -o /dev/null -s -w "%{time_total}" $SERVICE_URL)
echo "   Celá homepage: ${PAGE_TIME}s"

echo ""
echo "🖼️  Test přímých obrázků z GCS:"
for i in {1..3}; do
    TIME=$(curl -o /dev/null -s -w "%{time_total}" https://storage.googleapis.com/podlahy-zapletal-images/Fotky_logo/IMG_2254.jpg)
    echo "   Test $i: ${TIME}s"
done

echo ""
echo "🔍 Kontrola přímých URL v HTML:"
DIRECT_LINKS=$(curl -s $SERVICE_URL | grep -c 'src="https://storage.googleapis.com')
NEXT_LINKS=$(curl -s $SERVICE_URL | grep -c '_next/image')

echo "   ✅ Přímé GCS odkazy: $DIRECT_LINKS"
echo "   ❌ Next.js optimalizace: $NEXT_LINKS"

if [ $DIRECT_LINKS -gt $NEXT_LINKS ]; then
    echo "   🎉 CDN funguje správně!"
else
    echo "   ⚠️ Stále se používá Next.js optimalizace"
fi

echo ""
echo "🌐 Service URL: $SERVICE_URL"