const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const models = mongoose.models;

// define the Schema (the structure of the article)
const CaracteristiqueSchema = new Schema({
    isActive: { type: Boolean, default: true },
    type: {
      fr: { type: String, trim: true, required: true }, // Type en français
      ar: { type: String, trim: true, required: true }, // Type en arabe
    },
    array_value: [
      {
        value: { type: String, trim: true, required: true }, // Valeur de l'option (ex: "12", "17", "25")
        priceAdjustment:  { type: Number, required: false, default: 0 },
        isActive: { type: Boolean, default: true },
      }
    ],



});

// Create a model based on that schema
const CaracteristiqueModal = models.Caracteristique || mongoose.model("Caracteristique", CaracteristiqueSchema);

// export the model
module.exports = CaracteristiqueModal;


