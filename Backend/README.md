
# User Registration API

## Endpoint: `/users/register`

### Method: `POST`

This endpoint registers a new user by accepting their email, full name (first and last name), and password. The server validates the provided data and, if successful, registers the user, generates an authentication token, and returns it in the response.

### Required Data (Request Body)

The request body must be a JSON object with the following structure:

| Field                | Type   | Description                                          | Required |
|----------------------|--------|------------------------------------------------------|----------|
| `email`              | String | The user's email address. Must be a valid email format. | Yes      |
| `fullname.firstname` | String | The first name of the user. Must be at least 3 characters long. | Yes      |
| `fullname.lastname`  | String | The last name of the user. Must be at least 3 characters long. | Yes      |
| `password`           | String | The user's password. Must be at least 6 characters long. | Yes      |

**Example Request Body:**

```json
{
    "email": "user@example.com",
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "password": "secretPassword123"
}
```

### Validation Rules

- **Email**: Must be a valid email address. If the email format is invalid, the server will respond with a `400` status code and an error message.
- **First Name**: The first name should be at least 3 characters long. If it's shorter, the server will return a validation error.
- **Last Name**: The last name should be at least 3 characters long. If it's shorter, the server will return a validation error.
- **Password**: The password should be at least 6 characters long. If it's shorter, the server will return a validation error.

If any of the above validations fail, the server will return a `400` status code with a list of errors.

### Response

If the registration is successful, the server will return a `201` status code and a JSON response with the following structure:

- `token`: A JWT token for the newly registered user. This token can be used for authenticating the user in subsequent requests.
- `user`: The newly created user object (excluding the password field).

**Example Success Response:**

```json
{
    "token": "jwt_token_here",
    "user": {
        "_id": "user_id_here",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "user@example.com",
        "socketId": null
    }
}
```

### Status Codes

- **201 Created**: The user has been successfully registered. The response includes the `token` and the `user` object.
- **400 Bad Request**: The request is invalid due to missing or incorrect data. This could occur due to validation errors (e.g., invalid email format, password too short). The response will contain the error details.

### Error Handling

If any of the fields are missing or invalid, the server will respond with a `400` status code. The response will include an array of error messages explaining what went wrong.

**Example Error Response (Validation Errors):**

```json
{
    "errors": [
        {
            "msg": "Invalid Email",
            "param": "email",
            "location": "body"
        },
        {
            "msg": "First name must be at least 3 characters long",
            "param": "fullname.firstname",
            "location": "body"
        },
        {
            "msg": "Password must be at least 6 characters long",
            "param": "password",
            "location": "body"
        }
    ]
}
```

### Example of a Complete Flow

1. **Request**:
   - **Method**: `POST`
   - **URL**: `/users/register`
   - **Body**:
     ```json
     {
         "email": "user@example.com",
         "fullname": {
             "firstname": "John",
             "lastname": "Doe"
         },
         "password": "secretPassword123"
     }
     ```

2. **Response (Success)**:
   - **Status**: `201 Created`
   - **Body**:
     ```json
     {
         "token": "jwt_token_here",
         "user": {
             "_id": "user_id_here",
             "fullname": {
                 "firstname": "John",
                 "lastname": "Doe"
             },
             "email": "user@example.com",
             "socketId": null
         }
     }
     ```

3. **Response (Error)**:
   - **Status**: `400 Bad Request`
   - **Body**:
     ```json
     {
         "errors": [
             {
                 "msg": "Invalid Email",
                 "param": "email",
                 "location": "body"
             },
             {
                 "msg": "First name must be at least 3 characters long",
                 "param": "fullname.firstname",
                 "location": "body"
             }
         ]
     }
     ```

---

## Dependencies

- `express-validator`: For input validation.
- `mongoose`: MongoDB ODM for managing user data.
- `bcrypt`: For hashing and comparing passwords.
- `jsonwebtoken`: For generating JWT authentication tokens.

---
### Documentation for `/users/login` Endpoint

#### Endpoint
**`POST /users/login`**

#### Description
This endpoint is used to authenticate a user by validating their email and password. Upon successful login, a JWT (JSON Web Token) is returned, along with the user's details.

---

### Request

**Headers**
| Key           | Value                | Required |
|---------------|----------------------|----------|
| Content-Type  | `application/json`   | Yes      |

**Body (JSON)**
| Field     | Type   | Required | Description                            |
|-----------|--------|----------|----------------------------------------|
| `email`   | String | Yes      | The email address of the user.         |
| `password`| String | Yes      | The password of the user.              |

**Example**
```json
{
    "email": "user@example.com",
    "password": "password123"
}
```

---

### Response

**Success Response**
- **Status Code**: `200 OK`
- **Body**:
    ```json
    {
        "token": "<JWT_TOKEN>",
        "user": {
            "_id": "63d23f1f2c10f02c3f1b4c3d",
            "fullname": {
                "firstname": "John",
                "lastname": "Doe"
            },
            "email": "user@example.com",
            "socketId": null
        }
    }
    ```

**Error Responses**

1. **Invalid Request Body**
   - **Status Code**: `400 Bad Request`
   - **Body**:
     ```json
     {
         "errors": [
             {
                 "msg": "Invalid Email",
                 "param": "email",
                 "location": "body"
             }
         ]
     }
     ```

2. **User Not Found**
   - **Status Code**: `404 Not Found`
   - **Body**:
     ```json
     {
         "message": "Invalid email or password"
     }
     ```

3. **Invalid Password**
   - **Status Code**: `400 Bad Request`
   - **Body**:
     ```json
     {
         "message": "Invalid Password"
     }
     ```

4. **Server Error**
   - **Status Code**: `500 Internal Server Error`
   - **Body**:
     ```json
     {
         "message": "Internal Server Error"
     }
     ```

---

### Validation Rules
- **`email`**: Must be a valid email address.
- **`password`**: Must be at least 6 characters long.

---

### Usage Notes
- Ensure to use the correct headers and HTTP method (`POST`).
- Use the returned token for subsequent authenticated requests by including it in the `Authorization` header as `Bearer <JWT_TOKEN>`.

---

### Example cURL Command
```bash
curl -X POST http://localhost:3000/users/login \
-H "Content-Type: application/json" \
-d '{
    "email": "user@example.com",
    "password": "password123"
}'
```

### API Documentation

---

# **GET** `/users/profile`
Retrieve the profile of the authenticated user.

- **URL**: `/users/profile`
- **Method**: `GET`
- **Headers**:
  - `Authorization: Bearer <token>` (Required)  
- **Response**:
  - **Status Code**: `200 OK`
    - **Body**:
      ```json
      {
          "_id": "64c3d5f3e53d12345678abc9",
          "fullname": {
              "firstname": "John",
              "lastname": "Doe"
          },
          "email": "johndoe@example.com",
          "socketId": null
      }
      ```
  - **Status Code**: `401 Unauthorized`
    - **Body**:
      ```json
      {
          "message": "Unauthorized"
      }
      ```

---

# **GET** `/users/logout`
Logs out the user by clearing the token and blacklisting it.

- **URL**: `/users/logout`
- **Method**: `GET`
- **Headers**:
  - `Authorization: Bearer <token>` (Required)
- **Response**:
  - **Status Code**: `200 OK`
    - **Body**:
      ```json
      {
          "message": "Logged Out Successfully!"
      }
      ```
  - **Status Code**: `401 Unauthorized`
    - **Body**:
      ```json
      {
          "message": "Unauthorized"
      }
      ```

---

### Notes
- Ensure the `Authorization` header contains a valid token for accessing the `/users/profile` and `/users/logout` endpoints.
- Tokens are blacklisted upon logout to prevent reuse.


## Captain Routes

The following routes allow captains to register, log in, access their profile, and log out.

### 1. Register a Captain

**URL**: `/captains/register`  
**Method**: `POST`

#### Request Body (JSON):
```json
{
    "email": "captain@example.com",
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "password": "securepassword123",
    "vehicle": {
        "color": "Red",
        "plate": "XYZ1234",
        "capacity": 4,
        "vehicleType": "car"
    }
}
```

#### Validation:
- `email`: Must be a valid email address.
- `fullname.firstname`: Must be at least 3 characters long.
- `fullname.lastname`: Optional, but can be added.
- `password`: Must be at least 6 characters long.
- `vehicle.color`: Must be at least 3 characters long.
- `vehicle.plate`: Must be at least 3 characters long.
- `vehicle.capacity`: Must be an integer with a minimum value of 1.
- `vehicle.vehicleType`: Must be one of the following values: `car`, `motorcycle`, `auto`.

#### Sample Response (Success):
```json
{
    "token": "your-jwt-token-here",
    "captain": {
        "_id": "captainId",
        "email": "captain@example.com",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "vehicle": {
            "color": "Red",
            "plate": "XYZ1234",
            "capacity": 4,
            "vehicleType": "car"
        }
    }
}
```

#### Sample Response (Error):
```json
{
    "errors": [
        {
            "msg": "Invalid Email",
            "param": "email",
            "location": "body"
        }
    ]
}
```

### 2. Login a Captain

**URL**: `/captains/login`  
**Method**: `POST`

#### Request Body (JSON):
```json
{
    "email": "captain@example.com",
    "password": "securepassword123"
}
```

#### Validation:
- `email`: Must be a valid email address.
- `password`: Must be at least 6 characters long.

#### Sample Response (Success):
```json
{
    "token": "your-jwt-token-here",
    "captain": {
        "_id": "captainId",
        "email": "captain@example.com",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "vehicle": {
            "color": "Red",
            "plate": "XYZ1234",
            "capacity": 4,
            "vehicleType": "car"
        }
    }
}
```

#### Sample Response (Error):
```json
{
    "message": "Invalid email or password"
}
```

### 3. Get Captain Profile

**URL**: `/captains/profile`  
**Method**: `GET`  
**Authentication**: Requires a valid JWT token in the `Authorization` header or a `token` cookie.

#### Sample Response (Success):
```json
{
    "_id": "captainId",
    "email": "captain@example.com",
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "vehicle": {
        "color": "Red",
        "plate": "XYZ1234",
        "capacity": 4,
        "vehicleType": "car"
    }
}
```

### 4. Logout a Captain

**URL**: `/captains/logout`  
**Method**: `GET`  
**Authentication**: Requires a valid JWT token in the `Authorization` header or a `token` cookie.

#### Sample Response (Success):
```json
{
    "message": "Logged Out Successfully!"
}
```

---

### Error Codes:

- **400**: Bad Request (e.g., validation errors)
- **401**: Unauthorized (e.g., missing or invalid token)
- **404**: Not Found (e.g., captain not found during login)
- **500**: Internal Server Error (e.g., unexpected server error)

---

