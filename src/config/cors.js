export const corsOptions = {
    origin: process.env.FRONT_URL ?? '*', // URL de tu frontend
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization,x-voluntario", // Agregar x-voluntario aquí
    credentials: true, // Habilitar credenciales si es necesario
};