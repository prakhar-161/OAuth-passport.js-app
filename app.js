const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const keys = require('./config/keys');

const app = express();
const port = 3000;

//view engine
app.set('view engine','ejs');

//connect to mongodb
mongoose.connect(keys.mongodb.dbURI,{ useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('connected to mongodb'))
.catch((err) => console.log(err));

//routes
app.use('/auth',authRoutes);

//home route
app.get('/',(req,res) => {
    res.render('home');
});

app.listen(port,err => {
    if(err) {
        console.log(`error in listening to port ${port}`);
    }
    console.log(`listening to port ${port}`);
});