import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    console.log(email);
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException();
    const validPassword = await bcrypt.compare(pass, user.password);
    if (!validPassword) throw new UnauthorizedException();
    const payload = { id: user.id, name: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
