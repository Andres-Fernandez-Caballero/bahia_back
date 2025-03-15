import mongoose from "mongoose";

// Variables para caché de conexión
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  // Si ya existe una conexión, la devolvemos
  if (cached.conn) {
    return cached.conn;
  }

  // Verificar que las variables de entorno estén definidas
  if (!process.env.MONGODB_USER || !process.env.MONGODB_PASSWORD || !process.env.MONGODB_HOST) {
    throw new Error("Faltan variables de entorno para la conexión a MongoDB");
  }

  // Si no hay una promesa de conexión en progreso, la creamos
  if (!cached.promise) {
    const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/bahia_ayuda`;
    
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(uri, options)
      .then((mongoose) => {
        console.log("MongoDB conectado");
        return mongoose;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error("Error al conectar MongoDB:", error);
    throw error;
  }

  return cached.conn;
};

export default connectDB;