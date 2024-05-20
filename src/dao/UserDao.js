import { User } from "../model/User.js"
import { prisma } from "../service/dbConfig.js"

class UserDao{
    async createUser(data){
        try {
            const user = new User(data.created_at, data.email, data.phone, data.currentPlan, data.subscription_at, data.numMsgSent)
            // console.log("User sendo criado: ", user)
            const newUser = await prisma.users.create({
                data: user
            })
    
            return newUser
        } catch (error) {
            throw error
        }
    }

    async addMsgOnUser(phone){
        try {
            const user = await prisma.users.update({
                where: {
                    phone: phone
                },
                data: {
                    numMsgSent: {
                        increment: 1
                    }
                }
            })

            return user
        } catch (error) {
            throw error
        }
    }

    async updateUser(phone, data){
        try {
            const user = await prisma.users.update({
                where: {
                    phone: phone
                },
                data: data
            })

            return user
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


export {UserDao}