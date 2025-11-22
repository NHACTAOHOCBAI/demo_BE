import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express'; // Import Response type
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  // Inject Response object và bật passthrough
  login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = this.authService.login(loginDto);

    // Kiểm tra nếu đăng nhập thành công (có trường role)
    if (result && result.role) {
      const expirationDate = new Date();
      // Cookie sẽ hết hạn sau 7 ngày
      expirationDate.setDate(expirationDate.getDate() + 7);

      // 🎯 SET COOKIE Ở ĐÂY
      response.cookie('user_role', result.role, {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      // Nếu đăng nhập thành công, bạn chỉ nên trả về các thông tin cần thiết (không nên trả về password)
      return { username: result.username, role: result.role };
    }

    // Nếu đăng nhập thất bại, đặt trạng thái lỗi và trả về thông báo
    response.status(HttpStatus.UNAUTHORIZED);
    return { message: 'Invalid credentials' };
  }
}
