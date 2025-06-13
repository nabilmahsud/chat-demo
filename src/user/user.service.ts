import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export type CreateUserDto = {
  username: string;
  password: string;
};

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOneByAttribute(attribute: string, value: string) {
    return this.userRepository.findOne({
      where: { [attribute]: value },
    });
  }

  createUser(createUserDto: CreateUserDto) {
    if (createUserDto.password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    if (createUserDto.username.length < 3) {
      throw new Error('Username must be at least 3 characters long');
    }

    const newUser = this.userRepository.create({
      ...createUserDto,
    });

    return this.userRepository.save(newUser);
  }
}
