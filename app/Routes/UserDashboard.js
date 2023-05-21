import express from 'express';
import DashboardController from '../Controllers/UserDashboard';
const router = express.Router();
router.get('/', DashboardController.index);
module.exports = router;
