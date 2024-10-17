import { hasMaxLengthMessage, hasMinLengthMessage, hasRequired } from '@/lib/common/common.validators';
import * as z from 'zod';








export const LoginSchema = z.object({
    username: z.string().min(2, {
        message: hasMinLengthMessage
    }).max(20, {
        message: hasMaxLengthMessage
    }).regex(/^[A-Za-zñÑáÁéÉÍíóÓúÚ.]+$/, "Dato Inválido"),
    password: z.string().min(1, {
        message: hasRequired
    }).max(12, {
        message: hasMaxLengthMessage
    }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?!^\d).*$/, "Dato Inválido")
})