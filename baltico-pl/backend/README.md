# Baltico Backend API

Backend API dla systemu rezerwacji domków Baltico.

## Instalacja

```bash
cd backend
npm install
```

## Konfiguracja

Edytuj plik `.env` i ustaw:
- `DATABASE_URL` - połączenie z bazą PostgreSQL
- `JWT_SECRET` - sekretny klucz do podpisywania tokenów JWT
- `PORT` - port serwera (domyślnie 3000)

## Uruchomienie

### Tryb produkcyjny
```bash
npm start
```

### Tryb developerski (auto-reload)
```bash
npm run dev
```

## API Endpoints

### Autentykacja

#### POST /auth/register
Rejestracja nowego użytkownika.

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "first_name": "Jan",
  "last_name": "Kowalski",
  "phone": "123456789"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "jwt.token.here",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "first_name": "Jan",
    "last_name": "Kowalski",
    "phone": "123456789"
  }
}
```

#### POST /auth/login
Logowanie użytkownika.

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt.token.here",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "first_name": "Jan",
    "last_name": "Kowalski",
    "phone": "123456789"
  }
}
```

#### GET /auth/me
Pobierz dane zalogowanego użytkownika.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "first_name": "Jan",
    "last_name": "Kowalski",
    "phone": "123456789"
  }
}
```

## Bezpieczeństwo

- Hasła są hashowane za pomocą bcrypt (10 rund)
- Tokeny JWT ważne przez 7 dni
- Zabezpieczenie przed SQL injection (parametryzowane zapytania)
