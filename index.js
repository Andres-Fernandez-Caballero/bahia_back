import app from './src/app.js';
import connectDB from './database/mongoose/connection.js';
import http from 'http'

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

      server.listen(PORT, () => {
          connectDB()
            .then(() => {
              console.log('base de datos conectada')
              console.log(`Servidor ejecutándose en el puerto ${PORT}`);
            })
            .catch(err => {
              console.error('Error al conectar a MongoDB:', err);
              process.exit(1);
            })
      })
    

