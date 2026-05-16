/**
 * Create MongoDB indexes for optimal query performance
 * This helps reduce CPU usage and improve response times on Vercel
 */

import ProductModal from "@/app/DBconfig/models/product";

export async function createProductIndexes() {
  try {
    // Index pour les requêtes par catégorie (très fréquent)
    await ProductModal.collection.createIndex({ categorie: 1 });

    // Index composé pour catégorie + recherche française
    await ProductModal.collection.createIndex({ 
      categorie: 1, 
      "title.fr": 1 
    });

    // Index composé pour catégorie + recherche arabe
    await ProductModal.collection.createIndex({ 
      categorie: 1, 
      "title.ar": 1 
    });

    // Index pour le tri par prix
    await ProductModal.collection.createIndex({ 
      categorie: 1, 
      price: 1 
    });

    // Text index pour une meilleure recherche textuelle
    // Permet d'utiliser $text: { $search: "terme" } pour une recherche plus efficace
    await ProductModal.collection.createIndex({ 
      "title.fr": "text", 
      "title.ar": "text" 
    });

    // Index pour le champ disponible (important pour les filtres)
    await ProductModal.collection.createIndex({ disponible: 1 });

    // Index composé pour catégorie + disponible (requête très commune)
    await ProductModal.collection.createIndex({ 
      categorie: 1, 
      disponible: 1 
    });

  } catch (error) {
    // Les indexes peuvent déjà exister, ce n'est pas une erreur
    if (error.message.includes("already exists")) {
      return;
    }
  }
}
