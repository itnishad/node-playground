// Express Setup
import express, {type Express, type Request, type Response} from 'express'
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url))
const staticPath = join(__dirname, '..', '/public')
const app: Express = express();

// Express er property dekbo

console.log(app.locals)

console.log("x-powered-by: ",app.get('x-powered-by'))
app.set('x-powered-by', false)
console.log("x-powered-by2: ",app.get('x-powered-by'))

// Express er method dekbo

// express configuration
app.use(express.json({limit: '200kb'}))
app.use(express.urlencoded({extended: true, limit:'5mb'}))
app.use('/static', express.static(staticPath))

app.get('/todos', (req, res) =>{
    res.send("Hello World")
})

app.post('/todos', (req, res) =>{
    console.log(req.body)

    res.send("Hello World Post")
})

app.listen(4000, ()=>{
    console.log("App is running on port 4000")
})