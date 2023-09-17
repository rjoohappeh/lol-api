import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { UserAccountService } from "./UserAccountService";
import { ConfigService } from "@nestjs/config";

@Module({
    imports: [HttpModule],
    providers: [UserAccountService, ConfigService],
})
export class UserAccountModule {}