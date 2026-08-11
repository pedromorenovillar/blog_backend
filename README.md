# Blog API

An API that serves as backend for a small blog website. It handles user registration and login, as well as CRUD operations on blog posts and blog comments. It serves two frontend clients: a public one that caters anonymous and registered users and an admin one for posts authors. The main focus is backend reliability: authentication, authorization, validation, token management and database access through Prisma ORM.

## Screenshots

| <img src="./public/home.jpg" width="200"><br>Home           | <img src="./public/register.jpg" width="200"><br>Register     | <img src="./public/login.jpg" width="200"><br>Log in                  | <img src="./public/new_post.jpg" width="200"><br>New post                  |
| ----------------------------------------------------------- | ------------------------------------------------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| <img src="./public/dashboard.jpg" width="200"><br>Dashboard | <img src="./public/view_posts.jpg" width="200"><br>View posts | <img src="./public/add_post_comment.jpg" width="200"><br>Comment post | <img src="./public/delete_post_comment.jpg" width="200"><br>Delete comment |
|  |

## Live Demo

[View Live Demo](https://blog-public-client-d222d34a08ef.herokuapp.com/)

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
2. Create a `.env` file with the required variables detailed in `.env.example`
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

This project is based on [The Odin Project’s Blog API assignment](https://www.theodinproject.com/lessons/node-path-nodejs-blog-api). I kept the UI intentionally simple so the backend and data flow are the main focus.
