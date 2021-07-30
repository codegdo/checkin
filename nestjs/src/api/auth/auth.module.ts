import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginModule } from './login/login.module';
import { LogoutModule } from './logout/logout.module';
import { SignupModule } from './signup/signup.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [LoginModule, LogoutModule, SignupModule]
})
export class AuthModule {}
