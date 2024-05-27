import express from 'express'
import userRoutes from './src/routes/userRoutes.js'
import paymentRoutes from './src/routes/paymentRoutes.js'
import cors from 'cors'; // Importe o pacote cors
import { WhatsappDao } from './src/dao/WhatsappDao.js'

const app = express()
const PORT = 8080
const whatsapp = new WhatsappDao()

app.use(cors());
app.use(express.json());
app.use('/user', userRoutes)
app.use('/payment', paymentRoutes) 

app.get('/', (req, res) => {
    res.send('API Online!');
});

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`)
    // const client = await whatsapp.createSession()
    // console.log(client)
})