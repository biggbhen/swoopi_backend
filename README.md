## Getting Started

you can set up the project locally by first cloning the repo then running 'npm install'
after that, run 'npm run server' to start Nodemon

on local host, it's configured to run on port 5000.
it's hosted live on: 'https://worrisome-red-viper.cyclic.app/'

- to call it from any domain, configure the corsOption inside the server.js file

```bash
# Example command for installing dependencies
npm install

#Create a user first, then proceed to login 
#Note: i'm saving the genersted tokens in 'x-auth-token'

#AUTH routes
#.create a user
POST 'http://localhost:5000/api/user'
req body example:
{
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "********"
}

#.authenticate a user or login
POST 'http://localhost:5000/api/auth'
req body example:
{
    "email" : "david@gmail.com",
    "password": "123456789"
}
res.json example:
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU4MWYzNTAxYjA1NDc3Y2FmNTU0MDUxIiwibmFtZSI6ImRhdmlkIiwiZW1haWwiOiJkYXZpZEBnbWFpbC5jb20ifSwiaWF0IjoxNzAzNzAxMzcyLCJleHAiOjE3MDQwNjEzNzJ9.KH8MmmBlWUEwZY3N0O5Trsj7y2vjxKwsaSTlYg8buRA"
}


#. get logged in user
GET http://localhost:5000/api/auth
res.json example:
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU4MWYzNTAxYjA1NDc3Y2FmNTU0MDUxIiwibmFtZSI6ImRhdmlkIiwiZW1haWwiOiJkYXZpZEBnbWFpbC5jb20ifSwiaWF0IjoxNzAzNzAxMzcyLCJleHAiOjE3MDQwNjEzNzJ9.KH8MmmBlWUEwZY3N0O5Trsj7y2vjxKwsaSTlYg8buRA"
}

#. NON_AUTH routes
NOTE: all non auth routes are private, you need to set the header('x-auth-token')

#create category  (PRIVATE ROUTE):
POST http://localhost:5000/api/category
req body example:
{
    "name": "pastries",
    "description": "enrich your taste buds with our apetizers"
}
res.json example
{
    "name": "pastries",
    "description": "enrich your taste buds with our apetizers",
    "user": "...",
    "date": "...",
    "_id": "...",
    "__v": 0
}

#get user categories  (PRIVATE ROUTE):
GET http://localhost:5000/api/category
res.json example:
[
    {
        "_id": "658637c41f75cc4855affafe",
        "name": "pastries",
        "description": "enrich your taste buds with our apetizers",
        "user": "6581f3501b05477caf554051",
        "date": "2023-12-23T01:28:36.491Z",
        "__v": 0
    },
    {
        "_id": "658314b17739cf6b8ad503e5",
        "name": "desserts",
        "description": "browse through all kinds of desserts available at bigg's kitchen",
        "user": "6581f3501b05477caf554051",
        "date": "2023-12-20T16:22:09.947Z",
        "__v": 0
    }
]

#create products  (PRIVATE ROUTE):
POST http://localhost:5000/api/products
you would be sending a form data here, containing media that would be hosted on cloudinary
after u upload the image in cloudinary, u can add it to the new product being created ythen save(i already have this covered)
form data req body example:
{
    "name": "meatpie",
    "ingredients": "salt, olive, minced meat, potatoes",
    "description": "lorem ipsum "
    "foodCategory": "658637c41f75cc4855affafe",
    "salesPrice": "100",
    "defaultPrice": "100",
    "requiredOptions": [
        {
            "size": "big",
            "isSingleOption": true
        }
    ]
}

response json:

    {
        "category": {
            "id": "658c35930f75c2cf88169e91",
            "name": "African"
        },
        "_id": "658c3eb91a17f454d47496fc",
        "name": "african rice",
        "ingredients": "rice, veggies, oil",
        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, voluptates.",
        "salesPrice": 22,
        "defaultPrice": 20,
        "requiredOptions": [],
        "productImage": "https://res.cloudinary.com/doxnoyc3j/image/upload/v1703689912/swoopi/gjt4mvcgzkr91kh8zhpa.jpg",
        "date": "2023-12-27T15:11:53.290Z",
        "__v": 0
    },

#Fetch Products (PRIVATE ROUTE):
GET http://localhost:5000/api/products
res.json:
[
    {
        "category": {
            "id": "658c35930f75c2cf88169e91",
            "name": "African"
        },
        "_id": "658c3eb91a17f454d47496fc",
        "name": "african rice",
        "ingredients": "rice, veggies, oil",
        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, voluptates.",
        "salesPrice": 22,
        "defaultPrice": 20,
        "requiredOptions": [],
        "productImage": "https://res.cloudinary.com/doxnoyc3j/image/upload/v1703689912/swoopi/gjt4mvcgzkr91kh8zhpa.jpg",
        "date": "2023-12-27T15:11:53.290Z",
        "__v": 0
    },
    {
        "category": {
            "id": "658c35930f75c2cf88169e91",
            "name": "African"
        },
        "_id": "658c3e721a17f454d47496f9",
        "name": "lasagna",
        "ingredients": "egusi, oil, cassava",
        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, voluptates.",
        "salesPrice": 22,
        "defaultPrice": 20,
        "requiredOptions": [],
        "productImage": "https://res.cloudinary.com/doxnoyc3j/image/upload/v1703689842/swoopi/mx879sfvmgd8eke1qxq9.jpg",
        "date": "2023-12-27T15:10:42.158Z",
        "__v": 0
    }]


























