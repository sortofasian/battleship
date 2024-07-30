import {
    createParamDecorator,
    ExecutionContext,
    SetMetadata
} from "@nestjs/common"
import { User } from "@prisma/client"

export const IS_PUBLIC_KEY = "isPublic"
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)
export const AuthedUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        return request.user as User
    }
)
