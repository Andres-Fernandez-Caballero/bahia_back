    # Usa una imagen oficial de Node.js como base
    FROM node:22.14.0-alpine3.21

    # Establece el directorio de trabajo dentro del contenedor
    WORKDIR /app

    # Copia los archivos del proyecto (package.json y package-lock.json) al contenedor
    COPY package.json package-lock.json ./

    # Instala las dependencias necesarias
    RUN npm install --omit=dev

    # Copia el resto del código de la aplicación
    COPY . .

    # Exponer el puerto que se usará en la plataforma (Back4App proporcionará este puerto dinámicamente)
    EXPOSE 3000

    # Comando para iniciar la aplicación
    CMD ["node", "index.js"]
