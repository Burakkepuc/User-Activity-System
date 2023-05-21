import express from 'express';
import AuthController from '../Controllers/Auth';
const router = express.Router();

router.get('/login', AuthController.login);
router.get('/register', AuthController.register);
router.post('/registerUser', AuthController.registerUser);
router.post('/loginUser', AuthController.loginUser);
router.get('/logout', AuthController.logout);
module.exports = router;
