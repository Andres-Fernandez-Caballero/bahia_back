import express, { json } from 'express';
import cors from 'cors';
import ApiPeticionAyudaRouter from './routes/api/v1/peticion_ayuda.router.js';
import ApiRespuestaVoluntariosRouter from './routes/api/v1/respuesta_voluntarios.router.js';
import { corsOptions } from './config/cors.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(json());

// Configurar vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Rutas
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/pin', (req, res) => {
  res.send('Estoy vivo !!!');
});

app.use('/api/v1/peticion_ayuda', ApiPeticionAyudaRouter);
app.use('/api/v1/respuesta_voluntarios', ApiRespuestaVoluntariosRouter);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('¡Algo salió mal!');
});

// Para Vercel, exportamos la aplicación directamente
export default app;