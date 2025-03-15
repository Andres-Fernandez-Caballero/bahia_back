import app from './src/app.js';
import connectDB from './database/mongoose/connection.js';
import http from 'http'

const PORT = process.env.PORT || 8080;



      app.listen(PORT, async() => {
          try{
            connectDB();
            console.log('base de datos conectada')
            console.log(`Servidor ejecutándose en el puerto ${PORT}`);
          }catch(e){
            console.error('Error al conectar a MongoDB:', err);
          }
      })
    

