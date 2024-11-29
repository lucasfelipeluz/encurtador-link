<h1 align="center">
  🧾<br>Encurtador de Links
</h1>

## 📖 Docs

Rotas Privadas:

- **GET|POST|PATCH|DELETE - api/links:** Liste, Adicione, Remova e Atualize os Links;

Rotas Publicas

- **GET - api/:code:** Redirecione para o link original;
- **POST - api/login:** Autentique-se na aplicação;
- **POST - api/register:** List and Update the About Me data.;
- **POST - api/links:** Adicione um novo link;

---

## 🏃‍♂️ Executar projeto

Para executar o projeto, só é necessário preencher o .env (use o .env-example como base) e executar o comando:

`docker-compose up --build `

Pronto, use nossa documentação no postman para testar as rotas:
Copie o arquivos dentro de docs, vá no postman e cole json. Logo após crie variáveis de ambiente para facilitar a execução dos testes.
`url: http://localhost:3000/api` e `token: token gerado no login`
