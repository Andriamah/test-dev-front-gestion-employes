FROM node:20-alpine

WORKDIR /app

# Ajouter un argument ou une variable d'environnement pour VITE_API_URL
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
