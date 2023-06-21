import db from '../../src/models/index.js';
import path from 'path';
class UserDashboardController {
  static async index(req, res) {
    if (!req.session.isAdmin) {
      try {
        res.render(`${path.join(__dirname, '../views/userdashboard')}`, {
          title: 'User Dashboard',
        });
      } catch (error) {
        res.render(`${path.join(__dirname, '../views/error')}`, {
          title: '404',
        });
      }
    } else {
      const allUsers = await db.Users.findAll();
      res.render(`${path.join(__dirname,'../views/admindashboard')}`, {
        users: allUsers,
        title: 'Admin Dashboard',
      });
    }
  }
}

export default UserDashboardController;
