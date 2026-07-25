# Curl queries

## Comment queries

### Update comment

```bash
curl -X PUT http://localhost:3000/api/comments/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTc4NDk3OTUwNiwiZXhwIjoxNzg1MDY1OTA2fQ.aHPrXJrnpSOZ82SsW80w94uy1oBuJ-47mej6SXtR5k4" \
  -d '{
    "content": "On second thought, I do not think it was that good..."
  }'
```

### Delete comment

```bash
curl -X DELETE http://localhost:3000/api/comments/3 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTc4NDk3OTUwNiwiZXhwIjoxNzg1MDY1OTA2fQ.aHPrXJrnpSOZ82SsW80w94uy1oBuJ-47mej6SXtR5k4"
```

### Create comment over 3000 chars

`````bash

curl -X POST http://localhost:3000/api/comments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTc4NDk3OTUwNiwiZXhwIjoxNzg1MDY1OTA2fQ.aHPrXJrnpSOZ82SsW80w94uy1oBuJ-47mej6SXtR5k4" \
  -H "Content-Type: application/json" \
  -d "$(python3 -c 'import json; print(json.dumps({"postId": 1, "content": "a" * 3100}))')"
```

### Create comment (Ainhoa on Pedro's)

```bash
curl -X POST http://localhost:3000/api/comments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTc4NDk3OTUwNiwiZXhwIjoxNzg1MDY1OTA2fQ.aHPrXJrnpSOZ82SsW80w94uy1oBuJ-47mej6SXtR5k4" \
  -d '{
    "postId": 1,
    "content": "Great post! I really enjoyed reading it."
  }'
```

## Post queries

### Read comments from post

```bash
curl http://localhost:3000/api/posts/1/comments
```

### Unpublish post by id

```bash
curl -X PATCH -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTc4NDg4ODkxNSwiZXhwIjoxNzg0OTc1MzE1fQ.-vlxhPkcGFAhnJPHtYCxdJyNfWuz3da8gY2frRwXfC0" http://localhost:3000/api/posts/5/unpublish
```

### Publish post by id

```bash
curl -X PATCH -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTc4NDg4ODkxNSwiZXhwIjoxNzg0OTc1MzE1fQ.-vlxhPkcGFAhnJPHtYCxdJyNfWuz3da8gY2frRwXfC0" http://localhost:3000/api/posts/5/publish
```

### Delete post by id

````bash
curl -X DELETE -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTc4NDg4ODkxNSwiZXhwIjoxNzg0OTc1MzE1fQ.-vlxhPkcGFAhnJPHtYCxdJyNfWuz3da8gY2frRwXfC0" http://localhost:3000/api/posts/2

### Update post by id

```bash
curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTc4NDg4ODkxNSwiZXhwIjoxNzg0OTc1MzE1fQ.-vlxhPkcGFAhnJPHtYCxdJyNfWuz3da8gY2frRwXfC0" -d '{
    "title": "Ainhoa'\''s second post updated again",
    "content": "Se me ha ido el santo al cielo"
}' http://localhost:3000/api/posts/2

### Get single post by Id

```bash
curl http://localhost:3000/api/posts/3
`````

### Get all published posts

```bash
curl http://localhost:3000/api/posts
```

### Create post Ainhoa

```bash
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTc4NDg4ODkxNSwiZXhwIjoxNzg0OTc1MzE1fQ.-vlxhPkcGFAhnJPHtYCxdJyNfWuz3da8gY2frRwXfC0" -d '{
    "title": "My second post (Ainhoa)",
    "content": "No sé ni qué contar"
}' http://localhost:3000/api/posts/me
```

### Create another post

```bash
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjYsImlhdCI6MTc4NDg4MzkwMywiZXhwIjoxNzg0OTcwMzAzfQ.84ozpX848_FCIt-y68IUA1xLo81pIhCk88wwPPLcdO0" -d '{
    "title": "Primer blog de Pedro",
    "content": "No sé ni qué contar"
}' http://localhost:3000/api/posts/me
```

### Get all posts from user

```bash
curl -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjYsImlhdCI6MTc4NDg4MzkwMywiZXhwIjoxNzg0OTcwMzAzfQ.84ozpX848_FCIt-y68IUA1xLo81pIhCk88wwPPLcdO0" http://localhost:3000/api/posts/me
```

## User queries

### Delete all users

```bash
curl -X DELETE http://localhost:3000/api/users/delete
```

### Register user

```bash
curl -X POST -H "Content-Type: application/json" -d '{
    "firstName": "Ainhoa",
    "lastName": "Bernad",
    "email": "ainhoa@gmail.com",
    "password": "lacucaracha"
}' http://localhost:3000/api/users/register
```

### Register another user

```bash
curl -X POST -H "Content-Type: application/json" -d '{
    "firstName": "Pedro",
    "lastName": "Moreno",
    "email": "pedro@mail.com",
    "password": "lacucaracha"
}' http://localhost:3000/api/users/register
```

### Register third user (with passwordConfirm for validation)

```bash
curl -X POST -H "Content-Type: application/json" -d '{
    "firstName": "Aimar",
    "lastName": "Moreno",
    "email": "aimar@mail.com",
    "password": "ferias",
    "passwordConfirm": "ferias"
}' http://localhost:3000/api/users/register
```

### Log user in

```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ainhoa@gmail.com","password":"lacucaracha"}' \
  -c cookies.txt
```

### Log user out

```bash
curl -X POST http://localhost:3000/api/users/logout -b cookies.txt
```
