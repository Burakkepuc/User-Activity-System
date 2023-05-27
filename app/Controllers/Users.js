import db from '../../src/models/index.js';
import path from 'path';
import bcrypt from 'bcrypt';

class UsersController {
  static async delete(req, res) {
    try {
      const {id} = req.params;
      const user = await db.Users.findByPk(id);
      if (!user) {
        return res.render(`${path.join(__dirname, '../views/404')}`, {
          title: '404',
        });
      }
      await db.UserActivities.destroy({where: {user_id: id}});
      await db.Users.destroy({where: {id: id}});
      res.redirect('/');
    } catch (error) {
      res.render(`${path.join(__dirname, '../views/404')}`, {
        title: '404',
      });
    }
  }

  static async create(req, res) {
    try {
      const {name, surname, email, password, isAdmin, title_id} = req.body;
      await db.Users.create({
        name,
        surname,
        email,
        password: bcrypt.hashSync('Deneme123', 10), //Default password
        isAdmin: false,
        title_id: title_id,
      });
      res.redirect('/');
    } catch (error) {
      res.render(`${path.join(__dirname, '../views/404')}`, {
        title: '404',
      });
    }
  }

  

}

export default UsersController;
