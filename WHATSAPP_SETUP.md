# Configuration WhatsApp Notifications

## CallMeBot Setup

Pour recevoir les notifications de commandes automatiquement sur WhatsApp, vous devez configurer CallMeBot :

### Étapes :

1. **Allez sur le site CallMeBot** : https://www.callmebot.com/

2. **Créez un compte gratuit**

3. **Ajoutez votre numéro WhatsApp** :
   - Cliquez sur "WhatsApp" dans le menu
   - Suivez les instructions pour lier votre numéro WhatsApp
   - Vous recevrez une clé API (API Key)

4. **Configurez la variable d'environnement** :
   - Dans votre fichier `.env`, remplacez `your_callmebot_api_key_here` par votre clé API réelle :
   ```
   CALLMEBOT_API_KEY=votre_clé_api_ici
   ```

5. **Testez la configuration** :
   - Passez une commande test depuis votre site
   - Vous devriez recevoir un message WhatsApp avec les détails de la commande

### Format du message reçu :

```
🛒 Nouvelle commande reçue!

👤 Client: [Nom du client]
📞 Téléphone: [Numéro]
📍 Wilaya: [Wilaya]
🚚 Type de livraison: [Type]

📦 Produits:
1. [Produit 1] - Quantité: X - Prix: XXX DZD
2. [Produit 2] - Quantité: Y - Prix: YYY DZD

💰 Total: XXX DZD
💵 Frais de livraison: XX DZD

🏠 Adresse: [Adresse] (ou Point relais)
```

### Notes importantes :

- CallMeBot est un service gratuit avec des limitations (environ 1000 messages par mois)
- Pour un usage professionnel, considérez WhatsApp Business API ou Twilio
- Le numéro admin est configuré sur +213782720266