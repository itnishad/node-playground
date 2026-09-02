import express from 'express'
import zodValidator from '../middlewares/globalValidation.middleware.ts'
import { createUserSchema,updateUserSchema } from '../types/user.zodschema.ts'
const router = express.Router()

// start user router

router.post('/', zodValidator(createUserSchema, 'body'), (req, res, next) =>{
    //controller
    console.log("From Body", req.body)

    res.send("From Post")
})

// router.route('/').get((req, res, next) => {
//     res.send("From get")
// }).post((req, res, next) => {
//     console.log(req.body)
//     res.send("From post")
// }).put((req, res, next) => {
//     res.send("From put")
// }).delete((req, res, next) => {
//     res.send("From delete")
// })

export default router