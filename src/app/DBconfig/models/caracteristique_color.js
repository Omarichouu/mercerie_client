const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const models = mongoose.models;

// define the Schema (the structure of the article)
const Caracteristique_colorSchema = new Schema({
  type: { type: String, trim: true, required: true },
  isActive: { type: Boolean, default: true },
  img: {
      secure_url: { type: String, required: true },
      public_id_url: { type: String, default: "" },
      },
  priceAdjustment: { 
      type: Number, 
      required: false,
      default: 0,
  }, // Ajustement de prix par rapport au prix de base (peut être positif ou négatif)
    

});

// Create a model based on that schema
const Caracteristique_colorModal =
  models.Caracteristique_color ||
  mongoose.model("Caracteristique_color", Caracteristique_colorSchema);

// export the model
module.exports = Caracteristique_colorModal;
