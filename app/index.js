import express from 'express';
import session from 'express-session';
import index from '../app/Routes/index.js';
import db from '../src/models/index.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 2 * 24 * 60 * 60 * 1000},
  })
);


app.use('/', index);

app.set('view engine', 'ejs');

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
