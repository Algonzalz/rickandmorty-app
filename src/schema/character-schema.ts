import { hasMaxLengthMessage, hasMinLengthMessage, hasRequired } from '@/lib/common/common.validators';
import * as z from 'zod';








export const CharacterSchema = z.object({
    name: z.string().min(2, {
        message: hasRequired
    }).max(20, {
        message: hasMaxLengthMessage
    }),
    gender: z.string().min(1, {
        message: hasRequired
    }),
    type: z.string().min(1, {
        message: hasRequired
    }),
    species: z.string().min(1, {
        message: hasRequired
    }),

})