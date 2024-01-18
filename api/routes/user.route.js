import express from 'express';
import { test } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/test', test);

//router is exported by default means that we can import to other files with a different name
export default router;