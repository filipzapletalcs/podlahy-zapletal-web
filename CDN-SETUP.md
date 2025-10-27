# 🚀 CDN Setup pro rychlé načítání obrázků

Tento guide vás provede nastavením Google Cloud Storage + CDN pro výrazné zrychlení načítání obrázků na vašem webu.

## 📋 Požadavky

1. **Google Cloud Account** s aktivním projektem
2. **gcloud CLI** nainstalované a přihlášené
3. **Billing** zapnutý v Google Cloud projektu

## 🛠️ Setup kroky

### 1. Přihlášení do Google Cloud

```bash
# Přihlášení
gcloud auth login

# Nastavení projektu (nahraďte your-project-id)
gcloud config set project your-project-id
```

### 2. Spuštění setup scriptu

```bash
# Upravte PROJECT_ID v souboru před spuštěním
nano setup-gcs-cdn.sh

# Spusťte setup
./setup-gcs-cdn.sh
```

### 3. Konfigurace CDN v Google Cloud Console

1. Jděte do [Google Cloud Console](https://console.cloud.google.com)
2. **Network Services > Cloud CDN**
3. **Create** nový Load Balancer
4. **Backend configuration**:
   - Type: Cloud Storage bucket
   - Bucket: `podlahy-zapletal-images`
5. **Frontend configuration**:
   - Protocol: HTTPS
   - IP: Create new static IP
6. **Zapněte Cloud CDN** pro backend
7. **Poznamenejte si** finální CDN URL

### 4. Aktualizace konfigurace

```bash
# Vytvořte .env soubor
cp .env.example .env

# Upravte CDN_BASE_URL na vaši CDN doménu
nano .env
```

### 5. Nahrání obrázků

```bash
# Nahrajte všechny obrázky
./scripts/upload-images.sh
```

## ⚡ Výsledky

Po správném nastavení budete mít:

- **~90% rychlejší** načítání obrázků
- **Automatickou kompresi** (WebP, AVIF)
- **Global CDN** distribuci
- **Dlouhodobé cachování** (1 rok)
- **Optimalizaci** pro všechny device sizes

## 🔧 Customizace

### Vlastní doména pro CDN

1. V Cloud DNS vytvořte CNAME record:
   ```
   cdn.podlahyzapletal.cz -> your-lb-ip.global.gcp.
   ```

2. V Load Balancer přidejte SSL certifikát pro doménu

3. Aktualizujte `CDN_BASE_URL` v `.env`:
   ```
   CDN_BASE_URL=https://cdn.podlahyzapletal.cz
   ```

### Monitoring výkonu

```bash
# Rychlost načítání před/po
curl -o /dev/null -s -w "%{time_total}\n" https://your-old-domain.com/image.jpg
curl -o /dev/null -s -w "%{time_total}\n" https://cdn.podlahyzapletal.cz/image.jpg
```

## 💰 Náklady

Pro běžný web s ~100 obrázky:
- **Storage**: ~$0.02/měsíc
- **CDN**: ~$0.10/měsíc za 1GB traffic
- **Load Balancer**: ~$18/měsíc

**Celkem**: ~$18-20/měsíc za významné zrychlení

## 🆘 Troubleshooting

### Obrázky se nenačítají
```bash
# Kontrola bucket permissions
gsutil iam get gs://podlahy-zapletal-images

# Kontrola CORS
gsutil cors get gs://podlahy-zapletal-images
```

### CDN nekešuje
- Zkontrolujte cache headers
- Počkejte 5-10 minut na propagaci
- Otestujte s `curl -I`

### Performance problémy
```bash
# Analýza načítání
lighthouse https://your-domain.com --only-categories=performance
```