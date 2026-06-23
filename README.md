Dear Students,

Please fill out the **Project Selection Form** using the link below:

🔗 https://forms.gle/UUgJuqhQxiWt2pgy8

Kindly enter your **Name**, **Roll Number**, and select your **Project Title** carefully. Ensure that all details are correct before submitting the form.

Please submit your response at the earliest.

---

# 📂 Project SRS Repository

All project **Software Requirements Specification (SRS)** documents are available in the GitHub repository below:

🔗 https://github.com/ashokm0603/MERN-Projects.git

Please review the SRS document of your selected project before starting development.

---

# 📚 Learning Resources & Notes

The following notes have been prepared to support your learning and project development:

### HTML Notes

🔗 https://carbonated-cirrus-a0f.notion.site/HTML-Notes-2ad3a34077d18118ab36ca9b13815023

### CSS Notes

🔗 https://carbonated-cirrus-a0f.notion.site/CSS-Notes-19b3a34077d180d184cad6b2b8a30811?source=copy_link

### JavaScript Notes

🔗 https://carbonated-cirrus-a0f.notion.site/Java-Script-1043a34077d180fab107e474631be6b7

### React JS Notes

🔗 https://carbonated-cirrus-a0f.notion.site/React-Js-10c3a34077d18060a692e59fd8553203?source=copy_link

---

## How to Use These Resources

1️⃣ Read the concepts carefully to understand the fundamentals.

2️⃣ Practice the examples and exercises on your own system.

3️⃣ Refer to the notes while working on your project.

4️⃣ Review the project SRS document before starting development.

5️⃣ Reach out if you have any doubts or need clarification.

---


# JSON Web Token (JWT)

## Why Do We Need JWT?

Let's say we are building an API:

- A user logs in and gets a `userId`
- To fetch their private data, the client sends `userId` in each request.

```plaintext
        +---------+                                +-----------+
        |  Client |                                |   Server  |
        +----+----+                                +-----+-----+
             |                                            |
             | POST /login (username, password)           |
             |------------------------------------------->|
             |                                            |
             |         { "userId": 123 }                  |
             |<-------------------------------------------|
             |                                            |
             | GET /profile?userId=123                    |
             |------------------------------------------->|
             |                                            |
             |    Server uses userId=123 directly         |
             |    Returns data of user #123             |
             |<-------------------------------------------|
             |                                            |
             | GET /profile?userId=456   (tampered)       |
             |------------------------------------------->|
             |                                            |
             |   Server trusts userId blindly             |
             |   Leaks private data of user #456        |
             |<-------------------------------------------|
             |                                            |

```

**Problem:**  
If the client just sends `userId=123` in every request, anyone can **change it to `userId=456`** and access another user’s data.

This is a **security risk** because:

- There’s **no proof** that the request came from the actual user
- The server **blindly trusts** the `userId` sent by the client

---

## The Solution — JWT

Instead of sending raw `userId`, we send a **signed token** called **JWT (JSON Web Token)**.

**How it works:**

1. On login, the server creates a JWT containing:
   - `userId`
   - other claims like role, issued time, expiry time
2. The server **signs this JWT using a secret key**
3. The client stores this token
4. On every request, the client sends this token
5. The server verifies the token’s **signature** before trusting it

This ensures:

- The user **cannot change their `userId`** without breaking the signature
- The server can **trust the claims** inside the token

---

## ⚙️ JWT Request-Response Flow

```plaintext
        +---------+                                +-----------+
        |  Client |                                |   Server  |
        +----+----+                                +-----+-----+
             |                                           |
             | POST /login (username, password)          |
             |------------------------------------------>|
             |                                           |
             |            Generate JWT (signed)          |
             |<------------------------------------------|
             |         { token: <JWT> }                  |
             |                                           |
             | GET /profile                              |
             | Authorization: Bearer <JWT>               |
             |------------------------------------------>|
             |                                           |
             |   Verify JWT signature                    |
             |   Return private data                     |
             |<------------------------------------------|
             |                                           |
```

### Skeleton on JWT

```
<header>.<payload>.<signature>

header = base64url(headerInfo)
payload = base64url(claims)
signature = HMACSHA256(
    base64url(header) + "." + base64url(payload),
    secretKey
)

Example:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJyb2xlIjoiU1RVREVOVCIsImlhdCI6MTc1NzcxMDA2NSwiZXhwIjoxNzU3NzEwMTI1fQ.IzhPC5fR9e24UFuXcuaEJ6uO7zi0bTbnC8BT2ahp1DM

Decoded Header:
{
  "alg": "HS256",
  "typ": "JWT"
}

Decoded claims:
{
  "userId": 10, // custom claim
  "role": "STUDENT", // custom claim
  "iat": 1757710065, // registered claim
  "exp": 1757710125 // registered claim
}

Signature can't be decoded as it's a Hash:
HMACSHA256(
  base64url(header) + "." + base64url(payload),
  secretKey
)
```

## JWT Claims ( custom + registered )

In JWT, the **payload** part stores **claims** — pieces of information about the user or the token itself.

---

### 1. Registered (Predefined) Claims

These are **standardized claim names** defined by the [JWT RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519).  
They are **optional**, but if you use them, they must follow their official meaning.

### Important Registered Claims

| Claim | Meaning                                         | Example                |
| ----- | ----------------------------------------------- | ---------------------- |
| `iss` | **Issuer** — who created the token              | `"https://domain.com"` |
| `sub` | **Subject** — who the token is about            | `"123456"` (user ID)   |
| `exp` | **Expiration time** (Unix timestamp)            | `1736899200`           |
| `nbf` | **Not before** — token is valid after this time | `1736812800`           |
| `iat` | **Issued at** — when token was issued           | `1736809200`           |

These are used for **security and validation** purposes (checking token validity, issuer, expiry, etc.)

---

## 👤 2. Custom (User-defined) Claims

These are **your own fields** used to carry application-specific data inside the token.  
They have **no special meaning** to JWT libraries — they are just your data.

### Example

```json
{
  "userId": 123,
  "role": "STUDENT",
  "email": "abc@example.com"
}
```

## Error Handling

While verifying the JWT token we might end up getting different errors like:

| Error Name            | When It Happens                                         | Example Cause                                                    | How to Handle                                                                  |
| --------------------- | ------------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| **TokenExpiredError** | Token's `exp` time has passed                           | Access token is older than its validity period                   | Return **401**, tell client to use **refresh token** to get a new access token |
| **JsonWebTokenError** | Token is invalid or tampered                            | Token modified, corrupted format, wrong secret or algorithm used | Return **401**, reject request and log incident                                |
| **NotBeforeError**    | Token has `nbf` (not before) claim set to a future time | Token used before its valid start time                           | Return **401**, ask client to **retry after some time**                        |
| **Missing Token**     | No token is sent in request                             | User forgot to log in or cookie/header missing                   | Return **401**, ask                                                            |






These resources will help you strengthen your understanding of web development concepts and successfully complete your project work.

**Happy Learning and Happy Coding! 🚀**
