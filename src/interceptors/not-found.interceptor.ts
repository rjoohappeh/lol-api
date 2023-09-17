import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
    constructor(private errorMessage: string) {}

    intercept(_context: ExecutionContext, stream$: CallHandler): Observable<any> {
        return stream$
            .handle()
            .pipe(tap(data => {
                if (data === undefined) { 
                    throw new NotFoundException(this.errorMessage); 
                }
            }));
    }
}