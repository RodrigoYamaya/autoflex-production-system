# 🚀 AutoFlex - Production Planning System

## 📋 Overview
**AutoFlex** is a full-stack web application designed to optimize production planning. It manages products and raw materials, calculating the ideal production mix to maximize profit based on available stock and product recipes.

This project was developed as a technical assessment, strictly following:
- RESTful API architecture
- Clean Code principles
- Layered architecture
- Full CRUD operations
- Unit testing for business logic
- **End-to-End (E2E) testing**

---

## 🛠️ Tech Stack

### 🔙 Backend
- **Java 17 / 21**
- **Spring Boot 3** (Web, JPA, Validation)
- **MySQL** (Database)
- **Lombok** (Boilerplate reduction)
- **JUnit 5 & Mockito** (Unit Testing)

### 🎨 Frontend & Testing
- **React** (Vite)
- **TypeScript**
- **Axios** (API integration)
- **Phosphor Icons** (UI Icons)
- **CSS Modules** (Styling)
- **Cypress** (End-to-End Testing)

---

## ⚙️ How to Run the Project

### 1️⃣ Database Setup
Ensure you have **MySQL** installed and running. Create a database named `autoflex_db`:

```sql
CREATE DATABASE autoflex_db;
If necessary, update your database credentials in: backend/src/main/resources/application.properties

2️⃣ Running the Backend
Navigate to the backend folder:

Bash
cd backend
Run the application:

Bash
./mvnw spring-boot:run
The API will be available at: http://localhost:8080

3️⃣ Running the Frontend
Open a new terminal and navigate to the frontend folder:

Bash
cd frontend
Install dependencies:

Bash
npm install
Start the development server:

Bash
npm run dev
The application will be available at: http://localhost:5173

4️⃣ Running E2E Tests (Cypress)
Ensure both Backend and Frontend are running, then execute:

Bash
cd frontend
npx cypress run   # Runs tests in headless mode
# OR
npx cypress open  # Opens the interactive Test Runner
✅ Features
📦 Product Management
Full CRUD operations.

Dynamic recipe composition.

Profit calculation per product.

🏭 Raw Material Management
Inventory CRUD operations.

Real-time stock tracking.

📊 Production Planning
Algorithm that calculates the maximum possible profit.

Prioritizes products with higher profit margins.

Validates stock availability dynamically.

Prevents overconsumption of raw materials.

🧪 Testing Strategy
Backend (Unit Testing)
The backend includes Unit Tests for the core business logic (Production Planning Service).

Bash
cd backend
./mvnw test
Frontend (E2E Testing)
The frontend includes End-to-End tests using Cypress to validate critical user flows (Navigation, Page Load, Product Management).

🧠 Architecture Highlights
Layered architecture (Controller → Service → Repository).

DTO pattern for API communication.

Business logic isolated in Service layer.

Unit testing for critical algorithm.

Clean and modular frontend structure.

👨‍💻 Author
Rodrigo Yamaya Gonçalves