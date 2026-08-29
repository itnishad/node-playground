// Express Setup
import express, {type Express, type Request, type Response} from 'express'
import users from './todos/router.ts';
import todos from './todos/router.ts';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url))
const staticPath = join(__dirname, '..', '/public')
const app: Express = express();


// express configuration
app.use(express.json({limit: '200kb'}))
app.use(express.urlencoded({extended: true, limit:'5mb'}))
app.use('/static', express.static(staticPath))

app.use((req, res, next)=>{
    console.log("Request Path: ", req.path)
    next()
})

app.get(['/profile', '/users'], (req, res, next)=>{
    res.send("From TODO ALL123")
})

//Route Start
app.use('/v1', users)
app.use('/v1/todos', todos)

app.listen(5000, ()=>{
    console.log("App is running on port 4000")
})