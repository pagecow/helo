require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;
const authCtrl = require('./authController');
const postCtrl = require('./postController');
const app = express();

app.use(express.json());

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('db connected')
})

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60
    }
}))

app.post('/auth/login', authCtrl.login)
app.post('/auth/register', authCtrl.register)
app.post('/auth/logout', authCtrl.logout)
app.get('/auth/user', authCtrl.getUser)

app.post('/api/create/post', postCtrl.createPost)
app.get('/api/get/post', postCtrl.getPost)

const port = SERVER_PORT;
app.listen(port, () => console.log(`Server running on port ${port}`))