import db from '../../src/models/index';
import path from 'path';
import ValidateAuth from '../Validations/Auth';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import randomstring from 'randomstring';
require('dotenv').config();

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
          success: '',
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

      if(email === process.env.ADMIN_EMAIL) {
        await db.Users.create({
        name,
        surname,
        email,
        password: hashedPassword,
        isAdmin: true,
      });
      }else{
         await db.Users.create({
          name,
          surname,
          email,
          password: hashedPassword,
          isAdmin: false,
        });
      }
     

      res.render(`${path.join(__dirname, '../views/login')}`, {
        title: 'Login',
        error: '',
        success: 'You have successfully registered',
      });
    } catch (error) {
      console.log(error);
      res.render(`${path.join(__dirname, '../views/404')}`, {
        title: '404',
      });
    }
  }

 


static async forgetPassword(req, res) {
  try {
     res.render(`${path.join(__dirname, '../views/forget-password')}`, {
      success:'',
      error: '',
    title: 'Reset Password',
  });
  } catch (error) {
    res.render(`${path.join(__dirname, '../views/404')}`, {
      title: '404',
    });
  }   
  }

   static async sendResetPasswordMail(name, email, token) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'hotmail',
      host: 'smtp-mail.outlook.com',
      secure: false,
      port: 587,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Reset Password',
      html: `<p> Hi ${name},Please copy the link <a href="http://127.0.0.1:3000/auth/reset-password?token=${token}">  and reset your password</a> </p>`
    };

     transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Mail has been sent', info.response);
      }
    });
  } catch (error) {
    console.log(error);
    res.render(`${path.join(__dirname, '../views/404')}`, {
      title: '404',
    });
  }
}

  static async forgetPasswordUser(req, res) {
    try {
      const {email} = req.body;
      const findUser = await db.Users.findOne({where: {email: email}});

      if(!findUser) {
        return res.render(`${path.join(__dirname, '../views/forget-password')}`, {
          title: 'Reset Password',
          success:'',
          error: 'User does not exist',
        });
      }else{
        const randomString = randomstring.generate();
        await db.Users.update({token: randomString}, {where: {email: email}});

        await this.sendResetPasswordMail(findUser.name, findUser.email, randomString);

        res.render(`${path.join(__dirname, '../views/login')}`, {
          title: 'Reset Password',
          error: '',
          success: 'Please check your email',
        });
      }
      
    } catch (error) {
        res.render(`${path.join(__dirname, '../views/404')}`, {
      title: '404',
    });
    }
  }

  static async resetPassword(req, res) {

    try {
      const token = req.query.token;
      const findUser =  await db.Users.findOne({where: {token: token}})

      if(!findUser) {
       res.render(`${path.join(__dirname, '../views/404')}`, {
      title: '404',
    });
      }

      res.render(`${path.join(__dirname, '../views/reset-password')}`, {
      title: 'Reset Password',
      error: '',
      success: '',
      user_id: findUser.id,
    });

    } catch (error) {
        res.render(`${path.join(__dirname, '../views/404')}`, {
      title: '404',
    });
    }
  }

  static async resetPasswordUser(req, res) {
    try {
      const {password, user_id} = req.body;
      console.log(typeof user_id);
      const validateResetPassword = await ValidateAuth.validateForgetPassword(req.body);
      
      console.log(validateResetPassword.type);
      if (!validateResetPassword.type) {
        return res.render(`${path.join(__dirname, '../views/reset-password')}`, {
          title: 'Reset Password',
          error: validateResetPassword.message,
          success: '',
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.Users.update({password: hashedPassword, token:''}, {where: {id: user_id}});
      res.render(`${path.join(__dirname, '../views/reset-password')}`, {
      title: 'Reset Password',
      error: '',
      success: 'Password has been changed',
      user_id: user_id,
    });
    res.redirect('/auth/login')
    } catch (error) {
      console.log(error)
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
