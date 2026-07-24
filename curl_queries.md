# Curl queries

## Post queries

### Get all published posts

```bash
curl http://localhost:3000/posts
```

### Create post

```bash
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTc4NDg4MDUxMywiZXhwIjoxNzg0ODgxNDEzfQ.VOAf5vcSjWT9u-6LKfB7fGKSiTu8i8bAcXUOvtUZCXg" -d '{
    "title": "My second post",
    "content": "No sé ni qué contar"
}' http://localhost:3000/posts/me
```

### Create another post

```bash
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjYsImlhdCI6MTc4NDg4MzkwMywiZXhwIjoxNzg0OTcwMzAzfQ.84ozpX848_FCIt-y68IUA1xLo81pIhCk88wwPPLcdO0" -d '{
    "title": "Primer blog de Pedro",
    "content": "No sé ni qué contar"
}' http://localhost:3000/posts/me
```

### Get all posts from user

```bash
curl -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjYsImlhdCI6MTc4NDg4MzkwMywiZXhwIjoxNzg0OTcwMzAzfQ.84ozpX848_FCIt-y68IUA1xLo81pIhCk88wwPPLcdO0" http://localhost:3000/posts/me
```

## User queries

### Delete all users

```bash
curl -X DELETE http://localhost:3000/users/delete
```

### Register user

```bash
curl -X POST -H "Content-Type: application/json" -d '{
    "firstName": "Ainhoa",
    "lastName": "Bernad",
    "email": "ainhoa@gmail.com",
    "password": "lacucaracha"
}' http://localhost:3000/users/register
```

### Register another user

```bash
curl -X POST -H "Content-Type: application/json" -d '{
    "firstName": "Pedro",
    "lastName": "Moreno",
    "email": "pedro@mail.com",
    "password": "lacucaracha"
}' http://localhost:3000/users/register
```

### Log user in

```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ainhoa@gmail.com","password":"lacucaracha"}' \
  -c cookies.txt
```

### Log user out

```bash
curl -X POST http://localhost:3000/users/logout -b cookies.txt
```
