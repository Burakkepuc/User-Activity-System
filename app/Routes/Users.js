import UsersController from '../Controllers/Users';
import express from 'express';

const router = express.Router();

router.post('/delete-user/:id', UsersController.delete);
router.post('/create-user', UsersController.create);
module.exports = router;
