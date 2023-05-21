import path from 'path';

class UserDashboardController {
  static async index(req, res) {
    try {
      res.render(`${path.join(__dirname, '../views/userDashboard')}`, {
        title: 'User Dashboard',
      });
    } catch (error) {
      res.render(`${path.join(__dirname, '../views/error')}`, {
        title: '404',
      });
    }
  }
}

export default UserDashboardController;
