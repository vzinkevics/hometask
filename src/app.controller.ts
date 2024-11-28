import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EmployedUser } from './types/employed-people.dto';
import { ErrorResponseDto, SuccessResponseDto } from './dto/response.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('get-employed-users')
  async getEmployedUsers(): Promise<
    SuccessResponseDto<EmployedUser[]> | ErrorResponseDto
  > {
    try {
      const now = Date.now();

      const employedUsers = await this.appService.getEmployedUsers();

      const elapsedTime = Date.now() - now;
      console.log(`Execution time: ${elapsedTime}ms`);

      return {
        status: true,
        data: employedUsers,
      };
    } catch (e) {
      console.log(e);
      return {
        status: false,
        error: 'Something bad happened',
      };
    }
  }
}
