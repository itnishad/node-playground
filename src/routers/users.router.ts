import express from 'express'

const router = express.Router()

// start user router

router.get('/', (req, res, next) => {
    console.log("users get request")
    throw new Error("Manual Error")
    res.sendStatus(200)

})

export default router