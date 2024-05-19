import venom from 'venom-bot';
import { formatarPhoneNumber } from '../utils/formatarPhoneNumber.js';
import { UserDao } from './UserDao.js';
import { formatarSemUC } from '../utils/formatarSemUC.js';

const userDao = new UserDao()

class WhatsappDao {
    async start(client) {
        client.onMessage(async (message) => {
          console.log("Mensagem recebida: ", message)
            const sender = message.sender  // id é o numero@c.us
            const mensagem = message.body
            const user = await userDao.getUserByPhone(formatarSemUC(sender.id))
            console.log("User: ", user)
            if(user){
              if(user.currentPlan != 'Free'){
                //responder com conselho
                await this.SendMessageConselho(client, {phone: sender.id})
                await userDao.addMsgOnUser(formatarSemUC(sender.id))
                
              } else if (user.numMsgSent < 2){
                //responder com conselho
                await this.SendMessageConselho(client, {phone: sender.id})
                await userDao.addMsgOnUser(formatarSemUC(sender.id))

              } else {
                //mandar assinar
                await this.SendMessageNoSubscription(client, {phone: sender.id})
              }
            } else {
                const newUser = await userDao.createUser({
                  created_at: new Date(), 
                  email: null, 
                  phone: formatarSemUC(sender.id), 
                  currentPlan: 'Free', 
                  subscription_at: new Date(), 
                  numMsgSent: 1
                })

                console.log("Novo usuario: ", newUser)
                await this.SendMessageConselho(client, {phone: sender.id})
            }
      
          
            
            
        });
      }
    //criar sessao
    async createSession(){
        try {
            const client = await venom.create({
                session: 'conselheiro-amoroso',
                headless: 'new',
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
                // puppeteerOptions: {
                // // executablePath: '/usr/bin/google-chrome-stable',
                // }
            })
            this.start(client)
            return client
        } catch (error) {
            throw error
        }
    }   

    async SendMessageNoSubscription(client, user){
        try {
            client.sendText(`${formatarPhoneNumber(user.phone)}`, 'Assine o conselheiro amoroso para continuar!')
            .then((result) => {
              console.log('Result: ', result); //return object success
            })
            .catch((erro) => {
              console.error('Error when sending: ', erro); //return object error
            });
            return
        } catch (error) {
            throw error
        }
    }

    async SendMessageConselho(client, user){
        try {
            client.sendText(`${formatarPhoneNumber(user.phone)}`, 'Seu conselho é: "Seja você mesmo"')
            .then((result) => {
              console.log('Result: ', result); //return object success
            })
            .catch((erro) => {
              console.error('Error when sending: ', erro); //return object error
            });
            return
        } catch (error) {
            throw error
        }
    }
}

export {WhatsappDao}