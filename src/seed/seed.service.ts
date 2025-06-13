import { Injectable } from '@nestjs/common';
import { VendorService } from '../vendor/vendor.service';
import { usersData, vendorData } from './seed.data';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class SeedService {
  constructor(
    private vendorService: VendorService,
    private userService: UserService,
  ) {}

  async seedData() {
    for (const vendor of vendorData) {
      await this.vendorService.createVendor(vendor);
    }
    for (const user of usersData) {
      user.password = bcrypt.hashSync(user.password, 10);
      await this.userService.createUser(user);
    }
  }
}
