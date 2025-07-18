const { configDotenv } = require('dotenv')
const express = require('express')
const { default: mongoose } = require('mongoose')
const { userRouter } = require('./routes/UserRoutes')
configDotenv()

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('server is working')
})

app.use('/user',userRouter)

mongoose.connect('mongodb://localhost:27017/RBAC')
    .then(() => console.log('databse connected'))
    .catch((err) => console.log("error while connecting db", err))

app.listen(3000, () => {
    console.log('server is running... at http://localhost:3000/')
})