import express from 'express';
import fs from 'fs';
import verifyToken from '../Helpers/verifyToken';
import path from 'path';
import db from '../../src/models/index.js';
import activities from '../../src/models/activities';

const app = express();

const routeNameArray = [];

fs.readdir('./app/Routes', (err, files) => {
  if (err) console.log(err);
  else {
    files.forEach(file => {
      if (file === 'index.js') return;
      const routeName = file.split('.')[0].toLowerCase();
      routeNameArray.push(routeName);
      const route = require(`../Routes/${routeName}`);
      if (routeName === 'auth') app.use(`/${routeName}`, route);
      else app.use(`/${routeName}`, verifyToken, route);
    });
  }
});

app.get('/', async (req, res) => {
  const token = req.session.token;
  const isAdmin = req.session.isAdmin;
  if (token && isAdmin) {
    const allUsers = await db.Users.findAll();
    res.render(`${path.join(__dirname, '../views/admindashboard')}`, {
      title: 'Admin Dashboard',
      users: allUsers,
    });
  } else if (token && !isAdmin) {
    res.render(`${path.join(__dirname, '../views/userdashboard')}`, {
      title: 'User Dashboard',
    });
  } else {
    return res.redirect('/auth/login');
  }
});

app.use((req, res, next) => {
  const url = req.url;
  const routeName = url.split('/')[1];
  if (!routeNameArray.includes(routeName)) {
    return res.render(`${path.join(__dirname, '../views/404.ejs')}`, {
      title: '404',
    });
  }
  next();
});

export default app;
