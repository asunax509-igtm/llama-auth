# Llama Auth SDK

This package exports a small browser-ready SDK to initialize Llama Auth and call auth APIs.

Example:
```js
import { initializeApp } from 'llama-auth-sdk';
const app = initializeApp({
  apiKey: 'pk_live_xxx',
  authDomain: 'https://api.llama-auth.com',
  projectId: 'project-id',
});

await app.login({ email: 'user@example.com', password: 'password123' });
```
