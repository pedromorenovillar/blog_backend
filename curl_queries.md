# Curl queries

## Comment queries

### Comment post (Ainhoa on Pedro's)

```bash
curl -X POST http://localhost:3000/comments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTc4NDg4ODkxNSwiZXhwIjoxNzg0OTc1MzE1fQ.-vlxhPkcGFAhnJPHtYCxdJyNfWuz3da8gY2frRwXfC0" \
  -d '{
    "postId": 1,
    "content": "Great post! I really enjoyed reading it."
  }'
```

## Post queries

### Read comments from post

```bash
curl http://localhost:3000/posts/1/comments
```

### Unpublish post by id

```bash
curl -X PATCH -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTc4NDg4ODkxNSwiZXhwIjoxNzg0OTc1MzE1fQ.-vlxhPkcGFAhnJPHtYCxdJyNfWuz3da8gY2frRwXfC0" http://localhost:3000/posts/5/unpublish
```

### Publish post by id

```bash
curl -X PATCH -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTc4NDg4ODkxNSwiZXhwIjoxNzg0OTc1MzE1fQ.-vlxhPkcGFAhnJPHtYCxdJyNfWuz3da8gY2frRwXfC0" http://localhost:3000/posts/5/publish
```

### Delete post by id

````bash
curl -X DELETE -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTc4NDg4ODkxNSwiZXhwIjoxNzg0OTc1MzE1fQ.-vlxhPkcGFAhnJPHtYCxdJyNfWuz3da8gY2frRwXfC0" http://localhost:3000/posts/2

### Update post by id

```bash
curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTc4NDg4ODkxNSwiZXhwIjoxNzg0OTc1MzE1fQ.-vlxhPkcGFAhnJPHtYCxdJyNfWuz3da8gY2frRwXfC0" -d '{
    "title": "Ainhoa'\''s second post updated again",
    "content": "Se me ha ido el santo al cielo"
}' http://localhost:3000/posts/2

### Get single post by Id

```bash
curl http://localhost:3000/posts/3
````

### Get all published posts

```bash
curl http://localhost:3000/posts
```

### Create post Ainhoa

```bash
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTc4NDg4ODkxNSwiZXhwIjoxNzg0OTc1MzE1fQ.-vlxhPkcGFAhnJPHtYCxdJyNfWuz3da8gY2frRwXfC0" -d '{
    "title": "My second post (Ainhoa)",
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

### Register third user (with passwordConfirm for validation)

```bash
curl -X POST -H "Content-Type: application/json" -d '{
    "firstName": "Aimar",
    "lastName": "Moreno",
    "email": "aimar@mail.com",
    "password": "ferias",
    "passwordConfirm": "ferias"
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
