import { Body, Controller, createParamDecorator, ExecutionContext, Get, Post, UseGuards, Res, Req, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthGuard } from './auth.guard';
import { Response, Request } from 'express';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user; // isso é o que o guard coloca
  },
);

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signin')
  async signin(@Body() dto: CreateAuthDto) {
    return this.authService.signin(dto.email, dto.password)
  }

  @Get('validate')
  @UseGuards(AuthGuard)
  async validate(@CurrentUser() user: any) {
    return this.authService.validateUser(user.sub)
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Token de autorização não fornecido.',
      });
    }

    const token = authHeader.split(' ')[1];
    await this.authService.revokeToken(token);

    return res
      .status(HttpStatus.OK)
      .json({ message: 'Logout realizado com sucesso.' });
  }
}
