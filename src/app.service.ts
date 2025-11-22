import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // 1. Đặt hàm là async
  async getHello(): Promise<string> {
    console.log('Bắt đầu xử lý. Đang chờ 3 giây...');

    // 2. Dùng setTimeout để tạm dừng luồng trong 3000ms
    await new Promise((resolve) => setTimeout(resolve, 3000));

    console.log('Đã chờ xong. Trả về kết quả.');

    // Trả về chuỗi sau 3 giây
    return 'This is a demo backend service!';
  }
}
