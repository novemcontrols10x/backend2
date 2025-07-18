const express = require('express');
const bcrypt = require('bcryptjs')
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const { requireRole } = require('../middleware');

const userRouter = express.Router();

userRouter.get('/home', (req, res) => {
    res.send('hello from user router')
})

userRouter.get('/onlyAdmin', requireRole('admin',"user"), (req, res) => {
    res.json({
        message: "hello this response is only for admin"
    })
})



userRouter.post('/signup', async (req, res) => {
    try {

        const { name, email, password, role } = req.body;
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.send('user exists try another email')
        }

        const hash = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hash,
            role
        })

        res.status(200).json({
            message: 'user created successfully',
            user
        })
    } catch (error) {
        res.status(400).json({ message: 'error while singup', error: error.message })
    }




})

userRouter.post('/signin', async (req, res) => {
    try {

        const { email, password } = req.body;
        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            return res.send('user exists try another email')
        }

        const isMatched = await bcrypt.compare(password, existingUser.password)

        if (!isMatched) {
            return res.status(400).json({
                message: "wrong passwrod"
            })
        }

        const token = jwt.sign(
            {
                id: existingUser._id,
                role: existingUser.role
            },
            process.env.SECRET,
            { expiresIn: '1d' }
        )



        res.status(200).json({
            message: 'login successfully',
            token: token

        })
    } catch (error) {
        res.status(400).json({ message: 'error while signin' })
    }


})


module.exports = { userRouter }