// import * as http from 'node:http'

// const server = http.createServer((req, res)=>{
//     res.end("Hello Nishad");
// });
// server.listen(3000, '0.0.0.0')
// console.log(server.listening)
// console.log(server.address());

import * as http from 'node:http'
// Kivabe ekta server crate korte hoy

// const server = http.createServer()

// server class er ki ki property ache

// console.log("iS Server is running: ",server.listening)
// console.log("Keep Alive: ",server.keepAliveTimeout)

// server class er important method/function

// server.listen(3000, ()=>{
//     console.log("Server is running on port 3000")
// })

// server.close(()=> {
//     console.log("Server is now close")
// })

// console.log(server.address());

// server class er event

// server.on("request", (req, res) => {
//     res.end("Hello World")
// })

const server = http.createServer((req, res)=>{
    console.log("trailers", req.trailers)
    console.log("Headers", req.headers)
    console.log("StatusCOde: ", req.statusCode)
    if(req.method === 'POST'){
        console.log("Post method handel")
    } else if(req.method === 'PUT'){
        console.log("Put method handel")
    } else {
        // Get method handel
        console.log("Get Method handle")
    }
    res.end("Hello World !!!!!!!!!!!!!!!!!!!!!!!!")
})

server.listen(3000, ()=>{
    console.log("Server is listen on 3000")
})