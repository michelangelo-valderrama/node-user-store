# DevTalles - Node: De cero a experto

<small>Sección 18 - Sección 22</small>

1. Clonar `.env.template` en `.env`
2. Levantar base de datos `npm run db:start`
2. Llenar base de datos `npm run seed`
3. `npm run dev`

## Documentación

### Autentificación

#### `POST` Registrar un usuario

```sh
curl --location 'http://localhost:3000/api/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
  "name": "Nombre",
  "email": "correo@ejemplo.com",
  "password": "123456"
}'
```

##### Body Parameters

- `name`: `string` `required` El nombre del usuario
- `email`: `string` `required` El correo del usuario
- `password`: `string` `required` La contraseña del usuario

##### Respuesta

```json
{
  "user": {
    "id": "65bf98ce184b7cd470bebb4a",
    "name": "Nombre",
    "email": "correo@ejemplo.com",
    "emailValidated": false,
    "role": ["USER_ROLE"]
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YmY5OGNlMTg0YjdjZDQ3MGJlYmI0YSIsImlhdCI6MTcwNzA1NTMxMSwiZXhwIjoxNzA3MDYyNTExfQ.C4NzbxeDM0MCkh9eVi0HNrfgEWbREnM3yHYma03VNVM"
}
```

#### `POST` Iniciar sesión

```sh
curl --location 'http://localhost:3000/api/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "correo@ejemplo.com",
  "password": "123456"
}'
```

##### Body Params

- `email`: `string` `required` El correo del usuario
- `password`: `string` `required` La contraseña del usuario

##### Respuesta

```json
{
  "id": "65bf98ce184b7cd470bebb4a",
  "name": "Nombre",
  "email": "correo@ejemplo.com",
  "emailValidated": false,
  "role": ["USER_ROLE"],
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YmY5OGNlMTg0YjdjZDQ3MGJlYmI0YSIsImlhdCI6MTcwNzA1NTQ1NiwiZXhwIjoxNzA3MDYyNjU2fQ.LtjmazTIonJgGmEHuHm_FLGKjdBkoQ6wjFaXQQ-Xzic"
}
```

#### `GET` Validar correo

```sh
curl --location 'http://localhost:3000/api/auth/validate-email/:token'
```

##### Path params

- `token`: `string` `required` Token del correo de validación

##### Respuesta

```json
"Email validated"
```

### Categorías

#### `GET` Obtener las categorías

```sh
curl --location 'http://localhost:3000/api/category?limit=2'
```

##### Query parameters

- `page`: `number` Número de la página
- `limit`: `number` Límite de categorías en una página

##### Respuesta

```json
{
  "page": 1,
  "limit": 10,
  "total": 22,
  "next": "/api/category?page=2&limit=10",
  "prev": null,
  "categories": [
    {
      "id": "65be113ec014b4a5f4a20f29",
      "name": "Driven",
      "available": false
    },
    {
      "id": "65be113ec014b4a5f4a20f2a",
      "name": "Till",
      "available": false
    }
  ]
}
```

#### `POST` Crear una nueva categoría

```sh
curl --location 'http://localhost:3000/api/category' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer 123123' \
--data '{ "name": "Category" }'
```

##### Body params

- `name`: `string` `required` Nombre de la categoría

##### Respuesta

```json
{
  "id": "65bf9ae2184b7cd470bebb5a",
  "name": "Mi categoría",
  "available": false
}
```

### Productos

#### `GET` Obtener productos

```sh
curl --location 'http://localhost:3000/api/product?limit=2'
```

##### Query parameters

- `page`: `number` Número de la página
- `limit`: `number` Límite de productos en una página

#### Respuesta

````json
{
    "page": 1,
    "limit": 2,
    "total": 22,
    "next": "/api/product?page=2&limit=2",
    "prev": null,
    "products": [
        {
            "name": "Than",
            "available": true,
            "price": 75.0369,
            "user": {
                "name": "Test 2",
                "email": "test2@google.com",
                "emailValidated": false,
                "role": [
                    "USER_ROLE"
                ],
                "id": "65be113dc014b4a5f4a20f23"
            },
            "category": {
                "name": "split",
                "available": false,
                "user": "65be113dc014b4a5f4a20f22",
                "id": "65be113ec014b4a5f4a20f39"
            },
            "id": "65be113ec014b4a5f4a20f40"
        },
        {
            "name": "Wagon",
            "available": true,
            "price": 1.9631,
            "user": {
                "name": "Test 5",
                "email": "test5@google.com",
                "emailValidated": false,
                "role": [
                    "USER_ROLE"
                ],
                "id": "65be113dc014b4a5f4a20f26"
            },
            "category": {
                "name": "Driven",
                "available": false,
                "user": "65be113dc014b4a5f4a20f22",
                "id": "65be113ec014b4a5f4a20f29"
            },
            "id": "65be113ec014b4a5f4a20f41"
        }
    ]
}```
````

#### `POST` Crear un nuevo producto

```sh
curl --location 'http://localhost:3000/api/product' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjY1YWVhOTc5NGU1M2I5YmE0MmU0NCIsImlhdCI6MTcwNjk1MjAzOSwiZXhwIjoxNzA2OTU5MjM5fQ.qY5ZwHiDfKlbICgnZwtPBFstMe-YbxOx6kwZQ-iZFPQ' \
--data '{
  "name": "Mi producto",
  "category": "65b67680c3cbc0928e8117ad"
}'
```

##### Body params

- `name`: `string` `required` Nombre del producto
- `category`: `string` `required` Id de la categoría

##### Respuesta

```json
{
  "name": "Mi producto",
  "available": false,
  "price": 0,
  "user": "65bf98ce184b7cd470bebb4a",
  "category": "65b67680c3cbc0928e8117ad",
  "id": "65bf9bf0184b7cd470bebb66"
}
```

### Subir archivos

#### `POST` Subir un archivo

```sh
curl --location 'http://localhost:3000/api/upload/single/:type' \
--form 'file=@"/home/user/Pictures/img.png"'
```

##### Path params

- `type`: `string` `required` Tipo donde guardar la imagen

##### Form params

- `file`: `string` `required` Ruta de la imagen

##### Respuesta

```json
{
  "fileName": "55679b4f-c698-41ae-86b4-4378b9529d7a-img.png"
}
```

#### `POST` Subir varios archivos

```sh
curl --location 'http://localhost:3000/api/upload/multiple/products' \
--form 'file=@"/home/user/Pictures/img-01.png"' \
--form 'file=@"/home/user/Pictures/img-02.png"'
```

##### Path params

- `type`: `string` `required` Tipo donde guardar las imágenes

##### Form params

- `file`: `string` `required` Ruta de una imagen
- `file`: `string` `required` Ruta de una imagen
- ...

##### Respuesta

```json
[
  {
    "fileName": "87d1f482-e123-4d27-a6bd-c8cbe97f92df-img-01.png"
  },
  {
    "fileName": "5f53152f-fafe-45ee-8b0c-0b6ba318f9c5-img-02.png"
  }
]
```

### Imágenes

#### `GET` Obtener una imagen

```sh
curl --location 'http://localhost:3000/api/image/:type/:fileName'
```

##### Path params

- `type`: `string` `required` Tipo donde se guardó la imagen
- `fileName`: `string` `required` Nombre de la imagen dada al subirse
