import express from 'express';
import AdminDashboard from '../Controllers/AdminDashboard';
const router = express.Router();
router.get('/', AdminDashboard.index);
module.exports = router;
