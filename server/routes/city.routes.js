import express from 'express';
import { getCitiesFromAuthorities } from '../controllers/city.controller.js';

const router = express.Router();

router.get('/cities', getCitiesFromAuthorities);

export default router;