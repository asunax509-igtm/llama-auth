# Llama Auth

A complete developer authentication platform built as a monorepo.

## Structure

- `backend/` - Express API, Prisma schema, authentication, OAuth, storage, analytics, custom domains, Stripe billing.
- `frontend/` - React + Vite SaaS landing page, dashboard, UI builder, docs, billing.
- `packages/sdk/` - Llama Auth SDK for browser and app integration.

## Quick start

1. Install dependencies:
   - `npm install`
2. Initialize the backend database:
   - `cd backend`
   - `npx prisma generate`
   - `npx prisma db push`
3. Copy `.env.example` to `.env` and set your secrets.
4. Run the platform:
   - `npm run dev`

## Features

- Developer authentication with email/password, JWT, refresh tokens, session management.
- OAuth support for Google, GitHub, and Facebook.
- Project and API key management.
- Storage upload APIs with quota enforcement, file listing, and delete.
- Custom domain verification via DNS TXT challenge and ALIAS record guidance for root domains.
- Stripe billing integration for Free, Basic, Business, and Enterprise.
- SDK system and code generators for HTML, React, Vue, and React Native exports.
- Modern landing page, dashboard, UI builder, docs, and billing pages.
- Upload web component with branded experience and clear quota errors.
- Project, user, API key, domain, storage, analytics, logs, and settings pages in the frontend.
- Backend endpoints for user management (`/users`), log audit (`/logs`), project management, storage, analytics, and custom domains.
- Cloudinary-style image transform support with `/storage/transform/:filename`.

## Uploader embed example

Use the web component from `frontend/public/uc-file-uploader-regular.js` in an HTML page:

```html
<link rel="stylesheet" href="/uc-file-uploader-regular.css" />
<script type="module" src="/uc-file-uploader-regular.js"></script>

<uc-config ctx-name="my-uploader" source-list="local,camera,facebook,gdrive" pubkey="pk_live_xxx"></uc-config>
<uc-file-uploader-regular ctx-name="my-uploader"></uc-file-uploader-regular>
<uc-upload-ctx-provider ctx-name="my-uploader"></uc-upload-ctx-provider>
```

The component uploads files to your configured Llama Auth backend and shows clear errors when quota is exceeded.
