import venom from 'venom-bot';
import { formatarPhoneNumber } from '../utils/formatarPhoneNumber.js';
import { UserDao } from './UserDao.js';
import { formatarSemUC } from '../utils/formatarSemUC.js';
import { darConselhosAmorosos } from '../service/openai.js';
import { getAllQuotedMessages } from '../utils/getAllQuotedMsg.js';

const userDao = new UserDao()

class WhatsappDao {
    async start(client) {
        client.onMessage(async (message) => {
          console.log("Mensagem recebida: ", message)
            const sender = message.sender  // id é o numero@c.us
            // let mensagem = message.body...
            //....

            let mensagem = getAllQuotedMessages(message)
            console.log("Mensagem: ", mensagem)
            
            const user = await userDao.getUserByPhone(formatarSemUC(sender.id))

            if((mensagem == '!testegratis' || mensagem == '"!testegratis"' || mensagem == 'teste' || mensagem == '!teste' || mensagem == '"!teste"' || mensagem == '!Teste' || mensagem == '!TESTE' || mensagem == 'Teste' || mensagem == '*Teste*' || mensagem == '*teste*' || mensagem == '*!Teste*' || mensagem == '*!teste*') && user.numMsgSent < 2){
              
              await this.SendMensagemIniciarTesteGratis(client, {phone: sender.id})
              await userDao.addMsgOnUser(formatarSemUC(sender.id))
              return
            } else if(user && user.numMsgSent > 0){
              

              if(user.currentPlan != 'Free'){
                //responder com conselho
                await this.SendMensagemDeAguardo(client, {phone: sender.id})
                await this.SendMessageConselho(client, {phone: sender.id}, mensagem)
                await userDao.addMsgOnUser(formatarSemUC(sender.id))
                
              } else if (user.numMsgSent < 3){
                //responder com conselho
                // await this.SendMensagemDeAguardo(client, {phone: sender.id})
                await this.SendMensagemDeAguardo(client, {phone: sender.id})
                await this.SendMessageConselho(client, {phone: sender.id}, mensagem)
                await userDao.addMsgOnUser(formatarSemUC(sender.id))

              } else {
                //mandar assinar
                await this.SendMessageNoSubscription(client, {phone: sender.id})
              }
            } else {
              //logica de primeira mensagem aqui
                if(!user){
                  const newUser = await userDao.createUser({
                    created_at: new Date(), 
                    email: null, 
                    phone: formatarSemUC(sender.id), 
                    currentPlan: 'Free', 
                    subscription_at: new Date(), 
                    numMsgSent: 0
                  })
                }
                await this.SendMensagemBoasVindas(client, {phone: sender.id})
            }
        });
      }
    //criar sessao
  async createSession(){
      try {
          // const client = await venom.create({
          //     session: 'conselheiro-amoroso',
          //     headless: 'new',
          //     args: ['--no-sandbox', '--disable-setuid-sandbox'],
          //     // puppeteerOptions: {
          //     // // executablePath: '/usr/bin/google-chrome-stable',
          //     // }
          // })
          const client = await venom.create({
            session: 'conselheiro-amoroso',
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            executablePath: '/usr/bin/chromium-browser'
          });
        
          this.start(client)
          return client
      } catch (error) {
          throw error
      }
  }   

  async SendMessageNoSubscription(client, user){
      try {
          client.sendText(`${formatarPhoneNumber(user.phone)}`, `*Seu teste grátis chegou ao fim!* 😢

Mas não se preocupe, ainda estou aqui para ajudar você a qualquer momento com conselhos personalizados e instantâneos. Confira nossos planos e continue aproveitando ao máximo todos os benefícios do FlertAI:

Funcionalidades do FlertAI:
⁠- Resposta imediata a qualquer momento
⁠- Uso ilimitado
- Conselho ideal para todo tipo de situação
⁠- Entende mensagens respondidas
⁠- Configure em qualquer número de WhatsApp

Planos disponíveis:

✨ Plano Mensal ✨
Assine por apenas *R$27,00* por mês e tenha acesso ilimitado a todas as funcionalidades do FlertAI. https://bit.ly/flertai-plano-mensal

💎 Plano Anual 💎
Garanta um ano inteiro de conselhos amorosos com um desconto especial! Assine por apenas *R$19,70* por mês. https://bit.ly/flertai-plano-anual

*Clique no link do plano que mais combina com você e comece a aproveitar agora mesmo!*

Se precisar de mais informações ou tiver qualquer dúvida, estou à disposição para ajudar.

Atenciosamente,
FlertAI ❤️`)
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

  async SendMensagemDeAguardo(client, user){
    try {
        client.sendText(`${formatarPhoneNumber(user.phone)}`, '🕢Aguarde, já vamos te responder!')
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
  
  async SendMensagemBoasVindas(client, user) {
    try {
      
      // Certifique-se de formatar o número de telefone corretamente
      const formattedPhone = formatarPhoneNumber(user.phone);
  
      await client.sendText(`${formatarPhoneNumber(user.phone)}`, `*Bem vindo ao Flert.Ai, seu conselheiro para relacionamentos 24 horas por dia!🔥* \n

💌Este serviço é voltado para questões de amor e relacionamentos. Formule suas perguntas de maneira clara, focando nessas áreas. *Envie apenas uma mensagem por vez ate receber uma resposta.* \n

✍️Procure descrever cada situação ao maximo antes de pedir o conselho. Quanto mais informação fornecida, melhor será sua resposta.\n
      
🚨Questões fora desse escopo não serão respondidas. Estarei a disposição para ajudar você com o que for necessário! \n
      
⚠️Aviso Importante: Em seu plano Gratuito você tem direito a 2 chamadas, aproveite! \n

Digite *!teste* para iniciar seu teste grátis!
      `)
      .then((result) => {
        console.log('Result: ', result)
      })
      .catch((erro) => {
        console.error('Error when sending: ', erro)
        
      });
    } catch (error) {
      throw error;
    }
  }

  async SendMensagemIniciarTesteGratis(client, user){
    try {
        client.sendText(`${formatarPhoneNumber(user.phone)}`, 'Você tem 2 conselhos grátis para testar!')
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

  async SendMessageConselho(client, user, mensagem){
      try {
        const conselho = await darConselhosAmorosos(mensagem)

          client.sendText(`${formatarPhoneNumber(user.phone)}`, `${conselho}`)
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