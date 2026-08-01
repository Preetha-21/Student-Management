# Student Management System

A full-stack Student Management System developed using Express.js Node.js, MySQL, HTML,CSS, Bootstrap, and JavaScript. The application enables faculty members to securely manage student records based on their assigned subjects.

## 🚀 Features

- Faculty Registration and Login
- Secure Authentication
- Subject-wise Student Management
- Add Student Records
- View Student Records
- Update Student Details
- Delete Student Records
- Search Students
- Responsive User Interface
- MySQL Database Integration

## 🛠️ Technologies Used

- Frontend: HTML5, CSS3, Bootstrap, JavaScript
- Backend: Node.js, Express.js
- Database: MySQL
- Tools: VS Code, MySQL Workbench

## 📁 Project Structure

```
Student-Management-System/
│
├── public/
│   ├── register.html
│   ├── login.html
│   ├── dashboard.html
│   └── style.css
│
├── db.js
├── server.js
├── package.json
├── package-lock.json
└── README.md
```



### 1. Clone the repository

```bash
git clone <repository-url>
```

### 2. Navigate to the project folder

```bash
cd Student-Management-System
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create the MySQL Database

```sql
CREATE DATABASE studentdb;
USE studentdb;
```

### 5. Create the Faculty Table

```sql
CREATE TABLE faculty(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    password VARCHAR(50),
    subject VARCHAR(50)
);
```

### 6. Create the Students Table

```sql
CREATE TABLE students(
    id INT AUTO_INCREMENT PRIMARY KEY,
    rollno INT UNIQUE,
    name VARCHAR(50),
    marks INT,
    subject VARCHAR(50)
);
```

### 7. Configure Database

Update your MySQL credentials in `db.js`.

```javascript
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "YOUR_PASSWORD",
    database: "studentdb"
});
```

### 8. Run the Project

```bash
node server.js
```

## ▶️ Open in Browser

```
http://localhost:3000
```

## 📌 Future Enhancements

- Password Encryption
- Attendance Management
- Export Student Records
- Marks Analytics Dashboard
- Faculty Profile Management

## 👩‍💻 Author

**Preetha K**
