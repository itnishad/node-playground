import type { Request, Response, NextFunction } from "express"
import { ZodError, type ZodObject } from "zod"

type ValidationSource = 'body' | 'query' | 'params'

const zodValidator = (schema: ZodObject, source: ValidationSource) => {
    return (req: Request, res: Response, next: NextFunction) =>{
        try {
             const data = req[source]
             const parsed = schema.parse(data);
             req[source] = parsed
             next()
        } catch (error) {
            console.log(error)
            if(error instanceof ZodError){
                return res.status(400).json({
                    status: 'fail',
                    errors: error.issues.map((e) =>({
                        field: e.path.join(','),
                        message: e.message
                    }))
                })
            }
            next(error)
        }
    }
}



export default zodValidator