import db from '../../src/models/index';
import path from 'path';

class ActivitiesController {
  static async getAll(req, res) {
    try {
      const allActivities = await db.UserActivities.findAll({
        include: [
          {
            model: db.Activities,
            attributes: ['activity_name', 'activity_description'],
          },
        ],
        // TODO Session'dan gelecek
        where: {user_id: 1},
      });
      res.render(`${path.join(__dirname, '../views/activities')}`, {
        activities: allActivities,
        title: 'Activities',
      });
    } catch (error) {
      res.render(`${path.join(__dirname, '../views/404')}`, {
        title: '404',
      });
    }
  }

  static async create(req, res) {
    try {
      const {activity_name, activity_description} = req.body;

      const activitiesResult = await db.Activities.create({
        // TODO Session'dan gelecek
        activity_name,
        activity_description,
      });

      await db.UserActivities.create({
        // TODO: id Session'dan gelecek
        user_id: 1,
        activity_id: activitiesResult.id,
        date: new Date(),
      });

      res.redirect('/activities');
    } catch (error) {
      res.render(`${path.join(__dirname, '../views/404')}`, {
        title: '404',
      });
    }
  }

  static async getUpdate(req, res) {
    try {
      const {id} = req.params;
      const activity = await db.Activities.findByPk(id);
      res.render(`${path.join(__dirname, '../views/update-activity')}`, {
        activity,
        title: 'Update Activity',
      });
    } catch (error) {
      res.render(`${path.join(__dirname, '../views/404')}`, {
        title: '404',
      });
    }
  }

  static async setUpdate(req, res) {
    try {
      const {id} = req.params;
      const activity = await db.Activities.findByPk(id);

      if (!activity) {
        res.render(`${path.join(__dirname, '../views/404')}`, {
          title: 'Activity not found',
        });
      }
      activity.activity_name = req.body.activity_name;
      activity.activity_description = req.body.activity_description;
      await activity.save();
      res.redirect('/activities');
    } catch (error) {
      res.render(`${path.join(__dirname, '../views/404')}`, {
        title: '404',
      });
    }
  }

  static async deleteActivity(req, res) {
    try {
      const {id} = req.params;
      const activity = await db.Activities.findByPk(id);
      if (!activity) {
        res.render(`${path.join(__dirname, '../views/404')}`, {
          title: 'Activity not found',
        });
      }
      await db.UserActivities.destroy({
        where: {
          activity_id: activity.id,
        },
      });
      await activity.destroy();
      res.redirect('/activities');
    } catch (error) {
      res.render(`${path.join(__dirname, '../views/404')}`, {
        title: 'error',
      });
    }
  }
}

export default ActivitiesController;
