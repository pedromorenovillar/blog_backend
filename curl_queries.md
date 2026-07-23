# Curl queries

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
