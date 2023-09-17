import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { UserAccountService } from "./UserAccountService";
import { ConfigService } from "@nestjs/config";
import { NotFoundInterceptor } from "src/interceptors/not-found.interceptor";

@Module({
    imports: [HttpModule],
    providers: [UserAccountService, ConfigService, NotFoundInterceptor],
})
export class UserAccountModule {}