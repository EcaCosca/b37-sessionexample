const express = require('express');
const session = require('express-session');

const app = express();
// Definition of an empty session
const sess = {
// Secret: server password to access the session
 secret: 'keyboard cat',
 cookie: {}
};

app.use(session(sess));

app.get('/login', (req, res) => {
    req.session.user = {name: 'Lazar'}
    res.json({message: "Logged in"})
})

app.get('/secure', (req, res) => {
    if(req.session.user?.name){
        return res.status(403).json({error: "Please Log in"})
    }
    res.json({message: `Hello ${req.session.user.name} welcome back`})
})

app.get('*', (req, res) => {
    res.json({message: "site reached"});
})

app.get('/logout', (req, res) => {
    res.session.destroy(error => {
        if(error){
            return next(error)
        }
    });

    res.json({message: 'Session has been destroyed'})
})



app.listen(3030, () => {
    console.log("Server running on 3030");
})