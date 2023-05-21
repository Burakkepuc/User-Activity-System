import path from 'path';
import db from '../../src/models/index.js';
class UserDashboardController {
  static async index(req, res) {
    if (!req.session.isAdmin) {
      try {
        res.render(`${path.join(__dirname, '../views/userDashboard')}`, {
          title: 'User Dashboard',
        });
      } catch (error) {
        res.render(`${path.join(__dirname, '../views/error')}`, {
          title: '404',
        });
      }
    } else {
      try {
        const allUsers = await db.Users.findAll();
        res.render(`${path.join(__dirname, '../views/admindashboard')}`, {
          title: 'Admin Dashboard',
          users: allUsers,
        });
        res.render(`${path.join(__dirname, '../views/admindashboard')}`, {
          title: 'Admin Dashboard',
        });
      } catch (error) {
        res.render(`${path.join(__dirname, '../views/error')}`, {
          title: '404',
        });
      }
    }
  }
}

export default UserDashboardController;
