import express from 'express'
import userRoutes from './routes/userRoutes'
import paymentRoutes from './routes/paymentRoutes'

const app = express()
const PORT = 9002

app.use(cors());
app.use(express.json());
app.use('/user', userRoutes)
app.use('/payment', paymentRoutes)

app.get('/', (req, res) => {
    res.send('API Online!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})