import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { Repository } from 'typeorm';
import { User } from './entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from "bcrypt";
import { LoginUserDto } from './dto/login-user-dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...rest } = createUserDto;

      const user = this.userRepository.create({
        ...rest,
        password: bcrypt.hashSync(password, 10)
      });

      await this.userRepository.save(user);

      return {
        ...user,
        token: this.getJWTToken({ id: user.id })
      };

    } catch (error) {
      this.handleDBExecptions(error)
    }

  }


  async login(loginUserDto: LoginUserDto) {

    const { email, password } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true }
    });

    if (!user) throw new UnauthorizedException("Invalid credentials");


    if (!bcrypt.compareSync(password, user.password)) throw new UnauthorizedException("Invalid credentials");

    return {
      ...user,
      token: this.getJWTToken({ id: user.id })
    };

  }

  async checkAuthToken(user: User) {
    return { ...user, token: this.getJWTToken({ id: user.id }) };
  }


  private getJWTToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleDBExecptions(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    console.log(error);
    throw new InternalServerErrorException("Error, check logs")
  }
}
