# 🚀 VPS Deployment - Crystal Mercerie

## ⚠️ PROBLÈMES CORRIGÉS

Les erreurs suivantes ont été fixées:

1. **`test_vps.crystalmercerie.com`** → **`testvps.crystalmercerie.com`** ✅
   - Le underscore `_` n'est pas valide en DNS
   - Changé vers votre sous-domaine CORRECT sans underscore
   - Certbot peut maintenant générer le certificat

2. **Variables hardcodées** → **Variables depuis .env** ✅
   - Supprimé les credentials du docker-compose.yml
   - Tout passe via le fichier .env
   - `.env` contient déjà `testvps.crystalmercerie.com`

3. **Port 3000 exposé au public** → **Seulement via Nginx** ✅
   - Sécurité: L'app n'est accessible que via Nginx (reverse proxy)

4. **Nginx mal configuré** → **Configuration SSL complète** ✅
   - HTTP redirige vers HTTPS
   - SSL/TLS 1.2+
   - Certificats Let's Encrypt pour `testvps.crystalmercerie.com`

---

## 📋 INSTRUCTIONS POUR LE VPS

### 1️⃣ Mettre à jour les fichiers sur le VPS

```bash
cd ~/ercerie_last-version-coty-c
git pull origin main
```

### 2️⃣ Éditer le fichier .env avec VOS domaines

**SUR LE VPS, éditez le .env:**

```bash
nano .env
```

Vérifiez/modifiez ces variables (prendre depuis votre config locale):

```env
# MongoDB Atlas (ne pas toucher si ça marche)
MONGO_URL=mongodb+srv://merceriecrystal:kucGEFA6z3BAJR8Z@cluster0.wzlqni5.mongodb.net/Ecommerce?retryWrites=true&w=majority&appName=Cluster0

# NextAuth
NEXTAUTH_SECRET=uxSGv0cKHSbROdOa5YU7bCmci34oXxRFuzlGXQYfPE0=
NEXTAUTH_URL=https://testvps.crystalmercerie.com/

# Cloudinary
CLOUD_NAME=ds09ny0ui
API_KEY=137831687364899
API_SECRET=hlZLJ--CsNShpHooQS1zwoi8CII

# URLs
NEXT_PUBLIC_MY_URL=https://testvps.crystalmercerie.com

# Yalidine
YALIDINE_API_ID=45767588410246590743
YALIDINE_API_TOKEN=4hCGJIkgNAaidrqoz2Xvxw6jFp0W8VTzoQxXKStnGcln3ZyumfrUwd97Ri7PRMcs

# Facebook Pixel
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=YOUR_PIXEL_ID_HERE
```

**Sauvegarder:** Appuyez `Ctrl+O` → `Entrée` → `Ctrl+X`

### 3️⃣ Arrêter les anciens conteneurs

```bash
docker compose down
```

### 4️⃣ Lancer avec le nouveau code

```bash
docker compose up --build -d
```

### 5️⃣ Vérifier les certificats SSL

```bash
docker compose logs certbot
```

**Attendez le message:**
```
Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/crystalmercerie.com/fullchain.pem
```

### 6️⃣ Vérifier que tout fonctionne

```bash
# Voir les logs
docker compose logs -f app

# Tester l'accès HTTPS
curl -I https://crystalmercerie.com
```

---

## 🔑 CLÉS POINTS

| Problème | Solution | Statut |
|----------|----------|---------|
| Domain `test_vps.` invalid (underscore) | Changé en `testvps.crystalmercerie.com` | ✅ Corrigé |
| Credentials exposés en plain text | Utilisés via .env | ✅ Sécurisé |
| App accessible sur port 3000 | Nginx reverse proxy en place | ✅ Privé |
| Pas de certificats SSL | Let's Encrypt automatisé | ✅ SSL pour testvps |
| Mongoose warnings | Problème de schéma (à voir plus tard) | ⚠️ Non bloquant |

---

## 🆘 En cas de problème

### Certbot échoue

```bash
# Vérifier le domaine DNS
nslookup testvps.crystalmercerie.com

# Voir les logs détaillés
docker compose logs certbot
```

### App ne démarre pas

```bash
docker compose logs app
```

### Nginx ne peut pas se connecter à l'app

```bash
docker compose exec nginx ping app
docker compose port app 3000
```

---

## ✅ Checklist avant la production

- [ ] Domaine pointe vers l'IP du VPS (DNS configuré)
- [ ] Certificat SSL généré et valide
- [ ] `.env` contient vos vraies clés Cloudinary, Yalidine, MongoDB
- [ ] `NEXTAUTH_URL` = votre domaine réel
- [ ] Port 443 (HTTPS) accessible
- [ ] Accès HTTPS fonctionne: `https://crystalmercerie.com`

---

## 📞 Besoin d'aide?

Montrez-moi:
1. Output de `docker compose logs`
2. Votre IP du VPS
3. Votre domaine
4. Les changements DNS effectués

Je peux diagnostiquer!
