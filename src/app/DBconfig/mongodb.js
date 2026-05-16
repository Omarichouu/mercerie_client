const mongoose = require('mongoose');
import { createProductIndexes } from "@/lib/createIndexes";

 


 
  export const connectMongoDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL);
      // Créer les indexes pour optimiser les performances
      await createProductIndexes();
    } catch (error) {
    }
  };
