# 🛍️ ByteBuy — E-Commerce Website

A full-stack e-commerce web application built with **React**, **Node.js**, **MongoDB Atlas**, and **Stripe** for secure online payments.

---

## 📁 Project Structure

```
/backend     → Express API (MongoDB, JWT, Stripe)
/frontend    → Customer-facing React app
/admin       → Admin panel (for managing products/orders)
```

---

## 🚀 Features

- 🛒 Shop by Men, Women, Kids categories
- 🔐 JWT-based user authentication
- 🧾 Secure payment with Stripe and Cash On Delivery
- 👤 If user is not login then he/she can't order anything user have to login to order anything
- 👩‍💼 Admin can login/signup with same login page visible to the user side in short user and admin use same page for login/signup
- 👩‍💼 Admin panel to manage products/orders


---

## 📦 Tech Stack

**Frontend & Admin Panel**: React, React Router, Context API  
**Backend**: Node.js, Express, MongoDB Atlas, JWT, Stripe  
**Styling**: Bootstrap, custom CSS

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone: https://github.com/Dhruvi207/e-commerce_website.git
cd e-commerce_website
```

### 2. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

# Admin
cd ../admin
npm install
```

---

### 3. Configure Environment Variables

Each folder requires its own `.env` file. Use the provided `.env.example` files as templates.

#### 🔹 `/backend/.env`

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

#### 🔹 `/admin/.env`

```env
PORT=3001
```

#### 🔹 `/frontend/.env`

```env
REACT_APP_ADMIN_EMAIL=admin@example.com
REACT_APP_ADMIN_PASSWORD=your_admin_password
```

> 
### 4. Run the Project Locally

Open 3 terminals (or use a process manager):

```bash
# Terminal 1 - Backend
cd backend
node .\index.js

# Terminal 2 - Frontend
cd frontend
npm start

# Terminal 3 - Admin Panel
cd admin
npm start
```
### 5. Project Run on this PORTS

backend
PORT:4000

frontend
PORT:3000

admin
PORT:3001
