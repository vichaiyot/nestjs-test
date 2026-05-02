import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Country, CountryDocument } from './schemas/countries.schema';
import { Model } from 'mongoose';
import { CreateCountryDto } from './dto/create-country.dto';
import { User, UserDocument } from 'src/auth/schemas/user.schema';

@Injectable()
export class CountriesService {
  constructor(
    @InjectModel(Country.name)
     private countryModel: Model<CountryDocument>,){}

  async create(createCountryDto: CreateCountryDto) {
    return this.countryModel.create(createCountryDto);
  }

  async findAll() {
    return this.countryModel.find();
  }
}
