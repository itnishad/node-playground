import http from 'node:http'
import type {Server} from 'node:http'
import app from './app.ts'

let server: Server

const main = async (): Promise<void> =>{
    // configuration check
    // other project configuration

    server = app.listen(5000, ()=>{
        console.log("Server is listen on port 5000")
    })

    server.on('error', (error)=>{
        console.log(error)
        process.exit(1)
    })
}

main()

process.on("unhandledRejection", (reason)=>{
    console.error("Unhandled rejection detected, shutting down...", reason);

    if(server){
        server.close(()=> process.exit(1))
    } else {
        process.exit(1)
    }

})

process.on('uncaughtException', (error) =>{
    console.error("Uncaught exception detected, shutting down...", error)
    process.exit(1)
})