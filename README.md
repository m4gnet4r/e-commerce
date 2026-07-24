# 🛍️ E-Commerce Platform

A full-stack **MERN-based E-Commerce Platform** that provides a complete online shopping experience with secure authentication, role-based authorization, product management, shopping cart, and order management. The platform is designed with scalability, security, and an intuitive user experience in mind.

---

## 🚀 Features

### 👤 User Features

- User Registration & Login
- Secure JWT Authentication
- Password Encryption using bcrypt
- Browse Products
- Product Details Page
- Add to Cart
- Checkout Process
- Place Orders
- View Order History
- Persistent Login Sessions

### 👨‍💼 Admin Features

- Admin Login
- Role-Based Authorization
- Dashboard Overview
- Manage Inventory
- View All Orders
- Update Order Status
- Manage Users
- Secure Admin Routes

---

# 🛠️ Tech Stack

## Frontend

- React.js
- React Router DOM
- Axios
- Context API
- Tailwind CSS

## Backend

- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Token)
- bcrypt.js
- CORS

---

# 📁 Project Structure

```
Ecommerce-Platform/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── services/
│   ├── assets/
│   ├── App.js
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── data/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# 🔐 Authentication & Security

- JWT Authentication
- Password Hashing using bcrypt
- Protected Routes
- Role-Based Access Control
- Authentication Middleware

---

# 👥 User Roles

## Customer

- Register/Login
- Browse Products
- Search Products
- Manage Shopping Cart
- Checkout/place orders
- View Order History

## Admin

- Dashboard Access
- Product Management
- Inventory Management
- Order Management
- User Management

---

# 📄 Pages

### 🏠 Home Page

- Categories
- Navigation Bar
- Search Products

### 🔑 Authentication

- Login
- Sign Up
- Secure JWT Authentication

### 🛍️ Shopping Cart

- Add Products
- Remove Products
- Update Quantity
- View Total Price

### 💳 Checkout

- Shipping Details
- Order Summary
- Place Order

### 📦 Orders

- View Previous Orders
- Track Order Status

### ⚙️ Admin Dashboard

- Manage Products
- Manage Orders
- Manage Users

---

# 🔄 Application Workflow

```
User Registration/Login
          │
          ▼
JWT Authentication
          │
          ▼
Browse Products
          │
          ▼
Add Products to Cart
          │
          ▼
Checkout
          │
          ▼
Place Order
          │
          ▼
Store Order in MongoDB
          │
          ▼
Admin Processes Order
```

---

# ⚙️ Installation

## Clone the Repository

```bash
git clone https://github.com/yourusername/e-commerce.git

cd e-commerce
```

---

## Backend Setup

```bash
cd server

npm install

npm run dev
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm start
```

---

# 🔑 Environment Variables

Create a `.env` file inside the **server** folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

```

---

# 📡 REST API

## Authentication

- POST /api/auth/register
- POST /api/auth/login

## Products

- GET /api/products
- GET /api/products/:id
- POST /api/products *(Admin)*
- PUT /api/products/:id *(Admin)*
- DELETE /api/products/:id *(Admin)*

## Cart

- GET /api/cart
- POST /api/cart
- PUT /api/cart/:id
- DELETE /api/cart/:id

## Orders

- POST /api/orders
- GET /api/orders
- GET /api/orders/:id
- PUT /api/orders/:id *(Admin)*

# 📚 Learning Outcomes

Through this project, I gained practical experience in:

- Full-Stack MERN Development
- REST API Development
- JWT Authentication
- Role-Based Authorization
- MongoDB Database Design
- CRUD Operations
- React State Management
- Express Middleware
- Client-Server Architecture

---

# 👨‍💻 Author

**Yash JAIN**

A full-stack MERN E-Commerce Platform developed to demonstrate modern web development practices, scalable backend architecture, secure authentication, and an intuitive online shopping experience.
