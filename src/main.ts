import * as http from 'node:http'

type TODO = {
    id: string
    title: string
    description: string
    status: boolean
    createTime: number
}

const PORT = process.env.PORT || 8000

let myTodos: TODO[] = [];

const checkMethod = (method: string) => {

}

const getBody = (req: http.IncomingMessage): Promise<any> => new Promise((resolve, rejects) => {
    let body = ''
    req.on('data', (chunk) => {
        body = body + chunk.toString()
    })
    req.on('end', () => {
        try {
            const myBody = JSON.parse(body)
            resolve(myBody ? myBody : {})
        } catch (error) {
            console.log(error);
            rejects(error)
        }
    })
    req.on('error', (error) => {
        console.log(error)
        rejects(error)
    })
})

const response = (res: http.ServerResponse<http.IncomingMessage>, statusCode: number, responseBody: unknown) => {
    res.writeHead(200, { 'content-type': "application/json" })
    res.end(JSON.stringify(responseBody));
}

const server = http.createServer(async (req, res) => {
    try {
        const url = req.url || '';
        const method = req.method || '';
        const parts = url.split('/').filter(Boolean);

        //GET => host/todos
        if (method === 'GET' && parts[0] === 'todos' && parts.length === 1) {
            res.writeHead(200, { 'content-type': "application/json" })
            res.end(JSON.stringify(myTodos));
            return
        }

        if (method === 'GET' && parts[0] === 'todos' && parts.length === 2) {
            const id = parts[1];

            const todoById = myTodos.filter(item => item.id === id)

            if (todoById.length <= 0) {
                const resBody = {
                    status: false,
                    code: 404,
                    message: `Todo not found id is ${id}`
                }
                response(res, 404, resBody)
                return
            }

            const resBody = {
                status: true,
                code: 200,
                message: "Todo Found",
                data: todoById[0]
            }

            response(res, 200, resBody)
            return
        }

        //POST => host/todos
        if (method === 'POST' && parts[0] === 'todos') {
            // body ta json akare parse korte hobe
            const body = await getBody(req)
            // body take validate korbo
            if (!body.title) {
                res.writeHead(400, { 'content-type': "application/json" });
                res.end("Title is required");
                return
            }

            if (!body.description) {
                res.writeHead(400, { 'content-type': "application/json" });
                res.end("Description is required");
                return
            }

            // data organize

            const newData = {
                id: crypto.randomUUID(),
                title: body.title,
                description: body.description,
                status: false,
                createTime: Date.now()
            }

            // data save and response

            myTodos.push(newData)

            const resData = {
                status: true,
                code: 201,
                messages: "Successfully created",
                data: newData
            }

            res.writeHead(201, { 'content-type': "application/json" });
            res.end(JSON.stringify(resData));
            return
        }

        if(method === 'PUT' && parts[0] === 'todos') {
            // body manage korte hobe
            // body validate korte hobe
            //  update todo find korte hobe
            // update kore data save korte hobe
        }

        if(method === 'DELETE' && parts[0] === 'todos' && parts.length === 2) {
            const id = parts[1]

            if(!id) {
                response(res, 404, {status: false, code: 404, message: "Id not found"})
                return
            }

            const updateTodo = myTodos.filter(item => item.id !== id);

            myTodos = updateTodo

            const resBody = {
                status: true,
                code: 200,
                message: "Todo delete successfully"
            }

            response(res, 200, resBody)
            return
        }

        res.writeHead(404, { 'content-type': "application/json" });
        res.end("Route Not Found")
    } catch (error) {
        res.writeHead(500, { 'content-type': "application/json" })
        res.end("There was an server side error");
    }
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

server.on('error', (error) => {
    console.log(error)
    process.exit(0)
})