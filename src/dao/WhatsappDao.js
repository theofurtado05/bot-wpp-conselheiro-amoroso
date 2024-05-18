import venom from 'venom-bot';
import { formatarPhoneNumber } from '../utils/formatarPhoneNumber';

class WhatsappDao {
    async start(client) {
        client.onMessage(async (message) => {
          console.log("Mensagem recebida: ", message)
            const sender = message.sender  // id é o numero@c.us
            const mensagem = message.body
          //verificar se tem esse sender no banco
          //se nao tiver, cria-lo e ja adicionar uma mensagem
            //responde-lo com conselho
          //se sim, verificar quantas mensagens ele tem
            // se tiver menos que 2, responde-lo com um conselho
            // se nao, mandar a mensagem para assinar
            
            // await this.SendMessageNoSubscription(client, {phone: sender.id})
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
}

export {WhatsappDao}