# PixelCraft Backend

Node.js + Express + MongoDB backend for authentication (JWT).

## Setup

1. Install dependencies
```bash
cd backend
npm install
```

2. Configure environment (optional)
- Default MongoDB URI: `mongodb://127.0.0.1:27017/pixelcraft`
- Default port: `5000`
- Default JWT secret: `dev-secret-change-me`

You can override via env vars: `MONGO_URI`, `PORT`, `JWT_SECRET`.

3. Run the server
```bash
npm start
# or
node server.js
```

## Endpoints

- `POST http://localhost:5000/api/auth/signup`
  - body: `{ "username": "string", "email": "string", "password": "string" }`
  - response: `{ message, user }`

- `POST http://localhost:5000/api/auth/login`
  - body: `{ "email": "string", "password": "string" }`
  - response: `{ token, user }`

## Notes
- Passwords are hashed with bcrypt.
- JWT tokens signed with `JWT_SECRET`, expires in 7 days.
- CORS and JSON body parsing are enabled.


