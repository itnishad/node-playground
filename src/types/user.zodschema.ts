import {z} from 'zod'

export const createUserSchema = z.object({
    name: z.string(),
    age: z.coerce.number()
})

export const updateUserSchema = z.object({
    age: z.coerce.number()
})