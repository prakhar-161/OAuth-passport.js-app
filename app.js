const express = require('express');
const authRoutes = require('./routes/auth-routes');
const app = express();
const port = 3000;

//view engine
app.set('view engine','ejs');

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