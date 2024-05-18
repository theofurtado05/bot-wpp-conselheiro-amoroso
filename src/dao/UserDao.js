import { User } from "../model/User"
import { prisma } from "../service/dbConfig"

class UserDao{
    async createUser(data){
        try {
            const user = User(data.created_at, data.email, data.phone, data.currentPlan, data.subscription_at)
    
            const newUser = await prisma.users.create({
                data: user
            })
    
            return newUser
        } catch (error) {
            throw error
        }
    }

    async getUserByPhone(phone){
        try {
            const user = await prisma.users.findUnique({
                where: {
                    phone: phone
                }
            })

            return user
        } catch (error) {
            throw error
        }
    }

    async getUserByEmail(email){
        try {
            const user = await prisma.users.findUnique({
                where: {
                    email: email
                }
            })

            return user
        } catch (error) {
            throw error
        }
    }

    async getUserById(id){
        try {
            const user = await prisma.users.findUnique({
                where: {
                    id: id
                }
            })

            return user
        } catch (error) {
            throw error
        }
    }

    async getAllUsers(){
        try {
            const users = await prisma.users.findMany()

            return users
        } catch (error) {
            throw error
        }
    }
}


export default new UserDao()