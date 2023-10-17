import { Injectable, HttpException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    const password = await bcrypt.hash(createUserDto.password, 12);
    return this.repository.save({ ...createUserDto, password });
  }

  findAll() {
    return this.repository.find({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  findOne(id: number) {
    console.log(this.repository, '1111');
    return this.repository.findOne({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        photo: true,
      },
    });
  }

  findByEmail(email: string) {
    return this.repository.findOne({ where: { email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto, file) {
    try {
      const fileName = uuid.v4() + '.' + file.mimetype.split('/')[1];
      const filePath = path.resolve(__dirname, '..', 'static');
      console.log(filePath);
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      // return fileName;
      await this.repository.update(id, { ...updateUserDto, photo: fileName });
      return this.findOne(id);
    } catch (e) {
      throw new HttpException('Ошибка', 500);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
