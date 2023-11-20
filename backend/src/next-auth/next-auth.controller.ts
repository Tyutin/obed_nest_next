import { Controller } from '@nestjs/common';
import { NextAuthService } from './next-auth.service';

@Controller('next-auth')
export class NextAuthController {
  constructor(private readonly nextAuthService: NextAuthService) {
    this.nextAuthService = nextAuthService;
  }

  // @Post('/create-user')
  // async createUser()
}
