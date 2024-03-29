
# Pokedex

A Simple app for managing your pokemons


## Tech Stack

**Client:** React, Next.js (App router), TailwindCSS

**Server:** Node, Prisma, Postgresql

**Common**: Zod, NextAuth




## Roadmap

- [x]  Implement api with pagination and search
- [x]  Implement auth
- [x]  CRUD endpoints for pokemon
- [x]  Pokemon list view
- [x]  Pokemon view
- [x]  Deployment to Vercel with postgresql
- [x]  Frontend for sorting and pagination
- [ ]  Frontend for filtering by weight and height
- [ ]  Improve look of loading components
- [ ]  Create CRUD UI views 
- [x]  Make server errors nicer on the client
- [x]  Secure endpoints


## Deployment

This app is hossted on Vercel with CD pipeline.
Here is a link: [pokedex.vercel.app](https://pokedex-eight-woad.vercel.app)

## Installation

This project requires pnpm and docker installed.

```bash
git clone git@github.com:FranekMarciniak/pokedex.git
```

```bash
cd pokedex
```

```bash
pnpm install
```

```bash
docker-compose up -d
```

```bash
cp .env.example .env
```

```bash 
pnpm prisma generate && pnpm prisma db push
```

```bash
node ./scripts/seed.js
```

```bash
pnpm dev
```

    
## Known issues

- Hydration error (only in dev mode), known bug in nextJS
