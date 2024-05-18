import {UserDao} from "../dao/UserDao.js";
const userDao = new UserDao()


class UserController{
    async createUser(data){
        try {
            if(data.phone && data.email){
                const newUser = await userDao.createUser(data)
                return newUser
            } else {
                return "Phone and Email are required fields."
            }
        } catch (error) {
            throw error
        }
    }
}

export {UserController}