# BookStore 

## 🚀 Installation  
1. **📥 Clone the repository:**  
   ```sh  
   git clone https://github.com/akshaj-22/BookStore.git
   cd backend 
   ```

2. **📦 Install dependencies:**
   ```sh
   npm install
   ```
3. **📦 Start Database:**
   ```sh
   sudo systemctl start postgresql
   ```
   
4. **⚙️ Create a `.env` file** and add MongoDB connection:
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
5. **🚀 Start the server:**
   ```sh
   node server.js
   ```
