import express from 'express';
import path from 'path';
import jwt from 'jsonwebtoken';

const app = express();

app.set('views', path.join(__dirname, '../views'));

function verifyToken(req, res, next) {
  try {
    const token = req.session.token;
    if (!token) {
      return res.render(`${path.join(__dirname, '../views/404')}`, {
        title: '404',
      });
    }

    const decoded = jwt.verify(token, 'SimdilikBoyle');
    req.session.user_id = decoded.id;
    next();
  } catch (error) {
    res.redirect('/auth/login');
  }
}

module.exports = verifyToken;
