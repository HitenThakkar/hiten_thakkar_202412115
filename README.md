# E-Commerce Web Application

## Overview and Key Features
This is a production-ready full-stack e-commerce application built using the MVC pattern. Key features include:
- Secure authentication with JWT and bcrypt.
- Product management (CRUD for admins) with search, filtering, pagination, and server-side sorting.
- Cart and checkout functionality with server-side total calculation.
- Reports page with SQL and MongoDB aggregations.
- Role-based access (admin/customer).
- Logged-in user's name displayed in header.

## Tech Stack and Dependencies
- Backend: Node.js, Express.js, MySQL (via Prisma), MongoDB (via Prisma), JWT, bcrypt.
- Frontend: Next.js 14+ (App Router, TypeScript), Tailwind CSS.
- Testing: Jest.
- Deployment: Render (backend), Vercel (frontend).

Dependencies are listed in `backend/package.json` and `frontend/package.json`.

## Setup and Environment Variable Details
1. Clone the repo.
2. Set up databases:
   - MySQL: Create a database named `ecom`.
   - MongoDB: Create a database named `ecom`.
3. In `backend/`, create `.env` with:
    DATABASE_URL="mysql://root:yourpassword@localhost:3306/ecom"
    MONGO_URL="mongodb://localhost:27017/ecom"
    JWT_SECRET="your-secret-key"
4. Run `cd backend && npm install`.
5. Generate Prisma clients: `npm run prisma:generate`.
6. Migrate SQL database: `npx prisma migrate dev --schema prisma/sql.prisma --name init`.
7. Seed data: `node seed.js`.
8. Start backend: `npm start`.
9. In `frontend/`, run `npm install && npm run dev`.

## Database Configuration and Migration Steps
- Use MySQL for users, orders, order_items.
- Use MongoDB for products.
- Migration: Run the Prisma migrate command above for MySQL. No migration needed for MongoDB.
- Indexes are added in Prisma schemas for sku, category, updatedAt.

## Testing Instructions
- Testing framework: Jest.
- Command to run tests: `npm run test` (in backend/).
- Description: This test verifies that the product sorting function returns items in descending order by default and can handle alternate request conditions (e.g., via header or query param).

## API and Frontend Route Summaries
API Endpoints (backend):
- POST /api/auth/register: Register user.
- POST /api/auth/login: Login and get JWT.
- GET /api/products: List products (with ?page, ?limit, ?search, ?category, ?sort).
- POST /api/products: Create product (admin).
- PUT /api/products/:id: Update product (admin).
- DELETE /api/products/:id: Delete product (admin).
- POST /api/orders/checkout: Checkout cart.
- GET /api/orders: Get user orders.
- GET /api/reports/daily-revenue: SQL aggregation for daily revenue (admin).
- GET /api/reports/category-average: MongoDB aggregation for average price per category (admin).

Frontend Routes:
- /: Home.
- /login: Login form.
- /register: Registration form.
- /products: Product listing with search, filter, pagination, add to cart.
- /cart: Cart view with checkout.
- /orders: User orders list.
- /reports: Reports page (admin only).

## Deployment URLs
- Frontend: [Vercel URL after deployment, e.g., https://hiten-thakkar-202412115.vercel.app]
- Backend: [Render URL after deployment, e.g., https://hiten-thakkar-202412115.onrender.com]

## Admin Login Credentials
- Email : hiten@gmail.com
- Password : hiten

- OR

1. **Register a New Account**:
   - Navigate to the registration page (e.g., `https://hiten_thakkar_202412115.vercel.app/register`).
   - Enter your desired email and password.
   - During registration, select the **Admin** role from the available options.

2. **Log In**:
   - After registration, go to the login page (e.g., `https://hiten_thakkar_202412115.vercel.app/login`).
   - Use the email and password you just created for the admin account to log in.

This ensures you have full access to the reports and other admin functionalities. Note that the application requires an admin role to view reports.