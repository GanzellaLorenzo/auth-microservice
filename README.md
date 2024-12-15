# Auth Microservice

Microserviço de autenticação com Node.js.

## Características

- Autenticação JWT
- Hash de senhas com bcrypt
- MongoDB para armazenamento
- API REST

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/GanzellaLorenzo/auth-microservice.git
cd auth-microservice
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Configure o arquivo `.env` com suas credenciais.

5. Inicie o servidor:
```bash
npm run dev
```

## API Endpoints

### Autenticação

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/auth/register` | Registrar novo usuário |
| POST | `/api/auth/login` | Fazer login |
| GET | `/api/auth/profile` | Obter perfil (requer token) |

### Health Check

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/health` | Status do serviço |

## Exemplos de Uso

### Registrar usuário
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "password": "123456"
  }'
```

### Fazer login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "password": "123456"
  }'
```

### Obter perfil
```bash
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

## Variáveis de Ambiente

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/auth-microservice
JWT_SECRET=seu-jwt-secret-aqui
```

## Scripts

```bash
npm start          # Iniciar em produção
npm run dev        # Iniciar em desenvolvimento
```
