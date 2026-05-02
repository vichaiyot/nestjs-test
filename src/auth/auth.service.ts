import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Country, CountryDocument } from '../countries/schemas/countries.schema';
import { Model } from 'mongoose';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,

    @InjectModel(Country.name)
    private readonly countryModel: Model<CountryDocument>,

    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const userExists = await this.userModel.findOne({ email: dto.email });
    if (userExists) {
      throw new BadRequestException('Email already exists');
    }
    const country = await this.countryModel.findById(dto.countryId);
    if (!country) {
      throw new BadRequestException('Country not found');
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.userModel.create({
      username: dto.username,
      email: dto.email,
      password: hashedPassword,
      country: country._id,
    });

    const result = await this.userModel.findById(user._id).select('-password');

    return {
      message: 'register success',
      data: result,
    };
  }

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email }).select('+password');

    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Invalid email or password');
    }

    const payload = {
      sub: user._id,
      email: user.email,
    };

    const token = this.jwtService.sign(payload);

    const userData = await this.userModel
      .findById(user._id)
      .select('-password')
      .populate('country');

    return {
      message: 'login success',
      access_token: token,
      data: userData,
    };
  }
}
