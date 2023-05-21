import express from 'express';
import ContactController from '../Controllers/Contact';

const router = express.Router();

router.get('/', ContactController.index);

module.exports = router;
