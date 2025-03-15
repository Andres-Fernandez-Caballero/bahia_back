    # Usa una imagen oficial de Node.js como base
    FROM node:22.14.0-alpine3.21

    # Establece el directorio de trabajo dentro del contenedor
    WORKDIR /app

    # Copia los archivos del proyecto (package.json y package-lock.json) al contenedor
    COPY package.json ./

    # Instala las dependencias necesarias
    RUN npm install

    # Copia el resto del código de la aplicación
    COPY . .

    EXPOSE 8080

    # Comando para iniciar la aplicación
    CMD ["node", "index.js"]
