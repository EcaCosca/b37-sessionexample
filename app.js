const express = require('express');
const session = require('express-session');

const app = express();
// Definition of an empty session
const sess = {
// Secret: server password to access the session
 secret: 'keyboard cat',
 cookie: {}
};

// I'll be using my session as a middleware on every acces I have to my server
app.use(session(sess));

// User loggin as they use this route
app.get('/login', (req, res) => {
    // creates user with an object key value pair for name and "paco"
    req.session.user = {name: 'Paco'}
    // sends a response for the browser
    res.json({message: "Logged in"})
})

// This secure route will only grant acces when a cookie with a session is in the browser
app.get('/secure', (req, res) => {
    if(req.session.user?.name){
        return res.json({message: `Hello ${req.session.user.name} welcome back`})
    }
    return res.status(403).json({error: "Please Log in"})
})

// app.get('*', (req, res) => {
//     res.json({message: "site reached"});
// })

app.get('/logout', (req, res, next) => {
    req.session.destroy(function(error) {
        if(error){
            return next(error)
        }
    });

    res.json({message: 'Session has been destroyed'})
})



app.listen(3030, () => {
    console.log("Server running on 3030");
})