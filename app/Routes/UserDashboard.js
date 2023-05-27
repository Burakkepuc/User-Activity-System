import express from 'express';
import UserDashboardController from '../Controllers/UserDashboard';
const router = express.Router();
router.get('/', UserDashboardController.index);
module.exports = router;
