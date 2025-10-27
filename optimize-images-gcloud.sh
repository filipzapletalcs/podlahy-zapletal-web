#!/bin/bash

# Script pro optimalizaci velkých obrázků pomocí gcloud storage

BUCKET_NAME="podlahy-zapletal-images"

echo "🖼️  Optimalizuji velké obrázky pomocí gcloud storage..."

# Velké obrázky k optimalizaci (>5MB)
LARGE_IMAGES=(
    "Fotky_logo/IMG_4942.jpg"
    "Fotky_logo/IMG_4943.jpg" 
    "Fotky_logo/IMG_4945.jpg"
    "Fotky_logo/IMG_4947.jpg"
    "Fotky_logo/IMG_4959.jpg"
    "Fotky_logo/IMG_4962.jpg"
    "Fotky_logo/IMG_4964.jpg"
    "Fotky_logo/IMG_4967.jpg"
    "Fotky_logo/IMG_4977.jpg"
)

# Cleanup před začátkem
rm -f ./temp_*.jpg

# Stáhni, optimalizuj a nahraj zpět
for image in "${LARGE_IMAGES[@]}"; do
    echo "🔧 Optimalizuji: $image"
    
    # Stáhni pomocí gcloud
    if gcloud storage cp gs://$BUCKET_NAME/$image ./temp_image.jpg; then
        echo "   📥 Staženo"
    else
        echo "   ❌ Stažení selhalo, přeskakuji"
        continue
    fi
    
    # Optimalizuj pomocí macOS sips
    if command -v sips &> /dev/null; then
        # Zmenši na max 1920px a nastav kvalitu 85%
        sips -Z 1920 -s format jpeg -s formatOptions 85 ./temp_image.jpg --out ./temp_optimized.jpg
        echo "   🔄 Optimalizováno pomocí sips"
    else
        echo "   ⚠️ sips nenalezen, přeskakuji"
        rm -f ./temp_image.jpg
        continue
    fi
    
    # Porovnej velikosti
    if [ -f "./temp_image.jpg" ] && [ -f "./temp_optimized.jpg" ]; then
        ORIGINAL_SIZE=$(stat -f%z ./temp_image.jpg)
        OPTIMIZED_SIZE=$(stat -f%z ./temp_optimized.jpg)
        REDUCTION=$(echo "scale=1; ($ORIGINAL_SIZE - $OPTIMIZED_SIZE) * 100 / $ORIGINAL_SIZE" | bc -l)
        
        echo "   📊 Původní: $(echo $ORIGINAL_SIZE | awk '{print int($1/1024/1024)"MB"}')"
        echo "   📊 Optimalizovaný: $(echo $OPTIMIZED_SIZE | awk '{print int($1/1024/1024)"MB"}')"
        echo "   📈 Úspora: ${REDUCTION}%"
        
        # Nahraj zpět optimalizovaný
        if gcloud storage cp ./temp_optimized.jpg gs://$BUCKET_NAME/$image; then
            echo "   📤 Nahráno zpět"
        else
            echo "   ❌ Nahrání selhalo"
        fi
        
        # Nastav cache headers
        gcloud storage objects update gs://$BUCKET_NAME/$image \
            --cache-control="public, max-age=31536000"
        
        echo "   ✅ Dokončeno"
    else
        echo "   ❌ Optimalizace selhala"
    fi
    
    # Cleanup
    rm -f ./temp_image.jpg ./temp_optimized.jpg
done

echo ""
echo "🎉 Optimalizace dokončena!"
echo "💾 Obrázky jsou nyní optimalizované v CDN"
echo "⚡ Rychlost načítání bude výrazně vyšší"