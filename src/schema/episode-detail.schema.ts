import { hasMaxLengthMessage, hasMinLengthMessage, hasRequired } from '@/lib/common/common.validators';
import * as z from 'zod';








export const EpisodeDetailSchema = z.object({
    name: z.string().min(2, {
        message: hasRequired
    }).max(20, {
        message: hasMaxLengthMessage
    }),
    episode: z.string().min(1, {
        message: hasRequired
    }).max(20, {
        message: hasMaxLengthMessage
    })
})