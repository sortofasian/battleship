import { ArgumentsHost, Catch, HttpStatus } from "@nestjs/common"
import { BaseExceptionFilter } from "@nestjs/core"
import { Prisma } from "@prisma/client"

@Catch(Prisma.PrismaClientKnownRequestError)
export class DbFilter extends BaseExceptionFilter {
    catch(
        exception: Prisma.PrismaClientKnownRequestError,
        host: ArgumentsHost
    ) {
        console.error(exception.message)
        const ctx = host.switchToHttp()
        const response = ctx.getResponse()
        const message = exception.message.replace(/\n/g, "")
        console.log(message)

        switch (exception.code) {
            case "P2025": {
                const statusCode = HttpStatus.NOT_FOUND
                response.status(statusCode).json({ statusCode, message })
                break
            }
            default:
                super.catch(exception, host)
        }
    }
}
