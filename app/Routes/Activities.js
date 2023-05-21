import express from 'express';
import ActivitiesController from '../Controllers/Activities';

const router = express.Router();
router.get('/', ActivitiesController.getAll);
router.post('/add-activity', ActivitiesController.create);
router.get('/update-activity/:id', ActivitiesController.getUpdate);
router.post('/update-activity/:id', ActivitiesController.setUpdate);
router.get('/delete-activity/:id', ActivitiesController.deleteActivity);
module.exports = router;
