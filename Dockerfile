# Usa una imagen específica de Node.js en lugar de la genérica
FROM node:20.12.0-alpine as buider

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia solo los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instala las dependencias en un paso separado (mejor caché)
RUN npm install 

# Copia el resto del código después de instalar dependencias
COPY . .

# Construye el proyecto (si usa TypeScript)
RUN npm run build



# for production
FROM node:20.12.0-alpine 

COPY --from=buider /app/node_modules ./node_modules
COPY --from=buider /app/dist ./dist
COPY --from=buider /app/package*.json ./

EXPOSE 5000

CMD ["npm", "run", "start:prod"]