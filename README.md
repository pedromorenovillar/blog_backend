# Blog API

## Screenshots

<table>
  <tr>
    <td align="center">
      <img src="public/screenshots/register.png" alt="Register page" width="450"><br>
      <strong>Register</strong>
    </td>
    <td align="center">
      <img src="public/screenshots/login.png" alt="Login page" width="450"><br>
      <strong>Login</strong>
    </td>
    <td align="center">
      <img src="public/screenshots/subdirectory_breadcrumbs.png" alt="Name change page" width="450"><br>
      <strong>Subdirectory and breadcrumbs</strong>
    </td>
  </tr>
  <tr> 
    <td align="center">
      <img src="public/screenshots/name_change.png" alt="Name change page" width="450"><br>
      <strong>Renaming</strong>
    </td>
    <td align="center">
      <img src="public/screenshots/file_details.png" alt="Name change page" width="450"><br>
      <strong>File details</strong>
    </td>
    <td align="center">
      <img src="public/screenshots/error.png" alt="File upload page displaying errors" width="450"><br>
      <strong>Upload displaying errors</strong>
    </td>
  </tr>
</table>

## Live Demo

[View Live Demo](https://file-uploader-b14b40eb7fbc.herokuapp.com/)

## Demo account

To explore the application without creating a new account:

```bash
Email (username): demo@example.com
Password: demo1234
```

## Features

## Technical highlights

## Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![express-validator](https://img.shields.io/badge/express--validator-000000?style=for-the-badge&logo=express&logoColor=white)

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![pg](https://img.shields.io/badge/pg-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/prisma-6366f1?style=for-the-badge&logo=prisma&logoColor=white)

![Passport.js](https://img.shields.io/badge/Passport.js-34E27A?style=for-the-badge&logo=passport&logoColor=black)
![bcryptjs](https://img.shields.io/badge/bcryptjs-525252?style=for-the-badge&logo=javascript&logoColor=F7DF1E)

## How to run locally

1. Install dependencies with `npm install`
2. Create a `.env` file with the required variables:

```bash
DATABASE_URL
PORT
```

3. Run `npm run prisma:migrate` and `npm run prisma:generate`
4. Start the app with `npm run start`

## Architecture

```bash
.
├── server.js                  # Express application setup
├── config/                    # Passport configuration
├── controllers/               # Request handlers
├── db/                        # Prisma query modules
├── lib/                       # Prisma and Cloudinary configuration
├── middleware/                # Authentication middleware
├── prisma/
│   ├── migrations/
│   └── schema.prisma          # Database schema
├── public/                    # CSS and README assets
├── routes/                    # Express route definitions
├── utils/                     # Helper utilities
├── package.json
└── README.md
```

## Project context

This project is based on [The Odin Project’s Blog API assignment](https://www.theodinproject.com/lessons/node-path-nodejs-blog-api).
