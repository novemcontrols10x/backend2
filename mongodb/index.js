const express = require('express')
const { default: mongoose } = require('mongoose')
const User = require('./model/User')
const Order = require('./model/Order')



const app = express()
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/mongoDemo').then(() => console.log("mongodb connected")).catch((e) => console.log(err))

app.get('/', (req, res) => {
    res.send('hello world')
})

app.post('/users', async (req, res) => {
    try {
        const user = req.body
        const newUser = new User(user)
        await newUser.save()
        res.status(201).json({ message: "user created", newUser })
    } catch (error) {
        res.status(500).send(err)
    }
})


app.post('/order/:userId', async (req, res) => {
    try {
        const userId = req.params.userId
        const { product, amount, desc } = req.body
        const order = new Order({
            userId,
            product,
            amount,
            desc
        })
        await order.save();
        res.status(201).json({ message: "oder created", order })
    } catch (error) {
        res.status(400).json({
            message: "error while ordering",
            error
        })
    }

})


// app.get('/getUser/:email', async (req, res) => {
//     try {

//         const email = req.params.email
//         console.log(email)
//         const user = await User.findOne({ email })
//         // console.log(user)
//         res.status(200).json({ message: 'got data', user })
//     } catch (error) {
//         res.status(400).json({
//             message: "error while fetching",
//             error
//         })
//     }
// })

app.get('/getUser', async (req, res) => {
    try {



        const user = await User.find({
            $or: [
                { age: { $lt: 30 } },
                { age: { $gte: 25 } }
            ]
        })




        res.status(200).json({ message: 'got data', user })
    } catch (error) {
        res.status(400).json({
            message: "error while fetching",
            error
        })
    }
})


app.get('/getOrder/:id', async (req, res) => {
    try {

        const id = req.params.id

        const order = await Order.findById(id)
        // console.log(user)
        console.log(order)

        res.status(200).json({ message: 'got data', order })
    } catch (error) {
        res.status(400).json({
            message: "error while fetching",
            error: error.message
        })
    }
})



app.get('/getOderByUser', async (req, res) => {
    try {
        const id = req.params.id
        const orders = await Order.find().populate('userId')

        console.log(orders)
        res.status(200).json({ message: "got the data", orders })
    } catch (error) {
        res.status(400).json({
            message: "error while fetching",
            error: error.message
        })
    }

})

app.get('/getOderbyDesc/:query', async (req, res) => {
    try {
        const query = req.params.query
        const result = await Order.find({ $text: { $search: query } })
        // const result = await Order.find({ desc: query })
        res.json({ message: 'data reteieved', result })
    } catch (error) {
        res.status(400).json({
            message: "error while fetching",
            error: error.message
        })
    }

})





app.listen(3000, () => {
    console.log('server is running at 3000')
})