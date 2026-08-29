import express from 'express'

const router = express.Router()

// Todo
// 1. User can viwe his todos
router.get('/v1/todos',(req, res, next)=>{
    res.send("From Todo get")
})
// 2. User can create new Todo
router.post('/v1/todos',(req, res, next)=>{
    res.send("From Todo post")
})
// 3. User can update a specific todo
router.put('/v1/todos',(req, res, next)=>{
    res.send("From Todo put")
})
// 4. user can delete a specific todo
router.delete('/v1/todos',(req, res, next)=>{
    res.send("From Todo delete")
})

export default router