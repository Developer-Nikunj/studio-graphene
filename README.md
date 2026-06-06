# Personal Task Manager

A full-stack task management application that allows users to create, update, delete, and organize personal tasks through a clean and responsive interface. The application also supports drag-and-drop task reordering for better task management.

## Demo

🔗 **Live Demo:** *https://studio-graphene-ashy.vercel.app/*

---

# Features

* Create Tasks
* Update Tasks
* Delete Tasks
* View All Tasks
* View Task Details
* Drag & Drop Task Reordering
* Task Status Management
* Responsive UI
* After Drag and Drop , the tasks maintain that order, even after refresh.

---

# Tech Stack

## Backend

* Node.js
* Express.js
* SQLite3 ----> PostgreSql (to deploy on render)
* Sequelize ORM

The backend is built as a separate service using SQLite as a lightweight file-based database. Sequelize ORM is used for data modeling and database operations.

## Frontend

* Next.js
* Tailwind CSS
* DnD Kit

The frontend is developed using Next.js to leverage both SSR and CSR. Tailwind CSS is used for styling, while DnD Kit enables drag-and-drop functionality.

---

# Running the Project Locally

## 1. Clone the Repository

```bash
git clone https://github.com/developer-nikunj/studio-graphene
```

## 2. Install Dependencies

Install dependencies in both frontend and backend directories:

```bash
npm install
```

## 3. Start Development Servers

```bash
npm run dev
```

Run the above command separately in both frontend and backend folders.

---

# API Documentation

## Base URL

```http
/api/v1
```

---

## 1. Get All Tasks

**Method:** `GET`

```http
/api/v1/task
```

### Sample Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Tasks fetched successfully",
  "data": [
    {
      "id": 1,
      "title": "Learn Kafka",
      "isCompleted": false,
      "isActive": true,
      "dueDate": "2026-06-14",
      "order": 1000
    }
  ]
}
```

---

## 2. Create Task

**Method:** `POST`

```http
/api/v1/task
```

### Request Body

```json
{
  "title": "Learn Kafka",
  "description": "Finish Kafka setup",
  "isActive": true,
  "dueDate": "2026-06-14"
}
```

### Sample Response

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Task created successfully",
  "data": {
    "id": 7,
    "title": "Learn Kafka",
    "isCompleted": false,
    "isActive": true,
    "dueDate": "2026-06-14"
  }
}
```

---

## 3. Get Task By ID

**Method:** `GET`

```http
/api/v1/task/:taskId
```

### Sample Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Task Found successfully",
  "data": {
    "id": 5,
    "title": "Learn Kafka",
    "description": "Finish Kafka setup",
    "isCompleted": true,
    "isActive": true,
    "dueDate": "2026-06-04"
  }
}
```

---

## 4. Update Task

**Method:** `PUT`

```http
/api/v1/task/:taskId
```

### Request Body

```json
{
  "title": "Learn Kafka",
  "description": "Finish Kafka setup",
  "isCompleted": true,
  "isActive": true,
  "dueDate": "2026-06-04"
}
```

### Sample Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Task updated successfully",
  "data": {
    "id": 5,
    "title": "Learn Kafka",
    "isCompleted": true
  }
}
```

---

## 5. Delete Task

**Method:** `DELETE`

```http
/api/v1/task/:taskId
```

### Sample Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Task deleted successfully",
  "data": {
    "taskId": 1
  }
}
```

---

## 6. Reorder Task

**Method:** `POST`

```http
/api/v1/re-order
```

### Request Body

```json
{
  "previousOrder": 1000,
  "taskId": 2,
  "nextOrder": 1125
}
```

### Sample Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Task reordered successfully",
  "data": {
    "id": 2,
    "order": 1062.5
  }
}
```

---

# Project Structure

## Backend

```text
backend/
├── index.js
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── task.controller.js
│   ├── routes/
│   │   └── task.routes.js
│   ├── models/
│   │   └── tasks.model.js
│   ├── middlewares/
│   │   └── error.middleware.js
│   └── utils/
│       └── ApiError.js
└── database/
    └── app.db
```

### Responsibilities

| File                | Description             |
| ------------------- | ----------------------- |
| index.js            | Application entry point |
| db.js               | Database configuration  |
| task.routes.js      | API routes              |
| task.controller.js  | Business logic          |
| tasks.model.js      | Database operations     |
| error.middleware.js | Error handling          |
| ApiError.js         | Custom error utility    |
| app.db              | SQLite database         |

---

## Frontend

```text
frontend/
├── src/
│   ├── app/
│   │   ├── page.js
│   │   ├── layout.js
│   │   └── TasksClient.jsx
│   ├── components/
│   │   ├── NavbarSummary/
│   │   ├── Column/
│   │   ├── Task/
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── Modal/
│   │   ├── AddTaskModal/
│   │   ├── EditTaskModal/
│   │   └── DeleteTaskModal/
│   └── services/
│       └── taskService.js
```

### Responsibilities

| Component       | Description                    |
| --------------- | ------------------------------ |
| TasksClient     | Main task management component |
| NavbarSummary   | Displays task statistics       |
| Column          | Displays grouped tasks         |
| Task            | Represents a task card         |
| AddTaskModal    | Creates tasks                  |
| EditTaskModal   | Updates tasks                  |
| DeleteTaskModal | Deletes tasks                  |
| taskService.js  | Handles API communication      |

---

# Application Flow

```text
User
 ↓
Next.js Frontend
 ↓
taskService
 ↓
Express API
 ↓
Controller
 ↓
Model
 ↓
SQLite Database
```

---

# Future Improvements

* User Authentication
* Task Categories
* Due Date Notifications
* Dark Mode

