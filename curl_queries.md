# Curl queries

## Post queries

```bash
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTc4NDg3ODc2NiwiZXhwIjoxNzg0ODc5NjY2fQ.eZRNZ1SD4C5WTxFUoKGeLHoEMbODlQOtzShe15flBMQ" -d '{
    "title": "My first post",
    "content": "En un lugar de la Mancha, de cuyo nombre no quiero acordarme"
}' http://localhost:3000/posts
```

## User queries

```bash
curl -X DELETE http://localhost:3000/users/delete
```

```bash
curl -X POST -H "Content-Type: application/json" -d '{
    "firstName": "Ainhoa",
    "lastName": "Bernad",
    "email": "ainhoa@gmail.com",
    "password": "lacucaracha"
}' http://localhost:3000/users/register
```

```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ainhoa@gmail.com","password":"lacucaracha"}' \
  -c cookies.txt
```

```bash
curl -X POST http://localhost:3000/users/logout -b cookies.txt
```
