# 📚 BookStore 
**BookStore is a user-friendly online platform where book lovers can browse, search, and purchase their favorite books effortlessly. Built using the PERN stack (PostgreSQL, Express.js, React.js, and Node.js) this application provides a platform for users to purchase the available books, search for books by book title, and place their books to the cart. It uses Role-Based Access Control (RBAC) with two roles: Admin, User.The admin have the functionality to (add/ delete/ update) books.**

## 🔑 FEATURES

### 👤 For Users:
- **Login & Signup**: Secure user authentication.
- **View Available Books**: Browse a list of available books.
- **Search by Specialization**: Find books based on their title of the book.
- **Add to Cart**: Add books to their cart.
- **Remove from Cart**: Remove books from cart.
- **Edit Profile**: Update personal profile information.

### 🔒 For Administrators:
- **Administrator Login**: Secure admin authentication.
- **Add Books**: Add new books to the application, specifying their title, description and price.
- **Edit Book Details**: Modify existing Book information.
- **Delete Books**: Remove books from the system as needed.

## Tech Stack

- **Frontend:** ReactJS
- **Backend:** Node.js with ExpressJS
- **Database:** PostgreSQL

## 🛠️ Other Tools

- **JWT (JSON Web Tokens):** Secures user authentication and manages sessions.
- **RBAC:** Limits functionality based on roles (admin, user).

## 🚀 Installation  
1. **📥 Clone the repository:**  
   ```sh  
   git clone https://github.com/akshaj-22/BookStore.git
   ```

2. **📥 Switch to backend:**  
   ```sh  
   cd backend 
   ```

3. **📦 Install dependencies:**
   ```sh
   npm install
   ```
4. **📦 Start Database:**
   ```sh
   sudo systemctl start postgresql
   ```
   
5. **⚙️ Create a `.env` file** 
   ```env
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   DB_PORT=your_database_port
   DB_DIALECT=postgres
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
6. **🚀 Start the Backend:**
   ```sh
   node server.js
   ```

7. **Open new Terminal**
   **🚀 Switch to Frontend:**
   ```sh
   cd frontend
   ```

8. **📦 Install dependencies:**
   ```sh
   npm install
   ```

9. **🚀 Start the Frontend:**
   ```sh
   npm run dev
   ```

- **Open your web browser and navigate to**
```
http://localhost:5173/
```
**to view the application.**
