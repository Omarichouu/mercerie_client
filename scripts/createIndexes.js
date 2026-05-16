#!/usr/bin/env node
/**
 * Script manuel pour créer les indexes MongoDB
 * Usage: node scripts/createIndexes.js
 * Utile lors du déploiement en production pour s'assurer que les indexes existent
 */

const mongoose = require('mongoose');
const path = require('path');

// Les variables d'environnement doivent être définies via .env.local ou Vercel
if (!process.env.MONGO_URL) {
  console.error('❌ Erreur: MONGO_URL non définie dans les variables d\'environnement');
  console.error('   Assurez-vous que .env.local contient MONGO_URL=...');
  process.exit(1);
}

async function setupIndexes() {
  let connection;
  try {
    // Connexion à MongoDB
    connection = await mongoose.connect(process.env.MONGO_URL);

    console.log('✓ Connecté à MongoDB');

    // Importer le modèle Product
    const ProductModal = require(path.resolve(__dirname, '../src/app/DBconfig/models/product'));

    // Créer les indexes
    console.log('📍 Création des indexes...');

    await ProductModal.collection.createIndex({ categorie: 1 });
    console.log('  ✓ Index créé: categorie');

    await ProductModal.collection.createIndex({ 
      categorie: 1, 
      "title.fr": 1 
    });
    console.log('  ✓ Index créé: categorie + title.fr');

    await ProductModal.collection.createIndex({ 
      categorie: 1, 
      "title.ar": 1 
    });
    console.log('  ✓ Index créé: categorie + title.ar');

    await ProductModal.collection.createIndex({ 
      categorie: 1, 
      price: 1 
    });
    console.log('  ✓ Index créé: categorie + price');

    await ProductModal.collection.createIndex({ 
      "title.fr": "text", 
      "title.ar": "text" 
    });
    console.log('  ✓ Index créé: text index (title.fr, title.ar)');

    await ProductModal.collection.createIndex({ disponible: 1 });
    console.log('  ✓ Index créé: disponible');

    await ProductModal.collection.createIndex({ 
      categorie: 1, 
      disponible: 1 
    });
    console.log('  ✓ Index créé: categorie + disponible');

    console.log('\n✅ Tous les indexes ont été créés avec succès!');
    console.log('\n📊 Indexes actuels:');
    const indexes = await ProductModal.collection.getIndexes();
    Object.entries(indexes).forEach(([name, spec]) => {
      console.log(`  - ${name}:`, spec);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await mongoose.connection.close();
    }
  }
}

setupIndexes();
