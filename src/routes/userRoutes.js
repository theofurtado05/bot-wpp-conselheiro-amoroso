import express from 'express'
import { UserController } from '../controller/UserController.js'

const router = express.Router()
const userController = new UserController()

router.post("/create", userController.createUser);

export default router