const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const passport = require('passport');

const app = express();
const port = 3000;

//view engine
app.set('view engine','ejs');

app.use(cookieSession({
    //age of cookie
    maxAge: 24 * 60 * 60 * 1000,
    //key to encrypt the cookie
    keys: [keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//connect to mongodb
mongoose.connect(keys.mongodb.dbURI,{ useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('connected to mongodb'))
.catch((err) => console.log(err));

//routes
app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);

//home route
app.get('/',(req,res) => {
    res.render('home',{ user: req.user });
});

app.listen(port,err => {
    if(err) {
        console.log(`error in listening to port ${port}`);
    }
    console.log(`listening to port ${port}`);
});