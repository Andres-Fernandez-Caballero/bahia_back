import app from './src/app.js';
import connectDB from './database/mongoose/connection.js';

const PORT = process.env.PORT || 3000;

// Para desarrollo local
if (process.env.NODE_ENV !== 'production') {
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Servidor ejecutándose en el puerto ${PORT}`);
      });
    })
    .catch(err => {
      console.error('Error al conectar a MongoDB:', err);
      process.exit(1);
    });
}

// Handler para Vercel
export default async function handler(req, res) {
  try {
    await connectDB();
    return app(req, res);
  } catch (error) {
    console.error('Error en el handler:', error);
    return res.status(500).send('Error interno del servidor');
  }
}