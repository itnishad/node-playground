// Express Setup
import express, {type Express, type Request, type Response, type NextFunction} from 'express'

import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {users, todos} from './routers/index.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const staticPath = join(__dirname, '..', '/public')

const app: Express = express();
app.use(express.json({limit: '200kb'}))
app.use(express.urlencoded({extended: true, limit:'5mb'}))
app.use('/static', express.static(staticPath))

app.use('/v1/users', users)
app.use('/v1/todos', todos)

// Global Error Handler
app.use((error: Error, req: Request, res: Response, next: NextFunction)=>{
    console.log(error)

    res.status(500).send({
        error: true,
        message: "Something went wrong"
    })
})

export default app