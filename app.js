const express = require('express');
const app = express();
const passport = require('passport');
const cookieSession = require('cookie-session');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
let cors = require('cors');
var corsOptions = {
    origin: "http://localhost:8080"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieSession({
    name: 'logincookies',
    keys: ['authkey'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours 
}))
app.use(passport.initialize());
app.use(passport.session());

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
    if (!req.isAuthenticated()) {
        res.status(401).send('You are not authenticated')
    } else {
        res.send({ message: 'First Root' })
    }
})

app.post("/login", (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(400).send([user, "Cannot log in", info])
        }

        req.login(user, (err) => {
            res.send({ username: user.username })
        })
    })(req, res, next)
})

app.get('/logout', function (req, res, next) {
    req.logout();
    console.log("logged out")
    return res.send();
});

passport.use(new LocalStrategy(
    (username, password, done) => {
        let user = users.find((user) => {
            console.log('username', user)
            return user.username === username && user.password === password
        })

        if (user) {
            done(null, user)
        } else {
            done(null, false, { message: 'Incorrect username or password' })
        }
    }
));

// passport.serializeUser((user, done) => {
//     done(null, user.username)
// })

// passport.deserializeUser((username, done) => {
//     let user = users.find((user) => {
//         return user.username === username
//     })

//     done(null, user)
// })

app.listen(port, () => {
    console.log('Listening on port ' + port)
});
