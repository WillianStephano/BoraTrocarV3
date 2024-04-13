# # Use a imagem Node.js como base
# FROM node:16.14.0-alpine

# # Defina o diretório de trabalho dentro do container
# WORKDIR /app

# # Copie os arquivos necessários e as dependências do projeto
# COPY package.json package-lock.json /app/
# RUN npm install

# # Copie todos os arquivos do diretório atual para o diretório de trabalho do container
# COPY . .

# # Compile o projeto Angular
# RUN npm run build --prod

# # Exponha a porta em que o servidor Angular será executado
# EXPOSE 80

# # Comando para iniciar o servidor Angular quando o contêiner for iniciado
# CMD ["npm", "run", "start"]

FROM httpd:latest

COPY dist/bora-trocar-v2 /usr/local/apache2/htdocs

EXPOSE 80
CMD ["httpd", "-D", "FOREGROUND"]
