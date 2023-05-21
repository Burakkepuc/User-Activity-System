import db from '../../src/models/index';
import path from 'path';
import ValidateAuth from '../Validations/Auth';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class AuthController {
  static async login(req, res) {
    try {
      res.render(`${path.join(__dirname, '../views/login')}`, {
        title: 'Login',
        error: '',
        success: '',
      });
    } catch (error) {
      res.render(`${path.join(__dirname, '../views/error')}`, {
        title: '404',
      });
    }
  }

  static async loginUser(req, res) {
    try {
      const {email, password} = req.body;
      const validateLogin = await ValidateAuth.validateLogin(req.body);

      if (!validateLogin.type) {
        return res.render(`${path.join(__dirname, '../views/login')}`, {
          title: 'Login',
          success: '',
          error: validateLogin.message,
        });
      }

      const findUser = await db.Users.findOne({where: {email: email}});

      if (!findUser) {
        return res.render(`${path.join(__dirname, '../views/login')}`, {
          title: 'Login',
          success: '',
          error: 'User does not exist',
        });
      }

      const validPassword = await bcrypt.compare(password, findUser.password);

      if (!validPassword) {
        return res.render(`${path.join(__dirname, '../views/login')}`, {
          title: 'Login',
          succes: '',
          error: 'Invalid password',
        });
      }

      const token = jwt.sign({id: findUser.id}, 'SimdilikBoyle', {
        expiresIn: '2d',
      });
      req.session.token = token;
      req.session.isAdmin = findUser.isAdmin;

      res.redirect('/');
    } catch (error) {
      res.render(`${path.join(__dirname, '../views/error')}`, {
        title: '404',
      });
    }
  }

  static async register(req, res) {
    try {
      res.render(`${path.join(__dirname, '../views/register')}`, {
        title: 'Register',
        error: '',
      });
    } catch (error) {
      res.render(`${path.join(__dirname, '../views/error')}`, {
        title: '404',
      });
    }
  }

  static async registerUser(req, res) {
    try {
      const {name, surname, email, password} = req.body;

      const validateRegister = await ValidateAuth.validateRegister(req.body);
      if (!validateRegister.type) {
        return res.render(`${path.join(__dirname, '../views/register')}`, {
          title: 'Register',
          error: validateRegister.message,
        });
      }

      const findUser = await db.Users.findOne({where: {email: req.body.email}});

      if (findUser) {
        return res.render(`${path.join(__dirname, '../views/register')}`, {
          title: 'Register',
          error: 'This email is using',
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await db.Users.create({
        name,
        surname,
        email,
        password: hashedPassword,
        isAdmin: false,
      });

      res.render(`${path.join(__dirname, '../views/login')}`, {
        title: 'Login',
        error: '',
        success: 'You have successfully registered',
      });
    } catch (error) {
      res.render(`${path.join(__dirname, '../views/404')}`, {
        title: '404',
      });
    }
  }

  static async logout(req, res) {
    try {
      req.session.destroy();
      res.redirect('/auth/login');
    } catch (error) {
      res.render(`${path.join(__dirname, '../views/404')}`, {
        title: '404',
      });
    }
  }
}

export default AuthController;
