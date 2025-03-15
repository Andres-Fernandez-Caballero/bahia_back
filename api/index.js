import app from '../src/app.js';
import connectDB from '../database/mongoose/connection.js';

const PORT = process.env.PORT || 3000;

// Para desarrollo local
  
app.listen(PORT, () => {
    connectDB()
    .then(() => {
        console.log(`Servidor ejecutándose en el puerto ${PORT}`);
    })
})

export default app;