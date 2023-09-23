import { Router } from "express";
import {pool} from '../db.js'
import { prueba } from "../controllers/index.controller.js";

const router=Router()

router.get('/prueba',prueba)
export default router