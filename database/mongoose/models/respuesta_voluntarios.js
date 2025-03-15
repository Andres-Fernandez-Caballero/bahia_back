import mongoose from "mongoose";

const { Schema } = mongoose;

const RespuestaVoluntariosSchema = new Schema({
  idVoluntario: {
    type: String, // Si es un ObjectId, usa: mongoose.Schema.Types.ObjectId
    required: true
  },
  idPeticion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PeticionAyuda", // Nombre del modelo al que hace referencia
    required: true
  },
  helpState: {
    type: Number,
    default: 0, // 0: NADA, 1: YENDO, 2: TRABAJANDO, 3: LISTO.
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: {type: Date, default: Date.now }
});

const RespuestaVoluntarios = mongoose.model(
  "RespuestaVoluntarios",
  RespuestaVoluntariosSchema
);

export default RespuestaVoluntarios;
