import mongoose from "mongoose";

const { Schema } = mongoose;

const PeticionAyudaSchema = new Schema({
  contact: {type: String, required: true},
  address: {type: String, required: true},
  barrio: {type: String, required: true},
  description: {type: String, required:true},
  isActive: {
    type: Boolean,
    default: false
  },
  cantidadPersonasSolicitadas: {type: Number, default:0},
  createdAt: { type: Date, default: Date.now },
  updateddAt: { type: Date, default: Date.now },
});

const PeticionAyuda = mongoose.model("PeticionAyuda", PeticionAyudaSchema);

export default PeticionAyuda;
