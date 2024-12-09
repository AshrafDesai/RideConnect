
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