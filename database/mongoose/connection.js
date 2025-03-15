import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/bahia_ayuda`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB conectado");
  } catch (error) {
    console.error("Error al conectar MongoDB:", error);
    process.exit(1); // Detiene la aplicación si hay un error
  }
};

export default connectDB;
