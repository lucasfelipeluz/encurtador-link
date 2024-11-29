# Use uma imagem oficial do Node.js
FROM node:18

# Cria o diretório de trabalho da aplicação
WORKDIR /usr/src/app

# Copia os arquivos package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o código-fonte para dentro do contêiner
COPY . .

# Expõe a porta da aplicação
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "init"]
