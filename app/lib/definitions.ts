import { z } from 'zod';

export const LoginFormSchema = z.object({
    username: z
        .string({
            invalid_type_error: 'Se espera una entrada de texto'
        })
        .nonempty({message: 'Este campo no debe estar vacio'})
        .min(4,{ message: 'Debe ser de al menos 4 caracteres' })
        .trim(),
    password: z
        .string()
        .nonempty({message: 'Este campo no debe estar vacio'})
        .min(4, { message: 'Contener al menos 4 caracteres'})
        .max(8, { message: 'Contener maximo 8 caracteres'})
        .trim()
})

export type LoginFormState =
|{
    errors?:{
        username?: string[]
        password?: string[]
    }
    message?: string
}
| undefined