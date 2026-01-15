# PKL Backend & Admin Panel

Complete backend system with Express.js, Supabase, Cloudinary, and admin panel.

## 🚀 Quick Start

### Backend Setup

1. **Install Dependencies**
   ```bash
   cd backend
   pnpm install
   ```

2. **Configure Environment**
   
   Edit `backend/.env` with your credentials:
   ```bash
   # Supabase (get from Supabase dashboard)
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   
   # JWT Secret (generate a random string)
   JWT_SECRET=your_random_secret_key
   
   # Cloudinary (get from Cloudinary dashboard)
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   
   # Admin credentials
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=your_secure_password
   ```

3. **Setup Database**
   
   Run the SQL in `backend/schema.sql` in your Supabase SQL editor to create tables.

4. **Start Backend**
   ```bash
   pnpm start
   # or for development with auto-reload:
   pnpm dev
   ```
   
   Backend runs on http://localhost:3001

### Frontend Setup

1. **Configure Environment**
   
   Edit `frontend/.env`:
   ```bash
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key
   VITE_API_URL=http://localhost:3001/api
   
   VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
   VITE_CLOUDINARY_UPLOAD_PRESET=your_preset
   VITE_CLOUDINARY_API_KEY=your_api_key
   VITE_CLOUDINARY_API_SECRET=your_api_secret
   ```

2. **Start Frontend**
   ```bash
   cd frontend
   pnpm dev
   ```
   
   Frontend runs on http://localhost:5173

## 📋 Features

### Backend API

- **Authentication** (`/api/auth`)
  - `POST /login` - Admin login with JWT
  - `POST /verify` - Verify JWT token

- **Photo Upload** (`/api/upload`)
  - `POST /photo` - Upload to Cloudinary
  - `GET /photos` - List all photos
  - `DELETE /photo/:id` - Delete photo

- **Query Builder** (`/api/query`)
  - `POST /execute` - Execute custom queries
  - `GET /tables` - List available tables
  - `GET /schema/:table` - Get table schema

- **Content Management** (`/api/content`)
  - Generic CRUD for any table
  - `POST /:table` - Create
  - `GET /:table` - Read all
  - `GET /:table/:id` - Read one
  - `PUT /:table/:id` - Update
  - `DELETE /:table/:id` - Delete

### Admin Panel

Access at http://localhost:5173/admin/login

- **Dashboard** - Overview and navigation
- **Photo Upload** - Upload images to Cloudinary with metadata
- **Query Builder** - Visual database query tool with filters

## 🗄️ Database Schema

Tables created in Supabase:

- `photos` - Uploaded photos with Cloudinary URLs
- `admin_users` - Admin user accounts

## 🔐 Security

- JWT-based authentication
- Service role key for backend operations
- Protected API routes with auth middleware
- CORS enabled for frontend communication

## 📝 Notes

- Backend uses Supabase **service role key** (not anon key)
- Frontend uses **anon key** for client-side operations
- All admin routes require JWT authentication
- Photos are stored in Cloudinary, metadata in Supabase
