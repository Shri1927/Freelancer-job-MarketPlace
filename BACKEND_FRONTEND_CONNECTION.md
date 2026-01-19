# Backend-Frontend Connection Setup Guide

This guide explains how the backend (Laravel) and frontend (React) are connected.

## Overview

The frontend and backend are connected via REST API using:
- **Backend**: Laravel 12 with Sanctum for authentication
- **Frontend**: React with Axios for API calls
- **Authentication**: Bearer token authentication using Laravel Sanctum

## Setup Instructions

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies (if not already done):
   ```bash
   composer install
   ```

3. Create `.env` file (if not exists):
   ```bash
   cp .env.example .env
   ```

4. Generate application key:
   ```bash
   php artisan key:generate
   ```

5. Run migrations:
   ```bash
   php artisan migrate
   ```

6. Start the Laravel development server:
   ```bash
   php artisan serve
   ```
   The backend will run on `http://localhost:8000`

### 2. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies (including axios):
   ```bash
   npm install
   ```

3. Create `.env` file (if not exists):
   ```bash
   cp .env.example .env
   ```

4. Update `.env` file with your backend URL:
   ```
   VITE_API_BASE_URL=http://localhost:8000/api
   ```

5. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:8080`

## Configuration Details

### API Configuration

- **API Base URL**: Configured in `Frontend/.env` as `VITE_API_BASE_URL`
- **API Service**: Located at `Frontend/src/lib/api.js`
- **Authentication**: Bearer token stored in `localStorage` as `auth_token`

### CORS Configuration

CORS is configured in:
- `backend/config/cors.php` - CORS settings
- `backend/bootstrap/app.php` - CORS middleware registration
- `backend/config/sanctum.php` - Sanctum stateful domains

Allowed origins:
- `http://localhost:8080` (Frontend)
- `http://localhost:3000` (Alternative frontend port)
- `127.0.0.1:8080` and `127.0.0.1:3000`

### Authentication Flow

1. **Registration/Login**: User submits credentials
2. **Backend Response**: Returns token and user data
3. **Token Storage**: Token stored in `localStorage` as `auth_token`
4. **API Requests**: Token automatically added to `Authorization` header
5. **Token Validation**: Backend validates token on each request
6. **Logout**: Token removed from storage and revoked on backend

## API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - Login user
- `POST /api/logout` - Logout user (requires auth)
- `GET /api/me` - Get current user (requires auth)

### Protected Routes
All routes under `/api/*` (except register/login) require authentication via Bearer token.

## Testing the Connection

1. Start both servers (backend and frontend)
2. Open `http://localhost:8080` in your browser
3. Try to register a new user or login
4. Check browser console and network tab for API calls
5. Verify token is stored in `localStorage`

## Troubleshooting

### CORS Errors
- Ensure backend CORS config includes your frontend URL
- Check that `HandleCors` middleware is registered in `bootstrap/app.php`
- Verify frontend URL matches allowed origins in `config/cors.php`

### Authentication Errors
- Verify token is being sent in request headers
- Check token is stored in `localStorage`
- Ensure backend Sanctum is properly configured
- Verify user exists and credentials are correct

### API Connection Errors
- Check backend server is running on port 8000
- Verify `VITE_API_BASE_URL` in frontend `.env` is correct
- Check network tab for actual request URLs
- Ensure no firewall blocking localhost connections

## File Structure

### Frontend API Files
- `Frontend/src/lib/api.js` - Axios instance with interceptors
- `Frontend/src/store/auth.js` - Authentication store with API calls
- `Frontend/src/pages/SignIn.jsx` - Login page using API
- `Frontend/src/pages/SignUp.jsx` - Registration page using API

### Backend API Files
- `backend/routes/api.php` - API routes
- `backend/app/Http/Controllers/AuthController.php` - Auth controller
- `backend/config/sanctum.php` - Sanctum configuration
- `backend/config/cors.php` - CORS configuration

## Next Steps

After connecting, you can:
1. Update other pages to use the API service
2. Add more API endpoints as needed
3. Implement refresh token logic if needed
4. Add request/response interceptors for error handling
5. Set up API error notifications

