

import express from 'express'

const router = express.Router()


router.get('/',(req, res, next)=>{
    res.send("Users Get Request")
})

router.post('/',(req, res, next)=>{
    res.send("Users Post Request")
})

router.put('/',(req, res, next)=>{
    res.send("Users put Request")
})

router.delete('/',(req, res, next)=>{
    res.send("Users Delete Request")
})

//1. Simple Get
router.get('/users', (req, res, next)=>{
    res.send("Simple Get")
})

// 2. Get with router parameter
router.get('/post/:postId', (req, res, next)=>{
    const {postId} = req.params
    res.send(postId)
})

// 3. Query Paramater
// post?limit=10&page=3
router.get('/post', (req, res, next)=>{
    const query = req.query
    res.send(query)
})


// 4. route

router.route('/users')
.get((req, res, next)=>{
    res.send("Simple Get")
})
.post((req, res, next)=>{
    res.send("Simple Post")
})
.put((req, res, next)=>{
    res.send("Simple Put")
})

// 5. ALL

router.all('/product', (req, res, next)=>{
    res.send("send prodct info")
})

// 6.

router.get(['/abc', '/bca', '/cab'], (req, res, next)=>{
    res.send("handle multiple path")
})

// 7
router.get(/^\/users\/(\d+)$/, (req, res)=>{
    res.send("using regex")
})

// 8
router.get('/user/*', (req, res)=>{
    res.send("wildCard")
})

export default router