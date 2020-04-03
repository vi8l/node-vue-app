const express = require('express');
const app = express();

let users = [
    {
        "username": "user1@ncircletech.com",
        "password": "user1@123"
    },
    {
        "username": "user2@ncircletech.com",
        "password": "user2@123"
    }
]

const port = 3000;

app.get('/', (req, res, next) => {
    res.send({ message: 'First Root' })
})

app.listen(port, () => {
    console.log('Listening on port ' + port)
});
