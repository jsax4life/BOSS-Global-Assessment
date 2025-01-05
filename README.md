
## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests


## unit tests
$ npm run test

# e2e tests
$ npm run test:e2e


## Developer

- Author - Bello John

## License
This project is licensed under the MIT License.

## Description

This project is a basic authentication system built with NestJS, SQLite, and JWT. It provides user signup, login, JWT-based authentication, password recovery, role-based authentication, and secure APIs.

## Project Setup

Prerequisites
Node.js (v18.x or above)
npm (v8.x or above)
Docker (optional, for Dockerization)
Postman or curl (for testing APIs)


## Installation
1. Clone the repository:

git clone https://github.com/jsax4life/BOSS-Global-Assessment.git
cd jwt-auth-system-assessment

2. Install dependencies:
npm install

3. (Optional) to run the app with Docker:
Build and run the containers: docker-compose up --build

This will set up your app with a SQLite database in Docker.

4. If you're running locally, set up environment variables by creating a .env file: JWT_SECRET=your-secret-key


## API Documentation
1. Signup API
URL: /auth/signup
Method: POST
Request Body: {
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123"
}
      * Response (Success)  {
        "message": "User registered successfully",
        "user": {
          "id": 1,
          "name": "John Doe",
          "email": "johndoe@example.com"
        }
      }
      * Response (Error): {
        "message": "User already exists"
      }
2. Login API
URL: /auth/login
Method: POST
Request Body: {
  "email": "johndoe@example.com",
  "password": "password123"
}


3. Profile API (JWT Protected)
URL: /users/profile
Method: GET
Headers: {
  "Authorization": "Bearer <jwt-token>"
}


4. Forgot Password API
URL: /auth/forgot-password
Method: POST
Request Body: {
  "email": "johndoe@example.com"
}
  * Response (Success): {
    "message": "Password reset link sent"
  }

  * Response (Error): {
  "message": "User not found"
}
Note: No Email Transport was implemented. The reset email was simply logged to the console and can be accessed on the console when the forgot-password route is accessed.


5. Reset Password API (with token)
URL: /auth/reset-password/:token
Method: POST
Request Body: {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "newPassword" : "newpassword123"
}

Response (Success):{
  "message": "Password reset successfully"
}

Response (Error): {
  "message": "Invalid or expired token"
}



## Role-based Authentication
Admin routes and user routes are separated.
Only users with an admin role can access certain routes like /admin 


## Assumptions:
The app is built using SQLite as the database.
The app uses JWT for authentication, with the secret key defined in the .env file.
Passwords are hashed using bcrypt.
Role-based authentication is included, but you can extend it to suit more roles.







