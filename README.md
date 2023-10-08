# Task-Management-API

## Objective

Develop a backend RESTful API using Node.js for managing tasks. Users should be able to create, retrieve, update, and delete tasks.

## Backend Deploy: https://task-management-api-ukl3.onrender.com/

## Requirements

### Endpoints
1. **POST user/register**: Add a new user register.
2. **POST user/login**: user Login.
3. **POST task/tasks**: Add a new task.
4. **GET task/tasks**: Retrieve a list of all tasks.
5. **GET task/tasks/:id**: Retrieve a specific task by ID.
6. **PUT task/tasks/:id**: Update a specific task by ID.
7. **DELETE task/tasks/:id**: Delete a specific task by ID.

### Task Structure

Each task should have the following properties:

- **ID**: A unique identifier for the task.
- **Title**: A brief title describing the task.
- **Description**: Additional details about the task.
- **Creation Date**: The date and time when the task was created.
- **Status**: The status of the task (e.g., pending, completed).

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/try/download/community)

## Setup Instructions

1. **Clone the Repository:**

   ```bash
   git clone <(https://github.com/himanshu60/Task-Management-API)>
   ```

2. **Install Dependencies:**

   Navigate to the project directory and install the required packages using npm:

   ```bash
   cd Task-Management-API
   npm install
   ```

3. **Set Environment Variables:**

   Create a `.env` file in the project root and add the following environment variables:

   ```env
   PORT=8080
   URL="mongoDB url"
   KEY=yourkey
   ```

   Adjust the `PORT` and `URL` variables as needed.


4. **Run the API:**

   Start the API server using npm:

   ```bash
   node index.js
   ```

   The API will be running at `http://localhost:8080`.

## Interacting with Endpoints

### Task Endpoints

#### Create a Task

- **Endpoint:** `POST /tasks`
- **Request Body:**
```json
{
  "title": "Vacation Planning",
  "description": "Plan a summer vacation destination",
  "status": "Pending"
}
```



  Create a new task with the provided title, description, and status (pending/completed).

#### Get All Tasks

- **Endpoint:** `GET /tasks`

  Retrieve a list of all tasks.

#### Get a Specific Task

- **Endpoint:** `GET /tasks/:id`

  Retrieve a specific task by its ID.

#### Update a Task

- **Endpoint:** `PUT /tasks/:id`
- **Request Body:**

  ```json
  {
    "title": "Updated Task Title",
    "description": "Updated Task Description",
    "status": "completed"
  }
  ```

  Update a specific task by its ID with the provided data.

#### Delete a Task

- **Endpoint:** `DELETE /tasks/:id`

  Delete a specific task by its ID.

## Authentication Middleware

### Authenticating Protected Endpoints

To authenticate protected endpoints, you need to include a JWT token in the Authorization header of your requests. Follow these steps to authenticate:

1. **Obtain a JWT Token**

   Make a POST request to the `/login` endpoint with valid credentials to obtain a JWT token:

   - **Endpoint:** `POST /login`
   - **Request Body:**

     ```json
     {
       "email": "himanshu@gmail.com",
       "password": "himanshu"
     }
     ```

     If the credentials are correct, you will receive a JSON response containing the JWT token:

     ```json
     {
       "token": "your-jwt-token"
     }
     ```

2. **Authenticate Protected Endpoints**

   Include the obtained JWT token in the Authorization header of your requests to access protected endpoints:

   - **Endpoint:** Any protected endpoint (e.g., `/tasks`, `/tasks/:id`)
   - **Request Headers:**

     ```
     Authorization: jwt-token
     ```

     Replace `your-jwt-token` with the token obtained in the previous step.

   If the token is valid, the protected endpoint will respond with the appropriate data. If the token is invalid or expired, you will receive a 401 Unauthorized response.

## Error Handling

The API handles errors gracefully and returns appropriate HTTP status codes and error messages in case of failures. The responses include clear error messages to assist developers in diagnosing issues.

Feel free to explore the API endpoints using tools like Postman or integrate them into your applications. If you have any questions or encounter issues, please don't hesitate to reach out. Happy coding!

## Express Rate Limit Middleware

The **Express Rate Limit Middleware** is a powerful tool that helps you control the rate at which clients can make requests to your server. It prevents abuse and ensures the stability and availability of your services by limiting the number of requests from a client within a specified time window.

## Key Features

- **Rate Limiting**: Restrict clients from making too many requests in a short period.
- **Configurable**: Easily adjust the rate limit settings to suit your application's needs.
- **IP-Based Limitation**: Limit requests based on the client's IP address.
- **Custom Messages**: Send custom error messages when rate limits are exceeded.

## Usage

### Installation

To get started with the Express Rate Limit Middleware, install it as a dependency in your Node.js project:

```bash
npm install express-rate-limit
```

### Implementation

Use the middleware in your Express application as shown below:

```javascript
const rateLimit = require('express-rate-limit');

// Create a rate limiter with your desired configuration
const Limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Max 10 requests per IP per hour
  message:
    "Too many attempts from this IP. Please wait for 1 hour and then try again.",
});

// Apply the limiter to specific routes or globally as needed
app.use('/api/sensitive', Limiter);

// Your API routes and other middleware go here
```

### Configuration

You can customize the rate limit by modifying the `windowMs` and `max` options:

- **windowMs**: The time window in milliseconds during which requests are counted. In this example, it's set to 1 hour (3600000 milliseconds).
- **max**: The maximum number of requests allowed per IP address within the specified time window.

--- 
