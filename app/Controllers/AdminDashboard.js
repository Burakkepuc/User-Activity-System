import db from '../../src/models/index.js';
import path from 'path';

class AdminDashboardController {
  static async index(req, res) {
     try {
        const allUsers = await db.Users.findAll();
        res.render(`${path.join(__dirname, '../views/admindashboard')}`, {
          title: 'Admin Dashboard',
          users: allUsers,
        });
      } catch (error) {
        res.render(`${path.join(__dirname, '../views/error')}`, {
          title: '404',
        });
      }
    }
}

export default AdminDashboardController;