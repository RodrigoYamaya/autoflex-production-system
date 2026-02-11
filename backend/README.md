🚀 AutoFlex - Production Planning System
📋 Overview

AutoFlex is a full-stack web application designed to optimize production planning.
It manages products and raw materials, calculating the ideal production mix to maximize profit based on available stock and product recipes.

This project was developed as a technical assessment, following:

RESTful API architecture

Clean Code principles

Layered architecture

Full CRUD operations

Unit testing for business logic

🛠️ Tech Stack
🔙 Backend

Java 17 / 21

Spring Boot 3

Spring Web

Spring Data JPA

Validation

MySQL

Lombok

JUnit 5

Mockito

🎨 Frontend

React (Vite)

TypeScript

Axios

Phosphor Icons

CSS Modules

⚙️ How to Run the Project
1️⃣ Database Setup

Make sure you have MySQL installed and running.

Create the database:

CREATE DATABASE autoflex_db;


If necessary, update your database credentials in:

backend/src/main/resources/application.properties

2️⃣ Running the Backend

Navigate to the backend folder:

cd backend


Run the application:

./mvnw spring-boot:run


The API will be available at:

http://localhost:8080

3️⃣ Running the Frontend

Open a new terminal and navigate to the frontend folder:

cd frontend


Install dependencies:

npm install


Start the development server:

npm run dev


The application will be available at:

http://localhost:5173

✅ Features
📦 Product Management

Full CRUD operations

Dynamic recipe composition

Profit calculation per product

🏭 Raw Material Management

Inventory CRUD operations

Real-time stock tracking

📊 Production Planning

Calculates the maximum possible profit

Prioritizes products with higher profit margins

Validates stock availability dynamically

Prevents overconsumption of raw materials

🧪 Testing

The backend includes Unit Tests for the core business logic (Production Planning Service).

To run the tests:

cd backend
./mvnw test

🧠 Architecture Highlights

Layered architecture (Controller → Service → Repository)

DTO pattern for API communication

Business logic isolated in Service layer

Unit testing for critical algorithm

Clean and modular frontend structure

👨‍💻 Author

Rodrigo Yamaya Gonçal