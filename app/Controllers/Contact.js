import path from 'path';

class ContactController {
  static async index(req, res) {
    try {
      res.render(`${path.join(__dirname, '../views/contact')}`, {
        title: 'Contact',
      });
    } catch (error) {
      res.render(`${path.join(__dirname, '../views/error')}`, {
        title: '404',
      });
    }
  }
}

export default ContactController;
