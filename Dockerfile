# Usa una imagen específica de Node.js en lugar de la genérica
FROM node:18-alpine 

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia solo los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instala las dependencias en un paso separado (mejor caché)
RUN npm install --only=production 

# Copia el resto del código después de instalar dependencias
COPY . .

# Construye el proyecto (si usa TypeScript)
RUN npm run build

# Expone el puerto que usa la aplicación
EXPOSE 3000

# Comando de inicio del contenedor
CMD ["npm", "start"]
