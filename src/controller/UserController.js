import UserDao from "../dao/UserDao";

export class UserController{
    async createUser(data){
        try {
            if(data.phone && data.email){
                const newUser = await UserDao.createUser(data)
                return newUser
            } else {
                return "Phone and Email are required fields."
            }
        } catch (error) {
            throw error
        }
    }
}