const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const db = require('./dbconnect');
const routes = require('./routes');
const passportRoutes = require('./passport-route');
const passport = require('passport');
require('./config/passpoer-config')(passport);
const app = express();
const cors=require('cors')

app.use(cors({origin:true}))
app.use(bodyParser.json());
app.use(passport.initialize());
app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send('You have accessed a protected route!');
});
app.use('/', routes.router);
// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use('/auth', passport.authenticate('jwt', { session: false }), passportRoutes);
// Handle errors.
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});