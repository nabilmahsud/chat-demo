import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vendor } from './vendor.entity';
import { Repository } from 'typeorm';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { extractKeywords } from '../utils/text.utils';

@Injectable()
export class VendorService {
  constructor(
    @InjectRepository(Vendor)
    private vendorRepository: Repository<Vendor>,
  ) {}

  async createVendor(vendor: CreateVendorDto) {
    await this.vendorRepository.save(vendor);
  }

  getAllVendors() {
    return this.vendorRepository.find();
  }

  async searchVendor(prompt: string) {
    const keywords = extractKeywords(prompt);

    const builder = this.vendorRepository.createQueryBuilder('vendor');
    builder.select([
      'vendor.name',
      'vendor.category',
      'vendor.description',
      'vendor.emailContact',
    ]);

    keywords.forEach((kw, index) => {
      const param = `kw${index}`;
      if (index === 0) {
        builder.where(`vendor.name ILIKE :${param}`, { [param]: `%${kw}%` });
      } else {
        builder.orWhere(`vendor.name ILIKE :${param}`, { [param]: `%${kw}%` });
      }
    });

    return await builder.getMany();
  }
}
