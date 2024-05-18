import express from 'express'
import {UserController} from '../controller/UserController'

const router = express.Router()
const userController = new UserController()

router.get('/', (req, res) => {
    res.send('Welcome to User API')
})

export default router