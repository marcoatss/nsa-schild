# AGENT.md

> **AI Assistant Guide for NSA-Schild Project**  
> This document provides comprehensive information about the project structure, conventions, and best practices for AI coding assistants.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Development Setup](#development-setup)
4. [Code Style & Conventions](#code-style--conventions)
5. [Project Structure](#project-structure)
6. [API Integration](#api-integration)
7. [Database Schema](#database-schema)
8. [Environment Variables](#environment-variables)
9. [Testing Guidelines](#testing-guidelines)
10. [Deployment](#deployment)
11. [Security Considerations](#security-considerations)
12. [Git Workflow](#git-workflow)
13. [Common Tasks](#common-tasks)
14. [Troubleshooting](#troubleshooting)
15. [Advanced Guidelines](#advanced-guidelines)
   1. [Next.js Data Fetching & Caching](#nextjs-data-fetching--caching)
   2. [Strapi Query Best Practices](#strapi-query-best-practices)
   3. [Admin Plugin Route Security](#admin-plugin-route-security)
   4. [API Helper Error Handling](#api-helper-error-handling)
   5. [Environment-Driven Image Domains](#environment-driven-image-domains)
   6. [Testing Targets](#testing-targets)
   7. [Local Dev & Data Hygiene](#local-dev--data-hygiene)
   8. [Performance Checklist](#performance-checklist)
   9. [Release Checklist](#release-checklist)

---

## Project Overview

**NSA-Schild** is a full-stack product catalog web application with:
- **Backend**: Strapi CMS v4.24.3 (headless CMS)
- **Frontend**: Next.js 14.1.4 with TypeScript
- **Database**: PostgreSQL
- **Languages**: Multi-language support (English, German) via i18n

### Key Features
- Product catalog with hierarchical structure (Categories → Subcategories → Products)
- Content management system with dynamic components
- Material and showcase management
- Quote request system
- File uploads (AWS S3 in production)
- Custom Excel export plugin
- SEO optimization with sitemap generation
- Modern UI with Tailwind CSS and Radix UI


---

## Architecture

### Monorepo Structure
```
nsa-schild/
├── backend/          # Strapi CMS
├── frontend/         # Next.js application
└── db/              # Database exports (NOT tracked in git)
```

### Backend (Strapi CMS)
- **Framework**: Strapi v4.24.3
- **Port**: 1337 (default)
- **API Style**: REST API with GraphQL support
- **Database**: PostgreSQL (production), SQLite (development default)

**Key Strapi Plugins:**
- `@strapi/plugin-i18n` - Internationalization
- `strapi-plugin-populate-deep` - Deep population of relations (depth: 10)
- `strapi-plugin-placeholder` - Placeholder images
- `@ckeditor/strapi-plugin-ckeditor` - Rich text editor
- `strapi-plugin-vercel-deploy` - Deployment integration
- Custom `export-to-excel` plugin

### Frontend (Next.js)
- **Framework**: Next.js 14.1.4 (App Router)
- **Port**: 3000 (default)
- **Rendering**: Server-side rendering (SSR) with static generation
- **Styling**: Tailwind CSS + Radix UI components
- **Internationalization**: next-intl
- **Animations**: Framer Motion

---

## Development Setup

### Prerequisites
- **Node.js**: **20.x.x** (strictly required - see note below)
- **npm**: ≥ 6.0.0 or **yarn**
- **PostgreSQL**: Latest stable version (or use SQLite for development)

> **⚠️ IMPORTANT: Node.js Version**  
> This project **requires Node.js 20.x**. Strapi v4.24.3 supports Node 18-20, but some plugins only work with Node 20.  
> Using Node 18 or Node 24+ will cause EBADENGINE warnings and potential compatibility issues.  
> **Use nvm to manage Node versions** - see installation steps below.

### Initial Setup

#### 0. Install Node Version Manager (nvm)

If you don't have nvm installed:

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# Restart terminal or load nvm
source ~/.zshrc  # or ~/.bashrc for bash

# Install Node 20
nvm install 20

# Use Node 20
nvm use 20

# Set as default (optional but recommended)
nvm alias default 20

# Verify
node -v  # Should output v20.x.x
npm -v   # Should output v10.x.x
```

> **💡 Pro Tip**: This project includes a `.nvmrc` file in the root directory.  
> Simply run `nvm use` when you're in the project directory, and nvm will automatically switch to Node 20.

#### 1. Clone and Install
```bash
# Clone repository
git clone <repository-url>
cd nsa-schild

# Ensure you're using Node 20
nvm use 20

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

#### 2. Database Setup
```bash
# Create PostgreSQL database
createdb schild_db

# Or use SQLite (automatic, no setup needed)
```

#### 3. Environment Configuration

**Backend** (`backend/.env`):
```bash
# Server
HOST=0.0.0.0
PORT=1337
NODE_ENV=development

# Database (PostgreSQL)
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=schild_db
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password
DATABASE_SSL=false

# Or use SQLite (development)
# DATABASE_CLIENT=sqlite
# DATABASE_FILENAME=.tmp/data.db

# Strapi
APP_KEYS=generate_random_keys_here
API_TOKEN_SALT=generate_random_salt
ADMIN_JWT_SECRET=generate_random_secret
TRANSFER_TOKEN_SALT=generate_random_salt
JWT_SECRET=generate_random_secret

# AWS S3 (production only)
# AWS_ACCESS_KEY_ID=
# AWS_SECRET_ACCESS_KEY=
# AWS_REGION=
# S3_BUCKET_NAME=
# SUBDOMAIN=
# HOSTED_ZONE_NAME=
```

**Frontend** (`frontend/.env.local`):
```bash
# Backend API URL
NEXT_PUBLIC_URL_BACKEND=http://localhost:1337

# Site URL (for SEO, sitemaps)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

#### 4. Start Development Servers

**Backend:**
```bash
cd backend
npm run develop    # Starts on http://localhost:1337
```

**Frontend:**
```bash
cd frontend
npm run dev        # Starts on http://localhost:3000
```

#### 5. Create Strapi Admin User
- Navigate to `http://localhost:1337/admin`
- Create first admin user account
- Start adding content

### Access Points
- **Frontend**: http://localhost:3000
- **Backend Admin Panel**: http://localhost:1337/admin
- **Backend API**: http://localhost:1337/api

---

## Code Style & Conventions

### General Principles
- **Always use keyword arguments** when calling Python functions (user rule)
- **Be concise**: Follow the principle of conciseness in documentation and interactions
- **TypeScript strict mode**: Enabled in frontend
- **No emojis**: Unless explicitly requested

### TypeScript Conventions

#### Frontend
```typescript
// Use functional components with TypeScript
export const ComponentName: React.FC<Props> = ({ prop1, prop2 }) => {
  // Component logic
};

// Use proper typing
interface ComponentProps {
  title: string;
  items: Item[];
}

// Path aliases
import { Component } from "@/components/component";
```

#### Backend (Strapi)
```typescript
// Use factories for standard routes
export default factories.createCoreRouter('api::product.product');

// Use factories for standard controllers
export default factories.createCoreController('api::product.product');

// Use factories for standard services
export default factories.createCoreService('api::product.product');
```

### File Naming
- **Components**: PascalCase folders with `index.tsx` (e.g., `Button/index.tsx`)
- **Utilities**: kebab-case (e.g., `map-product.helper.ts`)
- **Types**: `types.ts` or inline interfaces
- **Strapi schemas**: `schema.json`

### CSS & Styling
```typescript
// Use Tailwind utility classes
<div className="flex items-center justify-between p-4">

// Use CSS variables for theme values
colors: {
  primary: "hsl(var(--primary))",
}

// Custom font
font-family: var(--font-neue-regrade)
```

---

## Project Structure

### Backend Structure
```
backend/
├── config/              # Configuration files
│   ├── admin.ts         # Admin panel config
│   ├── api.ts           # API config (limits, pagination)
│   ├── database.ts      # Database connections
│   ├── middlewares.ts   # Middleware configuration
│   ├── plugins.ts       # Plugin configuration
│   └── server.ts        # Server config
├── database/
│   └── migrations/      # Database migrations
├── public/
│   └── uploads/         # Uploaded files (ignored in git)
├── src/
│   ├── api/             # API endpoints (content types)
│   │   ├── about/
│   │   ├── catalogue/
│   │   ├── category/
│   │   ├── homepage/
│   │   ├── material/
│   │   ├── product/
│   │   ├── quote/
│   │   ├── show-case/
│   │   └── subcategory/
│   ├── components/      # Reusable Strapi components
│   │   ├── content/     # Content components (hero, grids)
│   │   ├── product/     # Product-specific components
│   │   └── quote/       # Quote components
│   ├── extensions/      # Strapi extensions
│   ├── plugins/         # Custom plugins
│   │   └── export-to-excel/
│   └── index.ts         # Bootstrap & register functions
└── package.json
```

### Frontend Structure
```
frontend/
├── public/              # Static assets
│   ├── assets/
│   ├── fonts/
│   └── favicon files
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── [locale]/    # Internationalized routes
│   │   └── layout.tsx   # Root layout
│   ├── components/      # React components
│   │   ├── breadcrumb/
│   │   ├── button/
│   │   ├── carousel/
│   │   ├── catalogue/
│   │   ├── category/
│   │   ├── cms/         # CMS content renderers
│   │   ├── forms/
│   │   ├── grids/
│   │   ├── images/
│   │   ├── layouts/
│   │   ├── product/
│   │   └── ...
│   ├── contexts/        # React contexts
│   │   └── wishlist/
│   ├── lib/             # Utilities & helpers
│   │   ├── query-*.helper.ts    # API query functions
│   │   ├── map-*.helper.ts      # Data mapping functions
│   │   ├── get-url.ts           # URL generators
│   │   ├── types.ts             # TypeScript types
│   │   └── utils.ts             # Utility functions
│   ├── i18n.ts          # i18n configuration
│   └── middleware.ts    # Next.js middleware
├── messages/            # Translation files
│   ├── en.json
│   └── de.json
├── components.json      # shadcn/ui config
├── next.config.js       # Next.js configuration
├── tailwind.config.ts   # Tailwind configuration
└── package.json
```

---

## API Integration

### Backend API Endpoints

All Strapi endpoints follow REST conventions:

**Base URL**: `http://localhost:1337/api`

**Standard Endpoints**:
- `GET /api/products` - List products
- `GET /api/products/:id` - Get single product
- `GET /api/categories` - List categories
- `GET /api/subcategories` - List subcategories
- `GET /api/materials` - List materials
- `GET /api/catalogues` - List catalogues
- `GET /api/show-cases` - List show cases
- `POST /api/quotes` - Create quote request

### Query Parameters (using `qs` library)

```typescript
import { stringify } from "qs";

// Deep population
const query = stringify({
  populate: "deep",  // Uses strapi-plugin-populate-deep
  locale: "en",      // Language
});

// Filtering
const query = stringify({
  filters: {
    subcategory: {
      category: {
        slug: { $eq: "categorySlug" },
      },
      slug: { $eq: "subcategorySlug" },
    },
  },
});

// Sorting
const query = stringify({
  sort: ["sortingIndex"],
});

// Pagination
const query = stringify({
  pagination: {
    pageSize: 1000,
  },
});
```

### Frontend API Helpers

Located in `frontend/src/lib/query-*.helper.ts`:

```typescript
// Example: Fetch product
import { queryGetProduct } from "@/lib/query-get-product.helper";

const product = await queryGetProduct(
  categorySlug,
  subcategorySlug,
  productSlug,
  locale
);

// Example: List products
import { queryListProducts } from "@/lib/query-list-products.helper";

const products = await queryListProducts(
  locale,
  categorySlug,
  subcategorySlug
);

// Example: Post quote
import { queryPostQuote } from "@/lib/query-post-quote.helper";

await queryPostQuote({
  name: "Customer Name",
  email: "email@example.com",
  // ... other fields
});
```

### Data Mapping

Raw Strapi responses are mapped to clean TypeScript types using `map-*.helper.ts`:

```typescript
// Raw Strapi response
const strapiData = response.data.attributes;

// Mapped to clean type
import { mapProduct } from "@/lib/map-product.helper";
const product: Product = mapProduct(strapiData);
```

---

## Database Schema

### Content Types

#### Core Entities
1. **Category** (`api::category.category`)
   - name (localized)
   - slug (localized)
   - Has many: Subcategories

2. **Subcategory** (`api::subcategory.subcategory`)
   - name (localized)
   - slug (localized)
   - Belongs to: Category
   - Has many: Products

3. **Product** (`api::product.product`)
   - name (localized, required)
   - slug (localized, required)
   - description (localized, text)
   - brief (localized, string)
   - sortingIndex (integer, default: 1000000)
   - large (boolean, default: false)
   - models (component, repeatable)
   - media (component, repeatable)
   - files (media, multiple)
   - Belongs to: Subcategory

4. **Material** (`api::material.material`)
   - name (localized)
   - description (localized)
   - Used in: Product models

5. **Catalogue** (`api::catalogue.catalogue`)
   - name (localized)
   - file (media)

6. **Show Case** (`api::show-case.show-case`)
   - title (localized)
   - content (components)

7. **Quote** (`api::quote.quote`)
   - Customer information
   - Quote entries (components)

8. **Homepage** (`api::homepage.homepage`)
   - Dynamic content blocks (components)

9. **About** (`api::about.about`)
   - Company information

### Components

**Content Components** (`components/content/`):
- `hero` - Hero sections
- `grid-3x1`, `grid-3x2`, `grid-3x3` - Content grids
- `grid-3x1-side`, `grid-3x2-side`, `grid-3x3-side` - Grids with sidebar
- `grid-5x1` - Large grid
- `grid-cell` - Grid cell content
- `block-paragraph` - Text blocks

**Product Components** (`components/product/`):
- `model` - Product model/variant
- `media` - Product media (images/videos)
- `image` - Product image
- `material` - Material specification
- `option-group` - Option groups
- `option` - Individual options

**Quote Components** (`components/quote/`):
- `entry` - Quote line item
- `option` - Quote options

### Internationalization (i18n)

All localized content types support:
- **English (en)** - Default locale
- **German (de)**

Strapi automatically creates `*_localizations_links` tables for relationships between translations.

---

## Environment Variables

### Backend Required Variables

```bash
# Essential
APP_KEYS=                    # Comma-separated random keys
API_TOKEN_SALT=             # Random string
ADMIN_JWT_SECRET=           # Random string
TRANSFER_TOKEN_SALT=        # Random string
JWT_SECRET=                 # Random string

# Server
HOST=0.0.0.0
PORT=1337

# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=schild_db
DATABASE_USERNAME=
DATABASE_PASSWORD=
```

### Frontend Required Variables

```bash
# Backend connection
NEXT_PUBLIC_URL_BACKEND=http://localhost:1337

# Site metadata
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Production-Only Variables

**Backend:**
```bash
NODE_ENV=production
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
S3_BUCKET_NAME=
SUBDOMAIN=
HOSTED_ZONE_NAME=
```

---

## Testing Guidelines

### Backend Testing
- **Framework**: Jest (available via Strapi)
- **Location**: `backend/**/*.test.js`
- **Run tests**: `npm test` (when configured)

### Frontend Testing
- **Framework**: Jest + React Testing Library (to be configured)
- **Location**: `frontend/src/**/__tests__/`
- **Component tests**: Test user interactions, not implementation
- **Run tests**: `npm test` (when configured)

### Manual Testing Checklist
- [ ] Products display correctly in all languages
- [ ] Category/Subcategory navigation works
- [ ] Quote form submits successfully
- [ ] Images load from backend/S3
- [ ] Responsive design on mobile/tablet/desktop
- [ ] SEO metadata is correct

---

## Deployment

### Backend Deployment (Strapi)

**Build for production:**
```bash
cd backend
npm run build
npm start
```

**Environment**: Ensure production environment variables are set

**Database migrations**: Run automatically on startup

**File uploads**: Configured for AWS S3 in production

### Frontend Deployment (Next.js)

**Build for production:**
```bash
cd frontend
npm run build
npm start
```

**Post-build**: Automatically generates sitemap via `next-sitemap`

**Environment**: Vercel-ready with Vercel integration plugin

### Recommended Hosting
- **Backend**: Any Node.js hosting (Heroku, Railway, DigitalOcean, AWS)
- **Frontend**: Vercel (optimized for Next.js)
- **Database**: Managed PostgreSQL (AWS RDS, DigitalOcean, Supabase)

---

## Security Considerations

### Backend Security
- ✅ **Never commit** `.env` files
- ✅ **Use strong secrets** for JWT and API tokens
- ✅ **Enable CORS** only for trusted domains
- ✅ **Use role-based access control** (RBAC) in Strapi
- ✅ **Validate all inputs** in custom controllers
- ✅ **Use SSL/TLS** in production
- ✅ **Keep dependencies updated** regularly

### Frontend Security
- ✅ **Sanitize user inputs** to prevent XSS
- ✅ **Use HTTPS** for all API calls
- ✅ **Don't expose sensitive data** in client-side code
- ✅ **Validate forms** both client and server-side
- ✅ **Use environment variables** for API endpoints

### Data Security
- ❌ **Never commit database dumps** to git
- ❌ **Never commit production data** to git
- ✅ **Keep `db/` folder in `.gitignore`**
- ✅ **Use separate databases** for development/production
- ✅ **Backup database regularly**

### Secrets Management
Generate random secrets:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## Git Workflow

### Branching Strategy
- `main` - Production-ready code
- `develop` - Development branch
- `feature/*` - Feature branches
- `bugfix/*` - Bug fix branches

### Commit Message Format
```
[Component] Brief description

Detailed explanation (optional)

Relates to: #issue-number
```

**Examples:**
```
[Backend] Add material filtering to product API
[Frontend] Implement product detail page
[Database] Add migration for quote system
[Docs] Update AGENT.md with deployment instructions
```

### Pull Request Process
1. Create feature branch from `main`
2. Make changes and commit
3. Push to remote
4. Create pull request
5. Request code review
6. Address feedback
7. Merge after approval

### What NOT to Commit
- `node_modules/`
- `.env` files
- `db/` folder (contains production data)
- `backend/public/uploads/` (uploaded files)
- `backend/.tmp/` (SQLite database)
- `frontend/.next/` (build output)
- `dist/`, `build/` (compiled files)
- `.DS_Store`, IDE files

---

## Common Tasks

### Adding a New Content Type (Backend)

1. **Create via Strapi Admin**:
   - Go to Content-Type Builder
   - Create new collection type
   - Add fields
   - Save (auto-generates files)

2. **Files created**:
   ```
   backend/src/api/my-type/
   ├── content-types/my-type/schema.json
   ├── controllers/my-type.ts
   ├── routes/my-type.ts
   └── services/my-type.ts
   ```

3. **Enable i18n** (if needed):
   - In Content-Type Builder
   - Advanced Settings → Internationalization: Enable

### Creating a New Frontend Component

```typescript
// frontend/src/components/my-component/index.tsx

export interface MyComponentProps {
  title: string;
  items: string[];
}

export const MyComponent: React.FC<MyComponentProps> = ({ 
  title, 
  items 
}) => {
  return (
    <div className="flex flex-col gap-4">
      <h2>{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
```

### Adding a New API Query Helper

```typescript
// frontend/src/lib/query-my-endpoint.helper.ts
import { stringify } from "qs";
import { MyType } from "./types";
import { mapMyType } from "./map-my-type.helper";

export const queryMyEndpoint = async (
  locale: string,
): Promise<MyType[]> => {
  const query = stringify({
    locale,
    populate: "deep",
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/my-endpoint?${query}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  const { data } = await res.json();
  return data.map((item: any) => mapMyType(item.attributes));
};
```

### Adding Translations

1. **Edit message files**:
   ```json
   // frontend/messages/en.json
   {
     "home.title": "Welcome",
     "products.list": "Product List"
   }
   
   // frontend/messages/de.json
   {
     "home.title": "Willkommen",
     "products.list": "Produktliste"
   }
   ```

2. **Use in components**:
   ```typescript
   import { useTranslations } from "next-intl";
   
   const t = useTranslations();
   return <h1>{t("home.title")}</h1>;
   ```

### Database Migrations (Strapi)

Strapi handles migrations automatically. To manually create:

```bash
cd backend
npm run strapi generate
# Select "migration"
# Edit generated file in database/migrations/
```

---

## Troubleshooting

### Node.js Version Issues

**Problem**: EBADENGINE warnings or compatibility errors
- **Solution**: 
  - Ensure you're using Node 20: `node -v` should show v20.x.x
  - Switch to Node 20: `nvm use 20`
  - Set as default: `nvm alias default 20`
  - Clean reinstall: `rm -rf node_modules package-lock.json && npm install`

**Problem**: `nvm: command not found`
- **Solution**:
  - Install nvm (see Prerequisites section)
  - Restart terminal after installation
  - Or manually load: `source ~/.nvm/nvm.sh`

### Backend Issues

**Problem**: `Cannot connect to database`
- **Solution**: Check DATABASE_* environment variables
- Verify PostgreSQL is running: `pg_isready`
- Check connection: `psql -h localhost -U username -d dbname`

**Problem**: `Module not found` errors
- **Solution**: `rm -rf node_modules && npm install`

**Problem**: `APP_KEYS not found`
- **Solution**: Generate and add to `.env`: `APP_KEYS=key1,key2,key3,key4`

**Problem**: Strapi admin panel won't load
- **Solution**: 
  - Clear `.cache` folder
  - Rebuild admin: `npm run build`
  - Check browser console for errors

### Frontend Issues

**Problem**: `Cannot connect to backend API`
- **Solution**: 
  - Verify `NEXT_PUBLIC_URL_BACKEND` in `.env.local`
  - Check backend is running on correct port
  - Check CORS settings in backend

**Problem**: Images not loading
- **Solution**:
  - Check `next.config.js` `remotePatterns`
  - Verify backend URL is correct
  - Check browser network tab for errors

**Problem**: Translations not working
- **Solution**:
  - Verify locale in URL: `/en` or `/de`
  - Check `messages/[locale].json` exists
  - Restart dev server after editing translations

**Problem**: Build fails with TypeScript errors
- **Solution**:
  - Run `npm run build` locally first
  - Fix all type errors
  - Check `tsconfig.json` settings

### Database Issues

**Problem**: Database schema out of sync
- **Solution**:
  - Drop database and recreate: `dropdb schild_db && createdb schild_db`
  - Restart Strapi (will recreate schema)
  - Re-add content

**Problem**: Production data in development
- **Solution**:
  - Don't import from `db/` folder
  - Use fresh database
  - Create sample data via Strapi admin

---

## Additional Resources

### Strapi Documentation
- [Strapi Docs](https://docs.strapi.io/)
- [Content Types](https://docs.strapi.io/dev-docs/backend-customization/models)
- [Plugin Development](https://docs.strapi.io/dev-docs/plugins-development)

### Next.js Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [App Router](https://nextjs.org/docs/app)
- [Internationalization](https://next-intl-docs.vercel.app/)

### Styling & Components
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/)
- [shadcn/ui](https://ui.shadcn.com/)

### Tools
- [qs library](https://github.com/ljharb/qs) - Query string parsing
- [Framer Motion](https://www.framer.com/motion/) - Animations

---

## Quick Reference

### Development Commands

**Backend:**
```bash
npm run develop    # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run strapi     # Strapi CLI
```

**Frontend:**
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

### Key Files to Know

**Backend:**
- `backend/src/index.ts` - Bootstrap & register functions
- `backend/config/plugins.ts` - Plugin configuration
- `backend/config/database.ts` - Database configuration
- `backend/src/api/*/content-types/*/schema.json` - Content type definitions

**Frontend:**
- `frontend/src/app/[locale]/` - Page routes
- `frontend/src/lib/query-*.helper.ts` - API queries
- `frontend/src/lib/types.ts` - TypeScript type definitions
- `frontend/src/i18n.ts` - i18n configuration
- `frontend/src/middleware.ts` - Routing middleware

### Important Conventions
- Always use **keyword arguments** in Python functions
- Use **TypeScript** for all new code
- Follow **kebab-case** for file names
- Use **PascalCase** for component names
- Query backend with **`populate: "deep"`** for full data
- Map Strapi responses with **`map-*.helper.ts`** functions
- Handle errors with **proper error messages**

---

## Contact & Support

For questions or issues:
1. Check this AGENT.md file
2. Review relevant documentation (Strapi/Next.js)
3. Check troubleshooting section
4. Review existing code for patterns

---

*Last updated: October 2025*


---

## Advanced Guidelines

### Next.js Data Fetching & Caching

- Prefer server components for data fetching. Control caching explicitly to balance freshness and load on Strapi.
  - SSR (no cache):
    ```ts
    await fetch(url, { cache: 'no-store' });
    ```
  - ISR (revalidate every N seconds):
    ```ts
    await fetch(url, { next: { revalidate: 300 } }); // 5 minutes
    ```
  - Static (build time): avoid for frequently changing content.
- Co-locate fetches near the component/page that consumes the data and keep query helpers pure and typed.
- For lists used in navigation (e.g., header), use a modest revalidate window (e.g., 300–900s) to avoid hammering Strapi while keeping UX fresh.

### Strapi Query Best Practices

- Avoid blanket `populate: 'deep'` in production paths. Use explicit `fields` and `populate` trees to minimize payload size and risk of N+1 patterns.
  ```ts
  import { stringify } from 'qs';

  const query = stringify({
    locale,
    fields: ['name', 'slug', 'brief', 'sortingIndex', 'large'],
    populate: {
      subcategory: {
        fields: ['name', 'slug'],
        populate: { category: { fields: ['name', 'slug'] } },
      },
      media: { populate: { media: { fields: ['url', 'width', 'height', 'alternativeText'] } } },
      files: { fields: ['url', 'ext', 'name'] },
      models: {
        fields: ['name', 'supplier', 'code'],
        populate: {
          media: { fields: ['url', 'width', 'height', 'alternativeText'] },
          materials: { populate: { material: { fields: ['name'] } } },
          optionGroups: { populate: { options: { fields: ['name'] } } },
        },
      },
    },
    sort: ['sortingIndex'],
    pagination: { pageSize: 50 },
  });
  ```
- Respect Strapi `rest.maxLimit` (defaults: `defaultLimit: 25`, `maxLimit: 100`). Use pagination on the client for large datasets instead of `pageSize: 1000` unless the API limit is intentionally increased.
- Prefer `filters` with explicit operators (`$eq`, `$in`) and index-friendly fields (`slug`, ids).

### Admin Plugin Route Security

- Plugin routes intended for Strapi Admin only should explicitly enforce admin authentication/authorization.
- Recommended approach:
  - Add a custom policy (e.g., `plugin::export-to-excel.isAdmin`) that verifies an authenticated admin user and (optionally) role (`strapi-super-admin`).
  - Apply the policy on the route config.
  - Example (conceptual):
    ```ts
    // server/policies/is-admin.ts
    export default async (ctx, next) => {
      // Ensure a valid admin JWT was provided
      const isAdmin = Boolean(ctx?.state?.user && ctx?.state?.user?.isAdmin);
      if (!isAdmin) return ctx.unauthorized();
      await next();
    };

    // server/routes/index.ts
    export default [
      {
        method: 'POST',
        path: '/export-to-excel',
        handler: 'ExportController.exportToExcel',
        config: { policies: ['plugin::export-to-excel.isAdmin'] },
      },
    ];
    ```
- If using API Tokens instead, scope tokens narrowly and check token scopes within a policy.

### API Helper Error Handling

- Standardize helpers to: (1) build query, (2) fetch with explicit caching, (3) check `res.ok`, (4) return typed data, (5) throw descriptive errors.
  ```ts
  type FetchOptions = { cache?: RequestCache; revalidate?: number };

  export async function apiGet<T>(path: string, opts: FetchOptions = {}) {
    const url = `${process.env.NEXT_PUBLIC_URL_BACKEND}${path}`;
    const res = await fetch(url, opts.revalidate ? { next: { revalidate: opts.revalidate } } : { cache: opts.cache ?? 'no-store' });
    if (!res.ok) throw new Error(`GET ${path} failed: ${res.status} ${res.statusText}`);
    return (await res.json()) as T;
  }
  ```
- For mutations (e.g., quotes), surface failures to the UI and provide user feedback; optionally debounce and validate before submit.

### Environment-Driven Image Domains

- Configure Next Image remote patterns from environment to avoid hardcoding domains across environments.
  ```js
  // next.config.js
  const IMG_HOST = process.env.NEXT_PUBLIC_IMG_HOST; // e.g., media.backend.example.com
  module.exports = {
    images: {
      remotePatterns: [
        { protocol: 'https', hostname: IMG_HOST },
        { protocol: 'http', hostname: 'localhost' },
      ],
    },
  };
  ```

### Testing Targets

- Focused unit tests that deliver high value with low overhead:
  - Mapping helpers (e.g., `mapProduct`, `mapImage`, `mapFile`): verify shape and null/edge handling.
  - Wishlist reducer: action handlers (`add_entry`, `update_entry`, `delete_entry`) and state persistence semantics.
- Use Jest or Vitest with TS. Keep tests colocated under `__tests__` near helpers/reducer.

### Local Dev & Data Hygiene

- Do not commit production data or uploads. The repo already ignores `db/` and `backend/public/uploads/`; ensure local data exports are excluded.
- Prefer Postgres locally to reduce dev/prod drift. A simple Docker Compose is recommended (Postgres + Strapi + Admin UI); keep it optional and documented.
- Secrets: use `.env`/`.env.local`. Never embed credentials in code or config.

### Performance Checklist

- Replace `populate: 'deep'` with targeted `populate` trees on hot endpoints.
- Keep payloads lean with `fields` and minimal nested fields.
- Apply pagination consistently; avoid `pageSize` values beyond API limits.
- Add `revalidate` windows for read-heavy pages and shared nav data.
- Ensure images are optimized (correct sizes, `next/image`, placeholders where beneficial).

### Release Checklist

- Backend
  - Database migrations consistent; admin builds cleanly (`npm run build`).
  - Upload provider configured for the target environment.
  - Critical routes/policies validated (admin-only plugin routes correctly protected).
- Frontend
  - `.env.local` aligned with deployment URLs (API base, site URL, image host).
  - `next build` passes; pages use appropriate caching/revalidation.
  - Sitemap regenerates as part of build if required (`next-sitemap`).
- Ops
  - Monitoring/logging access confirmed.
  - Rollback plan documented for both services.
