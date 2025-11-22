import { Injectable } from '@nestjs/common';
import { LoginDto } from 'src/auth/dto/login.dto';

@Injectable()
export class AuthService {
  login(loginDto: LoginDto) {
    if (loginDto.username === 'admin' && loginDto.password === 'password') {
      return {
        username: loginDto.username,
        password: loginDto.password,
        role: 'admin',
      };
    }
    if (loginDto.username === 'user' && loginDto.password === 'password') {
      return {
        username: loginDto.username,
        password: loginDto.password,
        role: 'user',
      };
    }
    return undefined;
  }
}
